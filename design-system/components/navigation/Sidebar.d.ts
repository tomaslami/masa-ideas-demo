import * as React from 'react';

export type SidebarItem =
  | { id: string; label: string; icon: string; badge?: string | number }
  | { divider: true }
  | { section: string };

export interface SidebarUser { name: string; role?: string; }

export interface SidebarProps {
  items: SidebarItem[];
  active?: string;
  onSelect?: (id: string) => void;
  /** Path/URL to the square logo mark shown top-left. */
  logoSrc?: string;
  brand?: string;
  /** Small label under the brand (e.g. module name). */
  product?: string;
  user?: SidebarUser;
  collapsed?: boolean;
  style?: React.CSSProperties;
}

/**
 * Dark app navigation shell — charcoal bg, cream text, orange active state.
 * @startingPoint section="Navigation" subtitle="App sidebar shell" viewport="280x520"
 * @example
 * <Sidebar logoSrc="assets/logo_mark.png" active="inventario" onSelect={setView}
 *   items={[{id:'inventario',label:'Inventario',icon:'map-pin',badge:124}]}
 *   user={{name:'Lucía Fernández', role:'Comercial'}} />
 */
export function Sidebar(props: SidebarProps): JSX.Element;
