'use client';
import React from 'react';

/**
 * Thumbnail — image, or a clean SVG placeholder when none is loaded yet.
 * kind: billboard | image | map. Use for billboard photos in fichas/proposals.
 */
export function Thumbnail({ src, kind = 'billboard', width = '100%', height, ratio = '4 / 3', rounded = true, label, style = {} }) {
  const art = {
    billboard: (
      <svg width="46" height="46" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <rect x="8" y="10" width="48" height="28" rx="2" fill="#fff" stroke="var(--ink-400)" strokeWidth="2" />
        <path d="M16 22h22M16 29h14" stroke="var(--line-400)" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 38v16M40 38v16M20 54h8M36 54h8" stroke="var(--ink-400)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    image: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <rect x="10" y="12" width="44" height="40" rx="3" fill="#fff" stroke="var(--ink-400)" strokeWidth="2" />
        <circle cx="23" cy="25" r="4" fill="var(--accent)" />
        <path d="M14 46l12-12 8 7 7-6 9 11" stroke="var(--ink-400)" strokeWidth="2" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    map: (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path d="M32 14c-7 0-12 5-12 12 0 9 12 22 12 22s12-13 12-22c0-7-5-12-12-12z" fill="#fff" stroke="var(--ink-400)" strokeWidth="2" strokeLinejoin="round" />
        <circle cx="32" cy="26" r="5" fill="var(--accent)" />
      </svg>
    ),
  }[kind] || null;

  return (
    <div
      title={label}
      style={{
        position: 'relative', width, height,
        aspectRatio: height ? undefined : ratio,
        background: src ? 'var(--cream-200)' : 'var(--cream-100)',
        backgroundImage: src ? `url(${src})` : 'repeating-linear-gradient(135deg, transparent, transparent 9px, rgba(180,170,150,0.10) 9px, rgba(180,170,150,0.10) 10px)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        border: '1px solid var(--border)',
        borderRadius: rounded ? 'var(--radius-md)' : 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--text-faint)', overflow: 'hidden', flex: '0 0 auto',
        ...style,
      }}
    >
      {!src && art}
    </div>
  );
}
