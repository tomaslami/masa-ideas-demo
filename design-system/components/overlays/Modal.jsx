import React from 'react';
import { IconButton } from '../actions/IconButton.jsx';
import { Icon } from '../icon/Icon.jsx';

/**
 * Modal — centered dialog shell with scrim, optional icon chip, header, body, footer.
 * Closes on Esc and scrim click. Near-square 6px corners.
 */
export function Modal({ open, onClose, title, subtitle, icon, iconTone = 'accent', children, footer, width = 520, style = {} }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape' && onClose) onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const tones = {
    accent: { bg: 'var(--accent-soft)', fg: 'var(--accent-text)' },
    neutral: { bg: 'var(--cream-200)', fg: 'var(--text-muted)' },
    success: { bg: 'var(--ok-bg)', fg: 'var(--ok-fg)' },
  };
  const t = tones[iconTone] || tones.accent;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 'var(--z-modal)',
        background: 'rgba(28,27,26,0.38)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
        animation: 'mi-fade var(--dur) var(--ease-out)',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width, maxWidth: '100%', maxHeight: '90vh',
          display: 'flex', flexDirection: 'column',
          background: 'var(--surface-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          animation: 'mi-pop var(--dur) var(--ease-out)',
          ...style,
        }}
      >
        {(title || icon) && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 13, padding: '18px 20px 14px', borderBottom: '1px solid var(--border-subtle)' }}>
            {icon && (
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 38, height: 38, flex: '0 0 auto', borderRadius: 'var(--radius-md)', background: t.bg, color: t.fg }}>
                <Icon name={icon} size={20} />
              </span>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              {title && <h3 style={{ fontSize: 'var(--text-xl)', lineHeight: 1.2 }}>{title}</h3>}
              {subtitle && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 3 }}>{subtitle}</p>}
            </div>
            <IconButton icon="x" size="sm" title="Cerrar" onClick={onClose} />
          </div>
        )}
        <div style={{ padding: 20, overflowY: 'auto' }}>{children}</div>
        {footer && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '14px 20px', borderTop: '1px solid var(--border-subtle)', background: 'var(--cream-100)' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
