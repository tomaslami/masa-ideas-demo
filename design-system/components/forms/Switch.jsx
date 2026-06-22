import React from 'react';

/** Switch — toggle for settings/filters. Orange when on. */
export function Switch({ checked = false, disabled = false, onChange, label, id, style = {} }) {
  const rid = id || React.useId();
  return (
    <label htmlFor={rid} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.55 : 1, ...style }}>
      <button
        id={rid}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          position: 'relative', width: 38, height: 22, flex: '0 0 auto',
          background: checked ? 'var(--accent)' : 'var(--line-400)',
          border: 'none', borderRadius: 'var(--radius-pill)',
          cursor: disabled ? 'not-allowed' : 'pointer', padding: 0,
          transition: 'background var(--dur) var(--ease-out)',
        }}
      >
        <span
          style={{
            position: 'absolute', top: 3, left: checked ? 19 : 3,
            width: 16, height: 16, background: '#fff', borderRadius: '50%',
            boxShadow: 'var(--shadow-sm)',
            transition: 'left var(--dur) var(--ease-out)',
          }}
        />
      </button>
      {label && <span style={{ fontSize: 'var(--text-base)', color: 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}
