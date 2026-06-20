"use client";

import { forwardRef } from "react";
import { MockupView } from "@/components/cartel/CartelPhoto";
import type { Cartel, Mockup } from "@/lib/types";

/**
 * Nodo de captura para html-to-image. Tamaño fijo 1000×625 (ratio 16/10),
 * pensado para renderizarse oculto (fixed, left:-10000px) y exportarlo a JPEG.
 */
export const MockupCaptureNode = forwardRef<
  HTMLDivElement,
  { cartel: Cartel; mockup?: Mockup }
>(({ cartel, mockup }, ref) => {
  return (
    <div
      ref={ref}
      style={{ width: 1000, height: 625 }}
      className="overflow-hidden bg-neutral-200"
    >
      <MockupView cartel={cartel} mockup={mockup} className="size-full" />
    </div>
  );
});
MockupCaptureNode.displayName = "MockupCaptureNode";
