"use client";

import "mapillary-js/dist/mapillary.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MAPILLARY_TOKEN } from "@/lib/mapillary";
import { Button } from "@/components/ui/Button";
import { StreetMockupView } from "./StreetMockupView";
import { X, Loader2, AlertTriangle, Move3d } from "lucide-react";
import type { Cartel, Mockup } from "@/lib/types";

const deg = (d: number) => (d * Math.PI) / 180;

/**
 * Explorador interactivo: viewer real de la calle (MapillaryJS) con el banner
 * geo-anclado en 3D (Three.js custom renderer) que queda clavado a la pared
 * mientras se navega. Con nudge en vivo (altura / giro / tamaño) para afinar
 * en cámara. Si algo falla, cae a la vista estática.
 */
export function StreetExplorer({
  cartel,
  mockup,
  onClose,
}: {
  cartel: Cartel;
  mockup?: Mockup;
  onClose: () => void;
}) {
  const vista = cartel.vistaCalle;
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<{
    mesh: { position: { fromArray: (a: number[]) => void }; rotation: { set: (x: number, y: number, z: number) => void }; scale: { set: (x: number, y: number, z: number) => void } } | null;
    geoToPos: ((lng: number, lat: number, alt: number) => number[]) | null;
    rerender: (() => void) | null;
  }>({ mesh: null, geoToPos: null, rerender: null });

  const [status, setStatus] = useState<"loading" | "ready" | "error">(() =>
    !vista || !MAPILLARY_TOKEN ? "error" : "loading",
  );

  // geo-anclaje: usa placement3D o lo sintetiza desde lat/lng + compass
  const p3d = useMemo(
    () =>
      vista?.placement3D ?? {
        lng: cartel.lng,
        lat: cartel.lat,
        alt: 6,
        rotation: [deg(90), deg(vista?.compass ?? 0), 0] as [
          number,
          number,
          number,
        ],
        anchoM: cartel.anchoM,
        altoM: cartel.altoM,
      },
    [vista, cartel],
  );

  // nudge en vivo
  const [alt, setAlt] = useState(p3d.alt);
  const [giro, setGiro] = useState(0); // grados extra sobre el default
  const [escala, setEscala] = useState(1);

  // aplicar nudge al mesh
  useEffect(() => {
    const m = meshRef.current;
    if (!m.mesh || !m.geoToPos) return;
    m.mesh.position.fromArray(m.geoToPos(p3d.lng, p3d.lat, alt));
    m.mesh.rotation.set(
      p3d.rotation[0],
      p3d.rotation[1] + deg(giro),
      p3d.rotation[2],
    );
    m.mesh.scale.set(escala, escala, 1);
    m.rerender?.();
  }, [alt, giro, escala, p3d.lng, p3d.lat, p3d.rotation]);

  useEffect(() => {
    if (!vista || !MAPILLARY_TOKEN) return;
    let viewer: { addCustomRenderer: (r: unknown) => void; getCanvas: () => HTMLCanvasElement; triggerRerender: () => void; remove: () => void } | null = null;
    let disposed = false;

    (async () => {
      try {
        const mly = await import("mapillary-js");
        const THREE = await import("three");
        if (disposed || !containerRef.current) return;

        const { Viewer, geodeticToEnu, RenderPass } = mly;

        viewer = new Viewer({
          accessToken: MAPILLARY_TOKEN,
          container: containerRef.current,
          imageId: vista.mapillaryImageId,
          component: { cover: false },
        }) as unknown as typeof viewer;

        // textura del arte
        const tex = mockup?.artUrl
          ? new THREE.TextureLoader().load(mockup.artUrl)
          : null;
        if (tex) tex.colorSpace = THREE.SRGBColorSpace;

        const geometry = new THREE.PlaneGeometry(p3d.anchoM, p3d.altoM);
        const material = new THREE.MeshBasicMaterial({
          map: tex ?? undefined,
          color: tex ? 0xffffff : 0xe95d0f,
          side: THREE.DoubleSide,
          transparent: true,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.set(p3d.rotation[0], p3d.rotation[1], p3d.rotation[2]);

        // custom renderer
        const renderer: {
          renderer?: import("three").WebGLRenderer;
          camera?: import("three").Camera;
          scene?: import("three").Scene;
          id: string;
          renderPass: number;
          onAdd: (v: typeof viewer, reference: { lng: number; lat: number; alt: number }, ctx: WebGLRenderingContext | WebGL2RenderingContext) => void;
          onReference: (v: typeof viewer, reference: { lng: number; lat: number; alt: number }) => void;
          onRemove: () => void;
          render: (ctx: WebGLRenderingContext | WebGL2RenderingContext, viewMatrix: number[], projectionMatrix: number[]) => void;
        } = {
          id: "masa-banner-3d",
          renderPass: RenderPass.Opaque,
          onAdd(_v, reference, context) {
            const geoToPos = (lng: number, lat: number, a: number) =>
              geodeticToEnu(lng, lat, a, reference.lng, reference.lat, reference.alt);
            mesh.position.fromArray(geoToPos(p3d.lng, p3d.lat, alt));
            mesh.scale.set(escala, escala, 1);

            const r = new THREE.WebGLRenderer({
              canvas: viewer!.getCanvas(),
              context,
            });
            r.autoClear = false;
            this.renderer = r;
            this.camera = new THREE.Camera();
            this.scene = new THREE.Scene();
            this.scene.add(mesh);

            meshRef.current = {
              mesh,
              geoToPos,
              rerender: () => viewer?.triggerRerender(),
            };
          },
          onReference(_v, reference) {
            const geoToPos = (lng: number, lat: number, a: number) =>
              geodeticToEnu(lng, lat, a, reference.lng, reference.lat, reference.alt);
            mesh.position.fromArray(geoToPos(p3d.lng, p3d.lat, alt));
            meshRef.current.geoToPos = geoToPos;
          },
          onRemove() {
            geometry.dispose();
            material.dispose();
            tex?.dispose();
            this.renderer?.dispose();
          },
          render(_context, viewMatrix, projectionMatrix) {
            const cam = this.camera!;
            cam.matrix.fromArray(viewMatrix).invert();
            cam.updateMatrixWorld(true);
            cam.projectionMatrix.fromArray(projectionMatrix);
            this.renderer!.resetState();
            this.renderer!.render(this.scene!, cam);
          },
        };

        viewer!.addCustomRenderer(
          renderer as unknown as Parameters<
            NonNullable<typeof viewer>["addCustomRenderer"]
          >[0],
        );
        if (!disposed) setStatus("ready");
      } catch (e) {
        console.error("StreetExplorer:", e);
        if (!disposed) setStatus("error");
      }
    })();

    return () => {
      disposed = true;
      try {
        viewer?.remove();
      } catch {
        /* noop */
      }
      meshRef.current = { mesh: null, geoToPos: null, rerender: null };
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vista?.mapillaryImageId]);

  const body = (
    <div className="fixed inset-0 z-[80] flex flex-col bg-ink-950/90 backdrop-blur-sm animate-fade-in">
      {/* header */}
      <div className="flex items-center justify-between px-5 py-3 text-white">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {cartel.codigo} · {cartel.direccion}
          </p>
          <p className="text-xs text-white/60">
            Vista real de la calle · arrastrá para mirar alrededor
          </p>
        </div>
        <button
          onClick={onClose}
          className="grid size-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Cerrar"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* viewer */}
      <div className="relative mx-auto w-full max-w-6xl flex-1 overflow-hidden rounded-t-2xl">
        <div ref={containerRef} className="absolute inset-0 size-full bg-black" />

        {status === "loading" && (
          <div className="absolute inset-0 grid place-items-center text-white/80">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="size-7 animate-spin" />
              <span className="text-sm">Cargando la calle…</span>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 grid place-items-center p-6">
            <div className="max-w-md text-center">
              <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-amber-500/20 text-amber-300">
                <AlertTriangle className="size-6" />
              </div>
              <p className="text-sm font-medium text-white">
                No pudimos cargar la vista navegable
              </p>
              <p className="mt-1 text-xs text-white/60">
                Te mostramos el encuadre fijo del cartel.
              </p>
              <div className="mt-4 overflow-hidden rounded-xl">
                <StreetMockupView
                  cartel={cartel}
                  mockup={mockup}
                  className="aspect-[16/10] w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* nudge en vivo */}
        {status === "ready" && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-wrap items-center gap-4 rounded-2xl bg-ink-950/70 px-5 py-3 text-white shadow-lg backdrop-blur">
            <span className="flex items-center gap-1.5 text-xs font-medium text-white/70">
              <Move3d className="size-4" />
              Ajustar cartel
            </span>
            <NudgeSlider label="Altura" value={alt} min={2} max={14} step={0.2} onChange={setAlt} fmt={(v) => `${v.toFixed(1)}m`} />
            <NudgeSlider label="Giro" value={giro} min={-180} max={180} step={1} onChange={setGiro} fmt={(v) => `${Math.round(v)}°`} />
            <NudgeSlider label="Tamaño" value={escala} min={0.4} max={2.5} step={0.05} onChange={setEscala} fmt={(v) => `${v.toFixed(2)}×`} />
            <Button size="sm" variant="secondary" onClick={onClose}>
              Listo
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(body, document.body);
}

function NudgeSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  fmt,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  fmt: (v: number) => string;
}) {
  return (
    <label className="flex flex-col gap-0.5">
      <span className="flex items-center justify-between gap-3 text-[11px] text-white/60">
        {label} <span className="tabular-nums text-white/80">{fmt(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-28 accent-brand-500"
      />
    </label>
  );
}
