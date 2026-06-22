'use client';
import React from 'react';
import { Avatar, Badge, StatusPill } from '@/ds';
import { MI_STAGES } from './data';

function DealList({ deals, fmt, onOpen }) {
  const stages = MI_STAGES;
  const stageLabel = (id) => (stages.find((s) => s.id === id) || {}).label;
  const stageTone = (id) => (stages.find((s) => s.id === id) || {}).tone;
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
      <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-sans)' }}>
          <thead>
            <tr style={{ background: 'var(--cream-100)' }}>
              {['Oportunidad', 'Etapa', 'Rubro', 'Responsable', 'Prob.', 'Cierre', 'Valor'].map((h, i) => (
                <th key={i} style={{ textAlign: i === 6 || i === 4 ? 'right' : 'left', padding: '11px 16px', fontSize: 'var(--text-2xs)', fontWeight: 600, letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-faint)', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {deals.map((d) => (
              <tr key={d.id} onClick={() => onOpen(d.id)} style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--text-heading)' }}>{d.cliente}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', color: 'var(--text-faint)' }}>{d.id} · {d.contacto}</div>
                </td>
                <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <StatusPill label={stageLabel(d.etapa)} color={stageTone(d.etapa)} size="sm" />
                </td>
                <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)' }}><Badge tone="neutral" variant="outline" size="sm">{d.tag}</Badge></td>
                <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><Avatar name={d.owner} size={22} /><span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>{d.owner}</span></div>
                </td>
                <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>{d.prob}%</td>
                <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{fmt.date(d.cierre)}</td>
                <td style={{ padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-heading)', fontWeight: 500 }}>{fmt.money(d.valor)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { DealList };
