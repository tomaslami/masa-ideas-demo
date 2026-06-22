// Shared sidebar navigation for every module screen.
// The design system Sidebar takes `items` + `active` + `onSelect(id)`;
// `hrefFor` maps each nav id to its Next.js route so the sidebar navigates.

export const NAV = [
  { section: 'Operación' },
  { id: 'inventario', label: 'Inventario', icon: 'map-pin', badge: 16 },
  { id: 'pipeline', label: 'Pipeline', icon: 'kanban', badge: 18 },
  { id: 'propuestas', label: 'Propuestas', icon: 'file-text' },
  { id: 'clientes', label: 'Clientes', icon: 'users' },
  { divider: true },
  { section: 'Cuenta' },
  { id: 'reportes', label: 'Reportes', icon: 'chart-no-axes-column' },
  { id: 'config', label: 'Configuración', icon: 'settings' },
];

const HREF = {
  inventario: '/inventario',
  pipeline: '/pipeline',
  propuestas: '/propuestas',
  clientes: '/clientes',
  reportes: '/reportes',
  config: '/configuracion',
};

export function hrefFor(id) {
  return HREF[id] || '/';
}

export const USER = { name: 'Lucía Fernández', role: 'Ejecutiva comercial' };
export const LOGO_SRC = '/brand/logo_mark.png';
