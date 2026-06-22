import * as React from 'react';

export type SelectOption = string | { value: string; label: string };

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  options?: SelectOption[];
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  containerStyle?: React.CSSProperties;
}

/**
 * Native select styled to the system, with chevron affordance.
 * @example
 * <Select label="Estado" options={['Disponible','Reservado','Ocupado']} placeholder="Elegir…" />
 */
export function Select(props: SelectProps): JSX.Element;
