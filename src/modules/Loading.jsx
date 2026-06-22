'use client';
import React from 'react';

/** Full-screen loading state shown while a client-only module bundle loads. */
export function Loading() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-page)',
        color: 'var(--text-faint)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
      }}
    >
      Cargando…
    </div>
  );
}
