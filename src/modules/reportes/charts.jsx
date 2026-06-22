'use client';
import React from 'react';

// Masa Ideas — primitivas de gráficos sin dependencias.
// Divs + SVG, on-brand (crema + tinta, acento puntual, cifras en mono tabular).
// SSR-safe: nada de `window` en el scope del módulo.

/**
 * BarsVertical — serie temporal en barras (p. ej. facturación mensual).
 * Barras en gris cálido, el período actual (o el que está bajo el cursor) en
 * acento, con grilla de fondo y tooltip al pasar el mouse.
 * points: [{ mes|label, value }]. fmt: opcional para formatear el tooltip.
 */
export function BarsVertical({ points = [], height = 200, fmt }) {
  const [hover, setHover] = React.useState(null);
  const values = points.map((p) => p.value || 0);
  const max = Math.max(1, ...values);
  const fmtVal = fmt || ((v) => v);

  return (
    <div>
      <div style={{ position: 'relative', height }}>
        {/* grilla horizontal */}
        {[1, 0.75, 0.5, 0.25, 0].map((g) => (
          <div
            key={g}
            style={{
              position: 'absolute', left: 0, right: 0, bottom: `${g * 100}%`,
              height: 1, background: g === 0 ? 'var(--border)' : 'var(--border-subtle)',
            }}
          />
        ))}
        {/* barras */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', gap: 7 }}>
          {points.map((p, i) => {
            const h = Math.max(2, ((p.value || 0) / max) * 100);
            const last = i === points.length - 1;
            const active = hover === i || (hover === null && last);
            return (
              <div
                key={i}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', position: 'relative' }}
              >
                {hover === i && (
                  <div
                    style={{
                      position: 'absolute', bottom: `calc(${h}% + 8px)`, left: '50%', transform: 'translateX(-50%)',
                      whiteSpace: 'nowrap', zIndex: 2,
                      background: 'var(--char-900)', color: 'var(--text-on-dark)',
                      padding: '4px 8px', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-md)',
                      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    <span style={{ color: 'var(--orange-300)' }}>{p.mes || p.label}</span> · {fmtVal(p.value)}
                  </div>
                )}
                <div
                  style={{
                    width: '100%', maxWidth: 30, height: `${h}%`, minHeight: 3,
                    background: active ? 'var(--accent)' : 'var(--line-400)',
                    borderRadius: '3px 3px 0 0',
                    transition: 'background var(--dur-fast) var(--ease-out), height var(--dur) var(--ease-out)',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* etiquetas de meses */}
      <div style={{ display: 'flex', gap: 7, marginTop: 8 }}>
        {points.map((p, i) => (
          <span
            key={i}
            style={{
              flex: 1, textAlign: 'center',
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)',
              color: hover === i || (hover === null && i === points.length - 1) ? 'var(--accent-text)' : 'var(--text-faint)',
              fontWeight: hover === i || (hover === null && i === points.length - 1) ? 'var(--fw-semibold)' : 'var(--fw-regular)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {p.mes || p.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * BarsHorizontal — filas con etiqueta, track crema y barra de relleno.
 * items: [{ label, sub?, value, display?, subValue?, color? }]
 */
export function BarsHorizontal({ items = [], max, color = 'var(--accent)' }) {
  const top = max != null ? max : Math.max(1, ...items.map((it) => it.value || 0));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {items.map((it, i) => {
        const pct = top > 0 ? Math.max(0, Math.min(100, ((it.value || 0) / top) * 100)) : 0;
        const fill = it.color || color;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 104, flex: '0 0 104px', minWidth: 0 }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-medium)', color: 'var(--text-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {it.label}
              </div>
              {it.sub != null && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--text-faint)', fontVariantNumeric: 'tabular-nums' }}>{it.sub}</div>
              )}
            </div>
            <div style={{ position: 'relative', flex: 1, height: 12, background: 'var(--cream-200)', borderRadius: 'var(--radius-pill)', overflow: 'hidden' }}>
              <div
                style={{
                  position: 'absolute', inset: '0 auto 0 0', width: pct + '%',
                  background: fill, borderRadius: 'var(--radius-pill)',
                  transition: 'width var(--dur) var(--ease-out)',
                }}
              />
            </div>
            <div style={{ width: 70, flex: '0 0 70px', textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--text-heading)', fontVariantNumeric: 'tabular-nums' }}>
                {it.display != null ? it.display : it.value}
              </div>
              {it.subValue != null && (
                <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-faint)' }}>{it.subValue}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Donut — anillo SVG (stroke-dasharray) para distribución por categoría.
 * segments: [{ label, value, color }]. Total + sublabel centrados.
 */
export function Donut({ segments = [], size = 168, total: totalProp, sublabel = 'Total' }) {
  const total = totalProp != null ? totalProp : segments.reduce((a, s) => a + (s.value || 0), 0);
  const sum = segments.reduce((a, s) => a + (s.value || 0), 0);
  const stroke = 20;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const gap = 0.012; // pequeño espacio entre segmentos (fracción de la vuelta)

  let acc = 0;
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: '0 0 auto' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Distribución">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--cream-200)" strokeWidth={stroke} />
        {sum > 0 &&
          segments.map((s, i) => {
            const frac = (s.value || 0) / sum;
            const len = Math.max(0, frac - gap) * circ;
            const dashoffset = -acc * circ;
            acc += frac;
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={stroke}
                strokeDasharray={`${len.toFixed(2)} ${(circ - len).toFixed(2)}`}
                strokeDashoffset={dashoffset.toFixed(2)}
                transform={`rotate(-90 ${cx} ${cy})`}
                strokeLinecap="round"
              />
            );
          })}
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-3xl)', fontWeight: 'var(--fw-medium)', color: 'var(--text-heading)', letterSpacing: 'var(--ls-tight)', fontVariantNumeric: 'tabular-nums' }}>
          {total}
        </span>
        <span className="eyebrow">{sublabel}</span>
      </div>
    </div>
  );
}
