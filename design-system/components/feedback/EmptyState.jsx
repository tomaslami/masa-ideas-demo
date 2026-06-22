import React from 'react';

/* Clean, simple line illustrations — warm, minimal, accent used sparingly. */
const ART = {
  search: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <circle cx="33" cy="33" r="17" fill="var(--cream-200)" stroke="var(--line-400)" strokeWidth="2" />
      <path d="M45 45l11 11" stroke="var(--ink-400)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M27 33h12M33 27v12" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
    </svg>
  ),
  map: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <circle cx="36" cy="36" r="24" fill="var(--cream-200)" />
      <path d="M36 22c-6 0-11 5-11 11 0 8 11 17 11 17s11-9 11-17c0-6-5-11-11-11z" fill="#fff" stroke="var(--ink-400)" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="36" cy="33" r="4" fill="var(--accent)" />
    </svg>
  ),
  inbox: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <rect x="16" y="22" width="40" height="30" rx="3" fill="var(--cream-200)" stroke="var(--line-400)" strokeWidth="2" />
      <path d="M16 40h11l3 5h12l3-5h11" fill="#fff" stroke="var(--ink-400)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M30 31h12" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
    </svg>
  ),
  document: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <path d="M24 16h16l12 12v28a2 2 0 0 1-2 2H24a2 2 0 0 1-2-2V18a2 2 0 0 1 2-2z" fill="#fff" stroke="var(--ink-400)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M40 16v12h12" fill="var(--cream-200)" stroke="var(--ink-400)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M29 40h14M29 47h10" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
    </svg>
  ),
  board: (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
      <rect x="18" y="20" width="14" height="20" rx="2" fill="#fff" stroke="var(--line-400)" strokeWidth="2" />
      <rect x="40" y="20" width="14" height="32" rx="2" fill="var(--cream-200)" stroke="var(--line-400)" strokeWidth="2" />
      <path d="M22 27h6M22 32h4" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
};

/**
 * EmptyState — clean SVG illustration + title + optional description and action.
 * art: search | map | inbox | document | board.
 */
export function EmptyState({ art = 'inbox', title, description, action, compact = false, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: compact ? 8 : 10, padding: compact ? '24px 16px' : '44px 24px', ...style }}>
      <div style={{ transform: compact ? 'scale(0.72)' : 'none', marginBottom: compact ? -6 : 0 }}>{ART[art] || ART.inbox}</div>
      {title && <div style={{ fontFamily: 'var(--font-display)', fontSize: compact ? 'var(--text-md)' : 'var(--text-lg)', color: 'var(--text-heading)' }}>{title}</div>}
      {description && <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', maxWidth: 300, lineHeight: 1.5 }}>{description}</div>}
      {action && <div style={{ marginTop: 4 }}>{action}</div>}
    </div>
  );
}
