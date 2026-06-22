const { Icon, Input, StatusPill, IconButton, EmptyState } = window.DesignSystem_27db72;

const STATUSES = ['disponible', 'reservado', 'ocupado', 'mantenimiento'];

/* ---------- KPI strip (estado global del inventario) ---------- */
function Kpi({ label, value, tone }) {
  const color = tone === 'warn' ? 'var(--warning-700, #8a5d05)' : tone === 'accent' ? 'var(--accent-text)' : 'var(--text-heading)';
  return (
    <div style={{ flex: 1, minWidth: 0, padding: '0 12px' }}>
      <div className="eyebrow" style={{ fontSize: 10, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-lg)', fontWeight: 600, color, marginTop: 3, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  );
}

function KpiStrip({ kpi }) {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', padding: '12px 4px', borderBottom: '1px solid var(--border)', background: 'var(--cream-100)' }}>
      <Kpi label="Ocupación" value={kpi.ocupacionPct + '%'} />
      <div style={{ width: 1, background: 'var(--border)' }} />
      <Kpi label="Ingreso / mes" value={kpi.ingresoShort} tone="accent" />
      <div style={{ width: 1, background: 'var(--border)' }} />
      <Kpi label="Vencen 30d" value={kpi.porVencer} tone={kpi.porVencer > 0 ? 'warn' : 'default'} />
    </div>
  );
}

/* ---------- Búsqueda estilo Google Maps (autocomplete) ---------- */
function SearchBox({ all, query, setQuery, onPickCartel, onPickBarrio }) {
  const [open, setOpen] = React.useState(false);
  const q = query.trim().toLowerCase();

  const sugg = React.useMemo(() => {
    if (!q) return { barrios: [], carteles: [] };
    const barrioMap = {};
    all.forEach((b) => {
      if (b.barrio.toLowerCase().includes(q)) {
        barrioMap[b.barrio] = barrioMap[b.barrio] || { barrio: b.barrio, zona: b.zona, n: 0 };
        barrioMap[b.barrio].n++;
      }
    });
    const barrios = Object.values(barrioMap).slice(0, 3);
    const carteles = all
      .filter((b) => `${b.id} ${b.dir}`.toLowerCase().includes(q))
      .slice(0, 5);
    return { barrios, carteles };
  }, [all, q]);

  const hasSugg = sugg.barrios.length > 0 || sugg.carteles.length > 0;

  return (
    <div style={{ position: 'relative' }}>
      <Input
        icon="search"
        placeholder="Buscar dirección, código o localidad…"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 140)}
        size="md"
      />
      {open && q && (
        <div
          style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 60,
            background: 'var(--surface-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-popover)',
            overflow: 'hidden', maxHeight: 360, overflowY: 'auto',
          }}
        >
          {!hasSugg && (
            <div style={{ padding: '14px 14px', fontSize: 'var(--text-sm)', color: 'var(--text-faint)' }}>Sin coincidencias para “{query}”.</div>
          )}
          {sugg.barrios.length > 0 && (
            <div>
              <div className="eyebrow" style={{ fontSize: 10, padding: '9px 14px 4px', color: 'var(--text-faint)' }}>Localidades</div>
              {sugg.barrios.map((s) => (
                <button key={s.barrio} type="button"
                  onMouseDown={(e) => { e.preventDefault(); onPickBarrio(s.barrio); setOpen(false); }}
                  style={sgStyle}>
                  <span style={sgIcon('var(--accent-soft)', 'var(--accent-text)')}><Icon name="map" size={15} /></span>
                  <span style={{ flex: 1, textAlign: 'left' }}>
                    <span style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-heading)' }}>{s.barrio}</span>
                    <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-faint)' }}>Zona {s.zona} · {s.n} {s.n === 1 ? 'cartel' : 'carteles'}</span>
                  </span>
                  <Icon name="arrow-up-right" size={14} style={{ color: 'var(--text-faint)' }} />
                </button>
              ))}
            </div>
          )}
          {sugg.carteles.length > 0 && (
            <div style={{ borderTop: sugg.barrios.length > 0 ? '1px solid var(--border-subtle)' : 'none' }}>
              <div className="eyebrow" style={{ fontSize: 10, padding: '9px 14px 4px', color: 'var(--text-faint)' }}>Carteles</div>
              {sugg.carteles.map((b) => (
                <button key={b.id} type="button"
                  onMouseDown={(e) => { e.preventDefault(); onPickCartel(b.id); setOpen(false); }}
                  style={sgStyle}>
                  <span style={sgIcon('var(--cream-200)', 'var(--text-muted)')}><Icon name="map-pin" size={15} /></span>
                  <span style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.dir}</span>
                    <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-faint)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-text)' }}>{b.id}</span> · {b.barrio}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
const sgStyle = { display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' };
const sgIcon = (bg, fg) => ({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 'var(--radius-sm)', background: bg, color: fg, flex: '0 0 auto' });

/* ---------- Popover de filtro reutilizable ---------- */
function FilterDropdown({ icon, label, count, children, align = 'left' }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  const active = count > 0;
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button type="button" onClick={() => setOpen((o) => !o)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 10px',
          background: active ? 'var(--accent-soft)' : 'var(--surface-card)',
          border: `1px solid ${active ? 'var(--orange-300)' : 'var(--border)'}`,
          borderRadius: 'var(--radius-control)',
          color: active ? 'var(--accent-text)' : 'var(--text-body)',
          fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
        }}>
        <Icon name={icon} size={14} />
        {label}{active ? ` · ${count}` : ''}
        <Icon name="chevron-down" size={13} style={{ opacity: 0.7 }} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', [align]: 0, zIndex: 70, minWidth: 220,
          background: 'var(--surface-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-popover)', overflow: 'hidden',
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

function CheckItem({ label, sub, checked, onToggle }) {
  return (
    <button type="button" onClick={onToggle}
      style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '7px 12px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
      <span style={{
        width: 16, height: 16, borderRadius: 'var(--radius-xs)', flex: '0 0 auto',
        border: `1.5px solid ${checked ? 'var(--accent)' : 'var(--border-strong)'}`,
        background: checked ? 'var(--accent)' : 'transparent',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>{checked && <Icon name="check" size={12} style={{ color: '#fff' }} />}</span>
      <span style={{ flex: 1, fontSize: 'var(--text-sm)', color: 'var(--text-heading)', fontWeight: checked ? 600 : 400 }}>{label}</span>
      {sub != null && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--text-faint)' }}>{sub}</span>}
    </button>
  );
}

/* ---------- Fila de cartel ---------- */
function Row({ b, selected, fmt, inProposal, onSelect, onAdd }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={() => onSelect(b.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', gap: 11, padding: '12px 16px', cursor: 'pointer',
        background: selected ? 'var(--accent-soft)' : hover ? 'var(--surface-hover)' : 'transparent',
        borderLeft: `2px solid ${selected ? 'var(--accent)' : 'transparent'}`,
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'background var(--dur-fast) var(--ease-out)',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent-text)', fontWeight: 600 }}>{b.id}</span>
          {b.ilum && <Icon name="lightbulb" size={12} style={{ color: 'var(--warning-500)' }} />}
        </div>
        <div style={{ fontSize: 'var(--text-base)', color: 'var(--text-heading)', fontWeight: 'var(--fw-medium)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.dir}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}>
          <StatusPill status={b.estado} size="sm" />
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)' }}>{b.barrio} · {b.medida}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-heading)', fontWeight: 500, whiteSpace: 'nowrap' }}>{fmt.money(b.precio)}</span>
        {hover || inProposal ? (
          <IconButton
            icon={inProposal ? 'check' : 'plus'}
            size="sm"
            variant={inProposal ? 'primary' : 'secondary'}
            title={inProposal ? 'En la propuesta' : 'Agregar a propuesta'}
            onClick={(e) => { e.stopPropagation(); if (b.estado !== 'ocupado') onAdd(b.id); }}
          />
        ) : (
          <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-faint)', fontFamily: 'var(--font-sans)' }}>/ mes</span>
        )}
      </div>
    </div>
  );
}

/** InventoryPanel — right rail: KPIs + búsqueda + filtros + lista de carteles. */
function InventoryPanel({ items, all, selected, fmt, kpi, query, setQuery, status, toggleStatus, ilumOnly, setIlumOnly, barrios, toggleBarrio, tipos, toggleTipo, clearAll, proposalIds, onSelect, onAdd }) {
  // localidades agrupadas por zona, con conteo
  const byZona = React.useMemo(() => {
    const m = {};
    all.forEach((b) => {
      m[b.zona] = m[b.zona] || {};
      m[b.zona][b.barrio] = (m[b.zona][b.barrio] || 0) + 1;
    });
    return m;
  }, [all]);
  const tipoList = React.useMemo(() => {
    const m = {};
    all.forEach((b) => { m[b.tipo] = (m[b.tipo] || 0) + 1; });
    return Object.entries(m);
  }, [all]);

  const anyFilter = status.length || ilumOnly || barrios.length || tipos.length || query.trim();

  return (
    <div style={{ width: 372, flex: '0 0 372px', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--surface-card)', borderLeft: '1px solid var(--border)' }}>
      <KpiStrip kpi={kpi} />

      {/* Header + filtros */}
      <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
          <h3 style={{ fontSize: 'var(--text-xl)' }}>Carteles</h3>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--text-heading)' }}>{items.length}</strong> / {all.length}
          </span>
        </div>

        <SearchBox all={all} query={query} setQuery={setQuery}
          onPickCartel={(id) => { onSelect(id); }}
          onPickBarrio={(b) => { if (!barrios.includes(b)) toggleBarrio(b); setQuery(''); }} />

        {/* fila de dropdowns */}
        <div style={{ display: 'flex', gap: 7, marginTop: 11 }}>
          <FilterDropdown icon="map-pin" label="Localidad" count={barrios.length}>
            <div style={{ maxHeight: 320, overflowY: 'auto', padding: '4px 0' }}>
              {window.MI_ZONAS.filter((z) => byZona[z]).map((z) => (
                <div key={z}>
                  <div className="eyebrow" style={{ fontSize: 10, padding: '8px 12px 3px', color: 'var(--text-faint)' }}>Zona {z}</div>
                  {Object.entries(byZona[z]).sort().map(([barrio, n]) => (
                    <CheckItem key={barrio} label={barrio} sub={n}
                      checked={barrios.includes(barrio)} onToggle={() => toggleBarrio(barrio)} />
                  ))}
                </div>
              ))}
            </div>
          </FilterDropdown>

          <FilterDropdown icon="layout-panel-top" label="Tipo" count={tipos.length}>
            <div style={{ padding: '5px 0' }}>
              {tipoList.map(([t, n]) => (
                <CheckItem key={t} label={t} sub={n} checked={tipos.includes(t)} onToggle={() => toggleTipo(t)} />
              ))}
            </div>
          </FilterDropdown>

          <button type="button" onClick={() => setIlumOnly(!ilumOnly)}
            title="Solo iluminados"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 10px',
              background: ilumOnly ? 'var(--accent-soft)' : 'var(--surface-card)',
              border: `1px solid ${ilumOnly ? 'var(--orange-300)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-control)', color: ilumOnly ? 'var(--accent-text)' : 'var(--text-body)',
              fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
            }}>
            <Icon name="lightbulb" size={14} />Luz
          </button>
        </div>

        {/* chips de estado */}
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 9 }}>
          {STATUSES.map((s) => {
            const on = status.includes(s);
            return (
              <button key={s} type="button" onClick={() => toggleStatus(s)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px',
                  background: on ? 'var(--accent-soft)' : 'var(--surface-card)',
                  border: `1px solid ${on ? 'var(--orange-300)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-pill)', color: on ? 'var(--accent-text)' : 'var(--text-body)',
                  fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', textTransform: 'capitalize',
                }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: `var(--status-${s === 'mantenimiento' ? 'mantenim' : s})` }} />
                {s}
              </button>
            );
          })}
        </div>

        {/* chips activos de localidad + limpiar */}
        {anyFilter ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginTop: 10 }}>
            {barrios.map((b) => (
              <span key={b} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 24, padding: '0 4px 0 9px', background: 'var(--cream-200)', borderRadius: 'var(--radius-pill)', fontSize: 'var(--text-2xs)', color: 'var(--text-body)', fontWeight: 600 }}>
                {b}
                <button type="button" onClick={() => toggleBarrio(b)} style={{ display: 'inline-flex', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-faint)', padding: 2 }}><Icon name="x" size={12} /></button>
              </span>
            ))}
            <button type="button" onClick={clearAll}
              style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-text)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
              <Icon name="x" size={13} />Limpiar
            </button>
          </div>
        ) : null}
      </div>

      {/* Lista */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {items.length === 0 ? (
          <EmptyState art="search" title="Sin resultados" description="Ningún cartel coincide con el filtro. Limpiá la búsqueda para ver todos." />
        ) : (
          items.map((b) => (
            <Row key={b.id} b={b} selected={selected === b.id} fmt={fmt}
              inProposal={proposalIds.includes(b.id)} onSelect={onSelect} onAdd={onAdd} />
          ))
        )}
      </div>
    </div>
  );
}

window.InventoryPanel = InventoryPanel;
