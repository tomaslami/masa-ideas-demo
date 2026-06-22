// Masa Ideas — pipeline comercial (CRM) de ejemplo
window.MI_STAGES = [
  { id: 'prospecto', label: 'Prospecto', tone: 'var(--ink-400)' },
  { id: 'contactado', label: 'Contactado', tone: 'var(--info-500)' },
  { id: 'propuesta', label: 'Propuesta enviada', tone: 'var(--accent)' },
  { id: 'negociacion', label: 'Negociación', tone: 'var(--warning-500)' },
  { id: 'ganado', label: 'Ganado', tone: 'var(--success-500)' },
];

window.MI_DEALS = [
  { id: 'OP-204', cliente: 'Cervecería del Plata', contacto: 'Martín Aguirre', etapa: 'negociacion', valor: 7500000, carteles: 5, prob: 70, cierre: '2026-07-10', owner: 'Lucía Fernández', tag: 'Bebidas' },
  { id: 'OP-198', cliente: 'AutoNova', contacto: 'Paula Giménez', etapa: 'propuesta', valor: 11100000, carteles: 6, prob: 50, cierre: '2026-07-22', owner: 'Diego Roca', tag: 'Automotriz' },
  { id: 'OP-211', cliente: 'Banco Sur', contacto: 'Roberto Costa', etapa: 'propuesta', valor: 4600000, carteles: 4, prob: 45, cierre: '2026-08-05', owner: 'Lucía Fernández', tag: 'Finanzas' },
  { id: 'OP-176', cliente: 'TelCo Móvil', contacto: 'Sofía Paz', etapa: 'ganado', valor: 9600000, carteles: 6, prob: 100, cierre: '2026-06-18', owner: 'Diego Roca', tag: 'Telecom' },
  { id: 'OP-220', cliente: 'Farma+', contacto: 'Nadia Ruiz', etapa: 'contactado', valor: 2800000, carteles: 2, prob: 25, cierre: '2026-08-30', owner: 'Lucía Fernández', tag: 'Salud' },
  { id: 'OP-223', cliente: 'Hiper Norte', contacto: 'Julián Vera', etapa: 'contactado', valor: 5750000, carteles: 5, prob: 30, cierre: '2026-09-02', owner: 'Camila Sosa', tag: 'Retail' },
  { id: 'OP-231', cliente: 'Estudio Lex', contacto: 'Inés Molina', etapa: 'prospecto', valor: 1900000, carteles: 2, prob: 10, cierre: '2026-09-20', owner: 'Camila Sosa', tag: 'Servicios' },
  { id: 'OP-235', cliente: 'Viñedos del Sur', contacto: 'Tomás Bravo', etapa: 'prospecto', valor: 3400000, carteles: 3, prob: 15, cierre: '2026-10-01', owner: 'Diego Roca', tag: 'Bebidas' },
  { id: 'OP-240', cliente: 'GymFit', contacto: 'Lara Núñez', etapa: 'negociacion', valor: 2100000, carteles: 2, prob: 65, cierre: '2026-07-15', owner: 'Lucía Fernández', tag: 'Fitness' },
  { id: 'OP-188', cliente: 'Inmobiliaria Centro', contacto: 'Hernán Díaz', etapa: 'propuesta', valor: 3950000, carteles: 3, prob: 40, cierre: '2026-08-12', owner: 'Camila Sosa', tag: 'Inmobiliaria' },
  { id: 'OP-241', cliente: 'EduTech', contacto: 'Valeria Ponce', etapa: 'prospecto', valor: 1500000, carteles: 1, prob: 10, cierre: '2026-10-10', owner: 'Diego Roca', tag: 'Educación' },
];

window.MI_CRM_FMT = {
  money: (n) => '$' + n.toLocaleString('es-AR'),
  moneyShort: (n) => n >= 1e6 ? '$' + (n / 1e6).toLocaleString('es-AR', { maximumFractionDigits: 1 }) + 'M' : '$' + (n / 1e3).toFixed(0) + 'k',
  date: (s) => s ? new Date(s + 'T00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }) : '—',
};
