import React from 'react';
import { Icon } from '../icon/Icon.jsx';

/** Checkbox — square check with label. Near-square 2px radius. */
export function Checkbox({ label, checked = false, indeterminate = false, disabled = false, onChange, id, style = {} }) {
  const rid = id || React.useId();
  const on = checked || indeterminate;
  return (
    <label htmlFor={rid} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.55 : 1, ...style }}>
      <span
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 18, height: 18, flex: '0 0 auto',
          background: on ? 'var(--accent)' : 'var(--surface-card)',
          border: `1.5px solid ${on ? 'var(--accent)' : 'var(--border-strong)'}`,
          borderRadius: 'var(--radius-xs)',
          color: '#fff',
          transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
        }}
      >
        {indeterminate ? <Icon name="minus" size={13} /> : checked ? <Icon name="check" size={13} strokeWidth={3} /> : null}
      </span>
      <input id={rid} type="checkbox" checked={checked} disabled={disabled} onChange={onChange} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      {label && <span style={{ fontSize: 'var(--text-base)', color: 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}
