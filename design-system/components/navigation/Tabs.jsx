import React from 'react';
import { Icon } from '../icon/Icon.jsx';

/**
 * Tabs — underline tab bar. tabs: array of { value, label, icon?, count? }.
 */
export function Tabs({ tabs = [], value, onChange, style = {} }) {
  return (
    <div role="tablist" style={{ display: 'flex', alignItems: 'stretch', gap: 4, borderBottom: '1px solid var(--border)', ...style }}>
      {tabs.map((t) => {
        const tab = typeof t === 'string' ? { value: t, label: t } : t;
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange && onChange(tab.value)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '10px 12px', marginBottom: -1,
              background: 'transparent', border: 'none',
              borderBottom: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
              color: active ? 'var(--text-heading)' : 'var(--text-muted)',
              fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)',
              fontWeight: active ? 'var(--fw-semibold)' : 'var(--fw-medium)',
              cursor: 'pointer',
              transition: 'color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
            }}
          >
            {tab.icon && <Icon name={tab.icon} size={16} />}
            {tab.label}
            {tab.count !== undefined && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-semibold)', color: active ? 'var(--accent-text)' : 'var(--text-faint)', background: active ? 'var(--accent-soft)' : 'var(--cream-200)', padding: '1px 6px', borderRadius: 'var(--radius-pill)' }}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
