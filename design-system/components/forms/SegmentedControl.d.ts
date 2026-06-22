import * as React from 'react';
export type SegOption = string | { value: string; label: string; icon?: string };
export interface SegmentedControlProps {
  options: SegOption[];
  value?: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}
/**
 * Compact view/mode switcher (e.g. Mapa / Lista).
 * @example
 * <SegmentedControl value={view} onChange={setView}
 *   options={[{value:'mapa',label:'Mapa',icon:'map'},{value:'lista',label:'Lista',icon:'list'}]} />
 */
export function SegmentedControl(props: SegmentedControlProps): JSX.Element;
