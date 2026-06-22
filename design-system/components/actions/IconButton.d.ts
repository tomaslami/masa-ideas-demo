import * as React from 'react';

export interface IconButtonProps {
  /** Lucide icon name. */
  icon: string;
  variant?: 'ghost' | 'secondary' | 'primary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  /** Toggled/selected state (shows accent fill). */
  active?: boolean;
  /** Tooltip + accessible label. */
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Square icon-only button for toolbars, table rows, popovers.
 * @example
 * <IconButton icon="pencil" title="Editar" />
 */
export function IconButton(props: IconButtonProps): JSX.Element;
