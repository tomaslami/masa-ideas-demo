import * as React from 'react';
export interface BadgeProps {
  children: React.ReactNode;
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
  variant?: 'soft' | 'solid' | 'outline';
  icon?: string;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}
/**
 * Small label for counts, categories, metadata.
 * @startingPoint section="Feedback" subtitle="Badges, status pills, tooltips" viewport="700x160"
 * @example
 * <Badge tone="accent">Premium</Badge>
 * <Badge tone="success" icon="check" variant="soft">Firmado</Badge>
 */
export function Badge(props: BadgeProps): JSX.Element;
