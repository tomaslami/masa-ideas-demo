import * as React from 'react';
export interface TooltipProps {
  label: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  style?: React.CSSProperties;
}
/**
 * Dark tooltip shown on hover/focus of its single child.
 * @example
 * <Tooltip label="Ver en el mapa"><IconButton icon="map-pin" /></Tooltip>
 */
export function Tooltip(props: TooltipProps): JSX.Element;
