"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore, useHydrated, DEMO_NOW } from "@/lib/store";
import { byId } from "@/lib/selectors";
import { calcTotales, itemTotal } from "@/lib/calc";
import {
  formatARS,
  formatNumber,
  cn,
  addMonthsISO,
  formatDate,
} from "@/lib/utils";
import { generateAdArt } from "@/lib/art";
import { marcaArte } from "@/lib/seed/clientes";
import type {
  Cartel,
  Mockup,
  MockupTransform,
  Propuesta,
  PropuestaEstado,
  PropuestaItem,
  Quad,
} from "@/lib/types";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Field, Input, Textarea, Select } from "@/components/ui/Field";
import { CartelEstadoBadge } from "@/components/ui/StatusBadge";
import { CartelPhoto } from "@/components/cartel/CartelPhoto";
import { useToast } from "@/components/ui/toast";
import {
  MockupEditor,
  faceTransform,
  centerTransform,
} from "@/components/proposals/MockupEditor";
import { StreetMockupView } from "@/components/proposals/street/StreetMockupView";
import { StreetMockupEditor } from "@/components/proposals/street/StreetMockupEditor";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Search,
  Upload,
  Sparkles,
  Crosshair,
  AlignCenter,
  Trash2,
  Image as ImageIcon,
  Loader2,
  MapPin,
} from "lucide-react";

// ============================================================
// Tipos de estado local de construcción
// ============================================================
interface BuilderState {
  clienteId: string; // "" = sin cliente
  nombreCampaña: string;
  vigenciaDesde: string; // ISO
  meses: number;
  validezDias: number;
  notaComercial: string;
  estado: PropuestaEstado;
  items: PropuestaItem[];
  mockups: Mockup[];
}

const STEPS = [
  { n: 1, label: "Datos" },
  { n: 2, label: "Carteles" },
  { n: 3, label: "Mockups" },
  { n: 4, label: "Revisión" },
] as const;

/** Primer día del próximo mes (ISO) a partir de DEMO_NOW. */
function primerDiaProximoMes(): string {
  const d = new Date(DEMO_NOW);
  d.setDate(1);
  const iso = addMonthsISO(d.toISOString(), 1);
  const r = new Date(iso);
  r.setHours(0, 0, 0, 0);
  r.setDate(1);
  return r.toISOString();
}

function isoToInputDate(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10);
}
function inputDateToIso(v: string): string {
  return new Date(v + "T00:00:00").toISOString();
}

export function Builder({ propuestaId }: { propuestaId?: string }) {
  const hydrated = useHydrated();
  const router = useRouter();
  const toast = useToast((s) => s.push);

  const clientes = useStore((s) => s.clientes);
  const carteles = useStore((s) => s.carteles);
  const propuestas = useStore((s) => s.propuestas);
  const addPropuesta = useStore((s) => s.addPropuesta);
  const updatePropuesta = useStore((s) => s.updatePropuesta);
  const updateCartel = useStore((s) => s.updateCartel);

  const cartelMap = useMemo(() => byId(carteles), [carteles]);
  const clienteMap = useMemo(() => byId(clientes), [clientes]);

  const editing = propuestaId
    ? propuestas.find((p) => p.id === propuestaId)
    : undefined;

  const [step, setStep] = useState(1);
  const [state, setState] = useState<BuilderState>(() => ({
    clienteId: "",
    nombreCampaña: "",
    vigenciaDesde: primerDiaProximoMes(),
    meses: 3,
    validezDias: 15,
    notaComercial: "",
    estado: "borrador",
    items: [],
    mockups: [],
  }));
  const [loadedFrom, setLoadedFrom] = useState<string | null>(null);

  // cargar propuesta existente (modo edición)
  useEffect(() => {
    if (!editing || loadedFrom === editing.id) return;
    setState({
      clienteId: editing.clienteId,
      nombreCampaña: editing.nombreCampaña,
      vigenciaDesde: editing.vigenciaDesde,
      meses: editing.items[0]?.meses ?? 3,
      validezDias: editing.validezDias,
      notaComercial: editing.notaComercial ?? "",
      estado: editing.estado,
      items: editing.items.map((i) => ({ ...i })),
      mockups: editing.mockups.map((m) => ({
        ...m,
        transform: { ...m.transform },
      })),
    });
    setLoadedFrom(editing.id);
  }, [editing, loadedFrom]);

  const patch = (p: Partial<BuilderState>) =>
    setState((s) => ({ ...s, ...p }));

  const cliente = state.clienteId ? clienteMap.get(state.clienteId) : undefined;
  const selectedIds = state.items.map((i) => i.cartelId);
  const totales = calcTotales(state.items);

  // ----- navegación / validaciones -----
  const canStep2 = state.nombreCampaña.trim().length > 0;
  const canStep3 = state.items.length > 0;
  const canStep4 = state.items.length > 0;

  function goTo(n: number) {
    if (n === 2 && !canStep2) {
      toast("Poné un nombre de campaña primero", "info");
      return;
    }
    if (n >= 3 && !canStep3) {
      toast("Elegí al menos un cartel", "info");
      return;
    }
    setStep(n);
  }

  // ----- paso 2: toggle cartel -----
  function toggleCartel(c: Cartel) {
    setState((s) => {
      const exists = s.items.some((i) => i.cartelId === c.id);
      if (exists) {
        return {
          ...s,
          items: s.items.filter((i) => i.cartelId !== c.id),
          mockups: s.mockups.filter((m) => m.cartelId !== c.id),
        };
      }
      const item: PropuestaItem = {
        cartelId: c.id,
        precioMensual: c.precioMensual,
        meses: s.meses,
        descuentoPct: 0,
      };
      const mockup: Mockup = {
        cartelId: c.id,
        artUrl: null,
        transform: faceTransform(c),
      };
      return { ...s, items: [...s.items, item], mockups: [...s.mockups, mockup] };
    });
  }

  // ----- guardar -----
  function buildPropuesta(): Omit<Propuesta, "id"> {
    return {
      codigo: editing?.codigo ?? generarCodigo(propuestas),
      clienteId: state.clienteId,
      nombreCampaña: state.nombreCampaña.trim() || "Campaña sin nombre",
      items: state.items,
      mockups: state.mockups,
      estado: state.estado,
      creadaEl: editing?.creadaEl ?? DEMO_NOW.toISOString(),
      validezDias: state.validezDias,
      vigenciaDesde: state.vigenciaDesde,
      notaComercial: state.notaComercial.trim() || undefined,
    };
  }

  function guardar(verLuego: boolean, estadoOverride?: PropuestaEstado) {
    const data = buildPropuesta();
    if (estadoOverride) data.estado = estadoOverride;
    let id = editing?.id;
    if (editing) {
      updatePropuesta(editing.id, data);
    } else {
      id = addPropuesta(data);
    }
    toast(editing ? "Propuesta actualizada" : "Propuesta creada", "success");
    if (verLuego && id) router.push(`/propuestas/${id}`);
    else router.push("/propuestas");
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
      <Stepper step={step} onStep={goTo} canStep2={canStep2} canStep3={canStep3} />

      <div className="mt-5">
        {step === 1 && (
          <Step1Datos
            state={state}
            clientes={clientes}
            cliente={cliente}
            patch={patch}
          />
        )}
        {step === 2 && (
          <Step2Carteles
            carteles={carteles}
            selectedIds={selectedIds}
            onToggle={toggleCartel}
          />
        )}
        {step === 3 && (
          <Step3Mockups
            state={state}
            setState={setState}
            cartelMap={cartelMap}
            cliente={cliente}
            persistVista={(cartel, quad) => {
              if (!cartel.vistaCalle) return;
              updateCartel(cartel.id, {
                vistaCalle: { ...cartel.vistaCalle, placement2D: quad },
              });
              toast("Encuadre guardado en el cartel", "success");
            }}
          />
        )}
        {step === 4 && (
          <Step4Revision
            state={state}
            cartelMap={cartelMap}
            cliente={cliente}
            patch={patch}
            totales={totales}
            onGuardar={guardar}
            editing={!!editing}
          />
        )}
      </div>

      {/* footer de navegación */}
      <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
        <Button
          variant="ghost"
          onClick={() => (step > 1 ? setStep(step - 1) : router.push("/propuestas"))}
        >
          <ChevronLeft className="size-4" />
          {step > 1 ? "Atrás" : "Cancelar"}
        </Button>

        <div className="flex items-center gap-2.5 text-sm text-[var(--muted)]">
          {state.items.length > 0 && (
            <span className="hidden sm:inline">
              {state.items.length}{" "}
              {state.items.length === 1 ? "cartel" : "carteles"} ·{" "}
              {formatARS(totales.total)}
            </span>
          )}
        </div>

        {step < 4 ? (
          <Button onClick={() => goTo(step + 1)}>
            Continuar
            <ChevronRight className="size-4" />
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              disabled={!canStep4}
              onClick={() => guardar(false, "borrador")}
            >
              Guardar borrador
            </Button>
            <Button disabled={!canStep4} onClick={() => guardar(true)}>
              Guardar y ver propuesta
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Stepper
// ============================================================
function Stepper({
  step,
  onStep,
  canStep2,
  canStep3,
}: {
  step: number;
  onStep: (n: number) => void;
  canStep2: boolean;
  canStep3: boolean;
}) {
  return (
    <div className="flex items-center">
      {STEPS.map((s, i) => {
        const active = step === s.n;
        const done = step > s.n;
        const reachable =
          s.n === 1 ||
          (s.n === 2 && canStep2) ||
          (s.n >= 3 && canStep2 && canStep3);
        return (
          <div key={s.n} className="flex flex-1 items-center last:flex-none">
            <button
              type="button"
              onClick={() => reachable && onStep(s.n)}
              disabled={!reachable}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-2 py-1.5 text-left transition",
                reachable ? "cursor-pointer hover:bg-neutral-50" : "cursor-not-allowed",
              )}
            >
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full text-[13px] font-semibold transition",
                  active && "bg-brand-500 text-white shadow-sm",
                  done && "bg-brand-100 text-brand-700",
                  !active && !done && "bg-neutral-100 text-neutral-500",
                )}
              >
                {done ? <Check className="size-4" /> : s.n}
              </span>
              <span
                className={cn(
                  "hidden text-sm font-medium sm:block",
                  active ? "text-ink-900" : "text-[var(--muted)]",
                )}
              >
                {s.label}
              </span>
            </button>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-px flex-1 transition",
                  step > s.n ? "bg-brand-300" : "bg-[var(--border)]",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// PASO 1 — Datos
// ============================================================
function Step1Datos({
  state,
  clientes,
  cliente,
  patch,
}: {
  state: BuilderState;
  clientes: import("@/lib/types").Cliente[];
  cliente?: import("@/lib/types").Cliente;
  patch: (p: Partial<BuilderState>) => void;
}) {
  return (
    <Card className="p-6 animate-scale-in">
      <h2 className="text-lg font-semibold text-ink-900">Datos de la campaña</h2>
      <p className="mt-0.5 text-sm text-[var(--muted)]">
        Definí el anunciante, el nombre de la campaña y las condiciones generales.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <Field label="Cliente / Anunciante">
            <Select
              value={state.clienteId}
              onChange={(e) => patch({ clienteId: e.target.value })}
            >
              <option value="">Sin cliente asignado</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.razonSocial}
                </option>
              ))}
            </Select>
          </Field>
          {cliente && (
            <div className="mt-2.5 flex items-center gap-2.5 rounded-xl bg-neutral-50 p-2.5">
              <Avatar name={cliente.razonSocial} color={cliente.color} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink-800">
                  {cliente.razonSocial}
                </p>
                <p className="truncate text-xs text-[var(--muted)]">
                  {cliente.rubro} · {cliente.contactoNombre}
                </p>
              </div>
            </div>
          )}
          {!state.clienteId && (
            <p className="mt-2 text-xs text-[var(--muted)]">
              Podés cargar igual sin cliente y asignarlo después.
            </p>
          )}
        </div>

        <Field label="Nombre de la campaña" hint="Aparece como título del entregable.">
          <Input
            value={state.nombreCampaña}
            onChange={(e) => patch({ nombreCampaña: e.target.value })}
            placeholder="Ej. Lanzamiento Invierno '26"
          />
        </Field>

        <Field label="Inicio de campaña">
          <Input
            type="date"
            value={isoToInputDate(state.vigenciaDesde)}
            onChange={(e) =>
              patch({ vigenciaDesde: inputDateToIso(e.target.value) })
            }
          />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Meses" hint="Se aplica a cada cartel (editable luego).">
            <Input
              type="number"
              min={1}
              value={state.meses}
              onChange={(e) =>
                patch({ meses: Math.max(1, Number(e.target.value) || 1) })
              }
            />
          </Field>
          <Field label="Validez (días)">
            <Input
              type="number"
              min={1}
              value={state.validezDias}
              onChange={(e) =>
                patch({ validezDias: Math.max(1, Number(e.target.value) || 1) })
              }
            />
          </Field>
        </div>

        <Field label="Nota comercial (opcional)" className="sm:col-span-2">
          <Textarea
            value={state.notaComercial}
            onChange={(e) => patch({ notaComercial: e.target.value })}
            placeholder="Condiciones, foco de la campaña, observaciones para el anunciante…"
          />
        </Field>
      </div>
    </Card>
  );
}

// ============================================================
// PASO 2 — Carteles
// ============================================================
function Step2Carteles({
  carteles,
  selectedIds,
  onToggle,
}: {
  carteles: Cartel[];
  selectedIds: string[];
  onToggle: (c: Cartel) => void;
}) {
  const [q, setQ] = useState("");
  const [zona, setZona] = useState("todas");
  const [tipo, setTipo] = useState("todos");
  const [estado, setEstado] = useState("todos");
  const [soloDisp, setSoloDisp] = useState(false);

  const zonas = useMemo(
    () => [...new Set(carteles.map((c) => c.zona))].sort((a, b) => a.localeCompare(b, "es")),
    [carteles],
  );
  const tipos = useMemo(
    () => [...new Set(carteles.map((c) => c.tipo))].sort(),
    [carteles],
  );

  const filtrados = useMemo(() => {
    const query = q.trim().toLowerCase();
    return carteles.filter((c) => {
      if (zona !== "todas" && c.zona !== zona) return false;
      if (tipo !== "todos" && c.tipo !== tipo) return false;
      if (estado !== "todos" && c.estado !== estado) return false;
      if (soloDisp && c.estado !== "libre") return false;
      if (query) {
        const hay =
          c.codigo.toLowerCase().includes(query) ||
          c.direccion.toLowerCase().includes(query) ||
          c.zona.toLowerCase().includes(query);
        if (!hay) return false;
      }
      return true;
    });
  }, [carteles, q, zona, tipo, estado, soloDisp]);

  const seleccionados = carteles.filter((c) => selectedIds.includes(c.id));
  const totalMensual = seleccionados.reduce((s, c) => s + c.precioMensual, 0);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div>
        {/* filtros */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="relative min-w-[200px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar cartel…"
              className="pl-9"
            />
          </div>
          <Select value={zona} onChange={(e) => setZona(e.target.value)} className="sm:w-40">
            <option value="todas">Zona</option>
            {zonas.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </Select>
          <Select value={tipo} onChange={(e) => setTipo(e.target.value)} className="sm:w-40">
            <option value="todos">Tipo</option>
            {tipos.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
          <Select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="sm:w-40"
          >
            <option value="todos">Estado</option>
            <option value="libre">Libre</option>
            <option value="ocupado">Ocupado</option>
            <option value="reservado">Reservado</option>
            <option value="mantenimiento">Mantenimiento</option>
          </Select>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-white px-3 py-2 text-[13px] font-medium text-ink-700">
            <input
              type="checkbox"
              checked={soloDisp}
              onChange={(e) => setSoloDisp(e.target.checked)}
              className="size-4 accent-brand-500"
            />
            Solo disponibles
          </label>
        </div>

        {/* grilla */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {filtrados.map((c) => {
            const sel = selectedIds.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onToggle(c)}
                className={cn(
                  "group relative overflow-hidden rounded-xl border bg-white text-left transition-all",
                  sel
                    ? "border-brand-500 ring-2 ring-brand-200"
                    : "border-[var(--border)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]",
                )}
              >
                <div className="relative aspect-[16/10] bg-neutral-100">
                  <CartelPhoto cartel={c} className="size-full" />
                  {sel && (
                    <span className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-brand-500 text-white shadow animate-scale-in">
                      <Check className="size-3.5" />
                    </span>
                  )}
                </div>
                <div className="p-2.5">
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[11px] font-medium text-ink-700">
                      {c.codigo}
                    </span>
                    <CartelEstadoBadge estado={c.estado} />
                  </div>
                  <p className="mt-1 line-clamp-1 text-[12px] text-[var(--muted)]">
                    {c.zona} · {c.tipo}
                  </p>
                  <p className="mt-1 text-[13px] font-semibold text-ink-900">
                    {formatARS(c.precioMensual)}
                    <span className="text-[11px] font-normal text-neutral-400">
                      /mes
                    </span>
                  </p>
                </div>
              </button>
            );
          })}
          {filtrados.length === 0 && (
            <div className="col-span-full grid place-items-center rounded-xl border border-dashed border-[var(--border)] py-12 text-sm text-[var(--muted)]">
              No hay carteles con esos filtros.
            </div>
          )}
        </div>
      </div>

      {/* panel seleccionados */}
      <div className="lg:sticky lg:top-4 lg:self-start">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink-900">Seleccionados</h3>
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
              {seleccionados.length}
            </span>
          </div>
          {seleccionados.length === 0 ? (
            <p className="mt-3 text-[13px] text-[var(--muted)]">
              Tocá los carteles para sumarlos a la propuesta.
            </p>
          ) : (
            <>
              <div className="mt-3 max-h-[46vh] space-y-2 overflow-y-auto pr-1">
                {seleccionados.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-2.5 rounded-lg border border-[var(--border)] p-2"
                  >
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-md">
                      <CartelPhoto cartel={c} className="size-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-mono text-[11px] font-medium text-ink-700">
                        {c.codigo}
                      </p>
                      <p className="truncate text-[12px] text-[var(--muted)]">
                        {formatARS(c.precioMensual)}/mes
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onToggle(c)}
                      className="grid size-7 place-items-center rounded-md text-neutral-400 hover:bg-red-50 hover:text-red-500"
                      aria-label="Quitar"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[var(--border)] pt-3">
                <span className="text-[13px] text-[var(--muted)]">Total mensual</span>
                <span className="text-sm font-bold text-ink-900">
                  {formatARS(totalMensual)}
                </span>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

// ============================================================
// PASO 3 — Mockups
// ============================================================
function Step3Mockups({
  state,
  setState,
  cartelMap,
  cliente,
  persistVista,
}: {
  state: BuilderState;
  setState: React.Dispatch<React.SetStateAction<BuilderState>>;
  cartelMap: Map<string, Cartel>;
  cliente?: import("@/lib/types").Cliente;
  persistVista: (cartel: Cartel, quad: Quad) => void;
}) {
  const [activeId, setActiveId] = useState<string>(
    state.items[0]?.cartelId ?? "",
  );
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!state.items.some((i) => i.cartelId === activeId)) {
      setActiveId(state.items[0]?.cartelId ?? "");
    }
  }, [state.items, activeId]);

  const activeCartel = cartelMap.get(activeId);
  const activeMockup = state.mockups.find((m) => m.cartelId === activeId);
  const activeItem = state.items.find((i) => i.cartelId === activeId);

  function updateMockup(cartelId: string, patch: Partial<Mockup>) {
    setState((s) => ({
      ...s,
      mockups: s.mockups.map((m) =>
        m.cartelId === cartelId ? { ...m, ...patch } : m,
      ),
    }));
  }
  function updateTransform(cartelId: string, transform: MockupTransform) {
    updateMockup(cartelId, { transform });
  }
  function patchTransform(cartelId: string, p: Partial<MockupTransform>) {
    setState((s) => ({
      ...s,
      mockups: s.mockups.map((m) =>
        m.cartelId === cartelId
          ? { ...m, transform: { ...m.transform, ...p } }
          : m,
      ),
    }));
  }
  function updateItem(cartelId: string, p: Partial<PropuestaItem>) {
    setState((s) => ({
      ...s,
      items: s.items.map((i) =>
        i.cartelId === cartelId ? { ...i, ...p } : i,
      ),
    }));
  }

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !activeCartel) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateMockup(activeCartel.id, {
        artUrl: reader.result as string,
        transform: faceTransform(activeCartel),
      });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function usarArteMarca() {
    if (!activeCartel) return;
    const brand = cliente
      ? cliente.razonSocial.split(" ")[0]
      : "Tu Marca";
    const m = cliente ? marcaArte[cliente.id] : undefined;
    const art = generateAdArt({
      brand,
      tagline: m?.tagline,
      bg: m?.bg ?? cliente?.color ?? "#E95D0F",
      fg: m?.fg ?? "#ffffff",
      accent: m?.accent,
    });
    updateMockup(activeCartel.id, {
      artUrl: art,
      transform: faceTransform(activeCartel),
    });
  }

  if (!activeCartel || !activeMockup || !activeItem) {
    return (
      <Card className="grid place-items-center py-16 text-sm text-[var(--muted)]">
        Volvé al paso 2 y elegí carteles para armar los mockups.
      </Card>
    );
  }

  const t = activeMockup.transform;
  const isStreet = !!activeCartel.vistaCalle;

  return (
    <div className="grid gap-4 lg:grid-cols-[230px_minmax(0,1fr)]">
      {/* lista de thumbnails */}
      <div className="lg:sticky lg:top-4 lg:self-start">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--muted)]">
          Carteles ({state.items.length})
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 lg:max-h-[70vh] lg:flex-col lg:overflow-y-auto lg:pr-1">
          {state.items.map((it) => {
            const c = cartelMap.get(it.cartelId)!;
            const mk = state.mockups.find((m) => m.cartelId === it.cartelId);
            const active = it.cartelId === activeId;
            const tieneArte = !!mk?.artUrl;
            return (
              <button
                key={it.cartelId}
                type="button"
                onClick={() => setActiveId(it.cartelId)}
                className={cn(
                  "relative w-36 shrink-0 overflow-hidden rounded-xl border text-left transition lg:w-full",
                  active
                    ? "border-brand-500 ring-2 ring-brand-200"
                    : "border-[var(--border)] hover:border-brand-200",
                )}
              >
                <div className="relative aspect-[16/10] bg-neutral-100">
                  <StreetMockupView cartel={c} mockup={mk} className="size-full" />
                  {c.vistaCalle && (
                    <span className="absolute left-1.5 top-1.5 rounded bg-ink-950/65 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white backdrop-blur">
                      Calle real
                    </span>
                  )}
                  <span
                    className={cn(
                      "absolute right-1.5 top-1.5 grid size-5 place-items-center rounded-full text-white shadow",
                      tieneArte ? "bg-emerald-500" : "bg-neutral-400/90",
                    )}
                  >
                    {tieneArte ? (
                      <Check className="size-3" />
                    ) : (
                      <ImageIcon className="size-3" />
                    )}
                  </span>
                </div>
                <div className="px-2 py-1.5">
                  <p className="truncate font-mono text-[10px] font-medium text-ink-700">
                    {c.codigo}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* editor */}
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          {isStreet ? (
            <StreetMockupEditor
              cartel={activeCartel}
              mockup={activeMockup}
              onChange={(patch) => updateMockup(activeCartel.id, patch)}
              onPersistVista={(quad) => persistVista(activeCartel, quad)}
            />
          ) : (
            <MockupEditor
              cartel={activeCartel}
              mockup={activeMockup}
              onChange={(transform) =>
                updateTransform(activeCartel.id, transform)
              }
            />
          )}

          {/* acciones de arte */}
          <div className="mt-3 flex flex-wrap gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onUpload}
            />
            <Button size="sm" variant="secondary" onClick={() => fileRef.current?.click()}>
              <Upload className="size-4" />
              Subir arte
            </Button>
            <Button size="sm" variant="secondary" onClick={usarArteMarca}>
              <Sparkles className="size-4" />
              Usar arte de la marca
            </Button>
            {activeMockup.artUrl && !isStreet && (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    updateTransform(activeCartel.id, faceTransform(activeCartel))
                  }
                >
                  <Crosshair className="size-4" />
                  Ajustar a la cara
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    updateTransform(activeCartel.id, centerTransform(t))
                  }
                >
                  <AlignCenter className="size-4" />
                  Centrar
                </Button>
              </>
            )}
            {activeMockup.artUrl && (
              <Button
                size="sm"
                variant="ghost"
                className="text-red-600 hover:bg-red-50"
                onClick={() => updateMockup(activeCartel.id, { artUrl: null })}
              >
                <Trash2 className="size-4" />
                Quitar arte
              </Button>
            )}
          </div>
        </div>

        {/* controles */}
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-ink-900">
              {activeCartel.codigo}
            </h3>
            <p className="mt-0.5 text-xs text-[var(--muted)]">
              {activeCartel.direccion}
            </p>
            {isStreet && (
              <p className="mt-2 rounded-lg bg-brand-50 px-2.5 py-1.5 text-[11px] font-medium text-brand-700">
                Vista en calle real · arrastrá las esquinas para calzar el arte
              </p>
            )}

            {activeMockup.artUrl && !isStreet && (
              <div className="mt-4 space-y-3.5">
                <Slider
                  label="Tamaño"
                  value={Math.round(t.wPct * 100)}
                  min={5}
                  max={100}
                  suffix="%"
                  onChange={(v) =>
                    patchTransform(activeCartel.id, { wPct: v / 100 })
                  }
                />
                <Slider
                  label="Opacidad"
                  value={Math.round(t.opacity * 100)}
                  min={10}
                  max={100}
                  suffix="%"
                  onChange={(v) =>
                    patchTransform(activeCartel.id, { opacity: v / 100 })
                  }
                />
                <Slider
                  label="Rotación"
                  value={Math.round(t.rotation)}
                  min={-45}
                  max={45}
                  suffix="°"
                  onChange={(v) =>
                    patchTransform(activeCartel.id, { rotation: v })
                  }
                />
              </div>
            )}
          </Card>

          {/* pricing */}
          <Card className="p-4">
            <h3 className="text-sm font-semibold text-ink-900">Precio</h3>
            <div className="mt-3 space-y-3">
              <Field label="Precio mensual">
                <Input
                  type="number"
                  min={0}
                  value={activeItem.precioMensual}
                  onChange={(e) =>
                    updateItem(activeCartel.id, {
                      precioMensual: Math.max(0, Number(e.target.value) || 0),
                    })
                  }
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Meses">
                  <Input
                    type="number"
                    min={1}
                    value={activeItem.meses}
                    onChange={(e) =>
                      updateItem(activeCartel.id, {
                        meses: Math.max(1, Number(e.target.value) || 1),
                      })
                    }
                  />
                </Field>
                <Field label="Descuento %">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={activeItem.descuentoPct}
                    onChange={(e) =>
                      updateItem(activeCartel.id, {
                        descuentoPct: Math.min(
                          100,
                          Math.max(0, Number(e.target.value) || 0),
                        ),
                      })
                    }
                  />
                </Field>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-neutral-50 px-3 py-2.5">
                <span className="text-[13px] text-[var(--muted)]">
                  Subtotal cartel
                </span>
                <span className="text-base font-bold text-ink-900">
                  {formatARS(itemTotal(activeItem))}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[13px] font-medium text-ink-700">{label}</span>
        <span className="text-xs tabular-nums text-[var(--muted)]">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-500"
      />
    </div>
  );
}

// ============================================================
// PASO 4 — Revisión
// ============================================================
function Step4Revision({
  state,
  cartelMap,
  cliente,
  patch,
  totales,
  onGuardar,
  editing,
}: {
  state: BuilderState;
  cartelMap: Map<string, Cartel>;
  cliente?: import("@/lib/types").Cliente;
  patch: (p: Partial<BuilderState>) => void;
  totales: ReturnType<typeof calcTotales>;
  onGuardar: (verLuego: boolean, estado?: PropuestaEstado) => void;
  editing: boolean;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-4">
        {/* cabecera entregable */}
        <Card className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-600">
            Vista previa del entregable
          </p>
          <h2 className="mt-1 text-xl font-bold text-ink-900">
            {state.nombreCampaña || "Campaña sin nombre"}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-[var(--muted)]">
            {cliente && (
              <span className="flex items-center gap-1.5">
                <Avatar
                  name={cliente.razonSocial}
                  color={cliente.color}
                  size="xs"
                />
                {cliente.razonSocial}
              </span>
            )}
            <span>Inicio {formatDate(state.vigenciaDesde)}</span>
            <span>Validez {state.validezDias} días</span>
          </div>
        </Card>

        {/* carteles */}
        {state.items.map((item) => {
          const c = cartelMap.get(item.cartelId);
          if (!c) return null;
          const mk = state.mockups.find((m) => m.cartelId === item.cartelId);
          return (
            <Card
              key={item.cartelId}
              className="grid overflow-hidden sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
            >
              <div className="relative aspect-[16/10] bg-neutral-100">
                <StreetMockupView cartel={c} mockup={mk} className="size-full" />
                <span className="absolute left-2.5 top-2.5 rounded-md bg-ink-950/70 px-2 py-1 font-mono text-[11px] font-medium text-white backdrop-blur">
                  {c.codigo}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-ink-900">
                  {c.direccion}
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {c.zona} · {c.tipo}
                </p>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-[var(--muted)]">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {c.anchoM}×{c.altoM} m
                  </span>
                  <span>{formatNumber(c.traficoDiario)} impactos/día</span>
                  <span>{c.iluminado ? "Iluminado" : "Sin luz"}</span>
                </div>
                <div className="mt-3 flex items-end justify-between border-t border-[var(--border)] pt-2.5">
                  <span className="text-[13px] text-[var(--muted)]">
                    {formatARS(item.precioMensual)}/mes × {item.meses}
                    {item.descuentoPct > 0 && ` · –${item.descuentoPct}%`}
                  </span>
                  <span className="text-base font-bold text-ink-900">
                    {formatARS(itemTotal(item))}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* totales + estado */}
      <div className="lg:sticky lg:top-4 lg:self-start">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-ink-900">Totales</h3>
          <dl className="mt-3 space-y-2 text-sm">
            <Row label="Carteles" value={String(totales.cantidad)} />
            <Row label="Subtotal" value={formatARS(totales.subtotal)} />
            {totales.descuento > 0 && (
              <Row
                label="Descuento"
                value={`– ${formatARS(totales.descuento)}`}
                tone="emerald"
              />
            )}
            <Row
              label="Inversión mensual"
              value={formatARS(totales.mensualConDescuento)}
            />
            <div className="my-2 border-t border-[var(--border)]" />
            <div className="flex items-center justify-between">
              <dt className="text-sm font-semibold text-ink-900">Total campaña</dt>
              <dd className="text-xl font-bold text-brand-600">
                {formatARS(totales.total)}
              </dd>
            </div>
          </dl>

          <div className="mt-4">
            <Field label="Estado inicial">
              <Select
                value={state.estado}
                onChange={(e) =>
                  patch({ estado: e.target.value as PropuestaEstado })
                }
              >
                <option value="borrador">Borrador</option>
                <option value="enviada">Enviada</option>
                <option value="aceptada">Aceptada</option>
                <option value="rechazada">Rechazada</option>
              </Select>
            </Field>
          </div>

          <div className="mt-4 grid gap-2">
            <Button onClick={() => onGuardar(true)}>
              {editing ? "Guardar y ver propuesta" : "Guardar y ver propuesta"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => onGuardar(false, "borrador")}
            >
              Guardar borrador
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "emerald";
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-[var(--muted)]">{label}</dt>
      <dd
        className={cn(
          "font-medium",
          tone === "emerald" ? "text-emerald-600" : "text-ink-800",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

// ============================================================
// Generación de código PROP-2026-0XX
// ============================================================
function generarCodigo(propuestas: Propuesta[]): string {
  const year = DEMO_NOW.getFullYear();
  let max = 0;
  for (const p of propuestas) {
    const m = p.codigo.match(/PROP-(\d{4})-(\d+)/);
    if (m && Number(m[1]) === year) max = Math.max(max, Number(m[2]));
  }
  const next = (max + 1).toString().padStart(3, "0");
  return `PROP-${year}-${next}`;
}
