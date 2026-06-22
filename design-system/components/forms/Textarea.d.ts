import * as React from 'react';
export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
  label?: string;
  hint?: string;
  error?: string;
  rows?: number;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}
/**
 * Multiline text field matching Input styling.
 * @example
 * <Textarea label="Notas" rows={4} placeholder="Detalle del acuerdo…" />
 */
export function Textarea(props: TextareaProps): JSX.Element;
