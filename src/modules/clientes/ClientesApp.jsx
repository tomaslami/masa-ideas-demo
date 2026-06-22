'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { hrefFor, NAV, USER, LOGO_SRC } from '@/modules/nav';
import { Sidebar, Button, Stat, StatusPill, Avatar, Icon, Input, Select, Modal, ImportDialog, EmptyState } from '@/ds';
import { MI_CLIENTES, MI_CLIENTES_FMT } from './data';
import { ClienteDrawer } from './ClienteDrawer';

const ESTADOS = {
  activo: { label: 'Activo', color: 'var(--success-500)' },
  prospecto: { label: 'Prospecto', color: 'var(--accent)' },
  inactivo: { label: 'Inactivo', color: 'var(--ink-400)' },
};
const ESTADO_CHIPS = ['activo', 'prospecto', 'inactivo'];
const RUBROS = ['Bebidas', 'Automotriz', 'Finanzas', 'Telecom', 'Salud', 'Retail', 'Servicios', 'Fitness', 'Inmobiliaria', 'Educación'];

/* ---------- Tabla de clientes (estilo DealList) ---------- */
function ClientesTable({ clientes, fmt, onOpen }) {
  if (clientes.length === 0) {
    return (
      <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
          <EmptyState art="inbox" title="Sin clientes" description="Ningún cliente coincide con la búsqueda o los filtros activos." />
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
              {['Cliente', 'Contacto', 'Estado', 'Oportunidades', 'Carteles', 'Facturación'].map((h, i) => (
                <th key={i} style={{ textAlign: i >= 3 ? 'right' : 'left', padding: '11px 16px', fontSize: 'var(--text-2xs)', fontWeight: 600, letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => {
              const estado = ESTADOS[c.estado] || ESTADOS.inactivo;
              return (
                <tr key={c.id} onClick={() => onOpen(c.id)} style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar name={c.nombre} size={30} square />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--text-heading)' }}>{c.nombre}</div>
                        <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-faint)' }}>{c.rubro}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>{c.contacto}</div>
                    <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-faint)' }}>{c.email}</div>
                  </td>
                  <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <StatusPill label={estado.label} color={estado.color} size="sm" />
                  </td>
                  <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', fontVariantNumeric: 'tabular-nums' }}>{c.oportunidades}</td>
                  <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-body)', fontVariantNumeric: 'tabular-nums' }}>{c.carteles}</td>
                  <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-heading)', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>{c.facturacion ? fmt.money(c.facturacion) : '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- Modal Nuevo cliente ---------- */
function NuevoClienteModal({ open, onClose, onCreate }) {
  const [form, setForm] = React.useState({ nombre: '', contacto: '', email: '', telefono: '', rubro: '', estado: 'prospecto' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  React.useEffect(() => { if (open) setForm({ nombre: '', contacto: '', email: '', telefono: '', rubro: '', estado: 'prospecto' }); }, [open]);

  const footer = (
    <>
      <Button variant="secondary" onClick={onClose}>Cancelar</Button>
      <Button variant="primary" icon="check" onClick={() => onCreate(form)}>Crear cliente</Button>
    </>
  );

  return (
    <Modal open={open} onClose={onClose} icon="user-plus" title="Nuevo cliente"
      subtitle="Cargá una cuenta para sumarla a tu cartera y al pipeline." footer={footer}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Input label="Razón social" icon="building-2" placeholder="Ej. Cervecería del Plata" value={form.nombre} onChange={set('nombre')} />
        <div style={{ display: 'flex', gap: 14 }}>
          <Input label="Persona de contacto" icon="user" placeholder="Nombre y apellido" value={form.contacto} onChange={set('contacto')} />
          <Input label="Email" icon="mail" placeholder="nombre@empresa.com" value={form.email} onChange={set('email')} />
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          <Input label="Teléfono" icon="phone" placeholder="+54 11 ..." value={form.telefono} onChange={set('telefono')} />
          <Select label="Rubro" placeholder="Elegí un rubro" options={RUBROS} value={form.rubro} onChange={set('rubro')} />
        </div>
        <Select label="Estado" value={form.estado} onChange={set('estado')}
          options={[{ value: 'activo', label: 'Activo' }, { value: 'prospecto', label: 'Prospecto' }, { value: 'inactivo', label: 'Inactivo' }]} />
      </div>
    </Modal>
  );
}

/* ---------- Chip de filtro de estado ---------- */
function EstadoChip({ estado, on, onToggle }) {
  const def = ESTADOS[estado];
  return (
    <button type="button" onClick={onToggle}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px',
        background: on ? 'var(--accent-soft)' : 'var(--surface-card)',
        border: `1px solid ${on ? 'var(--orange-300)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-pill)', color: on ? 'var(--accent-text)' : 'var(--text-body)',
        fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
      }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: def.color }} />
      {def.label}
    </button>
  );
}

function ClientesApp() {
  const router = useRouter();
  const fmt = MI_CLIENTES_FMT;
  const [clientes, setClientes] = React.useState(MI_CLIENTES);
  const [query, setQuery] = React.useState('');
  const [estados, setEstados] = React.useState([]);
  const [open, setOpen] = React.useState(null);
  const [importOpen, setImportOpen] = React.useState(false);
  const [nuevoOpen, setNuevoOpen] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return clientes.filter((c) => {
      if (estados.length && !estados.includes(c.estado)) return false;
      if (q && !(`${c.id} ${c.nombre} ${c.contacto} ${c.rubro}`.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [clientes, query, estados]);

  const toggleEstado = (s) => setEstados((cur) => cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]);

  const kpi = React.useMemo(() => {
    const activos = clientes.filter((c) => c.estado === 'activo').length;
    const facturacion = clientes.reduce((a, c) => a + c.facturacion, 0);
    const hoy = new Date('2026-06-22T00:00');
    const nuevosMes = clientes.filter((c) => {
      const d = new Date(c.ultimaActividad + 'T00:00');
      return c.desde === hoy.getFullYear() && d.getMonth() === hoy.getMonth();
    }).length;
    return { total: clientes.length, activos, facturacion: fmt.moneyShort(facturacion), nuevosMes };
  }, [clientes, fmt]);

  const openCliente = clientes.find((c) => c.id === open);

  const createCliente = (form) => {
    const n = clientes.length + 1;
    const id = 'CL-' + String(42 + n).padStart(3, '0');
    setClientes((cur) => [
      { id, nombre: form.nombre || 'Cliente sin nombre', contacto: form.contacto, email: form.email, telefono: form.telefono || '+54 11 ', rubro: form.rubro || 'Servicios', estado: form.estado || 'prospecto', oportunidades: 0, carteles: 0, facturacion: 0, ultimaActividad: '2026-06-22', owner: USER.name, desde: 2026 },
      ...cur,
    ]);
    setNuevoOpen(false);
    setToast(`Cliente creado · ${form.nombre || 'nuevo cliente'}`);
  };

  React.useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2600); return () => clearTimeout(t); }, [toast]);

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--bg-page)' }}>
      <Sidebar
        logoSrc={LOGO_SRC} brand="Masa Ideas" product="Gestión interna"
        items={NAV} active="clientes" onSelect={(id) => router.push(hrefFor(id))} user={USER}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
        {/* Topbar — con aire (auto height) */}
        <header style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: 'var(--text-2xl)' }}>Clientes</h2>
          <div style={{ width: 240 }}>
            <Input icon="search" placeholder="Buscar cliente…" size="sm" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ width: 1, height: 26, background: 'var(--border)' }} />
          <Button variant="secondary" icon="file-up" onClick={() => setImportOpen(true)}>Importar</Button>
          <Button variant="primary" icon="plus" onClick={() => setNuevoOpen(true)}>Nuevo cliente</Button>
        </header>

        {/* KPI strip */}
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 28, padding: '18px 24px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border)' }}>
          <Stat label="Total clientes" value={kpi.total} icon="users" />
          <div style={{ width: 1, background: 'var(--border)' }} />
          <Stat label="Activos" value={kpi.activos} icon="circle-check" />
          <div style={{ width: 1, background: 'var(--border)' }} />
          <Stat label="Facturación anual" value={kpi.facturacion} icon="trending-up" delta="+8%" deltaLabel="vs año anterior" />
          <div style={{ width: 1, background: 'var(--border)' }} />
          <Stat label="Nuevos este mes" value={kpi.nuevosMes} icon="user-plus" />
        </div>

        {/* Body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {/* filtros + conteo */}
          <div style={{ padding: '14px 24px 0', display: 'flex', alignItems: 'center', gap: 9, flexWrap: 'wrap' }}>
            {ESTADO_CHIPS.map((s) => (
              <EstadoChip key={s} estado={s} on={estados.includes(s)} onToggle={() => toggleEstado(s)} />
            ))}
            <div style={{ flex: 1 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
              <strong style={{ color: 'var(--text-heading)' }}>{filtered.length}</strong> / {clientes.length}
            </span>
          </div>

          <ClientesTable clientes={filtered} fmt={fmt} onOpen={setOpen} />
        </div>

        {open && <ClienteDrawer cliente={openCliente} fmt={fmt} onClose={() => setOpen(null)} />}
      </div>

      <ImportDialog open={importOpen} onClose={() => setImportOpen(false)} entity="clientes" rows={11}
        onImported={(n) => setToast(`Importados ${n} clientes desde Excel`)} />

      <NuevoClienteModal open={nuevoOpen} onClose={() => setNuevoOpen(false)} onCreate={createCliente} />

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 800, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--char-900)', color: 'var(--text-on-dark)', padding: '11px 16px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', fontSize: 'var(--text-sm)' }}>
          <Icon name="circle-check" size={17} style={{ color: 'var(--success-500)' }} />
          {toast}
        </div>
      )}
    </div>
  );
}

export { ClientesApp };
