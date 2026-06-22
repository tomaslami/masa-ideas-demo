import * as React from 'react';
export interface StatusPillProps {
  /** Preset inventory/pipeline status. */
  status?: 'disponible' | 'reservado' | 'ocupado' | 'mantenimiento' | 'vencido';
  /** Override label text. */
  label?: string;
  /** Override dot color (CSS value). */
  color?: string;
  size?: 'sm' | 'md';
  /** Filled pill instead of dot + text. */
  solid?: boolean;
  style?: React.CSSProperties;
}
/**
 * Inventory/pipeline status with a colored dot (or solid fill).
 * @example
 * <StatusPill status="disponible" />
 * <StatusPill status="ocupado" solid />
 */
export function StatusPill(props: StatusPillProps): JSX.Element;
