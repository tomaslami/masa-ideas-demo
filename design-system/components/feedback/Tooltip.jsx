import React from 'react';

/**
 * Tooltip — dark label on hover/focus. Wraps a single trigger child.
 * placement: top | bottom | left | right.
 */
export function Tooltip({ label, placement = 'top', children, style = {} }) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', mb: 8 },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', mt: 8 },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', mr: 8 },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', ml: 8 },
  }[placement];
  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          role="tooltip"
          style={{
            position: 'absolute', zIndex: 'var(--z-popover)',
            bottom: pos.bottom, top: pos.top, left: pos.left, right: pos.right,
            transform: pos.transform,
            marginBottom: pos.mb, marginTop: pos.mt, marginLeft: pos.ml, marginRight: pos.mr,
            padding: '5px 9px',
            background: 'var(--char-900)', color: 'var(--text-on-dark)',
            fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-medium)',
            borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-md)',
            whiteSpace: 'nowrap', pointerEvents: 'none',
            ...style,
          }}
        >
          {label}
        </span>
      )}
    </span>
  );
}
