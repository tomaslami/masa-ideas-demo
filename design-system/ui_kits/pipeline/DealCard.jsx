const { Icon, Avatar, Badge } = window.DesignSystem_27db72;

function DealCard({ deal, fmt, onOpen, dragging, onDragStart, onDragEnd }) {
  const [hover, setHover] = React.useState(false);
  const stage = window.MI_STAGES.find((s) => s.id === deal.etapa);
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, deal.id)}
      onDragEnd={onDragEnd}
      onClick={() => onOpen(deal.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: dragging ? 'var(--shadow-lg)' : hover ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        padding: '11px 12px',
        cursor: 'pointer',
        opacity: dragging ? 0.5 : 1,
        transform: hover && !dragging ? 'translateY(-1px)' : 'none',
        transition: 'box-shadow var(--dur) var(--ease-out), transform var(--dur) var(--ease-out)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{deal.cliente}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--text-faint)', marginTop: 1 }}>{deal.id}</div>
        </div>
        <Badge tone="neutral" variant="outline" size="sm">{deal.tag}</Badge>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 9 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-lg)', fontWeight: 500, color: 'var(--text-heading)', letterSpacing: '-0.01em' }}>{fmt.moneyShort(deal.valor)}</span>
        <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-faint)' }}>· {deal.carteles} carteles</span>
      </div>

      {/* probability bar */}
      <div style={{ marginTop: 9 }}>
        <div style={{ height: 4, background: 'var(--cream-200)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: `${deal.prob}%`, height: '100%', background: stage ? stage.tone : 'var(--accent)', borderRadius: 999 }} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Avatar name={deal.owner} size={20} />
          <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-muted)' }}>{deal.prob}%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-2xs)', color: 'var(--text-faint)' }}>
          <Icon name="calendar" size={12} />{fmt.date(deal.cierre)}
        </div>
      </div>
    </div>
  );
}

window.DealCard = DealCard;
