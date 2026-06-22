const { Sidebar, Button, Stat, SegmentedControl, Icon, Input, ImportDialog } = window.DesignSystem_27db72;

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

function PipelineApp() {
  const fmt = window.MI_CRM_FMT;
  const [deals, setDeals] = React.useState(window.MI_DEALS);
  const [view, setView] = React.useState('tablero');
  const [open, setOpen] = React.useState(null);
  const [query, setQuery] = React.useState('');
  const [importOpen, setImportOpen] = React.useState(false);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return deals;
    return deals.filter((d) => `${d.id} ${d.cliente} ${d.contacto} ${d.tag} ${d.owner}`.toLowerCase().includes(q));
  }, [deals, query]);

  const move = (id, etapa) => setDeals((cur) => cur.map((d) => (d.id === id ? { ...d, etapa, prob: etapa === 'ganado' ? 100 : d.prob } : d)));
  const openDeal = deals.find((d) => d.id === open);

  const totalPond = deals.filter((d) => d.etapa !== 'ganado').reduce((a, d) => a + d.valor * d.prob / 100, 0);
  const ganadoMes = deals.filter((d) => d.etapa === 'ganado').reduce((a, d) => a + d.valor, 0);
  const abiertas = deals.filter((d) => d.etapa !== 'ganado').length;

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--bg-page)' }}>
      <Sidebar logoSrc="../../assets/logo_mark.png" brand="Masa Ideas" product="Gestión interna"
        items={NAV} active="pipeline" onSelect={() => {}}
        user={{ name: 'Lucía Fernández', role: 'Ejecutiva comercial' }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
        {/* Topbar */}
        <header style={{ height: 'var(--topbar-h)', flex: '0 0 var(--topbar-h)', display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: 'var(--text-2xl)' }}>Pipeline comercial</h2>
          <div style={{ width: 220 }}>
            <Input icon="search" placeholder="Buscar oportunidad…" size="sm" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div style={{ flex: 1 }} />
          <SegmentedControl value={view} onChange={setView}
            options={[{ value: 'tablero', label: 'Tablero', icon: 'kanban' }, { value: 'lista', label: 'Lista', icon: 'list' }]} />
          <div style={{ width: 1, height: 26, background: 'var(--border)' }} />
          <Button variant="secondary" icon="file-up" onClick={() => setImportOpen(true)}>Importar</Button>
          <Button variant="primary" icon="plus">Nueva oportunidad</Button>
        </header>

        {/* KPI strip */}
        <div style={{ display: 'flex', gap: 28, padding: '14px 24px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border)' }}>
          <Stat label="Pipeline ponderado" value={fmt.moneyShort(totalPond)} icon="trending-up" delta="+12%" deltaLabel="vs mes anterior" />
          <div style={{ width: 1, background: 'var(--border)' }} />
          <Stat label="Ganado este mes" value={fmt.moneyShort(ganadoMes)} icon="circle-check" />
          <div style={{ width: 1, background: 'var(--border)' }} />
          <Stat label="Oportunidades abiertas" value={abiertas} icon="folder-open" />
          <div style={{ width: 1, background: 'var(--border)' }} />
          <Stat label="Tasa de cierre" value="34" unit="%" icon="target" delta="+3 pts" />
        </div>

        {/* Body */}
        {view === 'tablero'
          ? <window.KanbanBoard deals={filtered} fmt={fmt} onOpen={setOpen} onMove={move} />
          : <window.DealList deals={filtered} fmt={fmt} onOpen={setOpen} />}

        {open && <window.DealDrawer deal={openDeal} fmt={fmt} onClose={() => setOpen(null)} onMove={move} />}
      </div>

      <ImportDialog open={importOpen} onClose={() => setImportOpen(false)} entity="oportunidades" rows={12} />
    </div>
  );
}

window.PipelineApp = PipelineApp;
