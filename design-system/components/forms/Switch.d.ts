import * as React from 'react';
export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
  label?: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
}
/**
 * Toggle switch for settings/filters. Orange when on.
 * @example
 * <Switch checked={on} onChange={setOn} label="Mostrar vencidos" />
 */
export function Switch(props: SwitchProps): JSX.Element;
