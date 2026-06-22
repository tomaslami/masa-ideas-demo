'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, EmptyState, Button } from '@/ds';
import { NAV, hrefFor, USER, LOGO_SRC } from './nav';

/**
 * PlaceholderApp — shell for nav items that don't have a module yet
 * (Clientes, Reportes, Configuración). Keeps the sidebar fully navigable so
 * no link dead-ends.
 */
export function PlaceholderApp({ active, title, subtitle, art = 'inbox' }) {
  const router = useRouter();
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--bg-page)' }}>
      <Sidebar
        logoSrc={LOGO_SRC}
        brand="Masa Ideas"
        product="Gestión interna"
        items={NAV}
        active={active}
        onSelect={(id) => router.push(hrefFor(id))}
        user={USER}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ height: 'var(--topbar-h)', flex: '0 0 var(--topbar-h)', display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: 'var(--text-2xl)' }}>{title}</h2>
        </header>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <EmptyState
            art={art}
            title="En construcción"
            description={subtitle}
            action={<Button variant="secondary" icon="arrow-left" onClick={() => router.push('/inventario')}>Volver al inventario</Button>}
          />
        </div>
      </div>
    </div>
  );
}
