import type { Cartel, Cliente, Contrato, Pago, Propuesta, Zona } from "./types";

export function occupancy(carteles: Cartel[]) {
  const total = carteles.length;
  const ocupados = carteles.filter((c) => c.estado === "ocupado").length;
  const reservados = carteles.filter((c) => c.estado === "reservado").length;
  const libres = carteles.filter((c) => c.estado === "libre").length;
  const mantenimiento = carteles.filter((c) => c.estado === "mantenimiento").length;
  return {
    total,
    ocupados,
    reservados,
    libres,
    mantenimiento,
    pct: total ? Math.round(((ocupados + reservados) / total) * 100) : 0,
  };
}

/** Facturación mensual generada por los carteles ocupados. */
export function ingresosMensuales(carteles: Cartel[]): number {
  return carteles
    .filter((c) => c.estado === "ocupado" || c.estado === "reservado")
    .reduce((sum, c) => sum + c.precioMensual, 0);
}

/** Oportunidad de ingreso de los carteles libres (lista). */
export function ingresoPotencial(carteles: Cartel[]): number {
  return carteles
    .filter((c) => c.estado === "libre")
    .reduce((sum, c) => sum + c.precioMensual, 0);
}

export function ingresosPorZona(carteles: Cartel[]) {
  const map = new Map<Zona, { ocupado: number; total: number; ingreso: number }>();
  for (const c of carteles) {
    const e = map.get(c.zona) ?? { ocupado: 0, total: 0, ingreso: 0 };
    e.total++;
    if (c.estado === "ocupado" || c.estado === "reservado") {
      e.ocupado++;
      e.ingreso += c.precioMensual;
    }
    map.set(c.zona, e);
  }
  return [...map.entries()]
    .map(([zona, v]) => ({ zona, ...v, pct: Math.round((v.ocupado / v.total) * 100) }))
    .sort((a, b) => b.ingreso - a.ingreso);
}

export type PagoConContexto = Pago & {
  contratoId: string;
  contratoCodigo: string;
  clienteId: string;
};

/** Pagos pendientes o vencidos (recordatorios de cobro). */
export function cobranzaPendiente(
  contratos: Contrato[],
): PagoConContexto[] {
  const out: PagoConContexto[] = [];
  for (const ct of contratos) {
    for (const p of ct.pagos) {
      if (p.estado !== "pagado") {
        out.push({
          ...p,
          contratoId: ct.id,
          contratoCodigo: ct.codigo,
          clienteId: ct.clienteId,
        });
      }
    }
  }
  return out.sort((a, b) => +new Date(a.vencimiento) - +new Date(b.vencimiento));
}

export function pipelineResumen(clientes: Cliente[]) {
  const estados = ["prospecto", "propuesta", "negociando", "activo", "vencido"] as const;
  return estados.map((estado) => {
    const list = clientes.filter((c) => c.estado === estado);
    return {
      estado,
      count: list.length,
      valor: list.reduce((s, c) => s + c.valorEstimado, 0),
    };
  });
}

/** Valor en negociación (prospecto + propuesta + negociando). */
export function valorEnJuego(clientes: Cliente[]): number {
  return clientes
    .filter((c) => ["prospecto", "propuesta", "negociando"].includes(c.estado))
    .reduce((s, c) => s + c.valorEstimado, 0);
}

export const byId = <T extends { id: string }>(arr: T[]) =>
  new Map(arr.map((x) => [x.id, x]));

export function propuestasDeCliente(propuestas: Propuesta[], clienteId: string) {
  return propuestas.filter((p) => p.clienteId === clienteId);
}

export function contratoDeCliente(contratos: Contrato[], clienteId: string) {
  return contratos.find((c) => c.clienteId === clienteId);
}
