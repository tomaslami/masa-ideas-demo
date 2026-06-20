import type { PropuestaItem } from "./types";

export interface PropuestaTotales {
  /** suma de precios mensuales de lista (1 mes, sin descuento) */
  mensualLista: number;
  /** suma mensual con descuento aplicado */
  mensualConDescuento: number;
  /** subtotal por toda la campaña sin descuento */
  subtotal: number;
  /** monto total de descuentos */
  descuento: number;
  /** total final de la campaña */
  total: number;
  /** cantidad de carteles */
  cantidad: number;
}

export function itemTotal(it: PropuestaItem): number {
  return it.precioMensual * it.meses * (1 - it.descuentoPct / 100);
}

export function calcTotales(items: PropuestaItem[]): PropuestaTotales {
  let mensualLista = 0;
  let mensualConDescuento = 0;
  let subtotal = 0;
  let total = 0;
  for (const it of items) {
    mensualLista += it.precioMensual;
    mensualConDescuento += it.precioMensual * (1 - it.descuentoPct / 100);
    subtotal += it.precioMensual * it.meses;
    total += itemTotal(it);
  }
  return {
    mensualLista,
    mensualConDescuento,
    subtotal,
    descuento: subtotal - total,
    total,
    cantidad: items.length,
  };
}
