'use client';
import React from 'react';
import { Modal } from './Modal.jsx';
import { Button } from '../actions/Button.jsx';
import { Icon } from '../icon/Icon.jsx';

/** Clean, simple spreadsheet illustration (on-brand: warm + accent badge). */
function SheetArt({ size = 60 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <rect x="11" y="6" width="31" height="44" rx="3" fill="#fff" stroke="var(--ink-400)" strokeWidth="2" />
      <path d="M11 19h31M11 30h31M11 41h31M23 19v22M34 19v22" stroke="var(--line-400)" strokeWidth="1.5" />
      <rect x="11" y="6" width="31" height="13" rx="3" fill="var(--cream-200)" />
      <rect x="11.5" y="13.5" width="30" height="5.5" fill="var(--cream-200)" />
      <path d="M11 19h31" stroke="var(--line-400)" strokeWidth="1.5" />
      <path d="M11 9.5a3 3 0 0 1 3-3h25a3 3 0 0 1 3 3" stroke="var(--ink-400)" strokeWidth="2" />
      <circle cx="44" cy="44" r="12" fill="var(--accent)" />
      <path d="M39.5 44.2l3.1 3.1 5.6-6.4" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FIELD_MAP = {
  carteles: [
    { col: 'Código', to: 'id' },
    { col: 'Dirección', to: 'dir' },
    { col: 'Barrio', to: 'barrio' },
    { col: 'Medida', to: 'medida' },
    { col: 'Precio', to: 'precio' },
  ],
  oportunidades: [
    { col: 'Cliente', to: 'cliente' },
    { col: 'Contacto', to: 'contacto' },
    { col: 'Etapa', to: 'etapa' },
    { col: 'Valor', to: 'valor' },
    { col: 'Cierre', to: 'cierre' },
  ],
  clientes: [
    { col: 'Razón social', to: 'cliente' },
    { col: 'Contacto', to: 'contacto' },
    { col: 'Email', to: 'email' },
    { col: 'Rubro', to: 'tag' },
  ],
};

/**
 * ImportDialog — Excel/CSV import flow: dropzone → detected file + column map → progress → done.
 * Visual/mock only (no real parsing). entity drives the column mapping and copy.
 */
export function ImportDialog({ open, onClose, entity = 'carteles', rows = 16, onImported }) {
  const [stage, setStage] = React.useState('drop'); // drop | ready | importing | done
  const [drag, setDrag] = React.useState(false);
  const [pct, setPct] = React.useState(0);
  const fileInput = React.useRef(null);

  const label = entity;
  const fileName = `${entity}_junio2026.xlsx`;
  const fields = FIELD_MAP[entity] || FIELD_MAP.carteles;

  React.useEffect(() => { if (!open) { setStage('drop'); setDrag(false); setPct(0); } }, [open]);

  React.useEffect(() => {
    if (stage !== 'importing') return;
    setPct(0);
    const iv = setInterval(() => setPct((p) => {
      if (p >= 100) { clearInterval(iv); setStage('done'); return 100; }
      return Math.min(100, p + 9);
    }), 110);
    return () => clearInterval(iv);
  }, [stage]);

  const pick = () => setStage('ready');

  const footer = stage === 'drop' ? (
    <>
      <Button variant="ghost" icon="download" onClick={() => {}}>Descargar plantilla</Button>
      <span style={{ flex: 1 }} />
      <Button variant="secondary" onClick={onClose}>Cancelar</Button>
    </>
  ) : stage === 'ready' ? (
    <>
      <Button variant="secondary" onClick={() => setStage('drop')}>Atrás</Button>
      <Button variant="primary" icon="file-up" onClick={() => setStage('importing')}>Importar {rows} filas</Button>
    </>
  ) : stage === 'done' ? (
    <Button variant="primary" icon="check" onClick={() => { onImported && onImported(rows); onClose && onClose(); }}>Listo</Button>
  ) : null;

  return (
    <Modal open={open} onClose={onClose} width={520}
      icon="file-up" title={`Importar ${label} desde Excel`}
      subtitle="Subí un archivo .xlsx o .csv. Detectamos las columnas automáticamente."
      footer={footer}>

      {stage === 'drop' && (
        <div>
          <div
            onClick={() => fileInput.current && fileInput.current.click()}
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => { e.preventDefault(); setDrag(false); pick(); }}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
              padding: '34px 24px', textAlign: 'center', cursor: 'pointer',
              border: `2px dashed ${drag ? 'var(--accent)' : 'var(--border-strong)'}`,
              borderRadius: 'var(--radius-md)',
              background: drag ? 'var(--accent-soft)' : 'var(--cream-100)',
              transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
            }}
          >
            <SheetArt />
            <div>
              <div style={{ fontSize: 'var(--text-md)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-heading)' }}>Arrastrá tu archivo acá</div>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 2 }}>o hacé clic para seleccionarlo · .xlsx, .xls, .csv</div>
            </div>
            <Button variant="secondary" size="sm" icon="folder-open" onClick={(e) => { e.stopPropagation(); pick(); }}>Seleccionar archivo</Button>
            <input ref={fileInput} type="file" accept=".xlsx,.xls,.csv" style={{ display: 'none' }} onChange={pick} />
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', marginTop: 12, lineHeight: 1.5 }}>
            Tip: descargá la plantilla para asegurarte de que las columnas coincidan. Las filas con código existente se actualizan; las nuevas se crean.
          </p>
        </div>
      )}

      {stage === 'ready' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--cream-100)' }}>
            <SheetArt size={36} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fileName}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{rows} filas · {fields.length} columnas detectadas</div>
            </div>
            <Icon name="circle-check" size={20} style={{ color: 'var(--success-500)' }} />
          </div>

          <div className="eyebrow" style={{ margin: '16px 0 8px' }}>Mapeo de columnas</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {fields.map((f) => (
              <div key={f.to} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 'var(--text-sm)' }}>
                <span style={{ flex: 1, padding: '6px 10px', background: 'var(--cream-200)', borderRadius: 'var(--radius-sm)', color: 'var(--text-body)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>{f.col}</span>
                <Icon name="arrow-right" size={15} style={{ color: 'var(--text-faint)', flex: '0 0 auto' }} />
                <span style={{ flex: 1, padding: '6px 10px', border: '1px solid var(--orange-200)', background: 'var(--accent-soft)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-text)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>{f.to}</span>
                <Icon name="check" size={15} style={{ color: 'var(--success-500)', flex: '0 0 auto' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {stage === 'importing' && (
        <div style={{ padding: '20px 4px 8px', textAlign: 'center' }}>
          <SheetArt />
          <div style={{ fontSize: 'var(--text-md)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-heading)', marginTop: 12 }}>Importando {label}…</div>
          <div style={{ height: 6, background: 'var(--cream-200)', borderRadius: 999, overflow: 'hidden', margin: '14px 0 8px' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: 'var(--accent)', borderRadius: 999, transition: 'width 0.1s linear' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{Math.round(rows * pct / 100)} / {rows} filas</div>
        </div>
      )}

      {stage === 'done' && (
        <div style={{ padding: '16px 4px', textAlign: 'center' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: '50%', background: 'var(--ok-bg)', color: 'var(--success-500)', margin: '0 auto 14px' }}>
            <Icon name="check" size={30} strokeWidth={2.5} />
          </span>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--text-heading)' }}>Importación completa</div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 6 }}>Se importaron <strong style={{ color: 'var(--text-heading)' }}>{rows} {label}</strong> correctamente.</p>
        </div>
      )}
    </Modal>
  );
}
