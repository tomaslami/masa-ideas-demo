import React from 'react';
import { Icon } from '../icon/Icon.jsx';

/**
 * Button — primary action element. Single orange accent, near-square corners.
 * Variants: primary | secondary | ghost | danger. Sizes: sm | md | lg.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  iconOnly = false,
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { h: 30, px: 10, fs: 'var(--text-sm)', gap: 6, ic: 15 },
    md: { h: 36, px: 14, fs: 'var(--text-base)', gap: 7, ic: 17 },
    lg: { h: 44, px: 20, fs: 'var(--text-md)', gap: 8, ic: 19 },
  };
  const s = sizes[size] || sizes.md;

  const palettes = {
    primary: {
      bg: 'var(--accent)', color: 'var(--text-on-accent)', border: 'transparent',
      hover: 'var(--accent-hover)', active: 'var(--accent-active)',
    },
    secondary: {
      bg: 'var(--surface-card)', color: 'var(--text-heading)', border: 'var(--border-strong)',
      hover: 'var(--surface-hover)', active: 'var(--cream-300)',
    },
    ghost: {
      bg: 'transparent', color: 'var(--text-body)', border: 'transparent',
      hover: 'var(--surface-hover)', active: 'var(--cream-300)',
    },
    danger: {
      bg: 'var(--danger-500)', color: '#fff', border: 'transparent',
      hover: 'var(--danger-700)', active: 'var(--danger-700)',
    },
  };
  const p = palettes[variant] || palettes.primary;
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const isDisabled = disabled || loading;

  const bg = isDisabled ? undefined : down ? p.active : hover ? p.hover : p.bg;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setDown(false); }}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      className={`mi-btn ${className}`}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: s.gap,
        height: s.h,
        width: fullWidth ? '100%' : undefined,
        padding: iconOnly ? 0 : `0 ${s.px}px`,
        minWidth: iconOnly ? s.h : undefined,
        fontFamily: 'var(--font-sans)',
        fontSize: s.fs,
        fontWeight: 'var(--fw-semibold)',
        letterSpacing: 'var(--ls-snug)',
        color: isDisabled ? 'var(--text-disabled)' : p.color,
        background: isDisabled ? 'var(--cream-200)' : bg,
        border: `1px solid ${isDisabled ? 'var(--border)' : p.border}`,
        borderRadius: 'var(--radius-control)',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        boxShadow: variant === 'primary' && !isDisabled ? 'var(--shadow-xs)' : 'none',
        transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
        transform: down && !isDisabled ? 'translateY(0.5px)' : 'none',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {loading && <Icon name="loader-circle" size={s.ic} className="mi-spin" />}
      {!loading && icon && <Icon name={icon} size={s.ic} />}
      {!iconOnly && children}
      {!loading && iconRight && <Icon name={iconRight} size={s.ic} />}
    </button>
  );
}
