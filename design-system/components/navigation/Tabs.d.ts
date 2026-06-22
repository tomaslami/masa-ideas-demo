import * as React from 'react';
export type TabItem = string | { value: string; label: string; icon?: string; count?: number };
export interface TabsProps {
  tabs: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
/**
 * Underline tab bar with optional icons and counts.
 * @startingPoint section="Navigation" subtitle="Underline tabs" viewport="700x120"
 * @example
 * <Tabs value={tab} onChange={setTab}
 *   tabs={[{value:'todos',label:'Todos',count:124},{value:'activos',label:'Activos',count:88}]} />
 */
export function Tabs(props: TabsProps): JSX.Element;
