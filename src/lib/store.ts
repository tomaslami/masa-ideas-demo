"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Actividad,
  Cartel,
  CartelEstado,
  Cliente,
  Contrato,
  PipelineEstado,
  Propuesta,
} from "./types";
import { cartelesSeed } from "./seed/carteles";
import { clientesSeed } from "./seed/clientes";
import { contratosSeed } from "./seed/contratos";
import { propuestasSeed } from "./seed/propuestas";
import { shortId } from "./utils";

// Fecha de referencia del demo (datos congelados al 20/06/2026).
export const DEMO_NOW = new Date("2026-06-20T12:00:00");

interface State {
  carteles: Cartel[];
  clientes: Cliente[];
  contratos: Contrato[];
  propuestas: Propuesta[];
  _hydrated: boolean;

  // carteles
  updateCartel: (id: string, patch: Partial<Cartel>) => void;
  setCartelEstado: (id: string, estado: CartelEstado) => void;

  // clientes
  addCliente: (c: Omit<Cliente, "id" | "creadoEl" | "actividades">) => string;
  updateCliente: (id: string, patch: Partial<Cliente>) => void;
  moveCliente: (id: string, estado: PipelineEstado) => void;
  addActividad: (clienteId: string, a: Omit<Actividad, "id">) => void;

  // propuestas
  addPropuesta: (p: Omit<Propuesta, "id">) => string;
  updatePropuesta: (id: string, patch: Partial<Propuesta>) => void;
  deletePropuesta: (id: string) => void;

  // contratos
  marcarPagoPagado: (contratoId: string, pagoId: string) => void;

  resetDemo: () => void;
}

const seedState = () => ({
  carteles: structuredClone(cartelesSeed),
  clientes: structuredClone(clientesSeed),
  contratos: structuredClone(contratosSeed),
  propuestas: structuredClone(propuestasSeed),
});

export const useStore = create<State>()(
  persist(
    (set) => ({
      ...seedState(),
      _hydrated: false,

      updateCartel: (id, patch) =>
        set((s) => ({
          carteles: s.carteles.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        })),
      setCartelEstado: (id, estado) =>
        set((s) => ({
          carteles: s.carteles.map((c) => (c.id === id ? { ...c, estado } : c)),
        })),

      addCliente: (c) => {
        const id = shortId("cli");
        set((s) => ({
          clientes: [
            {
              ...c,
              id,
              creadoEl: DEMO_NOW.toISOString(),
              actividades: [
                {
                  id: shortId("act"),
                  tipo: "nota",
                  fecha: DEMO_NOW.toISOString(),
                  texto: "Cliente creado en el sistema.",
                },
              ],
            },
            ...s.clientes,
          ],
        }));
        return id;
      },
      updateCliente: (id, patch) =>
        set((s) => ({
          clientes: s.clientes.map((c) => (c.id === id ? { ...c, ...patch } : c)),
        })),
      moveCliente: (id, estado) =>
        set((s) => ({
          clientes: s.clientes.map((c) => (c.id === id ? { ...c, estado } : c)),
        })),
      addActividad: (clienteId, a) =>
        set((s) => ({
          clientes: s.clientes.map((c) =>
            c.id === clienteId
              ? { ...c, actividades: [{ ...a, id: shortId("act") }, ...c.actividades] }
              : c,
          ),
        })),

      addPropuesta: (p) => {
        const id = shortId("prop");
        set((s) => ({ propuestas: [{ ...p, id }, ...s.propuestas] }));
        return id;
      },
      updatePropuesta: (id, patch) =>
        set((s) => ({
          propuestas: s.propuestas.map((p) => (p.id === id ? { ...p, ...patch } : p)),
        })),
      deletePropuesta: (id) =>
        set((s) => ({ propuestas: s.propuestas.filter((p) => p.id !== id) })),

      marcarPagoPagado: (contratoId, pagoId) =>
        set((s) => ({
          contratos: s.contratos.map((ct) =>
            ct.id === contratoId
              ? {
                  ...ct,
                  pagos: ct.pagos.map((pg) =>
                    pg.id === pagoId ? { ...pg, estado: "pagado" } : pg,
                  ),
                }
              : ct,
          ),
        })),

      resetDemo: () => set({ ...seedState() }),
    }),
    {
      name: "masa-ideas-demo-v1",
      version: 1,
      partialize: (s) => ({
        carteles: s.carteles,
        clientes: s.clientes,
        contratos: s.contratos,
        propuestas: s.propuestas,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state._hydrated = true;
      },
    },
  ),
);

// Evita mismatch de hidratación: true una vez que el store leyó localStorage.
export function useHydrated(): boolean {
  return useStore((s) => s._hydrated);
}
