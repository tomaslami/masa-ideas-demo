import React from 'react';
import { Icon } from '../icon/Icon.jsx';

/**
 * Badge — small label for counts, categories, metadata.
 * tone: neutral | accent | success | warning | danger | info. variant: soft | solid | outline.
 */
export function Badge({ children, tone = 'neutral', variant = 'soft', icon, size = 'md', style = {} }) {
  const tones = {
    neutral: { fg: 'var(--ink-700)', bg: 'var(--cream-200)', bd: 'var(--border)', solid: 'var(--ink-700)' },
    accent: { fg: 'var(--accent-text)', bg: 'var(--accent-soft)', bd: 'var(--orange-200)', solid: 'var(--accent)' },
    success: { fg: 'var(--ok-fg)', bg: 'var(--ok-bg)', bd: '#BFE0CC', solid: 'var(--success-500)' },
    warning: { fg: 'var(--warn-fg)', bg: 'var(--warn-bg)', bd: '#EAD8A6', solid: 'var(--warning-500)' },
    danger: { fg: 'var(--bad-fg)', bg: 'var(--bad-bg)', bd: '#E6C3BD', solid: 'var(--danger-500)' },
    info: { fg: 'var(--info-fg)', bg: 'var(--info-bg)', bd: '#BFD0E4', solid: 'var(--info-500)' },
  };
  const t = tones[tone] || tones.neutral;
  const sz = size === 'sm' ? { h: 18, fs: 'var(--text-2xs)', px: 6, ic: 11 } : { h: 22, fs: 'var(--text-xs)', px: 8, ic: 12 };
  const styles = {
    soft: { color: t.fg, background: t.bg, border: '1px solid transparent' },
    solid: { color: '#fff', background: t.solid, border: '1px solid transparent' },
    outline: { color: t.fg, background: 'transparent', border: `1px solid ${t.bd}` },
  };
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        height: sz.h, padding: `0 ${sz.px}px`,
        fontFamily: 'var(--font-sans)', fontSize: sz.fs, fontWeight: 'var(--fw-semibold)',
        letterSpacing: 'var(--ls-snug)', lineHeight: 1,
        borderRadius: 'var(--radius-xs)', whiteSpace: 'nowrap',
        ...styles[variant], ...style,
      }}
    >
      {icon && <Icon name={icon} size={sz.ic} />}
      {children}
    </span>
  );
}
