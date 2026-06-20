"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Builder } from "@/components/proposals/Builder";

export default function EditarPropuestaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <div className="animate-fade-in">
      <Link
        href={`/propuestas/${id}`}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted)] transition hover:text-ink-800"
      >
        <ArrowLeft className="size-4" /> Volver a la propuesta
      </Link>
      <PageHeader
        title="Editar propuesta"
        subtitle="Ajustá carteles, mockups y precios. Tus cambios se guardan al finalizar."
      />
      <Builder propuestaId={id} />
    </div>
  );
}
