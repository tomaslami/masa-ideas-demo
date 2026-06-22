const { Icon, Input, Select, Checkbox, IconButton, Button } = window.DesignSystem_27db72;

function PickRow({ b, fmt, checked, onToggle }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 14px', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer', background: checked ? 'var(--accent-soft)' : 'transparent' }}>
      <Checkbox checked={checked} onChange={() => onToggle(b.id)} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--accent-text)', fontWeight: 600 }}>{b.id}</span>
          {b.ilum && <Icon name="lightbulb" size={11} style={{ color: 'var(--warning-500)' }} />}
        </div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-heading)', fontWeight: 'var(--fw-medium)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.dir}</div>
        <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-faint)' }}>{b.barrio} · {b.tipo} · {b.medida}</div>
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-heading)' }}>{fmt.moneyShort(b.precio)}</span>
    </label>
  );
}

function ProposalBuilder({ cliente, setCliente, meses, setMeses, desc, setDesc, selected, toggle, fmt, onExport, onImport }) {
  const bbs = window.MI_PROP_BILLBOARDS;
  return (
    <div style={{ width: 380, flex: '0 0 380px', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--surface-card)', borderRight: '1px solid var(--border)' }}>
      <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: 'var(--text-xl)' }}>Armar propuesta</h3>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 2 }}>Elegí cliente, período y carteles. La vista previa se actualiza al instante.</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 13, borderBottom: '1px solid var(--border)' }}>
          <Input label="Cliente" icon="building-2" value={cliente} onChange={(e) => setCliente(e.target.value)} placeholder="Razón social" />
          <Select label="Duración de la campaña" value={String(meses)} onChange={(e) => setMeses(Number(e.target.value))}
            options={[{ value: '1', label: '1 mes' }, { value: '3', label: '3 meses' }, { value: '6', label: '6 meses' }, { value: '12', label: '12 meses' }]} />
          <Input label="Descuento (%)" type="number" prefix="%" value={desc} onChange={(e) => setDesc(Math.max(0, Math.min(40, Number(e.target.value) || 0)))} />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px 8px' }}>
            <span className="eyebrow">Carteles disponibles</span>
            <Button variant="ghost" size="sm" icon="file-up" onClick={onImport}>Importar</Button>
          </div>
          {bbs.map((b) => <PickRow key={b.id} b={b} fmt={fmt} checked={selected.includes(b.id)} onToggle={toggle} />)}
        </div>
      </div>

      <div style={{ padding: 14, borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
        <Button variant="secondary" icon="save" style={{ flex: 1 }}>Guardar</Button>
        <Button variant="primary" icon="file-down" style={{ flex: 1.3 }} onClick={onExport} disabled={selected.length === 0}>Exportar PDF</Button>
      </div>
    </div>
  );
}

window.ProposalBuilder = ProposalBuilder;
