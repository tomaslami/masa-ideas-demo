'use client';
import React from 'react';
import { Icon } from '../icon/Icon.jsx';

/**
 * Input — text field with optional leading/trailing icon, label, hint, error.
 */
export function Input({
  label,
  hint,
  error,
  required = false,
  icon,
  iconRight,
  size = 'md',
  prefix,
  suffix,
  disabled = false,
  fullWidth = true,
  id,
  className = '',
  style = {},
  containerStyle = {},
  ...rest
}) {
  const sizes = { sm: { h: 30, fs: 'var(--text-sm)', px: 9 }, md: { h: 36, fs: 'var(--text-base)', px: 11 }, lg: { h: 44, fs: 'var(--text-md)', px: 13 } };
  const s = sizes[size] || sizes.md;
  const [focus, setFocus] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const rid = id || React.useId();

  const borderColor = error
    ? 'var(--danger-500)'
    : focus
      ? 'var(--accent)'
      : hover && !disabled
        ? 'var(--ink-300)'
        : 'var(--border-strong)';

  return (
    <div style={{ width: fullWidth ? '100%' : undefined, ...containerStyle }}>
      {label && (
        <label htmlFor={rid} style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-heading)', marginBottom: 7 }}>
          {label}
          {required && <span style={{ color: 'var(--accent-text)', marginLeft: 2 }}>*</span>}
        </label>
      )}
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          height: s.h, padding: `0 ${s.px}px`,
          background: disabled ? 'var(--cream-200)' : 'var(--surface-card)',
          border: `1px solid ${borderColor}`,
          borderRadius: 'var(--radius-control)',
          boxShadow: focus && !error ? 'var(--shadow-focus)' : 'none',
          transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
          cursor: disabled ? 'not-allowed' : 'text',
        }}
      >
        {icon && <Icon name={icon} size={16} style={{ color: focus ? 'var(--accent-text)' : 'var(--text-faint)' }} />}
        {prefix && <span style={{ color: 'var(--text-muted)', fontSize: s.fs, fontFamily: 'var(--font-mono)' }}>{prefix}</span>}
        <input
          id={rid}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={className}
          style={{
            flex: 1, minWidth: 0, height: '100%',
            border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'var(--font-sans)', fontSize: s.fs, color: 'var(--text-heading)',
            ...style,
          }}
          {...rest}
        />
        {suffix && <span style={{ color: 'var(--text-muted)', fontSize: s.fs }}>{suffix}</span>}
        {iconRight && <Icon name={iconRight} size={16} style={{ color: 'var(--text-faint)' }} />}
      </div>
      {(hint || error) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5, fontSize: 'var(--text-xs)', color: error ? 'var(--danger-700)' : 'var(--text-muted)' }}>
          {error && <Icon name="circle-alert" size={13} />}
          {error || hint}
        </div>
      )}
    </div>
  );
}
