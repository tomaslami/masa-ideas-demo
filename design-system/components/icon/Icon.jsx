import React from 'react';

/**
 * Icon — thin wrapper over Lucide icons (loaded from CDN as `window.lucide`).
 * Renders into a ref'd span via innerHTML so React never fights Lucide's
 * placeholder→SVG swap. Inherits `currentColor`.
 */
export function Icon({ name, size = 18, strokeWidth = 2, className = '', style = {}, label }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = `<i data-lucide="${name}"></i>`;
    if (typeof window !== 'undefined' && window.lucide) {
      try { window.lucide.createIcons(); } catch (e) { /* noop */ }
    }
    const svg = el.querySelector('svg');
    if (svg) {
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('stroke-width', strokeWidth);
      svg.style.display = 'block';
    }
  }, [name, size, strokeWidth]);

  return (
    <span
      ref={ref}
      className={`mi-icon ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 0,
        width: size,
        height: size,
        flex: '0 0 auto',
        color: 'inherit',
        ...style,
      }}
    />
  );
}
