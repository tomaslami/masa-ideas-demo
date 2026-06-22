import React from 'react';

/**
 * StatusPill — inventory/pipeline status with a colored dot.
 * status: disponible | reservado | ocupado | mantenimiento | vencido (or pass custom color).
 */
const STATUS = {
  disponible: { label: 'Disponible', color: 'var(--status-disponible)' },
  reservado: { label: 'Reservado', color: 'var(--status-reservado)' },
  ocupado: { label: 'Ocupado', color: 'var(--status-ocupado)' },
  mantenimiento: { label: 'Mantenimiento', color: 'var(--status-mantenim)' },
  vencido: { label: 'Vencido', color: 'var(--danger-500)' },
};

export function StatusPill({ status = 'disponible', label, color, size = 'md', solid = false, style = {} }) {
  const def = STATUS[status] || {};
  const c = color || def.color || 'var(--ink-400)';
  const text = label || def.label || status;
  const sz = size === 'sm' ? { fs: 'var(--text-2xs)', dot: 6, gap: 5 } : { fs: 'var(--text-xs)', dot: 7, gap: 6 };
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: sz.gap,
        fontFamily: 'var(--font-sans)', fontSize: sz.fs, fontWeight: 'var(--fw-semibold)',
        color: solid ? '#fff' : 'var(--text-body)',
        background: solid ? c : 'transparent',
        padding: solid ? '3px 8px' : 0,
        borderRadius: 'var(--radius-xs)',
        letterSpacing: 'var(--ls-snug)', whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {!solid && <span style={{ width: sz.dot, height: sz.dot, borderRadius: '50%', background: c, flex: '0 0 auto', boxShadow: '0 0 0 3px color-mix(in srgb, ' + c + ' 16%, transparent)' }} />}
      {text}
    </span>
  );
}
