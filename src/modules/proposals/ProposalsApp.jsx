'use client';
import React from 'react';
import { Sidebar, Button, IconButton, Icon, ImportDialog } from '@/ds';
import { hrefFor } from '@/modules/nav';
import { useRouter } from 'next/navigation';
import { ProposalDoc } from './ProposalDoc';
import { MI_PROP_BILLBOARDS, MI_PROP_FMT } from './data';
import { Stepper, StepCliente, StepCarteles, StepCreatividad, StepCondiciones } from './ProposalSteps';

const NAV = [
  { section: 'Operación' },
  { id: 'inventario', label: 'Inventario', icon: 'map-pin', badge: 16 },
  { id: 'pipeline', label: 'Pipeline', icon: 'kanban', badge: 18 },
  { id: 'propuestas', label: 'Propuestas', icon: 'file-text' },
  { id: 'clientes', label: 'Clientes', icon: 'users' },
  { divider: true },
  { section: 'Cuenta' },
  { id: 'reportes', label: 'Reportes', icon: 'chart-no-axes-column' },
  { id: 'config', label: 'Configuración', icon: 'settings' },
];

function ProposalsApp() {
  const router = useRouter();
  const fmt = MI_PROP_FMT;
  const bbs = MI_PROP_BILLBOARDS;

  const [step, setStep] = React.useState(1);
  const [maxReached, setMaxReached] = React.useState(1);
  const [cliente, setCliente] = React.useState({ nombre: 'Cervecería del Plata', contacto: 'Martín Aguirre', email: 'compras@cerveceriadelplata.com', rubro: 'Bebidas' });
  const [meses, setMeses] = React.useState(3);
  const [desc, setDesc] = React.useState(10);
  const [selected, setSelected] = React.useState(['MI-0245', 'MI-0067', 'MI-0781']);
  const [creatives, setCreatives] = React.useState({});
  const [toast, setToast] = React.useState(null);
  const [importOpen, setImportOpen] = React.useState(false);

  const setField = (k, v) => setCliente((c) => ({ ...c, [k]: v }));
  const toggle = (id) => setSelected((cur) => cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]);
  const setCreative = (id, src) => setCreatives((c) => { const n = { ...c }; if (src) n[id] = src; else delete n[id]; return n; });
  const applyToAll = (src) => setCreatives(() => { const n = {}; selected.forEach((id) => { n[id] = src; }); return n; });

  const goTo = (n) => { setStep(n); setMaxReached((m) => Math.max(m, n)); };
  const canContinue = step === 1 ? cliente.nombre.trim() !== '' : step === 2 ? selected.length > 0 : true;

  const onSend = () => { setToast(`Propuesta enviada a ${cliente.nombre}`); setTimeout(() => setToast(null), 2800); };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', background: 'var(--bg-page)' }}>
      <Sidebar logoSrc="/brand/logo_mark.png" brand="Masa Ideas" product="Gestión interna"
        items={NAV} active="propuestas" onSelect={(id) => router.push(hrefFor(id))}
        user={{ name: 'Lucía Fernández', role: 'Ejecutiva comercial' }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Topbar */}
        <header style={{ height: 'var(--topbar-h)', flex: '0 0 var(--topbar-h)', display: 'flex', alignItems: 'center', gap: 14, padding: '0 20px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 'var(--text-sm)' }}>
            <span>Propuestas</span><Icon name="chevron-right" size={15} style={{ color: 'var(--text-faint)' }} /><span style={{ color: 'var(--text-heading)', fontWeight: 'var(--fw-semibold)' }}>{cliente.nombre || 'Nueva propuesta'}</span>
          </div>
          <div style={{ flex: 1 }} />
          <Button variant="ghost" icon="save">Guardar borrador</Button>
        </header>

        {/* Barra de pasos */}
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 24px', background: 'var(--surface-card)', borderBottom: '1px solid var(--border)' }}>
          <Stepper step={step} setStep={goTo} maxReached={maxReached} />
        </div>

        {/* Contenido del paso */}
        <div style={{ flex: 1, overflow: 'auto', padding: step === 5 ? '28px 24px' : '32px 28px', background: step === 5 ? 'var(--bg-sunken)' : 'var(--bg-page)' }}>
          {step === 1 && <StepCliente cliente={cliente} setField={setField} />}
          {step === 2 && <StepCarteles bbs={bbs} selected={selected} toggle={toggle} fmt={fmt} />}
          {step === 3 && <StepCreatividad bbs={bbs} selected={selected} creatives={creatives} setCreative={setCreative} applyToAll={applyToAll} />}
          {step === 4 && <StepCondiciones bbs={bbs} selected={selected} meses={meses} setMeses={setMeses} desc={desc} setDesc={setDesc} fmt={fmt} />}
          {step === 5 && (
            <div>
              <ProposalDoc cliente={cliente.nombre} meses={meses} desc={desc} selected={selected} fmt={fmt} creatives={creatives} />
              <div style={{ height: 28 }} />
            </div>
          )}
        </div>

        {/* Footer de navegación */}
        <footer style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px', background: 'var(--surface-card)', borderTop: '1px solid var(--border)' }}>
          <Button variant="ghost" icon="arrow-left" disabled={step === 1} onClick={() => goTo(step - 1)}>Atrás</Button>
          <div style={{ flex: 1 }} />
          {step === 2 && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginRight: 4 }}><strong style={{ color: 'var(--text-heading)' }}>{selected.length}</strong> {selected.length === 1 ? 'cartel' : 'carteles'}</span>}
          {step === 3 && <Button variant="secondary" icon="file-up" onClick={() => setImportOpen(true)}>Importar piezas</Button>}
          {step < 5 ? (
            <Button variant="primary" iconRight="arrow-right" disabled={!canContinue} onClick={() => goTo(step + 1)}>Continuar</Button>
          ) : (
            <>
              <Button variant="secondary" icon="file-down" onClick={() => setToast('Propuesta exportada en PDF')}>Exportar PDF</Button>
              <Button variant="primary" icon="send" onClick={onSend}>Enviar al cliente</Button>
            </>
          )}
        </footer>
      </div>

      <ImportDialog open={importOpen} onClose={() => setImportOpen(false)} entity="carteles" rows={16} />

      {toast && (
        <div style={{ position: 'fixed', left: '50%', bottom: 28, transform: 'translateX(-50%)', zIndex: 800, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--char-900)', color: 'var(--text-on-dark)', padding: '11px 16px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', fontSize: 'var(--text-sm)' }}>
          <Icon name="circle-check" size={17} style={{ color: 'var(--status-disponible)' }} />
          {toast}
        </div>
      )}
    </div>
  );
}

export { ProposalsApp };
