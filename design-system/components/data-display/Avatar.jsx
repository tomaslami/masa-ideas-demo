import React from 'react';

/** Avatar — initials or image. Warm-tinted fallback. */
const PALETTE = ['#D8530C', '#2F8F5B', '#3A6EA5', '#A01020', '#C98A12', '#6E4A2B'];
function hashIndex(str = '') {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h % PALETTE.length;
}
function initials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase() || '?';
}

export function Avatar({ name = '', src, size = 32, color, square = false, style = {} }) {
  const sz = typeof size === 'number' ? size : { sm: 24, md: 32, lg: 40 }[size] || 32;
  const bg = color || PALETTE[hashIndex(name)];
  return (
    <span
      title={name}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: sz, height: sz, flex: '0 0 auto',
        borderRadius: square ? 'var(--radius-sm)' : '50%',
        background: src ? 'var(--cream-200)' : bg,
        color: '#fff',
        fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-semibold)',
        fontSize: Math.round(sz * 0.4), letterSpacing: 0,
        overflow: 'hidden', userSelect: 'none',
        ...style,
      }}
    >
      {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials(name)}
    </span>
  );
}
