import React from 'react';
import { Icon } from '../icon/Icon.jsx';

/**
 * Stat — KPI block: label, big mono value, optional delta and icon.
 * delta sign drives color (up=success, down=danger) unless `invertDelta`.
 */
export function Stat({ label, value, unit, delta, deltaLabel, icon, invertDelta = false, style = {} }) {
  const hasDelta = delta !== undefined && delta !== null && delta !== '';
  const up = typeof delta === 'number' ? delta >= 0 : String(delta).trim().startsWith('+');
  const good = invertDelta ? !up : up;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        {icon && (
          <span style={{ display: 'inline-flex', width: 26, height: 26, alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-sm)', background: 'var(--accent-soft)', color: 'var(--accent-text)' }}>
            <Icon name={icon} size={15} />
          </span>
        )}
        <span className="eyebrow">{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--fw-medium)', color: 'var(--text-heading)', letterSpacing: 'var(--ls-tight)', fontVariantNumeric: 'tabular-nums' }}>
          {value}
        </span>
        {unit && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', fontWeight: 'var(--fw-medium)' }}>{unit}</span>}
      </div>
      {hasDelta && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-semibold)', color: good ? 'var(--ok-fg)' : 'var(--bad-fg)' }}>
          <Icon name={up ? 'trending-up' : 'trending-down'} size={14} />
          <span style={{ fontFamily: 'var(--font-mono)' }}>{delta}</span>
          {deltaLabel && <span style={{ color: 'var(--text-faint)', fontWeight: 'var(--fw-regular)', fontFamily: 'var(--font-sans)' }}>{deltaLabel}</span>}
        </div>
      )}
    </div>
  );
}
