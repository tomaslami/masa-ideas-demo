'use client';
import React from 'react';
import { Icon, StatusPill, Button, IconButton, Thumbnail } from '@/ds';

const STATUS_COLOR = {
  disponible: 'var(--status-disponible)',
  reservado: 'var(--status-reservado)',
  ocupado: 'var(--status-ocupado)',
  mantenimiento: 'var(--status-mantenim)',
};

function Marker({ b, selected, dim, onClick }) {
  const [hover, setHover] = React.useState(false);
  const color = STATUS_COLOR[b.estado] || 'var(--ink-400)';
  const big = selected || hover;
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick(b.id); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={b.id}
      style={{
        position: 'absolute', left: `${b.x}%`, top: `${b.y}%`,
        transform: 'translate(-50%, -100%)',
        background: 'none', border: 'none', padding: 0, cursor: 'pointer',
        zIndex: selected ? 30 : big ? 20 : 10,
        opacity: dim && !selected ? 0.35 : 1,
        transition: 'opacity var(--dur) var(--ease-out)',
      }}
    >
      <span style={{ position: 'relative', display: 'block', width: big ? 30 : 24, height: big ? 30 : 24, transition: 'all var(--dur-fast) var(--ease-out)' }}>
        <span style={{
          position: 'absolute', inset: 0,
          background: color,
          borderRadius: '50% 50% 50% 0',
          transform: 'rotate(-45deg)',
          boxShadow: selected ? '0 0 0 3px #fff, 0 4px 10px rgba(40,30,16,0.35)' : '0 2px 5px rgba(40,30,16,0.30)',
          border: '1.5px solid rgba(255,255,255,0.85)',
        }} />
        <span style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: big ? 9 : 7, height: big ? 9 : 7, borderRadius: '50%',
          background: '#fff',
        }} />
      </span>
    </button>
  );
}

function Popup({ b, fmt, onClose, onAdd, inProposal }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: 'absolute', left: `${b.x}%`, top: `${b.y}%`,
        transform: 'translate(-50%, calc(-100% - 34px))',
        width: 268, zIndex: 40,
        background: 'var(--surface-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-popover)',
        overflow: 'hidden',
      }}
    >
      <Thumbnail kind="billboard" width="100%" ratio="16 / 7" rounded={false} label="Foto del cartel" style={{ borderLeft: 'none', borderRight: 'none', borderTop: 'none' }} />
      <div style={{ padding: '12px 14px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent-text)', fontWeight: 600 }}>{b.id}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', color: 'var(--text-heading)', lineHeight: 1.15, marginTop: 2 }}>{b.dir}</div>
          </div>
          <IconButton icon="x" size="sm" title="Cerrar" onClick={onClose} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, flexWrap: 'wrap' }}>
          <StatusPill status={b.estado} />
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{b.barrio} · {b.tipo}</span>
        </div>
      </div>
      <div style={{ display: 'flex', borderTop: '1px solid var(--border-subtle)', background: 'var(--cream-100)' }}>
        <div style={{ flex: 1, padding: '8px 14px', borderRight: '1px solid var(--border-subtle)' }}>
          <div className="eyebrow" style={{ fontSize: 10 }}>Medida</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-heading)', marginTop: 2 }}>{b.medida}{b.ilum ? ' · luz' : ''}</div>
        </div>
        <div style={{ flex: 1, padding: '8px 14px' }}>
          <div className="eyebrow" style={{ fontSize: 10 }}>Precio / mes</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-heading)', marginTop: 2 }}>{fmt.money(b.precio)}</div>
        </div>
      </div>
      <div style={{ padding: 10, display: 'flex', gap: 8 }}>
        <Button variant="secondary" size="sm" icon="file-text" style={{ flex: 1 }}>Ficha</Button>
        <Button
          variant={inProposal ? 'secondary' : 'primary'} size="sm"
          icon={inProposal ? 'check' : 'plus'}
          disabled={b.estado === 'ocupado'}
          onClick={() => onAdd(b.id)}
          style={{ flex: 1.4 }}
        >
          {inProposal ? 'Agregado' : 'A propuesta'}
        </Button>
      </div>
    </div>
  );
}

/** MapView — full-bleed map with status pins, hover/selection and a popup. */
function MapView({ mapSrc, items, selected, onSelect, dimUnmatched, matchedIds, fmt, onAdd, proposalIds = [] }) {
  return (
    <div
      onClick={() => onSelect(null)}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#E9E5DB' }}
    >
      <img src={mapSrc} alt="Mapa de Buenos Aires" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none' }} draggable={false} />

      {items.map((b) => (
        <Marker key={b.id} b={b} selected={selected === b.id}
          dim={dimUnmatched && matchedIds && !matchedIds.has(b.id)}
          onClick={onSelect} />
      ))}

      {selected && items.find((b) => b.id === selected) && (
        <Popup b={items.find((b) => b.id === selected)} fmt={fmt}
          onClose={() => onSelect(null)} onAdd={onAdd}
          inProposal={proposalIds.includes(selected)} />
      )}

      {/* Legend */}
      <div style={{ position: 'absolute', left: 16, bottom: 16, background: 'rgba(255,255,255,0.94)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div className="eyebrow" style={{ marginBottom: 2 }}>Estado</div>
        {Object.entries(STATUS_COLOR).map(([k, c]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-xs)', color: 'var(--text-body)', textTransform: 'capitalize' }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />{k}
          </div>
        ))}
      </div>

      {/* Zoom controls (visual) */}
      <div style={{ position: 'absolute', right: 16, bottom: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <IconButton icon="plus" variant="secondary" title="Acercar" style={{ background: '#fff', boxShadow: 'var(--shadow-sm)' }} />
        <IconButton icon="minus" variant="secondary" title="Alejar" style={{ background: '#fff', boxShadow: 'var(--shadow-sm)' }} />
        <IconButton icon="locate-fixed" variant="secondary" title="Mi ubicación" style={{ background: '#fff', boxShadow: 'var(--shadow-sm)' }} />
      </div>
    </div>
  );
}

export { MapView };
