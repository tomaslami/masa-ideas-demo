"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Field, Input, Select } from "@/components/ui/Field";
import { useToast } from "@/components/ui/toast";
import { useStore } from "@/lib/store";
import { PIPELINE_COLUMNS, type Cliente, type PipelineEstado } from "@/lib/types";

// Paleta de marca + acompañantes para avatares.
const PALETA = [
  "#E95D0F",
  "#F59E0B",
  "#0EA5E9",
  "#10B981",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#6366F1",
];

const PRIORIDADES: Cliente["prioridad"][] = ["alta", "media", "baja"];

interface FormState {
  razonSocial: string;
  rubro: string;
  contactoNombre: string;
  contactoCargo: string;
  email: string;
  telefono: string;
  estado: PipelineEstado;
  prioridad: Cliente["prioridad"];
  valorEstimado: string;
  fuente: string;
}

const INICIAL: FormState = {
  razonSocial: "",
  rubro: "",
  contactoNombre: "",
  contactoCargo: "",
  email: "",
  telefono: "",
  estado: "prospecto",
  prioridad: "media",
  valorEstimado: "",
  fuente: "Inbound web",
};

export function NuevoClienteModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated?: (id: string) => void;
}) {
  const addCliente = useStore((s) => s.addCliente);
  const push = useToast((s) => s.push);

  const [form, setForm] = useState<FormState>(INICIAL);
  const [touched, setTouched] = useState(false);

  const razonSocialError = touched && !form.razonSocial.trim();

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function cerrar() {
    setForm(INICIAL);
    setTouched(false);
    onClose();
  }

  function guardar() {
    setTouched(true);
    if (!form.razonSocial.trim()) return;

    const color = PALETA[Math.floor(Math.random() * PALETA.length)];
    const id = addCliente({
      razonSocial: form.razonSocial.trim(),
      rubro: form.rubro.trim() || "Sin rubro",
      contactoNombre: form.contactoNombre.trim(),
      contactoCargo: form.contactoCargo.trim(),
      email: form.email.trim(),
      telefono: form.telefono.trim(),
      estado: form.estado,
      valorEstimado: Number(form.valorEstimado) || 0,
      fuente: form.fuente.trim() || "Inbound web",
      prioridad: form.prioridad,
      color,
    });

    push(`${form.razonSocial.trim()} agregado al pipeline`, "success");
    setForm(INICIAL);
    setTouched(false);
    onClose();
    onCreated?.(id);
  }

  return (
    <Modal open={open} onClose={cerrar} title="Nuevo cliente" className="max-w-2xl">
      <div className="max-h-[70vh] space-y-4 overflow-y-auto px-6 py-5">
        <Field label="Razón social" hint={razonSocialError ? undefined : "Cómo figura la empresa"}>
          <Input
            value={form.razonSocial}
            onChange={(e) => set("razonSocial", e.target.value)}
            placeholder="Ej: Bodega del Fin del Mundo"
            autoFocus
            className={razonSocialError ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}
          />
          {razonSocialError && (
            <span className="mt-1 block text-xs font-medium text-red-500">
              La razón social es obligatoria.
            </span>
          )}
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Rubro">
            <Input
              value={form.rubro}
              onChange={(e) => set("rubro", e.target.value)}
              placeholder="Ej: Bebidas / Retail"
            />
          </Field>
          <Field label="Fuente">
            <Input
              value={form.fuente}
              onChange={(e) => set("fuente", e.target.value)}
              placeholder="Ej: Referido, Inbound web"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Nombre de contacto">
            <Input
              value={form.contactoNombre}
              onChange={(e) => set("contactoNombre", e.target.value)}
              placeholder="Ej: Lucía Fernández"
            />
          </Field>
          <Field label="Cargo">
            <Input
              value={form.contactoCargo}
              onChange={(e) => set("contactoCargo", e.target.value)}
              placeholder="Ej: Gerenta de Marketing"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Email">
            <Input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="contacto@empresa.com"
            />
          </Field>
          <Field label="Teléfono">
            <Input
              value={form.telefono}
              onChange={(e) => set("telefono", e.target.value)}
              placeholder="+54 11 5555-5555"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Etapa">
            <Select
              value={form.estado}
              onChange={(e) => set("estado", e.target.value as PipelineEstado)}
            >
              {PIPELINE_COLUMNS.map((col) => (
                <option key={col.estado} value={col.estado}>
                  {col.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Prioridad">
            <Select
              value={form.prioridad}
              onChange={(e) =>
                set("prioridad", e.target.value as Cliente["prioridad"])
              }
            >
              {PRIORIDADES.map((p) => (
                <option key={p} value={p} className="capitalize">
                  {p[0].toUpperCase() + p.slice(1)}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Valor estimado (ARS)">
            <Input
              type="number"
              inputMode="numeric"
              min={0}
              value={form.valorEstimado}
              onChange={(e) => set("valorEstimado", e.target.value)}
              placeholder="0"
            />
          </Field>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-[var(--border)] px-6 py-4">
        <Button variant="ghost" onClick={cerrar}>
          Cancelar
        </Button>
        <Button onClick={guardar}>Guardar cliente</Button>
      </div>
    </Modal>
  );
}
