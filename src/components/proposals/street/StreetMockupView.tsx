"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getImageThumb } from "@/lib/mapillary";
import { quadToMatrix3d } from "@/lib/perspective";
import { CartelPhoto, MockupLayer } from "@/components/cartel/CartelPhoto";
import type { Cartel, Mockup, Quad } from "@/lib/types";

/**
 * Render read-only del cartel sobre la foto real de la calle (Mapillary),
 * con el arte del anunciante deformado en perspectiva sobre la cara.
 * Si no hay vista de calle / token / red, cae a la escena sintética.
 */
export function StreetMockupView({
  cartel,
  mockup,
  quad,
  className,
  onReady,
}: {
  cartel: Cartel;
  mockup?: Mockup;
  /** override del quad (si no, usa mockup.streetQuad ?? vistaCalle.placement2D) */
  quad?: Quad;
  className?: string;
  onReady?: (ok: boolean) => void;
}) {
  const vista = cartel.vistaCalle;
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  // resultado de resolución del thumb, seteado desde el callback async
  const [res, setRes] = useState<{ id: string; thumb: string | null } | null>(
    null,
  );
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // medir contenedor para el matrix3d (necesita px reales)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // resolver thumb (el reset visual sale del cambio de id, no de setState sync)
  useEffect(() => {
    if (!vista) return;
    let alive = true;
    getImageThumb(vista.mapillaryImageId).then((url) => {
      if (!alive) return;
      setRes({ id: vista.mapillaryImageId, thumb: url });
      onReady?.(!!url);
    });
    return () => {
      alive = false;
    };
  }, [vista, onReady]);

  // ¿el resultado corresponde al frame actual?
  const resolved =
    !!vista && !!res && res.id === vista.mapillaryImageId ? res : null;
  const thumb = resolved?.thumb ?? null;
  const failed = (resolved && !resolved.thumb) || imgError;

  // fallback: escena sintética
  if (!vista || failed) {
    return (
      <CartelPhoto cartel={cartel} className={className}>
        {mockup && <MockupLayer mockup={mockup} />}
      </CartelPhoto>
    );
  }

  const effQuad = quad ?? mockup?.streetQuad ?? vista.placement2D;
  const nocturno = mockup?.nocturno ?? false;
  const matrix =
    size.w > 0 ? quadToMatrix3d(effQuad, size.w, size.h) : undefined;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden bg-neutral-800", className)}
    >
      {/* foto real de la calle */}
      {thumb && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumb}
          alt={`Calle de ${cartel.direccion}`}
          crossOrigin="anonymous"
          draggable={false}
          onLoad={() => {
            setThumbLoaded(true);
            onReady?.(true);
          }}
          onError={() => {
            setImgError(true);
            onReady?.(false);
          }}
          className={cn(
            "pointer-events-none absolute inset-0 size-full object-cover transition-opacity duration-300",
            thumbLoaded ? "opacity-100" : "opacity-0",
            nocturno && "brightness-[0.5] saturate-[0.8] contrast-[1.05]",
          )}
        />
      )}

      {/* tinte nocturno */}
      {nocturno && thumbLoaded && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-transparent to-indigo-950/40 mix-blend-multiply" />
      )}

      {/* banner en perspectiva */}
      {matrix && mockup?.artUrl && (
        <div
          className="pointer-events-none absolute left-0 top-0"
          style={{
            width: size.w,
            height: size.h,
            transform: matrix,
            transformOrigin: "0 0",
          }}
        >
          {/* glow nocturno detrás del arte */}
          {nocturno && (
            <div className="absolute inset-0 bg-amber-100/30 blur-[2px]" />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mockup.artUrl}
            alt="Arte del anunciante"
            crossOrigin="anonymous"
            draggable={false}
            className="absolute inset-0 size-full"
            style={{
              objectFit: "fill",
              boxShadow: "0 6px 24px rgba(0,0,0,0.45)",
              filter: nocturno
                ? "brightness(1.06) saturate(1.1)"
                : "brightness(0.98) contrast(1.02)",
            }}
          />
          {/* sombra de borde para integrar a la estructura */}
          <div className="absolute inset-0 ring-1 ring-black/30" />
        </div>
      )}

      {/* skeleton mientras carga */}
      {!thumbLoaded && !failed && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-700 to-neutral-800" />
      )}
    </div>
  );
}
