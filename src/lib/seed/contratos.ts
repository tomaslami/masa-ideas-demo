import type { Contrato, Pago, PagoEstado } from "../types";

// Contratos activos + uno vencido (para la vista de cobranza del CRM).
// Fecha de referencia del demo: 2026-06-20.

function pago(
  periodo: string,
  monto: number,
  vencimiento: string,
  estado: PagoEstado,
): Pago {
  return { id: `pago-${periodo}-${vencimiento}`, periodo, monto, vencimiento, estado };
}

export const contratosSeed: Contrato[] = [
  {
    id: "ctr-banco",
    codigo: "CTR-2026-002",
    clienteId: "cli-banco-plata",
    propuestaId: "prop-banco",
    cartelIds: ["mi-mic-001", "mi-pma-001"],
    fechaInicio: "2026-02-12T00:00:00",
    fechaFin: "2027-02-12T00:00:00",
    montoMensual: 4800000,
    condiciones: "Contrato anual. Pago por adelantado mensual. Renovación automática a evaluar.",
    pagos: [
      pago("2026-02", 4800000, "2026-02-28T00:00:00", "pagado"),
      pago("2026-03", 4800000, "2026-03-31T00:00:00", "pagado"),
      pago("2026-04", 4800000, "2026-04-30T00:00:00", "pagado"),
      pago("2026-05", 4800000, "2026-05-31T00:00:00", "pagado"),
      pago("2026-06", 4800000, "2026-06-30T00:00:00", "pendiente"),
    ],
  },
  {
    id: "ctr-polo",
    codigo: "CTR-2026-005",
    clienteId: "cli-polo-norte",
    propuestaId: "prop-polo",
    cartelIds: ["mi-cab-001", "mi-vur-001"],
    fechaInicio: "2026-03-01T00:00:00",
    fechaFin: "2026-09-01T00:00:00",
    montoMensual: 1340000,
    condiciones: "Campaña de temporada (6 meses). Pago mensual.",
    pagos: [
      pago("2026-03", 1340000, "2026-03-31T00:00:00", "pagado"),
      pago("2026-04", 1340000, "2026-04-30T00:00:00", "pagado"),
      pago("2026-05", 1340000, "2026-05-31T00:00:00", "pagado"),
      pago("2026-06", 1340000, "2026-06-25T00:00:00", "pendiente"),
    ],
  },
  {
    id: "ctr-cerveceria",
    codigo: "CTR-2026-007",
    clienteId: "cli-cerveceria",
    propuestaId: "prop-cerveceria",
    cartelIds: ["mi-pal-002"],
    fechaInicio: "2026-04-05T00:00:00",
    fechaFin: "2026-08-05T00:00:00",
    montoMensual: 2350000,
    condiciones: "Lanzamiento IPA (4 meses). Pantalla LED Palermo.",
    pagos: [
      pago("2026-04", 2350000, "2026-04-30T00:00:00", "pagado"),
      pago("2026-05", 2350000, "2026-05-31T00:00:00", "pagado"),
      pago("2026-06", 2350000, "2026-06-10T00:00:00", "vencido"),
    ],
  },
  {
    id: "ctr-seguros",
    codigo: "CTR-2025-014",
    clienteId: "cli-seguros",
    cartelIds: ["mi-rec-001", "mi-bel-003"],
    fechaInicio: "2025-10-01T00:00:00",
    fechaFin: "2025-12-31T00:00:00",
    montoMensual: 1680000,
    condiciones: "Campaña institucional (cerrada). Candidato a renovación primavera 2026.",
    pagos: [
      pago("2025-10", 1680000, "2025-10-31T00:00:00", "pagado"),
      pago("2025-11", 1680000, "2025-11-30T00:00:00", "pagado"),
      pago("2025-12", 1680000, "2025-12-31T00:00:00", "pagado"),
    ],
  },
];
