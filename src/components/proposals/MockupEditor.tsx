"use client";

import { useEffect, useRef, useState } from "react";
import Moveable, {
  type OnDrag,
  type OnResize,
  type OnRotate,
} from "react-moveable";
import { sceneFor, SCENE_W, SCENE_H } from "@/lib/billboard";
import { cn } from "@/lib/utils";
import type { Cartel, Mockup, MockupTransform } from "@/lib/types";

/**
 * Editor de un mockup: foto del cartel de fondo + arte manipulable encima.
 * El transform vive en PCTS (0..1) relativos al contenedor. Convertimos
 * px↔pct midiendo el rect del contenedor.
 */
export function MockupEditor({
  cartel,
  mockup,
  onChange,
}: {
  cartel: Cartel;
  mockup: Mockup;
  onChange: (transform: MockupTransform) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLImageElement>(null);
  const moveableRef = useRef<Moveable>(null);
  const { dataUrl } = sceneFor(cartel.codigo, cartel.tipo, cartel.iluminado);

  // forzamos recálculo del Moveable cuando cambia el target o el tamaño
  const [, setTick] = useState(0);
  const rerender = () => setTick((t) => t + 1);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      moveableRef.current?.updateRect();
      rerender();
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // tras montar/cambiar arte, recalcular
  useEffect(() => {
    moveableRef.current?.updateRect();
  }, [mockup.artUrl, mockup.cartelId]);

  const t = mockup.transform;

  const contSize = () => {
    const r = containerRef.current?.getBoundingClientRect();
    return { w: r?.width ?? 1, h: r?.height ?? 1 };
  };

  const handleDrag = (e: OnDrag) => {
    const { w, h } = contSize();
    const [dx, dy] = e.delta; // px
    onChange({
      ...t,
      xPct: t.xPct + dx / w,
      yPct: t.yPct + dy / h,
    });
  };

  const handleResize = (e: OnResize) => {
    const { w, h } = contSize();
    const newWPct = e.width / w;
    // resize desde la izquierda/arriba: corregir posición según dirección
    const [dirX, dirY] = e.direction;
    const dwPx = e.delta[0]; // delta de ancho en px
    const dhPx = e.delta[1]; // delta de alto en px
    let xPct = t.xPct;
    let yPct = t.yPct;
    if (dirX < 0) xPct = t.xPct - dwPx / w;
    if (dirY < 0) yPct = t.yPct - dhPx / h;
    onChange({ ...t, wPct: newWPct, xPct, yPct });
  };

  const handleRotate = (e: OnRotate) => {
    onChange({ ...t, rotation: e.rotation });
  };

  // posición/tamaño del arte desde pcts (el alto es automático = ancho del arte * ratio)
  const artStyle: React.CSSProperties = {
    left: `${t.xPct * 100}%`,
    top: `${t.yPct * 100}%`,
    width: `${t.wPct * 100}%`,
    transform: `rotate(${t.rotation}deg)`,
    opacity: t.opacity,
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-xl border border-[var(--border)] bg-neutral-200"
      style={{ touchAction: "none" }}
    >
      {/* foto de fondo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dataUrl}
        alt={`Cartel ${cartel.codigo}`}
        className="pointer-events-none absolute inset-0 size-full object-cover"
        draggable={false}
      />

      {mockup.artUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={targetRef}
            src={mockup.artUrl}
            alt="Arte del anunciante"
            draggable={false}
            onLoad={() => {
              moveableRef.current?.updateRect();
              rerender();
            }}
            className="absolute origin-center cursor-move"
            style={{
              ...artStyle,
              boxShadow: "0 2px 14px rgba(0,0,0,0.28)",
            }}
          />
          <Moveable
            ref={moveableRef}
            target={targetRef}
            container={containerRef.current}
            draggable
            resizable
            rotatable
            keepRatio
            throttleDrag={0}
            throttleResize={0}
            throttleRotate={0}
            origin={false}
            renderDirections={["nw", "ne", "sw", "se"]}
            onDrag={handleDrag}
            onResize={handleResize}
            onRotate={handleRotate}
          />
        </>
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <div className="rounded-xl bg-ink-950/55 px-4 py-2.5 text-sm font-medium text-white backdrop-blur">
            Subí el arte o usá el de la marca para empezar
          </div>
        </div>
      )}
    </div>
  );
}

/** Helpers de transform para botones de ajuste rápido. */
export function faceTransform(cartel: Cartel): MockupTransform {
  const { face } = sceneFor(cartel.codigo, cartel.tipo, cartel.iluminado);
  return {
    xPct: face.x / SCENE_W,
    yPct: face.y / SCENE_H,
    wPct: face.w / SCENE_W,
    rotation: 0,
    opacity: 1,
  };
}

/** Centra el arte conservando ancho/rotación/opacidad. Asume ratio del arte 1000x520. */
export function centerTransform(t: MockupTransform): MockupTransform {
  // el alto en pct lo estimamos a partir del ancho y el ratio del arte (520/1000)
  // sobre el contenedor 16/10: artH_pct = wPct * (1000/16) ... aproximamos visualmente.
  const xPct = (1 - t.wPct) / 2;
  return { ...t, xPct, yPct: Math.max(0, t.yPct) };
}

/** Clase utilitaria para mostrar el check de "tiene arte". */
export const hasArtRing = (active: boolean) =>
  cn(active ? "ring-2 ring-brand-500" : "ring-1 ring-[var(--border)]");
