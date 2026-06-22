'use client';
import React from 'react';

/**
 * Icon — thin wrapper over Lucide icons (loaded from CDN as `window.lucide`).
 * Renders into a ref'd span via innerHTML so React never fights Lucide's
 * placeholder→SVG swap. Inherits `currentColor`.
 *
 * Adapted for Next.js: the CDN script (loaded `beforeInteractive` in the root
 * layout) does not block hydration, so `window.lucide` may not be ready the
 * first time this effect runs. We therefore poll briefly until it is available.
 */
export function Icon({ name, size = 18, strokeWidth = 2, className = '', style = {}, label }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = `<i data-lucide="${name}"></i>`;

    let cancelled = false;
    let tries = 0;

    const applySize = () => {
      const svg = el.querySelector('svg');
      if (svg) {
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.setAttribute('stroke-width', strokeWidth);
        svg.style.display = 'block';
      }
    };

    const run = () => {
      if (cancelled) return;
      if (typeof window !== 'undefined' && window.lucide) {
        try { window.lucide.createIcons(); } catch (e) { /* noop */ }
        applySize();
      } else if (tries++ < 60) {
        setTimeout(run, 50);
      }
    };
    run();

    return () => { cancelled = true; };
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
