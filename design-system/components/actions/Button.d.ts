import * as React from 'react';

export interface ButtonProps {
  children?: React.ReactNode;
  /** Visual style. Default "primary". */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Default "md". */
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon name shown before the label. */
  icon?: string;
  /** Lucide icon name shown after the label. */
  iconRight?: string;
  /** Render as a square icon-only button (hides children). */
  iconOnly?: boolean;
  disabled?: boolean;
  /** Shows a spinner and disables the button. */
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Primary action button. One orange accent, near-square (3px) corners.
 * @startingPoint section="Actions" subtitle="Button variants & sizes" viewport="700x180"
 * @example
 * <Button variant="primary" icon="plus">Nuevo cartel</Button>
 */
export function Button(props: ButtonProps): JSX.Element;
