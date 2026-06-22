const { Icon, Avatar, Badge, Button, IconButton, StatusPill } = window.DesignSystem_27db72;

function Field({ label, children, mono }) {
  return (
    <div>
      <div className="eyebrow" style={{ fontSize: 10, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 'var(--text-base)', color: 'var(--text-heading)', fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)', fontWeight: mono ? 500 : 400 }}>{children}</div>
    </div>
  );
}

function DealDrawer({ deal, fmt, onClose, onMove }) {
  if (!deal) return null;
  const stages = window.MI_STAGES;
  const stage = stages.find((s) => s.id === deal.etapa);
  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(28,27,26,0.32)', zIndex: 500 }} />
      <aside style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 420, zIndex: 510,
        background: 'var(--surface-card)', borderLeft: '1px solid var(--border)',
        boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent-text)', fontWeight: 600 }}>{deal.id}</span>
            <IconButton icon="x" size="sm" title="Cerrar" onClick={onClose} />
          </div>
          <h3 style={{ fontSize: 'var(--text-2xl)', marginTop: 4 }}>{deal.cliente}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <Badge tone="accent" variant="soft">{deal.tag}</Badge>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{deal.contacto}</span>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* value block */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: 16, background: 'var(--cream-100)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <Field label="Valor total" mono>{fmt.money(deal.valor)}</Field>
            <Field label="Carteles" mono>{deal.carteles}</Field>
            <Field label="Probabilidad" mono>{deal.prob}%</Field>
            <Field label="Cierre estimado" mono>{fmt.date(deal.cierre)}</Field>
          </div>

          {/* stage stepper */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Etapa</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {stages.map((s) => {
                const active = s.id === deal.etapa;
                const idx = stages.findIndex((x) => x.id === deal.etapa);
                const sIdx = stages.findIndex((x) => x.id === s.id);
                const done = sIdx < idx;
                return (
                  <button key={s.id} type="button" onClick={() => onMove(deal.id, s.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: `1px solid ${active ? 'var(--orange-300)' : 'transparent'}`, background: active ? 'var(--accent-soft)' : 'transparent', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: '50%', flex: '0 0 auto', background: done ? s.tone : active ? s.tone : 'var(--cream-200)', color: '#fff' }}>
                      {(done || active) && <Icon name="check" size={12} strokeWidth={3} />}
                    </span>
                    <span style={{ fontSize: 'var(--text-base)', fontWeight: active ? 'var(--fw-semibold)' : 'var(--fw-regular)', color: active ? 'var(--text-heading)' : 'var(--text-muted)' }}>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* activity */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Actividad reciente</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { ic: 'send', t: 'Propuesta enviada por email', d: 'hace 2 días', who: deal.owner },
                { ic: 'phone', t: 'Llamada de seguimiento', d: 'hace 4 días', who: deal.owner },
                { ic: 'file-text', t: 'Oportunidad creada', d: 'hace 1 semana', who: deal.owner },
              ].map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 10 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 'var(--radius-sm)', background: 'var(--cream-200)', color: 'var(--text-muted)', flex: '0 0 auto' }}><Icon name={a.ic} size={15} /></span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-heading)' }}>{a.t}</div>
                    <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-faint)' }}>{a.who} · {a.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: 16, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
          <Button variant="secondary" icon="file-text" style={{ flex: 1 }}>Ver propuesta</Button>
          <Button variant="primary" icon="circle-check" style={{ flex: 1 }}>Marcar ganado</Button>
        </div>
      </aside>
    </>
  );
}

window.DealDrawer = DealDrawer;
