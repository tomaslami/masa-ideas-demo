'use client';
import React from 'react';
import { Icon, Badge, Button, IconButton, StatusPill } from '@/ds';

const ESTADOS = {
  activo: { label: 'Activo', color: 'var(--success-500)' },
  prospecto: { label: 'Prospecto', color: 'var(--accent)' },
  inactivo: { label: 'Inactivo', color: 'var(--ink-400)' },
};

function Field({ label, children, mono }) {
  return (
    <div>
      <div className="eyebrow" style={{ fontSize: 10, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 'var(--text-base)', color: 'var(--text-heading)', fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)', fontWeight: mono ? 500 : 400, wordBreak: 'break-word' }}>{children}</div>
    </div>
  );
}

function ContactRow({ icon, label, children, mono }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 'var(--radius-sm)', background: 'var(--cream-200)', color: 'var(--text-muted)', flex: '0 0 auto' }}><Icon name={icon} size={15} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="eyebrow" style={{ fontSize: 10, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-heading)', fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)', wordBreak: 'break-word' }}>{children}</div>
      </div>
    </div>
  );
}

function ClienteDrawer({ cliente, fmt, onClose }) {
  if (!cliente) return null;
  const estado = ESTADOS[cliente.estado] || ESTADOS.inactivo;
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
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--accent-text)', fontWeight: 600 }}>{cliente.id}</span>
            <IconButton icon="x" size="sm" title="Cerrar" onClick={onClose} />
          </div>
          <h3 style={{ fontSize: 'var(--text-2xl)', marginTop: 4 }}>{cliente.nombre}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <Badge tone="accent" variant="soft">{cliente.rubro}</Badge>
            <StatusPill label={estado.label} color={estado.color} size="sm" />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* contacto */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Contacto</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <ContactRow icon="user" label="Persona de contacto">{cliente.contacto}</ContactRow>
              <ContactRow icon="mail" label="Email" mono>{cliente.email}</ContactRow>
              <ContactRow icon="phone" label="Teléfono" mono>{cliente.telefono}</ContactRow>
              <ContactRow icon="briefcase" label="Responsable">{cliente.owner}</ContactRow>
              <ContactRow icon="calendar" label="Antigüedad">Cliente desde {cliente.desde}</ContactRow>
            </div>
          </div>

          {/* KPI grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, padding: 16, background: 'var(--cream-100)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <Field label="Oportunidades" mono>{cliente.oportunidades}</Field>
            <Field label="Carteles activos" mono>{cliente.carteles}</Field>
            <Field label="Facturación anual" mono>{fmt.moneyShort(cliente.facturacion)}</Field>
          </div>

          {/* actividad */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Actividad reciente</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { ic: 'send', t: 'Propuesta enviada por email', d: 'hace 3 días', who: cliente.owner },
                { ic: 'phone', t: 'Llamada de seguimiento', d: 'hace 1 semana', who: cliente.owner },
                { ic: 'file-text', t: 'Contrato renovado', d: 'hace 3 semanas', who: cliente.owner },
                { ic: 'user-plus', t: `Cuenta creada · cliente desde ${cliente.desde}`, d: cliente.desde, who: cliente.owner },
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
          <Button variant="secondary" icon="briefcase" style={{ flex: 1 }}>Ver oportunidades</Button>
          <Button variant="primary" icon="file-text" style={{ flex: 1 }}>Nueva propuesta</Button>
        </div>
      </aside>
    </>
  );
}

export { ClienteDrawer };
