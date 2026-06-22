// Masa Ideas — reportes / analítica de ejemplo
// Agregados de demo, consistentes con inventory/pipeline/proposals.
// Zonas: Norte/Centro/Sur/Oeste · estados: disponible/reservado/ocupado/mantenimiento
// Etapas pipeline: Prospecto → Contactado → Propuesta → Negociación → Ganado.

export const MI_REPORTES = {
  // KPIs del período (cifras + delta vs período anterior)
  kpis: {
    facturacion: { valor: 18450000, delta: '+12%' },
    ocupacion: { valor: 68, delta: '+4 pts' },
    ganadas: { valor: 9, delta: '+2' },
    ticket: { valor: 1920000, delta: '+6%' },
  },

  // Facturación mensual (últimos meses) — pesos
  facturacionMensual: [
    { mes: 'Jul', valor: 12200000 },
    { mes: 'Ago', valor: 13100000 },
    { mes: 'Sep', valor: 12750000 },
    { mes: 'Oct', valor: 14300000 },
    { mes: 'Nov', valor: 15600000 },
    { mes: 'Dic', valor: 16900000 },
    { mes: 'Ene', valor: 14800000 },
    { mes: 'Feb', valor: 15250000 },
    { mes: 'Mar', valor: 16400000 },
    { mes: 'Abr', valor: 17300000 },
    { mes: 'May', valor: 17950000 },
    { mes: 'Jun', valor: 18450000 },
  ],

  // Ocupación por zona — carteles ocupados sobre el total de la zona
  ocupacionPorZona: [
    { zona: 'Norte', total: 7, ocupados: 5, pct: 71 },
    { zona: 'Centro', total: 4, ocupados: 2, pct: 50 },
    { zona: 'Sur', total: 2, ocupados: 1, pct: 50 },
    { zona: 'Oeste', total: 3, ocupados: 2, pct: 67 },
  ],

  // Pipeline por etapa — embudo descendente (valor ponderado + cantidad)
  // tones reutilizados de pipeline/data.js (MI_STAGES)
  pipelinePorEtapa: [
    { etapa: 'Prospecto', valor: 6800000, n: 3, tone: 'var(--ink-400)' },
    { etapa: 'Contactado', valor: 8550000, n: 2, tone: 'var(--info-500)' },
    { etapa: 'Propuesta enviada', valor: 19650000, n: 3, tone: 'var(--accent)' },
    { etapa: 'Negociación', valor: 9600000, n: 2, tone: 'var(--warning-500)' },
    { etapa: 'Ganado', valor: 9600000, n: 1, tone: 'var(--success-500)' },
  ],

  // Inventario por estado — cantidad de carteles
  inventarioPorEstado: [
    { estado: 'disponible', n: 8, color: 'var(--status-disponible)' },
    { estado: 'reservado', n: 2, color: 'var(--status-reservado)' },
    { estado: 'ocupado', n: 4, color: 'var(--status-ocupado)' },
    { estado: 'mantenimiento', n: 2, color: 'var(--status-mantenim)' },
  ],

  // Top clientes por facturación (nombres reales del pipeline/inventario)
  topClientes: [
    { nombre: 'AutoNova', facturacion: 5550000, carteles: 6 },
    { nombre: 'TelCo Móvil', facturacion: 4800000, carteles: 6 },
    { nombre: 'Cervecería del Plata', facturacion: 3750000, carteles: 5 },
    { nombre: 'Hiper Norte', facturacion: 2300000, carteles: 5 },
    { nombre: 'Banco Sur', facturacion: 1840000, carteles: 4 },
  ],
};

// Formato es-AR (mismo estilo que pipeline/data.js)
export const MI_REPORTES_FMT = {
  money: (n) => '$' + Math.round(n).toLocaleString('es-AR'),
  moneyShort: (n) =>
    n >= 1e6
      ? '$' + (n / 1e6).toLocaleString('es-AR', { maximumFractionDigits: 1 }) + 'M'
      : '$' + (n / 1e3).toFixed(0) + 'k',
};
