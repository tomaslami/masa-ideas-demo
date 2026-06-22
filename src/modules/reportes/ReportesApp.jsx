'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar, Button, Stat, SegmentedControl, Card, Icon } from '@/ds';
import { hrefFor, NAV, USER, LOGO_SRC } from '@/modules/nav';
import { MI_REPORTES, MI_REPORTES_FMT } from './data';
import { BarsVertical, BarsHorizontal, Donut } from './charts';

const ESTADO_LABEL = {
  disponible: 'Disponible',
  reservado: 'Reservado',
  ocupado: 'Ocupado',
  mantenimiento: 'Mantenimiento',
};

// Encabezado de tarjeta: eyebrow + título sentence-case + ícono tenue opcional.
function CardHead({ eyebrow, title, icon, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 18 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span className="eyebrow">{eyebrow}</span>
        <h4 style={{ fontSize: 'var(--text-lg)' }}>{title}</h4>
      </div>
      {right || (icon && (
        <span style={{ color: 'var(--text-faint)', display: 'inline-flex', marginTop: 2 }}>
          <Icon name={icon} size={18} />
        </span>
      ))}
    </div>
  );
}

// Pastilla de variación (verde si sube, rojo si baja).
function DeltaPill({ delta }) {
  if (delta == null || delta === '') return null;
  const up = String(delta).trim().startsWith('+');
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 3,
        padding: '2px 8px', borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-semibold)',
        color: up ? 'var(--ok-fg)' : 'var(--bad-fg)', background: up ? 'var(--ok-bg)' : 'var(--bad-bg)',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      <Icon name={up ? 'trending-up' : 'trending-down'} size={11} />
      {delta}
    </span>
  );
}

function Mini({ label, value, accent }) {
  return (
    <div>
      <span className="eyebrow" style={{ fontSize: 10 }}>{label}</span>
      <div
        style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-md)', fontWeight: 'var(--fw-medium)',
          color: accent ? 'var(--accent-text)' : 'var(--text-heading)', marginTop: 4,
          fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
        }}
      >
        {value}
      </div>
    </div>
  );
}

function ReportesApp() {
  const router = useRouter();
  const fmt = MI_REPORTES_FMT;
  const data = MI_REPORTES;
  const [periodo, setPeriodo] = React.useState('mes');

  const meses = data.facturacionMensual;
  const current = meses[meses.length - 1].valor;
  const prom = Math.round(meses.reduce((a, m) => a + m.valor, 0) / meses.length);
  const mejor = meses.reduce((a, m) => (m.valor > a.valor ? m : a), meses[0]);
  const growth = Math.round(((meses[meses.length - 1].valor - meses[0].valor) / meses[0].valor) * 100);
  const totalCarteles = data.inventarioPorEstado.reduce((a, s) => a + s.n, 0);
  const maxFact = Math.max(1, ...data.topClientes.map((c) => c.facturacion));

  const KPIS = [
    { label: 'Facturación mensual', value: fmt.moneyShort(data.kpis.facturacion.valor), icon: 'dollar-sign', delta: data.kpis.facturacion.delta, deltaLabel: 'vs período anterior' },
    { label: 'Ocupación', value: data.kpis.ocupacion.valor, unit: '%', icon: 'percent', delta: data.kpis.ocupacion.delta },
    { label: 'Oportunidades ganadas', value: data.kpis.ganadas.valor, icon: 'target', delta: data.kpis.ganadas.delta },
    { label: 'Ticket promedio', value: fmt.moneyShort(data.kpis.ticket.valor), icon: 'trending-up', delta: data.kpis.ticket.delta },
  ];

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--bg-page)' }}>
      <Sidebar
        logoSrc={LOGO_SRC}
        brand="Masa Ideas"
        product="Gestión interna"
        items={NAV}
        active="reportes"
        onSelect={(id) => router.push(hrefFor(id))}
        user={USER}
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
        {/* Topbar */}
        <header style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ minWidth: 0 }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', lineHeight: 1.15 }}>Reportes</h2>
            <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginTop: 3 }}>Resumen comercial y de inventario</div>
          </div>
          <div style={{ flex: 1 }} />
          <SegmentedControl
            value={periodo}
            onChange={setPeriodo}
            options={[
              { value: 'mes', label: 'Mes' },
              { value: 'trimestre', label: 'Trimestre' },
              { value: 'anio', label: 'Año' },
            ]}
          />
          <div style={{ width: 1, height: 28, background: 'var(--border)' }} />
          <Button variant="secondary" icon="file-down">Exportar</Button>
        </header>

        {/* Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, background: 'var(--bg-sunken)' }}>
          {/* KPI cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16, marginBottom: 16 }}>
            {KPIS.map((k) => (
              <Card key={k.label} padding="md">
                <Stat label={k.label} value={k.value} unit={k.unit} icon={k.icon} delta={k.delta} deltaLabel={k.deltaLabel} />
              </Card>
            ))}
          </div>

          {/* Hero — facturación mensual */}
          <Card padding="lg" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 22 }}>
              <div>
                <span className="eyebrow">Facturación</span>
                <h4 style={{ fontSize: 'var(--text-lg)', marginTop: 4 }}>Facturación mensual</h4>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--fw-medium)', color: 'var(--text-heading)', letterSpacing: 'var(--ls-tight)', fontVariantNumeric: 'tabular-nums' }}>
                    {fmt.money(current)}
                  </span>
                  <DeltaPill delta={data.kpis.facturacion.delta} />
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>este mes</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                <Mini label="Promedio mensual" value={fmt.moneyShort(prom)} />
                <Mini label="Mejor mes" value={`${mejor.mes} · ${fmt.moneyShort(mejor.valor)}`} />
                <Mini label="Crecimiento 12m" value={`+${growth}%`} accent />
              </div>
            </div>
            <BarsVertical points={meses.map((m) => ({ mes: m.mes, value: m.valor }))} height={210} fmt={fmt.moneyShort} />
          </Card>

          {/* Grid de gráficos */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
            {/* Ocupación por zona */}
            <Card padding="lg">
              <CardHead eyebrow="Inventario" title="Ocupación por zona" icon="map-pin" />
              <BarsHorizontal
                items={data.ocupacionPorZona.map((z) => ({
                  label: z.zona,
                  sub: `${z.ocupados}/${z.total} carteles`,
                  value: z.pct,
                  display: z.pct + '%',
                }))}
                max={100}
              />
            </Card>

            {/* Pipeline por etapa */}
            <Card padding="lg">
              <CardHead eyebrow="Comercial" title="Pipeline por etapa" icon="trending-up" />
              <BarsHorizontal
                items={data.pipelinePorEtapa.map((e) => ({
                  label: e.etapa,
                  value: e.valor,
                  display: fmt.moneyShort(e.valor),
                  subValue: `${e.n} op.`,
                  color: e.tone,
                }))}
              />
            </Card>

            {/* Inventario por estado */}
            <Card padding="lg">
              <CardHead eyebrow="Inventario" title="Inventario por estado" icon="layout-panel-top" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap' }}>
                <Donut
                  segments={data.inventarioPorEstado.map((s) => ({ label: ESTADO_LABEL[s.estado], value: s.n, color: s.color }))}
                  size={156}
                  total={totalCarteles}
                  sublabel="Carteles"
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, minWidth: 150 }}>
                  {data.inventarioPorEstado.map((s) => {
                    const pct = Math.round((s.n / totalCarteles) * 100);
                    return (
                      <div key={s.estado} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flex: '0 0 auto' }} />
                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)', flex: 1 }}>{ESTADO_LABEL[s.estado]}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-heading)', fontVariantNumeric: 'tabular-nums' }}>{s.n}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--text-faint)', width: 34, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Top clientes — leaderboard a todo lo ancho */}
            <Card padding="lg" style={{ gridColumn: '1 / -1' }}>
              <CardHead eyebrow="Comercial" title="Top clientes por facturación" icon="building-2" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {data.topClientes.map((c, i) => (
                  <div key={c.nombre} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)' }}>
                    <span
                      style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: 24, height: 24, flex: '0 0 auto', borderRadius: 'var(--radius-sm)',
                        background: i === 0 ? 'var(--accent-soft)' : 'var(--cream-200)',
                        color: i === 0 ? 'var(--accent-text)' : 'var(--text-muted)',
                        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-semibold)',
                      }}
                    >
                      {i + 1}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--fw-medium)', color: 'var(--text-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.nombre}</div>
                      <div style={{ height: 5, marginTop: 6, background: 'var(--cream-200)', borderRadius: 'var(--radius-pill)', overflow: 'hidden', maxWidth: 360 }}>
                        <div style={{ width: `${(c.facturacion / maxFact) * 100}%`, height: '100%', background: i === 0 ? 'var(--accent)' : 'var(--orange-200)', borderRadius: 'var(--radius-pill)' }} />
                      </div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', flex: '0 0 auto', width: 84, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{c.carteles} carteles</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-base)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-heading)', flex: '0 0 auto', width: 84, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{fmt.moneyShort(c.facturacion)}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ReportesApp };
