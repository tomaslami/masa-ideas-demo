'use client';
import React from 'react';
import { Icon } from '../icon/Icon.jsx';

/**
 * IconButton — square icon-only action. For toolbars, table rows, popovers.
 * Variants: ghost (default) | secondary | primary | danger. Sizes: sm | md | lg.
 */
export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  active = false,
  title,
  onClick,
  className = '',
  style = {},
  ...rest
}) {
  const sizes = { sm: { d: 28, ic: 16 }, md: { d: 34, ic: 18 }, lg: { d: 40, ic: 20 } };
  const s = sizes[size] || sizes.md;

  const palettes = {
    ghost: { bg: 'transparent', color: 'var(--text-muted)', border: 'transparent', hover: 'var(--surface-hover)', activeBg: 'var(--accent-soft)', activeColor: 'var(--accent-text)' },
    secondary: { bg: 'var(--surface-card)', color: 'var(--text-body)', border: 'var(--border-strong)', hover: 'var(--surface-hover)', activeBg: 'var(--accent-soft)', activeColor: 'var(--accent-text)' },
    primary: { bg: 'var(--accent)', color: '#fff', border: 'transparent', hover: 'var(--accent-hover)', activeBg: 'var(--accent)', activeColor: '#fff' },
    danger: { bg: 'transparent', color: 'var(--danger-500)', border: 'transparent', hover: 'var(--danger-50)', activeBg: 'var(--danger-50)', activeColor: 'var(--danger-700)' },
  };
  const p = palettes[variant] || palettes.ghost;
  const [hover, setHover] = React.useState(false);

  return (
    <button
      type="button"
      disabled={disabled}
      title={title}
      aria-label={title}
      aria-pressed={active}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`mi-iconbtn ${className}`}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: s.d, height: s.d,
        color: disabled ? 'var(--text-disabled)' : active ? p.activeColor : p.color,
        background: disabled ? 'transparent' : active ? p.activeBg : hover ? p.hover : p.bg,
        border: `1px solid ${active && variant === 'secondary' ? 'var(--accent)' : p.border}`,
        borderRadius: 'var(--radius-control)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      <Icon name={icon} size={s.ic} />
    </button>
  );
}
