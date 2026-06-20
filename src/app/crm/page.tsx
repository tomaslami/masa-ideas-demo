"use client";

import { useMemo, useState } from "react";
import { Loader2, UserPlus } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button";
import { useStore, useHydrated } from "@/lib/store";
import { PipelineKpis } from "@/components/crm/PipelineKpis";
import { CobranzaBanner } from "@/components/crm/CobranzaBanner";
import { PipelineBoard } from "@/components/crm/PipelineBoard";
import { ClienteDrawer } from "@/components/crm/ClienteDrawer";
import { NuevoClienteModal } from "@/components/crm/NuevoClienteModal";

export default function CrmPage() {
  const hydrated = useHydrated();
  const clientes = useStore((s) => s.clientes);
  const propuestas = useStore((s) => s.propuestas);
  const contratos = useStore((s) => s.contratos);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const selected = useMemo(
    () => clientes.find((c) => c.id === selectedId) ?? null,
    [clientes, selectedId],
  );

  function abrirCliente(id: string) {
    setSelectedId(id);
    setDrawerOpen(true);
  }

  if (!hydrated) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-[var(--muted)]">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Pipeline comercial"
        subtitle="El estado de cada oportunidad, en un solo lugar."
      >
        <Button onClick={() => setModalOpen(true)}>
          <UserPlus className="size-4" />
          Nuevo cliente
        </Button>
      </PageHeader>

      <div className="space-y-4">
        <PipelineKpis clientes={clientes} contratos={contratos} />

        <CobranzaBanner
          clientes={clientes}
          contratos={contratos}
          onAbrirCliente={abrirCliente}
        />

        <PipelineBoard
          clientes={clientes}
          propuestas={propuestas}
          contratos={contratos}
          onAbrirCliente={abrirCliente}
        />
      </div>

      <ClienteDrawer
        cliente={selected}
        propuestas={propuestas}
        contratos={contratos}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <NuevoClienteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={abrirCliente}
      />
    </div>
  );
}
