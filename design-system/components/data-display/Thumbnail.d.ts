import * as React from 'react';
export interface ThumbnailProps {
  /** Image URL; when absent a clean SVG placeholder is shown. */
  src?: string;
  /** Placeholder art when no src. */
  kind?: 'billboard' | 'image' | 'map';
  width?: number | string;
  height?: number | string;
  /** Aspect ratio when height is not set. Default "4 / 3". */
  ratio?: string;
  rounded?: boolean;
  label?: string;
  style?: React.CSSProperties;
}
/**
 * Image thumbnail, or a clean SVG placeholder when nothing is loaded yet.
 * @example
 * <Thumbnail kind="billboard" width={72} label="Foto del cartel" />
 * <Thumbnail src="/foto.jpg" ratio="16 / 9" />
 */
export function Thumbnail(props: ThumbnailProps): JSX.Element;
