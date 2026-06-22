import * as React from 'react';
export interface StatProps {
  label: string;
  value: React.ReactNode;
  unit?: string;
  /** Delta value; number sign or leading +/- drives color & arrow. */
  delta?: number | string;
  deltaLabel?: string;
  /** Lucide icon shown in an accent chip. */
  icon?: string;
  /** When true, a positive delta reads as bad (e.g. costs). */
  invertDelta?: boolean;
  style?: React.CSSProperties;
}
/**
 * KPI block: eyebrow label, big mono value, optional delta.
 * @example
 * <Stat label="Ocupación" value="78" unit="%" delta="+4 pts" icon="layout-grid" />
 */
export function Stat(props: StatProps): JSX.Element;
