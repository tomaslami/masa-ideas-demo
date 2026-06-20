"use client";

import { cn } from "@/lib/utils";
import { sceneFor } from "@/lib/billboard";
import type { Cartel, Mockup } from "@/lib/types";

/** Foto (escena SVG) del cartel. Acepta overlay como children. */
export function CartelPhoto({
  cartel,
  className,
  children,
}: {
  cartel: Pick<Cartel, "codigo" | "tipo" | "iluminado">;
  className?: string;
  children?: React.ReactNode;
}) {
  const { dataUrl } = sceneFor(cartel.codigo, cartel.tipo, cartel.iluminado);
  return (
    <div className={cn("relative overflow-hidden bg-neutral-200", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dataUrl}
        alt={`Cartel ${cartel.codigo}`}
        className="absolute inset-0 size-full object-cover"
        draggable={false}
      />
      {children}
    </div>
  );
}

/** Capa del arte del anunciante posicionada sobre la foto (read-only). */
export function MockupLayer({ mockup }: { mockup: Mockup }) {
  if (!mockup.artUrl) return null;
  const t = mockup.transform;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={mockup.artUrl}
      alt="Arte del anunciante"
      draggable={false}
      className="absolute origin-center"
      style={{
        left: `${t.xPct * 100}%`,
        top: `${t.yPct * 100}%`,
        width: `${t.wPct * 100}%`,
        transform: `rotate(${t.rotation}deg)`,
        opacity: t.opacity,
        boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
      }}
    />
  );
}

/** Vista read-only de la foto con el arte aplicado (para detalle de propuesta). */
export function MockupView({
  cartel,
  mockup,
  className,
}: {
  cartel: Pick<Cartel, "codigo" | "tipo" | "iluminado">;
  mockup?: Mockup;
  className?: string;
}) {
  return (
    <CartelPhoto cartel={cartel} className={className}>
      {mockup && <MockupLayer mockup={mockup} />}
    </CartelPhoto>
  );
}
