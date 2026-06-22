import * as React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: string;
  hint?: string;
  /** Error message; turns the field red and shows an alert icon. */
  error?: string;
  /** Leading Lucide icon name. */
  icon?: string;
  /** Trailing Lucide icon name. */
  iconRight?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Mono prefix shown inside the field (e.g. "$", "MI-"). */
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  fullWidth?: boolean;
  containerStyle?: React.CSSProperties;
}

/**
 * Text input with label, hint, error, and optional icons/affixes.
 * @startingPoint section="Forms" subtitle="Inputs, selects, toggles" viewport="700x360"
 * @example
 * <Input label="Nombre del cliente" icon="search" placeholder="Buscar…" />
 */
export function Input(props: InputProps): JSX.Element;
