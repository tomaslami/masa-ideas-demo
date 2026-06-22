const { Icon, IconButton } = window.DesignSystem_27db72;

/* Convierte "8 × 4 m" → relación de aspecto numérica (ancho/alto). */
function ratioFromMedida(medida) {
  const m = (medida || '').replace(',', '.').match(/([\d.]+)\s*[×x]\s*([\d.]+)/i);
  if (!m) return 16 / 9;
  const w = parseFloat(m[1]), h = parseFloat(m[2]);
  if (!w || !h) return 16 / 9;
  return Math.min(3.2, Math.max(1.1, w / h));
}

/**
 * BillboardPreview — mockup del cartel con la creatividad de la marca.
 * Subí (o arrastrá) una imagen y se compone sobre la estructura del cartel.
 */
function BillboardPreview({ b, creative, onCreative, height = 188, showCaption = true }) {
  const inputRef = React.useRef(null);
  const [drag, setDrag] = React.useState(false);
  const ratio = ratioFromMedida(b.medida);

  const readFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const r = new FileReader();
    r.onload = () => onCreative(b.id, r.result);
    r.readAsDataURL(file);
  };

  return (
    <div>
      <div
        onClick={() => inputRef.current && inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); readFile(e.dataTransfer.files[0]); }}
        title={creative ? 'Cambiar creatividad' : 'Subir creatividad'}
        style={{
          position: 'relative', height, cursor: 'pointer', overflow: 'hidden',
          borderRadius: 'var(--radius-md)',
          border: `1px solid ${drag ? 'var(--accent)' : 'var(--border)'}`,
          boxShadow: drag ? 'var(--shadow-focus)' : 'none',
          background: 'linear-gradient(180deg, #EFEBE2 0%, #E7E2D8 62%, #DED8CB 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
        }}
      >
        {/* estructura del cartel */}
        <div style={{ position: 'relative', height: '74%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {b.ilum && (
            <div style={{ display: 'flex', gap: '28%', width: '76%', justifyContent: 'space-between', marginBottom: 2 }}>
              {[0, 1].map((i) => (
                <span key={i} style={{ width: 14, height: 5, borderRadius: '3px 3px 0 0', background: 'var(--char-700)', boxShadow: creative ? '0 6px 14px 2px rgba(240,160,40,0.55)' : 'none' }} />
              ))}
            </div>
          )}
          {/* panel + marco */}
          <div style={{
            position: 'relative', height: b.ilum ? 'calc(100% - 8px)' : '100%', aspectRatio: String(ratio),
            background: '#fff', border: '5px solid var(--char-900)', borderRadius: 2,
            boxShadow: '0 10px 22px rgba(40,30,16,0.28)', overflow: 'hidden',
          }}>
            {creative ? (
              <img src={creative} alt="Creatividad" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div style={{
                width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 6, color: 'var(--text-faint)',
                backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 9px, rgba(180,170,150,0.14) 9px, rgba(180,170,150,0.14) 10px)',
              }}>
                <Icon name="image-up" size={22} />
                <span style={{ fontSize: 'var(--text-2xs)', fontWeight: 600, textAlign: 'center', padding: '0 8px' }}>Subí o arrastrá la pieza</span>
              </div>
            )}
          </div>
          {/* postes */}
          <div style={{ display: 'flex', gap: '34%', marginTop: -1 }}>
            {[0, 1].map((i) => <span key={i} style={{ width: 7, height: 22, background: 'var(--char-700)' }} />)}
          </div>
          <span style={{ width: '64%', height: 4, borderRadius: 2, background: 'rgba(40,30,16,0.14)', marginTop: 1 }} />
        </div>

        {/* badge medida */}
        <span style={{ position: 'absolute', top: 8, left: 8, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--text-on-dark)', background: 'rgba(28,27,26,0.78)', padding: '2px 7px', borderRadius: 'var(--radius-xs)' }}>{b.medida}</span>
        {creative && (
          <button type="button"
            onClick={(e) => { e.stopPropagation(); onCreative(b.id, null); }}
            title="Quitar creatividad"
            style={{ position: 'absolute', top: 6, right: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, border: 'none', borderRadius: 'var(--radius-xs)', background: 'rgba(28,27,26,0.78)', color: '#fff', cursor: 'pointer' }}>
            <Icon name="x" size={14} />
          </button>
        )}
        <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
          onChange={(e) => readFile(e.target.files[0])} />
      </div>

      {showCaption && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, gap: 8 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--accent-text)', fontWeight: 600 }}>{b.id}</span>
              {b.ilum && <Icon name="lightbulb" size={11} style={{ color: 'var(--warning-500)' }} />}
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-heading)', fontWeight: 'var(--fw-medium)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.dir}</div>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 'var(--text-2xs)', fontWeight: 600, whiteSpace: 'nowrap', color: creative ? 'var(--status-disponible)' : 'var(--text-faint)' }}>
            <Icon name={creative ? 'circle-check' : 'circle-dashed'} size={13} />
            {creative ? 'Pieza cargada' : 'Sin pieza'}
          </span>
        </div>
      )}
    </div>
  );
}

window.BillboardPreview = BillboardPreview;
