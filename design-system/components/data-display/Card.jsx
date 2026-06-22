import React from 'react';

/**
 * Card — white surface container. Optional padding, header/footer slots.
 * elevation: flat | sm | md. interactive adds hover lift.
 */
export function Card({ children, header, footer, padding = 'md', elevation = 'sm', interactive = false, onClick, style = {}, bodyStyle = {} }) {
  const pads = { none: 0, sm: 'var(--space-4)', md: 'var(--space-6)', lg: 'var(--space-7)' };
  const shadows = { flat: 'none', sm: 'var(--shadow-sm)', md: 'var(--shadow-md)' };
  const [hover, setHover] = React.useState(false);
  const p = pads[padding] ?? pads.md;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: interactive && hover ? 'var(--shadow-md)' : shadows[elevation],
        transform: interactive && hover ? 'translateY(-1px)' : 'none',
        cursor: interactive ? 'pointer' : undefined,
        transition: 'box-shadow var(--dur) var(--ease-out), transform var(--dur) var(--ease-out)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {header && (
        <div style={{ padding: `var(--space-4) ${typeof p === 'number' ? p : p}`, borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          {header}
        </div>
      )}
      <div style={{ padding: p, ...bodyStyle }}>{children}</div>
      {footer && (
        <div style={{ padding: `var(--space-4) ${typeof p === 'number' ? p : p}`, borderTop: '1px solid var(--border-subtle)', background: 'var(--cream-100)' }}>
          {footer}
        </div>
      )}
    </div>
  );
}
