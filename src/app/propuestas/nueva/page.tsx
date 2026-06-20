"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Builder } from "@/components/proposals/Builder";

export default function NuevaPropuestaPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Nueva propuesta"
        subtitle="Elegí carteles, posicioná el arte y exportá un PDF de agencia."
      />
      <Builder />
    </div>
  );
}
