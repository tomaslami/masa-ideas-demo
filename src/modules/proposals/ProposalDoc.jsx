'use client';
import React from 'react';
import { Icon, Thumbnail, EmptyState } from '@/ds';
import { MI_PROP_BILLBOARDS } from './data';

function ProposalDoc({ cliente, meses, desc, selected, fmt, creatives = {} }) {
  const bbs = MI_PROP_BILLBOARDS.filter((b) => selected.includes(b.id));
  const mensual = bbs.reduce((a, b) => a + b.precio, 0);
  const subtotal = mensual * meses;
  const descMonto = subtotal * (desc / 100);
  const total = subtotal - descMonto;
  const alcanceTotal = bbs.reduce((a, b) => a + parseInt(b.alcance) * 1000, 0);
  const hoy = new Date().toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' });
  const validez = new Date(Date.now() + 15 * 864e5).toLocaleDateString('es-AR', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="prop-doc" style={{
      width: 760, margin: '0 auto', background: '#fff',
      boxShadow: 'var(--shadow-lg)', borderRadius: 'var(--radius-sm)', overflow: 'hidden',
    }}>
      {/* Header band */}
      <div style={{ background: 'var(--char-900)', color: '#fff', padding: '28px 40px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/brand/logo_mark.png" alt="" style={{ height: 40, width: 40 }} />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.01em' }}>Masa Ideas</div>
            <div style={{ fontSize: 12, color: 'var(--text-on-dark-muted)' }}>Vía pública · Buenos Aires</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="eyebrow" style={{ color: 'var(--orange-300)' }}>Propuesta comercial</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#fff', marginTop: 3 }}>PR-2026-0142</div>
        </div>
      </div>

      {/* Client + meta */}
      <div style={{ padding: '26px 40px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--border)' }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 4 }}>Preparada para</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--text-heading)', lineHeight: 1.1 }}>{cliente || 'Nombre del cliente'}</div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
          <div>Fecha: <strong style={{ color: 'var(--text-body)' }}>{hoy}</strong></div>
          <div>Campaña: <strong style={{ color: 'var(--text-body)' }}>{meses} {meses === 1 ? 'mes' : 'meses'}</strong></div>
          <div>Ejecutiva: <strong style={{ color: 'var(--text-body)' }}>Lucía Fernández</strong></div>
        </div>
      </div>

      {/* Intro line */}
      <div style={{ padding: '20px 40px 6px' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Una selección de {bbs.length} {bbs.length === 1 ? 'emplazamiento' : 'emplazamientos'} de alto tránsito para poner a {cliente || 'tu marca'} donde la ciudad la ve.
        </p>
      </div>

      {/* Reach stats */}
      <div style={{ display: 'flex', gap: 0, margin: '14px 40px 4px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        {[
          { l: 'Carteles', v: bbs.length || '—' },
          { l: 'Alcance mensual est.', v: alcanceTotal ? (alcanceTotal / 1e6).toLocaleString('es-AR', { maximumFractionDigits: 1 }) + 'M' : '—' },
          { l: 'Inversión mensual', v: mensual ? fmt.moneyShort(mensual) : '—' },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, padding: '14px 18px', borderRight: i < 2 ? '1px solid var(--border)' : 'none', background: i === 2 ? 'var(--accent-soft)' : 'var(--cream-100)' }}>
            <div className="eyebrow" style={{ fontSize: 10 }}>{s.l}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 500, color: i === 2 ? 'var(--accent-text)' : 'var(--text-heading)', marginTop: 3 }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Line items */}
      <div style={{ padding: '18px 40px 8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)' }}>
          <thead>
            <tr>
              {['Código', 'Emplazamiento', 'Tipo / medida', 'Alcance', 'Precio / mes'].map((h, i) => (
                <th key={i} style={{ textAlign: i >= 3 ? 'right' : 'left', padding: '0 0 9px', fontSize: 10, fontWeight: 600, letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', borderBottom: '1.5px solid var(--ink-900)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bbs.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: '8px 0' }}><EmptyState art="document" title="Propuesta vacía" description="Elegí carteles del panel para verlos acá." /></td></tr>
            ) : bbs.map((b) => (
              <tr key={b.id}>
                <td style={{ padding: '11px 0', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent-text)', fontWeight: 600 }}>{b.id}</td>
                <td style={{ padding: '11px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Thumbnail kind="billboard" width={44} ratio="4 / 3" src={creatives[b.id]} label={b.dir} />
                    <div>
                      <div style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--text-heading)' }}>{b.dir}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>{b.barrio}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '11px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: 13, color: 'var(--text-muted)' }}>{b.tipo} · {b.medida}</td>
                <td style={{ padding: '11px 0', borderBottom: '1px solid var(--border-subtle)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-body)' }}>{b.alcance}/mes</td>
                <td style={{ padding: '11px 0', borderBottom: '1px solid var(--border-subtle)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-heading)', fontWeight: 500 }}>{fmt.money(b.precio)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '6px 40px 0' }}>
        <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 7 }}>
          <Totline l={`Subtotal (${meses} ${meses === 1 ? 'mes' : 'meses'})`} v={fmt.money(subtotal)} fmt={fmt} muted />
          {desc > 0 && <Totline l={`Descuento ${desc}%`} v={'– ' + fmt.money(descMonto)} accent />}
          <div style={{ height: 1, background: 'var(--ink-900)', margin: '5px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-heading)' }}>Total campaña</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 600, color: 'var(--text-heading)' }}>{fmt.money(total)}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-faint)', textAlign: 'right' }}>+ IVA · valores en pesos argentinos</div>
        </div>
      </div>

      {/* Footer / terms */}
      <div style={{ marginTop: 22, padding: '16px 40px', borderTop: '1px solid var(--border)', background: 'var(--cream-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 420 }}>
          Incluye impresión, colocación y mantenimiento durante todo el período. Sujeto a disponibilidad al momento de la firma.
          <br />Validez de la propuesta: <strong style={{ color: 'var(--text-body)' }}>{validez}</strong>.
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--text-heading)' }}>masaideas.com.ar</div>
          <div style={{ fontSize: 11, color: 'var(--text-faint)' }}>+54 11 4000-0000</div>
        </div>
      </div>
    </div>
  );
}

function Totline({ l, v, accent, muted }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
      <span style={{ color: muted ? 'var(--text-muted)' : accent ? 'var(--accent-text)' : 'var(--text-body)' }}>{l}</span>
      <span style={{ fontFamily: 'var(--font-mono)', color: accent ? 'var(--accent-text)' : 'var(--text-body)', fontWeight: accent ? 600 : 400 }}>{v}</span>
    </div>
  );
}

export { ProposalDoc };
