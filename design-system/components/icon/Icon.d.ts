import * as React from 'react';

export interface IconProps {
  /** Lucide icon name in kebab-case, e.g. "map-pin", "chevron-down". */
  name: string;
  /** Pixel size (width & height). Default 18. */
  size?: number;
  /** Stroke width. Default 2. */
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Accessible label; when omitted the icon is aria-hidden. */
  label?: string;
}

/**
 * Lucide icon, sized in px, inherits currentColor.
 * @example
 * <Icon name="map-pin" size={20} />
 */
export function Icon(props: IconProps): JSX.Element;
