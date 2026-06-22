import * as React from 'react';
export interface AvatarProps {
  /** Full name; drives initials and fallback color. */
  name?: string;
  /** Image URL; overrides initials. */
  src?: string;
  /** Pixel size or named size. Default 32. */
  size?: number | 'sm' | 'md' | 'lg';
  /** Override background color. */
  color?: string;
  /** Rounded-square instead of circle. */
  square?: boolean;
  style?: React.CSSProperties;
}
/**
 * Initials or image avatar with a warm-tinted fallback color.
 * @example
 * <Avatar name="Lucía Fernández" />
 */
export function Avatar(props: AvatarProps): JSX.Element;
