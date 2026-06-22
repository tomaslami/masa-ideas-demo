import React from 'react';
import { Icon } from '../icon/Icon.jsx';

/**
 * SegmentedControl — compact view/mode switcher (e.g. Mapa / Lista).
 * options: array of { value, label, icon? }.
 */
export function SegmentedControl({ options = [], value, onChange, size = 'md', style = {} }) {
  const sizes = { sm: { h: 28, fs: 'var(--text-xs)', px: 9, ic: 14 }, md: { h: 34, fs: 'var(--text-sm)', px: 12, ic: 15 } };
  const s = sizes[size] || sizes.md;
  return (
    <div
      role="tablist"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 2,
        padding: 2, background: 'var(--cream-200)',
        border: '1px solid var(--border)', borderRadius: 'var(--radius-control)',
        ...style,
      }}
    >
      {options.map((o) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange && onChange(opt.value)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              height: s.h, padding: `0 ${s.px}px`,
              background: active ? 'var(--surface-card)' : 'transparent',
              color: active ? 'var(--text-heading)' : 'var(--text-muted)',
              border: active ? '1px solid var(--border)' : '1px solid transparent',
              borderRadius: 'calc(var(--radius-control) - 1px)',
              fontFamily: 'var(--font-sans)', fontSize: s.fs,
              fontWeight: active ? 'var(--fw-semibold)' : 'var(--fw-medium)',
              cursor: 'pointer',
              boxShadow: active ? 'var(--shadow-xs)' : 'none',
              transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
            }}
          >
            {opt.icon && <Icon name={opt.icon} size={s.ic} />}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
