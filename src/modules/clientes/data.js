// Masa Ideas — clientes de ejemplo (cuentas de vía pública en CABA)
// Consistente con el pipeline (mismas empresas/rubros/owners que MI_DEALS).
export const MI_CLIENTES = [
  { id: 'CL-014', nombre: 'Cervecería del Plata', contacto: 'Martín Aguirre', email: 'maguirre@cerveceriadelplata.com', telefono: '+54 11 4781 2200', rubro: 'Bebidas', estado: 'activo', oportunidades: 1, carteles: 5, facturacion: 38400000, ultimaActividad: '2026-06-19', owner: 'Lucía Fernández', desde: 2021 },
  { id: 'CL-007', nombre: 'AutoNova', contacto: 'Paula Giménez', email: 'pgimenez@autonova.com.ar', telefono: '+54 11 4032 8810', rubro: 'Automotriz', estado: 'activo', oportunidades: 1, carteles: 6, facturacion: 52600000, ultimaActividad: '2026-06-20', owner: 'Diego Roca', desde: 2020 },
  { id: 'CL-021', nombre: 'Banco Sur', contacto: 'Roberto Costa', email: 'rcosta@bancosur.com', telefono: '+54 11 5219 6000', rubro: 'Finanzas', estado: 'activo', oportunidades: 1, carteles: 4, facturacion: 29800000, ultimaActividad: '2026-06-16', owner: 'Lucía Fernández', desde: 2019 },
  { id: 'CL-003', nombre: 'TelCo Móvil', contacto: 'Sofía Paz', email: 'spaz@telcomovil.com', telefono: '+54 11 4000 1212', rubro: 'Telecom', estado: 'activo', oportunidades: 1, carteles: 6, facturacion: 61200000, ultimaActividad: '2026-06-18', owner: 'Diego Roca', desde: 2018 },
  { id: 'CL-032', nombre: 'Farma+', contacto: 'Nadia Ruiz', email: 'nruiz@farmamas.com.ar', telefono: '+54 11 4865 3340', rubro: 'Salud', estado: 'activo', oportunidades: 1, carteles: 3, facturacion: 17500000, ultimaActividad: '2026-06-14', owner: 'Lucía Fernández', desde: 2022 },
  { id: 'CL-028', nombre: 'Hiper Norte', contacto: 'Julián Vera', email: 'jvera@hipernorte.com', telefono: '+54 11 4700 9900', rubro: 'Retail', estado: 'prospecto', oportunidades: 1, carteles: 0, facturacion: 0, ultimaActividad: '2026-06-12', owner: 'Camila Sosa', desde: 2026 },
  { id: 'CL-040', nombre: 'Estudio Lex', contacto: 'Inés Molina', email: 'imolina@estudiolex.com.ar', telefono: '+54 11 4313 5577', rubro: 'Servicios', estado: 'prospecto', oportunidades: 1, carteles: 0, facturacion: 0, ultimaActividad: '2026-06-08', owner: 'Camila Sosa', desde: 2026 },
  { id: 'CL-036', nombre: 'Viñedos del Sur', contacto: 'Tomás Bravo', email: 'tbravo@vinedosdelsur.com', telefono: '+54 11 4520 7788', rubro: 'Bebidas', estado: 'prospecto', oportunidades: 1, carteles: 0, facturacion: 0, ultimaActividad: '2026-06-05', owner: 'Diego Roca', desde: 2026 },
  { id: 'CL-019', nombre: 'GymFit', contacto: 'Lara Núñez', email: 'lnunez@gymfit.com.ar', telefono: '+54 11 4988 2120', rubro: 'Fitness', estado: 'activo', oportunidades: 1, carteles: 2, facturacion: 12600000, ultimaActividad: '2026-06-17', owner: 'Lucía Fernández', desde: 2023 },
  { id: 'CL-011', nombre: 'Inmobiliaria Centro', contacto: 'Hernán Díaz', email: 'hdiaz@inmobiliariacentro.com', telefono: '+54 11 4382 4040', rubro: 'Inmobiliaria', estado: 'inactivo', oportunidades: 0, carteles: 0, facturacion: 8900000, ultimaActividad: '2026-02-26', owner: 'Camila Sosa', desde: 2020 },
  { id: 'CL-041', nombre: 'EduTech', contacto: 'Valeria Ponce', email: 'vponce@edutech.com.ar', telefono: '+54 11 5031 6600', rubro: 'Educación', estado: 'prospecto', oportunidades: 1, carteles: 0, facturacion: 0, ultimaActividad: '2026-06-03', owner: 'Diego Roca', desde: 2026 },
];

export const MI_CLIENTES_FMT = {
  money: (n) => '$' + n.toLocaleString('es-AR'),
  moneyShort: (n) => n >= 1e6 ? '$' + (n / 1e6).toLocaleString('es-AR', { maximumFractionDigits: 1 }) + 'M' : '$' + (n / 1e3).toFixed(0) + 'k',
  date: (s) => s ? new Date(s + 'T00:00').toLocaleDateString('es-AR', { day: '2-digit', month: 'short' }) : '—',
};
