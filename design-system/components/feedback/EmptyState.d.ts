import * as React from 'react';
export interface EmptyStateProps {
  /** Which clean SVG illustration to show. */
  art?: 'search' | 'map' | 'inbox' | 'document' | 'board';
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Action node, e.g. a Button. */
  action?: React.ReactNode;
  /** Smaller variant for tight spaces (e.g. empty kanban column). */
  compact?: boolean;
  style?: React.CSSProperties;
}
/**
 * Empty / no-data state with a clean line illustration.
 * @example
 * <EmptyState art="search" title="Sin resultados"
 *   description="Probá con otro código o limpiá los filtros." />
 */
export function EmptyState(props: EmptyStateProps): JSX.Element;
