import React from 'react';
import { Icon } from '../icon/Icon.jsx';

/**
 * Sidebar — the app's dark navigation shell. Charcoal background, cream text,
 * orange active state. Logo lockup on top, user footer on the bottom.
 *
 * items: array of { id, label, icon, badge? } or { divider: true } or { section: 'LABEL' }.
 */
export function Sidebar({
  items = [],
  active,
  onSelect,
  logoSrc,
  brand = 'Masa Ideas',
  product,
  user,
  collapsed = false,
  footerItems = [],
  style = {},
}) {
  const W = collapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)';

  const NavItem = ({ it }) => {
    const isActive = it.id === active;
    const [hover, setHover] = React.useState(false);
    return (
      <button
        type="button"
        onClick={() => onSelect && onSelect(it.id)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        title={collapsed ? it.label : undefined}
        style={{
          position: 'relative', display: 'flex', alignItems: 'center', gap: 11,
          width: '100%', height: 38, padding: collapsed ? 0 : '0 10px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          background: isActive ? 'color-mix(in srgb, var(--accent) 16%, transparent)' : hover ? 'var(--sidebar-raised)' : 'transparent',
          border: 'none', borderRadius: 'var(--radius-sm)',
          color: isActive ? '#fff' : 'var(--text-on-dark-muted)',
          fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)',
          fontWeight: isActive ? 'var(--fw-semibold)' : 'var(--fw-medium)',
          cursor: 'pointer', textAlign: 'left',
          transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
        }}
      >
        {isActive && <span style={{ position: 'absolute', left: -8, top: 7, bottom: 7, width: 3, borderRadius: 999, background: 'var(--accent)' }} />}
        <Icon name={it.icon} size={18} style={{ color: isActive ? 'var(--accent)' : 'inherit' }} />
        {!collapsed && <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.label}</span>}
        {!collapsed && it.badge !== undefined && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-semibold)', color: isActive ? '#fff' : 'var(--text-on-dark-muted)', background: isActive ? 'var(--accent)' : 'var(--sidebar-raised)', padding: '1px 6px', borderRadius: 999 }}>{it.badge}</span>
        )}
      </button>
    );
  };

  return (
    <aside
      style={{
        width: W, flex: `0 0 ${W}`, height: '100%',
        background: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--char-800)',
        display: 'flex', flexDirection: 'column',
        padding: collapsed ? '14px 8px' : '14px 16px',
        transition: 'width var(--dur) var(--ease-out)',
        ...style,
      }}
    >
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: collapsed ? '4px 0 16px' : '4px 4px 18px', justifyContent: collapsed ? 'center' : 'flex-start' }}>
        {logoSrc && <img src={logoSrc} alt="" style={{ height: 30, width: 30, flex: '0 0 auto' }} />}
        {!collapsed && (
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 17, color: '#fff', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>{brand}</div>
            {product && <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--text-on-dark-muted)' }}>{product}</div>}
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, overflowY: 'auto' }}>
        {items.map((it, i) => {
          if (it.divider) return <div key={i} style={{ height: 1, background: 'var(--char-800)', margin: '10px 4px' }} />;
          if (it.section) return collapsed ? <div key={i} style={{ height: 8 }} /> : <div key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--char-600)', padding: '12px 10px 6px' }}>{it.section}</div>;
          return <NavItem key={it.id} it={it} />;
        })}
      </nav>

      {/* User footer */}
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12, padding: collapsed ? 0 : '10px 8px', justifyContent: collapsed ? 'center' : 'flex-start', borderTop: '1px solid var(--char-800)', paddingTop: 12 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: '50%', background: 'var(--accent)', color: '#fff', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 12, flex: '0 0 auto' }}>
            {(user.name || '?').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
          </span>
          {!collapsed && (
            <div style={{ flex: 1, lineHeight: 1.25, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-on-dark)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
              {user.role && <div style={{ fontSize: 11, color: 'var(--text-on-dark-muted)' }}>{user.role}</div>}
            </div>
          )}
          {!collapsed && <Icon name="chevron-right" size={16} style={{ color: 'var(--char-600)' }} />}
        </div>
      )}
    </aside>
  );
}
