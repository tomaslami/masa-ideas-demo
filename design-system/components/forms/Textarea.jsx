import React from 'react';

/** Textarea — multiline text field matching Input styling. */
export function Textarea({ label, hint, error, rows = 4, disabled = false, fullWidth = true, id, style = {}, containerStyle = {}, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const rid = id || React.useId();
  const borderColor = error ? 'var(--danger-500)' : focus ? 'var(--accent)' : 'var(--border-strong)';
  return (
    <div style={{ width: fullWidth ? '100%' : undefined, ...containerStyle }}>
      {label && (
        <label htmlFor={rid} style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-body)', marginBottom: 6 }}>{label}</label>
      )}
      <textarea
        id={rid}
        rows={rows}
        disabled={disabled}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: '100%', resize: 'vertical',
          padding: '9px 11px',
          background: disabled ? 'var(--cream-200)' : 'var(--surface-card)',
          border: `1px solid ${borderColor}`,
          borderRadius: 'var(--radius-control)',
          boxShadow: focus && !error ? 'var(--shadow-focus)' : 'none',
          fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)', lineHeight: 'var(--lh-normal)',
          color: 'var(--text-heading)', outline: 'none',
          transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
          ...style,
        }}
        {...rest}
      />
      {(hint || error) && (
        <div style={{ marginTop: 5, fontSize: 'var(--text-xs)', color: error ? 'var(--danger-700)' : 'var(--text-muted)' }}>{error || hint}</div>
      )}
    </div>
  );
}
