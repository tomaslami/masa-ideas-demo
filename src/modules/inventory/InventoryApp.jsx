'use client';
import React from 'react';
import { Sidebar, Button, IconButton, SegmentedControl, StatusPill, Icon, ImportDialog, EmptyState } from '@/ds';
import { hrefFor } from '@/modules/nav';
import { useRouter } from 'next/navigation';
import { MI_INVENTORY, MI_FMT } from './data';
import { MapView } from './MapView';
import { InventoryPanel } from './InventoryPanel';

const NAV = [
  { section: 'Operación' },
  { id: 'inventario', label: 'Inventario', icon: 'map-pin', badge: 16 },
  { id: 'pipeline', label: 'Pipeline', icon: 'kanban', badge: 18 },
  { id: 'propuestas', label: 'Propuestas', icon: 'file-text' },
  { id: 'clientes', label: 'Clientes', icon: 'users' },
  { divider: true },
  { section: 'Cuenta' },
  { id: 'reportes', label: 'Reportes', icon: 'chart-no-axes-column' },
  { id: 'config', label: 'Configuración', icon: 'settings' },
];

function InventoryTable({ items, fmt, selected, onSelect, proposalIds, onAdd }) {
  if (items.length === 0) {
    return (
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
          <EmptyState art="search" title="Sin carteles" description="Ningún cartel coincide con la búsqueda o los filtros activos." />
        </div>
      </div>
    );
  }
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)' }}>
          <thead>
            <tr style={{ background: 'var(--cream-100)' }}>
              {['Código', 'Dirección', 'Barrio', 'Tipo', 'Medida', 'Estado', 'Cliente', 'Precio / mes', ''].map((h, i) => (
                <th key={i} style={{ textAlign: i === 7 ? 'right' : 'left', padding: '11px 16px', fontSize: 'var(--text-2xs)', fontWeight: 600, letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((b) => (
              <tr key={b.id} onClick={() => onSelect(b.id)}
                style={{ cursor: 'pointer', background: selected === b.id ? 'var(--accent-soft)' : 'transparent' }}>
                <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--accent-text)', fontWeight: 600 }}>{b.id}</td>
                <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-heading)', fontWeight: 500 }}>{b.dir}</td>
                <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{b.barrio}</td>
                <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>{b.tipo}</td>
                <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>{b.medida}</td>
                <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)' }}><StatusPill status={b.estado} size="sm" /></td>
                <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)', color: b.cliente ? 'var(--text-body)' : 'var(--text-faint)' }}>{b.cliente || '—'}</td>
                <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-heading)', fontWeight: 500 }}>{fmt.money(b.precio)}</td>
                <td style={{ padding: '7px 12px', borderBottom: '1px solid var(--border-subtle)', textAlign: 'right' }}>
                  <IconButton icon={proposalIds.includes(b.id) ? 'check' : 'plus'} size="sm"
                    variant={proposalIds.includes(b.id) ? 'primary' : 'ghost'}
                    title="Agregar a propuesta"
                    onClick={(e) => { e.stopPropagation(); if (b.estado !== 'ocupado') onAdd(b.id); }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InventoryApp() {
  const router = useRouter();
  const all = MI_INVENTORY;
  const fmt = MI_FMT;
  const [view, setView] = React.useState('mapa');
  const [query, setQuery] = React.useState('');
  const [status, setStatus] = React.useState([]);
  const [barrios, setBarrios] = React.useState([]);
  const [tipos, setTipos] = React.useState([]);
  const [ilumOnly, setIlumOnly] = React.useState(false);
  const [selected, setSelected] = React.useState('MI-1097');
  const [proposalIds, setProposalIds] = React.useState(['MI-0245']);
  const [toast, setToast] = React.useState(null);
  const [importOpen, setImportOpen] = React.useState(false);

  const items = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((b) => {
      if (status.length && !status.includes(b.estado)) return false;
      if (barrios.length && !barrios.includes(b.barrio)) return false;
      if (tipos.length && !tipos.includes(b.tipo)) return false;
      if (ilumOnly && !b.ilum) return false;
      if (q && !(`${b.id} ${b.dir} ${b.barrio} ${b.tipo}`.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [all, query, status, barrios, tipos, ilumOnly]);

  const matchedIds = React.useMemo(() => new Set(items.map((b) => b.id)), [items]);
  const filtersActive = status.length > 0 || barrios.length > 0 || tipos.length > 0 || ilumOnly || query.trim() !== '';

  // KPIs del inventario completo (salud de la cartera)
  const kpi = React.useMemo(() => {
    const ocupados = all.filter((b) => b.estado === 'ocupado').length;
    const ingreso = all.filter((b) => b.estado === 'ocupado' || b.estado === 'reservado').reduce((a, b) => a + b.precio, 0);
    const hoy = new Date('2026-06-21T00:00');
    const porVencer = all.filter((b) => {
      if (!b.vence) return false;
      const d = (new Date(b.vence + 'T00:00') - hoy) / 864e5;
      return d >= 0 && d <= 30;
    }).length;
    return { ocupacionPct: Math.round((ocupados / all.length) * 100), ingresoShort: fmt.moneyShort(ingreso), porVencer };
  }, [all, fmt]);

  const toggleStatus = (s) => setStatus((cur) => cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]);
  const toggleBarrio = (b) => setBarrios((cur) => cur.includes(b) ? cur.filter((x) => x !== b) : [...cur, b]);
  const toggleTipo = (t) => setTipos((cur) => cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]);
  const clearAll = () => { setStatus([]); setBarrios([]); setTipos([]); setIlumOnly(false); setQuery(''); };
  const addToProposal = (id) => {
    setProposalIds((cur) => {
      if (cur.includes(id)) return cur;
      const b = all.find((x) => x.id === id);
      setToast(`${id} · ${b.dir} agregado a la propuesta`);
      return [...cur, id];
    });
  };
  React.useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2600); return () => clearTimeout(t); }, [toast]);

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--bg-page)' }}>
      <Sidebar
        logoSrc="/brand/logo_mark.png"
        brand="Masa Ideas" product="Gestión interna"
        items={NAV} active="inventario" onSelect={(id) => router.push(hrefFor(id))}
        user={{ name: 'Lucía Fernández', role: 'Ejecutiva comercial' }}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Topbar */}
        <header style={{ height: 'var(--topbar-h)', flex: '0 0 var(--topbar-h)', display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <h2 style={{ fontSize: 'var(--text-2xl)' }}>Inventario</h2>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-faint)' }}>CABA · vía pública</span>
          </div>
          <div style={{ flex: 1 }} />
          <SegmentedControl value={view} onChange={setView}
            options={[{ value: 'mapa', label: 'Mapa', icon: 'map' }, { value: 'lista', label: 'Lista', icon: 'list' }]} />
          <div style={{ width: 1, height: 26, background: 'var(--border)' }} />
          <Button variant="secondary" icon="file-down" size="md">Propuesta
            <span style={{ marginLeft: 6, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700, color: '#fff', background: 'var(--accent)', borderRadius: 999, padding: '1px 7px' }}>{proposalIds.length}</span>
          </Button>
          <div style={{ width: 1, height: 26, background: 'var(--border)' }} />
          <Button variant="secondary" icon="file-up" onClick={() => setImportOpen(true)}>Importar</Button>
          <Button variant="primary" icon="plus">Nuevo cartel</Button>
        </header>

        {/* Body */}
        {view === 'mapa' ? (
          <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
            <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
              <MapView mapSrc="/inventory/ba-map.png" items={all} selected={selected}
                onSelect={setSelected} dimUnmatched={filtersActive} matchedIds={matchedIds}
                fmt={fmt} onAdd={addToProposal} proposalIds={proposalIds} />
            </div>
            <InventoryPanel items={items} all={all} selected={selected} fmt={fmt} kpi={kpi}
              query={query} setQuery={setQuery} status={status} toggleStatus={toggleStatus}
              barrios={barrios} toggleBarrio={toggleBarrio} tipos={tipos} toggleTipo={toggleTipo}
              ilumOnly={ilumOnly} setIlumOnly={setIlumOnly} clearAll={clearAll} proposalIds={proposalIds}
              onSelect={setSelected} onAdd={addToProposal} />
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            <div style={{ padding: '14px 24px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--text-heading)' }}>{items.length}</strong> carteles</span>
            </div>
            <InventoryTable items={items} fmt={fmt} selected={selected} onSelect={setSelected} proposalIds={proposalIds} onAdd={addToProposal} />
          </div>
        )}
      </div>

      <ImportDialog open={importOpen} onClose={() => setImportOpen(false)} entity="carteles" rows={16}
        onImported={(n) => setToast(`${n} carteles importados desde Excel`)} />

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 800, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--char-900)', color: 'var(--text-on-dark)', padding: '11px 16px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', fontSize: 'var(--text-sm)' }}>
          <Icon name="circle-check" size={17} style={{ color: 'var(--status-disponible)' }} />
          {toast}
        </div>
      )}
    </div>
  );
}

export { InventoryApp };
