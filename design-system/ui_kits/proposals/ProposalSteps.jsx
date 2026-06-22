const { Icon, Input, Select, Button, IconButton, StatusPill } = window.DesignSystem_27db72;

/* ---------- Stepper horizontal ---------- */
const STEPS = [
  { n: 1, label: 'Cliente', icon: 'building-2' },
  { n: 2, label: 'Carteles', icon: 'map-pin' },
  { n: 3, label: 'Creatividad', icon: 'image' },
  { n: 4, label: 'Condiciones', icon: 'sliders-horizontal' },
  { n: 5, label: 'Revisión', icon: 'file-check' },
];

function Stepper({ step, setStep, maxReached }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {STEPS.map((s, i) => {
        const done = s.n < step;
        const active = s.n === step;
        const reachable = s.n <= maxReached;
        return (
          <React.Fragment key={s.n}>
            <button type="button" disabled={!reachable} onClick={() => reachable && setStep(s.n)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9, background: 'none', border: 'none',
                padding: '0 4px', cursor: reachable ? 'pointer' : 'default', opacity: reachable ? 1 : 0.5,
              }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28,
                borderRadius: '50%', flex: '0 0 auto',
                background: active ? 'var(--accent)' : done ? 'var(--accent-soft)' : 'var(--cream-200)',
                color: active ? '#fff' : done ? 'var(--accent-text)' : 'var(--text-faint)',
                border: active ? 'none' : `1px solid ${done ? 'var(--orange-300)' : 'var(--border)'}`,
                fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 700,
              }}>
                {done ? <Icon name="check" size={15} /> : s.n}
              </span>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: active ? 700 : 600, color: active ? 'var(--text-heading)' : done ? 'var(--text-body)' : 'var(--text-faint)', whiteSpace: 'nowrap' }}>{s.label}</span>
            </button>
            {i < STEPS.length - 1 && <span style={{ width: 26, height: 1.5, margin: '0 6px', background: s.n < step ? 'var(--orange-300)' : 'var(--border)' }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function StepHeader({ eyebrow, title, desc }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div className="eyebrow" style={{ color: 'var(--accent-text)' }}>{eyebrow}</div>
      <h2 style={{ fontSize: 'var(--text-2xl)', marginTop: 6 }}>{title}</h2>
      {desc && <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', marginTop: 4 }}>{desc}</p>}
    </div>
  );
}

/* ---------- Paso 1 · Cliente ---------- */
function StepCliente({ cliente, setField }) {
  const rubros = ['Bebidas', 'Automotriz', 'Banca y finanzas', 'Telecomunicaciones', 'Retail', 'Salud', 'Tecnología', 'Inmobiliaria', 'Otro'];
  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <StepHeader eyebrow="Paso 1 de 5" title="¿Para quién es la propuesta?" desc="Estos datos encabezan el documento que ve el cliente." />
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', padding: 22, display: 'flex', flexDirection: 'column', gap: 15 }}>
        <Input label="Razón social" icon="building-2" placeholder="Ej. Cervecería del Plata S.A." value={cliente.nombre} onChange={(e) => setField('nombre', e.target.value)} />
        <div style={{ display: 'flex', gap: 13 }}>
          <Input label="Persona de contacto" icon="user" placeholder="Nombre y apellido" value={cliente.contacto} onChange={(e) => setField('contacto', e.target.value)} containerStyle={{ flex: 1 }} />
          <Input label="Email" icon="mail" placeholder="contacto@empresa.com" value={cliente.email} onChange={(e) => setField('email', e.target.value)} containerStyle={{ flex: 1 }} />
        </div>
        <Select label="Rubro" placeholder="Elegí un rubro" value={cliente.rubro} onChange={(e) => setField('rubro', e.target.value)} options={rubros} />
      </div>
    </div>
  );
}

/* ---------- Paso 2 · Carteles ---------- */
function CartelPick({ b, fmt, checked, onToggle }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', cursor: 'pointer',
      background: checked ? 'var(--accent-soft)' : 'var(--surface-card)',
      border: `1px solid ${checked ? 'var(--orange-300)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-md)', transition: 'background var(--dur-fast) var(--ease-out)',
    }}>
      <span style={{
        width: 18, height: 18, borderRadius: 'var(--radius-xs)', flex: '0 0 auto',
        border: `1.5px solid ${checked ? 'var(--accent)' : 'var(--border-strong)'}`, background: checked ? 'var(--accent)' : 'transparent',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>{checked && <Icon name="check" size={13} style={{ color: '#fff' }} />}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--accent-text)', fontWeight: 600 }}>{b.id}</span>
          {b.ilum && <Icon name="lightbulb" size={11} style={{ color: 'var(--warning-500)' }} />}
        </div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-heading)', fontWeight: 'var(--fw-medium)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.dir}</div>
        <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-faint)' }}>{b.barrio} · {b.tipo} · {b.medida} · {b.alcance}/mes</div>
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-heading)', fontWeight: 500, whiteSpace: 'nowrap' }}>{fmt.moneyShort(b.precio)}</span>
    </label>
  );
}

function StepCarteles({ bbs, selected, toggle, fmt }) {
  const sel = bbs.filter((b) => selected.includes(b.id));
  const mensual = sel.reduce((a, b) => a + b.precio, 0);
  const alcance = sel.reduce((a, b) => a + parseInt(b.alcance) * 1000, 0);
  return (
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <StepHeader eyebrow="Paso 2 de 5" title="Elegí los carteles" desc="Sumá emplazamientos a la campaña. El resumen se actualiza al instante." />
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10, minWidth: 0 }}>
          {bbs.map((b) => <CartelPick key={b.id} b={b} fmt={fmt} checked={selected.includes(b.id)} onToggle={() => toggle(b.id)} />)}
        </div>
        <div style={{ width: 248, flex: '0 0 248px', position: 'sticky', top: 0, background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', padding: 18 }}>
          <div className="eyebrow">Selección</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-4xl)', fontWeight: 500, color: 'var(--text-heading)', lineHeight: 1, margin: '8px 0 2px' }}>{sel.length}</div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{sel.length === 1 ? 'cartel elegido' : 'carteles elegidos'}</div>
          <div style={{ height: 1, background: 'var(--border)', margin: '16px 0' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div className="eyebrow" style={{ fontSize: 10 }}>Inversión / mes</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xl)', color: 'var(--accent-text)', fontWeight: 600, marginTop: 2 }}>{mensual ? fmt.money(mensual) : '—'}</div>
            </div>
            <div>
              <div className="eyebrow" style={{ fontSize: 10 }}>Alcance mensual est.</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-lg)', color: 'var(--text-heading)', fontWeight: 500, marginTop: 2 }}>{alcance ? (alcance / 1e6).toLocaleString('es-AR', { maximumFractionDigits: 1 }) + 'M' : '—'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Paso 3 · Creatividad ---------- */
function StepCreatividad({ bbs, selected, creatives, setCreative, applyToAll }) {
  const sel = bbs.filter((b) => selected.includes(b.id));
  const loaded = sel.filter((b) => creatives[b.id]).length;
  const firstCreative = sel.map((b) => creatives[b.id]).find(Boolean);
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--accent-text)' }}>Paso 3 de 5</div>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginTop: 6 }}>Previsualizá la pieza en cada cartel</h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', marginTop: 4 }}>Subí (o arrastrá) la creatividad de la marca y mirá cómo se ve montada.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--text-heading)' }}>{loaded}</strong> / {sel.length} con pieza</span>
          {firstCreative && <Button variant="secondary" size="sm" icon="copy" onClick={() => applyToAll(firstCreative)}>Aplicar a todos</Button>}
        </div>
      </div>

      {sel.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-faint)' }}>
          <Icon name="image-off" size={30} />
          <p style={{ marginTop: 10, fontSize: 'var(--text-base)' }}>Todavía no elegiste carteles. Volvé al paso anterior para sumarlos.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
          {sel.map((b) => (
            <window.BillboardPreview key={b.id} b={b} creative={creatives[b.id]} onCreative={setCreative} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Paso 4 · Condiciones ---------- */
function StepCondiciones({ bbs, selected, meses, setMeses, desc, setDesc, fmt }) {
  const sel = bbs.filter((b) => selected.includes(b.id));
  const mensual = sel.reduce((a, b) => a + b.precio, 0);
  const subtotal = mensual * meses;
  const descMonto = subtotal * (desc / 100);
  const total = subtotal - descMonto;
  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      <StepHeader eyebrow="Paso 4 de 5" title="Condiciones comerciales" desc="Definí el período y el descuento. Los totales se recalculan solos." />
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280, background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Select label="Duración de la campaña" value={String(meses)} onChange={(e) => setMeses(Number(e.target.value))}
            options={[{ value: '1', label: '1 mes' }, { value: '3', label: '3 meses' }, { value: '6', label: '6 meses' }, { value: '12', label: '12 meses' }]} />
          <Input label="Descuento (%)" type="number" prefix="%" value={desc} onChange={(e) => setDesc(Math.max(0, Math.min(40, Number(e.target.value) || 0)))} hint="Hasta 40%." />
        </div>
        <div style={{ width: 300, flex: '0 0 300px', minWidth: 260, background: 'var(--char-900)', color: '#fff', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', padding: 22 }}>
          <div className="eyebrow" style={{ color: 'var(--orange-300)' }}>Total estimado</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 14, fontSize: 'var(--text-sm)' }}>
            <Line l={`Inversión / mes`} v={fmt.money(mensual)} />
            <Line l={`Subtotal · ${meses} ${meses === 1 ? 'mes' : 'meses'}`} v={fmt.money(subtotal)} />
            {desc > 0 && <Line l={`Descuento ${desc}%`} v={'– ' + fmt.money(descMonto)} accent />}
          </div>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.16)', margin: '14px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)' }}>Total</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xl)', fontWeight: 600 }}>{fmt.money(total)}</span>
          </div>
          <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-on-dark-muted)', textAlign: 'right', marginTop: 4 }}>+ IVA · en pesos</div>
        </div>
      </div>
    </div>
  );
}
function Line({ l, v, accent }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: accent ? 'var(--orange-300)' : 'var(--text-on-dark-muted)' }}>{l}</span>
      <span style={{ fontFamily: 'var(--font-mono)', color: accent ? 'var(--orange-300)' : '#fff' }}>{v}</span>
    </div>
  );
}

window.ProposalSteps = { Stepper, StepCliente, StepCarteles, StepCreatividad, StepCondiciones };
