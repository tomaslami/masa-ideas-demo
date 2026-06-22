import * as React from 'react';
export interface CheckboxProps {
  label?: React.ReactNode;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  style?: React.CSSProperties;
}
/**
 * Square checkbox with optional label. Orange when checked.
 * @example
 * <Checkbox label="Solo disponibles" checked onChange={fn} />
 */
export function Checkbox(props: CheckboxProps): JSX.Element;
