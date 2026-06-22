const { Icon, EmptyState } = window.DesignSystem_27db72;

function KanbanBoard({ deals, fmt, onOpen, onMove }) {
  const stages = window.MI_STAGES;
  const [dragId, setDragId] = React.useState(null);
  const [overStage, setOverStage] = React.useState(null);

  const onDragStart = (e, id) => { setDragId(id); e.dataTransfer.effectAllowed = 'move'; };
  const onDragEnd = () => { setDragId(null); setOverStage(null); };
  const onDrop = (stageId) => { if (dragId) onMove(dragId, stageId); setDragId(null); setOverStage(null); };

  const colTotal = (sid) => deals.filter((d) => d.etapa === sid).reduce((a, d) => a + d.valor, 0);

  return (
    <div style={{ flex: 1, display: 'flex', gap: 12, padding: 20, alignItems: 'stretch', minHeight: 0, minWidth: 0 }}>
      {stages.map((stage) => {
        const col = deals.filter((d) => d.etapa === stage.id);
        const isOver = overStage === stage.id;
        return (
          <div
            key={stage.id}
            onDragOver={(e) => { e.preventDefault(); setOverStage(stage.id); }}
            onDragLeave={() => setOverStage((s) => (s === stage.id ? null : s))}
            onDrop={() => onDrop(stage.id)}
            style={{
              flex: '1 1 0', minWidth: 0, height: '100%',
              display: 'flex', flexDirection: 'column',
              background: isOver ? 'var(--accent-soft)' : 'var(--bg-sunken)',
              border: `1px solid ${isOver ? 'var(--orange-300)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-md)',
              transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 12px', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: stage.tone, flex: '0 0 auto' }} />
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{stage.label}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--text-faint)', background: 'var(--cream-50)', border: '1px solid var(--border)', borderRadius: 999, padding: '0 6px' }}>{col.length}</span>
              <span style={{ flex: 1 }} />
              <Icon name="plus" size={15} style={{ color: 'var(--text-faint)', cursor: 'pointer' }} />
            </div>
            <div style={{ padding: '6px 8px 2px', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>{fmt.moneyShort(colTotal(stage.id))}</div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '6px 8px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {col.map((d) => (
                <window.DealCard key={d.id} deal={d} fmt={fmt} onOpen={onOpen}
                  dragging={dragId === d.id} onDragStart={onDragStart} onDragEnd={onDragEnd} />
              ))}
              {col.length === 0 && (
                <EmptyState art="board" compact title="Arrastrá una oportunidad acá" style={{ border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-sm)', margin: 2 }} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

window.KanbanBoard = KanbanBoard;
