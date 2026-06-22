import React from 'react';
import { Icon } from '../icon/Icon.jsx';

/** Select — native select styled to match the system, with chevron. */
export function Select({ label, hint, error, options = [], placeholder, size = 'md', disabled = false, fullWidth = true, id, value, onChange, style = {}, containerStyle = {}, children, ...rest }) {
  const sizes = { sm: { h: 30, fs: 'var(--text-sm)', px: 9 }, md: { h: 36, fs: 'var(--text-base)', px: 11 }, lg: { h: 44, fs: 'var(--text-md)', px: 13 } };
  const s = sizes[size] || sizes.md;
  const [focus, setFocus] = React.useState(false);
  const rid = id || React.useId();
  const borderColor = error ? 'var(--danger-500)' : focus ? 'var(--accent)' : 'var(--border-strong)';
  return (
    <div style={{ width: fullWidth ? '100%' : undefined, ...containerStyle }}>
      {label && (
        <label htmlFor={rid} style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-body)', marginBottom: 6 }}>{label}</label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <select
          id={rid}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: 'none', WebkitAppearance: 'none',
            width: '100%', height: s.h,
            padding: `0 ${s.px + 22}px 0 ${s.px}px`,
            background: disabled ? 'var(--cream-200)' : 'var(--surface-card)',
            border: `1px solid ${borderColor}`,
            borderRadius: 'var(--radius-control)',
            boxShadow: focus && !error ? 'var(--shadow-focus)' : 'none',
            fontFamily: 'var(--font-sans)', fontSize: s.fs, color: value ? 'var(--text-heading)' : 'var(--text-faint)',
            outline: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
            ...style,
          }}
          {...rest}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
          {children}
        </select>
        <Icon name="chevron-down" size={16} style={{ position: 'absolute', right: s.px, pointerEvents: 'none', color: 'var(--text-muted)' }} />
      </div>
      {(hint || error) && (
        <div style={{ marginTop: 5, fontSize: 'var(--text-xs)', color: error ? 'var(--danger-700)' : 'var(--text-muted)' }}>{error || hint}</div>
      )}
    </div>
  );
}
