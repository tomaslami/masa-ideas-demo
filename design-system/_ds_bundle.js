/* @ds-bundle: {"format":3,"namespace":"DesignSystem_27db72","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/data-display/Avatar.jsx"},{"name":"Card","sourcePath":"components/data-display/Card.jsx"},{"name":"Stat","sourcePath":"components/data-display/Stat.jsx"},{"name":"Thumbnail","sourcePath":"components/data-display/Thumbnail.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"StatusPill","sourcePath":"components/feedback/StatusPill.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Icon","sourcePath":"components/icon/Icon.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"ImportDialog","sourcePath":"components/overlays/ImportDialog.jsx"},{"name":"Modal","sourcePath":"components/overlays/Modal.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"e103c03146c2","components/actions/IconButton.jsx":"4f5583686b3a","components/data-display/Avatar.jsx":"d7584a45b412","components/data-display/Card.jsx":"050d6a485366","components/data-display/Stat.jsx":"13c8aa1d99a4","components/data-display/Thumbnail.jsx":"d164333ff169","components/feedback/Badge.jsx":"b1a98f5e9a7c","components/feedback/EmptyState.jsx":"46aa3c27eb65","components/feedback/StatusPill.jsx":"d37c21f094a5","components/feedback/Tooltip.jsx":"c960d707f281","components/forms/Checkbox.jsx":"5f159ec8b0ff","components/forms/Input.jsx":"2b76cb0b09e7","components/forms/SegmentedControl.jsx":"fc6e7c1ed21c","components/forms/Select.jsx":"b7f0b91205cd","components/forms/Switch.jsx":"29678d9f177f","components/forms/Textarea.jsx":"cb761711302d","components/icon/Icon.jsx":"62498faf987e","components/navigation/Sidebar.jsx":"8a4084fb7140","components/navigation/Tabs.jsx":"51e570ecfa70","components/overlays/ImportDialog.jsx":"e3fa84ab0e47","components/overlays/Modal.jsx":"3645d10c8420","ui_kits/inventory/InventoryApp.jsx":"9c245ab5b197","ui_kits/inventory/InventoryPanel.jsx":"a5ff67641e65","ui_kits/inventory/MapView.jsx":"5656a8156ee1","ui_kits/inventory/data.js":"121bbd3212f0","ui_kits/pipeline/DealCard.jsx":"0c1d777ae6d5","ui_kits/pipeline/DealDrawer.jsx":"54dc3480d436","ui_kits/pipeline/DealList.jsx":"022ef49fee36","ui_kits/pipeline/KanbanBoard.jsx":"cdc59a866c5b","ui_kits/pipeline/PipelineApp.jsx":"429e14ff6361","ui_kits/pipeline/data.js":"0de3a755d73c","ui_kits/proposals/BillboardPreview.jsx":"6891f10cedda","ui_kits/proposals/ProposalBuilder.jsx":"e4b639dd3cdf","ui_kits/proposals/ProposalDoc.jsx":"15bdabd1b4c5","ui_kits/proposals/ProposalSteps.jsx":"570ef2384bd4","ui_kits/proposals/ProposalsApp.jsx":"ffdf7c5c9d60","ui_kits/proposals/data.js":"04e6faf35bc2"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DesignSystem_27db72 = window.DesignSystem_27db72 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/data-display/Avatar.jsx
try { (() => {
/** Avatar — initials or image. Warm-tinted fallback. */
const PALETTE = ['#D8530C', '#2F8F5B', '#3A6EA5', '#A01020', '#C98A12', '#6E4A2B'];
function hashIndex(str = '') {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = h * 31 + str.charCodeAt(i) >>> 0;
  return h % PALETTE.length;
}
function initials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase() || '?';
}
function Avatar({
  name = '',
  src,
  size = 32,
  color,
  square = false,
  style = {}
}) {
  const sz = typeof size === 'number' ? size : {
    sm: 24,
    md: 32,
    lg: 40
  }[size] || 32;
  const bg = color || PALETTE[hashIndex(name)];
  return /*#__PURE__*/React.createElement("span", {
    title: name,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: sz,
      height: sz,
      flex: '0 0 auto',
      borderRadius: square ? 'var(--radius-sm)' : '50%',
      background: src ? 'var(--cream-200)' : bg,
      color: '#fff',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: Math.round(sz * 0.4),
      letterSpacing: 0,
      overflow: 'hidden',
      userSelect: 'none',
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Card.jsx
try { (() => {
/**
 * Card — white surface container. Optional padding, header/footer slots.
 * elevation: flat | sm | md. interactive adds hover lift.
 */
function Card({
  children,
  header,
  footer,
  padding = 'md',
  elevation = 'sm',
  interactive = false,
  onClick,
  style = {},
  bodyStyle = {}
}) {
  const pads = {
    none: 0,
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-7)'
  };
  const shadows = {
    flat: 'none',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)'
  };
  const [hover, setHover] = React.useState(false);
  const p = pads[padding] ?? pads.md;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      boxShadow: interactive && hover ? 'var(--shadow-md)' : shadows[elevation],
      transform: interactive && hover ? 'translateY(-1px)' : 'none',
      cursor: interactive ? 'pointer' : undefined,
      transition: 'box-shadow var(--dur) var(--ease-out), transform var(--dur) var(--ease-out)',
      overflow: 'hidden',
      ...style
    }
  }, header && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: `var(--space-4) ${typeof p === 'number' ? p : p}`,
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: p,
      ...bodyStyle
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: `var(--space-4) ${typeof p === 'number' ? p : p}`,
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--cream-100)'
    }
  }, footer));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Card.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Thumbnail.jsx
try { (() => {
/**
 * Thumbnail — image, or a clean SVG placeholder when none is loaded yet.
 * kind: billboard | image | map. Use for billboard photos in fichas/proposals.
 */
function Thumbnail({
  src,
  kind = 'billboard',
  width = '100%',
  height,
  ratio = '4 / 3',
  rounded = true,
  label,
  style = {}
}) {
  const art = {
    billboard: /*#__PURE__*/React.createElement("svg", {
      width: "46",
      height: "46",
      viewBox: "0 0 64 64",
      fill: "none",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "8",
      y: "10",
      width: "48",
      height: "28",
      rx: "2",
      fill: "#fff",
      stroke: "var(--ink-400)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 22h22M16 29h14",
      stroke: "var(--line-400)",
      strokeWidth: "2",
      strokeLinecap: "round"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M24 38v16M40 38v16M20 54h8M36 54h8",
      stroke: "var(--ink-400)",
      strokeWidth: "2",
      strokeLinecap: "round"
    })),
    image: /*#__PURE__*/React.createElement("svg", {
      width: "44",
      height: "44",
      viewBox: "0 0 64 64",
      fill: "none",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "10",
      y: "12",
      width: "44",
      height: "40",
      rx: "3",
      fill: "#fff",
      stroke: "var(--ink-400)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "23",
      cy: "25",
      r: "4",
      fill: "var(--accent)"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 46l12-12 8 7 7-6 9 11",
      stroke: "var(--ink-400)",
      strokeWidth: "2",
      strokeLinejoin: "round",
      fill: "none"
    })),
    map: /*#__PURE__*/React.createElement("svg", {
      width: "44",
      height: "44",
      viewBox: "0 0 64 64",
      fill: "none",
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M32 14c-7 0-12 5-12 12 0 9 12 22 12 22s12-13 12-22c0-7-5-12-12-12z",
      fill: "#fff",
      stroke: "var(--ink-400)",
      strokeWidth: "2",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "32",
      cy: "26",
      r: "5",
      fill: "var(--accent)"
    }))
  }[kind] || null;
  return /*#__PURE__*/React.createElement("div", {
    title: label,
    style: {
      position: 'relative',
      width,
      height,
      aspectRatio: height ? undefined : ratio,
      background: src ? 'var(--cream-200)' : 'var(--cream-100)',
      backgroundImage: src ? `url(${src})` : 'repeating-linear-gradient(135deg, transparent, transparent 9px, rgba(180,170,150,0.10) 9px, rgba(180,170,150,0.10) 10px)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      border: '1px solid var(--border)',
      borderRadius: rounded ? 'var(--radius-md)' : 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-faint)',
      overflow: 'hidden',
      flex: '0 0 auto',
      ...style
    }
  }, !src && art);
}
Object.assign(__ds_scope, { Thumbnail });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Thumbnail.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
/* Clean, simple line illustrations — warm, minimal, accent used sparingly. */
const ART = {
  search: /*#__PURE__*/React.createElement("svg", {
    width: "72",
    height: "72",
    viewBox: "0 0 72 72",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "33",
    cy: "33",
    r: "17",
    fill: "var(--cream-200)",
    stroke: "var(--line-400)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M45 45l11 11",
    stroke: "var(--ink-400)",
    strokeWidth: "2.5",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M27 33h12M33 27v12",
    stroke: "var(--accent)",
    strokeWidth: "2",
    strokeLinecap: "round",
    opacity: "0.55"
  })),
  map: /*#__PURE__*/React.createElement("svg", {
    width: "72",
    height: "72",
    viewBox: "0 0 72 72",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "36",
    cy: "36",
    r: "24",
    fill: "var(--cream-200)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M36 22c-6 0-11 5-11 11 0 8 11 17 11 17s11-9 11-17c0-6-5-11-11-11z",
    fill: "#fff",
    stroke: "var(--ink-400)",
    strokeWidth: "2",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "36",
    cy: "33",
    r: "4",
    fill: "var(--accent)"
  })),
  inbox: /*#__PURE__*/React.createElement("svg", {
    width: "72",
    height: "72",
    viewBox: "0 0 72 72",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "16",
    y: "22",
    width: "40",
    height: "30",
    rx: "3",
    fill: "var(--cream-200)",
    stroke: "var(--line-400)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 40h11l3 5h12l3-5h11",
    fill: "#fff",
    stroke: "var(--ink-400)",
    strokeWidth: "2",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M30 31h12",
    stroke: "var(--accent)",
    strokeWidth: "2",
    strokeLinecap: "round",
    opacity: "0.55"
  })),
  document: /*#__PURE__*/React.createElement("svg", {
    width: "72",
    height: "72",
    viewBox: "0 0 72 72",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M24 16h16l12 12v28a2 2 0 0 1-2 2H24a2 2 0 0 1-2-2V18a2 2 0 0 1 2-2z",
    fill: "#fff",
    stroke: "var(--ink-400)",
    strokeWidth: "2",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M40 16v12h12",
    fill: "var(--cream-200)",
    stroke: "var(--ink-400)",
    strokeWidth: "2",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M29 40h14M29 47h10",
    stroke: "var(--accent)",
    strokeWidth: "2",
    strokeLinecap: "round",
    opacity: "0.55"
  })),
  board: /*#__PURE__*/React.createElement("svg", {
    width: "72",
    height: "72",
    viewBox: "0 0 72 72",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "18",
    y: "20",
    width: "14",
    height: "20",
    rx: "2",
    fill: "#fff",
    stroke: "var(--line-400)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "40",
    y: "20",
    width: "14",
    height: "32",
    rx: "2",
    fill: "var(--cream-200)",
    stroke: "var(--line-400)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 27h6M22 32h4",
    stroke: "var(--accent)",
    strokeWidth: "2",
    strokeLinecap: "round",
    opacity: "0.5"
  }))
};

/**
 * EmptyState — clean SVG illustration + title + optional description and action.
 * art: search | map | inbox | document | board.
 */
function EmptyState({
  art = 'inbox',
  title,
  description,
  action,
  compact = false,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: compact ? 8 : 10,
      padding: compact ? '24px 16px' : '44px 24px',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: compact ? 'scale(0.72)' : 'none',
      marginBottom: compact ? -6 : 0
    }
  }, ART[art] || ART.inbox), title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: compact ? 'var(--text-md)' : 'var(--text-lg)',
      color: 'var(--text-heading)'
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      maxWidth: 300,
      lineHeight: 1.5
    }
  }, description), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, action));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/StatusPill.jsx
try { (() => {
/**
 * StatusPill — inventory/pipeline status with a colored dot.
 * status: disponible | reservado | ocupado | mantenimiento | vencido (or pass custom color).
 */
const STATUS = {
  disponible: {
    label: 'Disponible',
    color: 'var(--status-disponible)'
  },
  reservado: {
    label: 'Reservado',
    color: 'var(--status-reservado)'
  },
  ocupado: {
    label: 'Ocupado',
    color: 'var(--status-ocupado)'
  },
  mantenimiento: {
    label: 'Mantenimiento',
    color: 'var(--status-mantenim)'
  },
  vencido: {
    label: 'Vencido',
    color: 'var(--danger-500)'
  }
};
function StatusPill({
  status = 'disponible',
  label,
  color,
  size = 'md',
  solid = false,
  style = {}
}) {
  const def = STATUS[status] || {};
  const c = color || def.color || 'var(--ink-400)';
  const text = label || def.label || status;
  const sz = size === 'sm' ? {
    fs: 'var(--text-2xs)',
    dot: 6,
    gap: 5
  } : {
    fs: 'var(--text-xs)',
    dot: 7,
    gap: 6
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: sz.gap,
      fontFamily: 'var(--font-sans)',
      fontSize: sz.fs,
      fontWeight: 'var(--fw-semibold)',
      color: solid ? '#fff' : 'var(--text-body)',
      background: solid ? c : 'transparent',
      padding: solid ? '3px 8px' : 0,
      borderRadius: 'var(--radius-xs)',
      letterSpacing: 'var(--ls-snug)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, !solid && /*#__PURE__*/React.createElement("span", {
    style: {
      width: sz.dot,
      height: sz.dot,
      borderRadius: '50%',
      background: c,
      flex: '0 0 auto',
      boxShadow: '0 0 0 3px color-mix(in srgb, ' + c + ' 16%, transparent)'
    }
  }), text);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/**
 * Tooltip — dark label on hover/focus. Wraps a single trigger child.
 * placement: top | bottom | left | right.
 */
function Tooltip({
  label,
  placement = 'top',
  children,
  style = {}
}) {
  const [show, setShow] = React.useState(false);
  const pos = {
    top: {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      mb: 8
    },
    bottom: {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      mt: 8
    },
    left: {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      mr: 8
    },
    right: {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      ml: 8
    }
  }[placement];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      zIndex: 'var(--z-popover)',
      bottom: pos.bottom,
      top: pos.top,
      left: pos.left,
      right: pos.right,
      transform: pos.transform,
      marginBottom: pos.mb,
      marginTop: pos.mt,
      marginLeft: pos.ml,
      marginRight: pos.mr,
      padding: '5px 9px',
      background: 'var(--char-900)',
      color: 'var(--text-on-dark)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--fw-medium)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: 'var(--shadow-md)',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
      ...style
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/** Switch — toggle for settings/filters. Orange when on. */
function Switch({
  checked = false,
  disabled = false,
  onChange,
  label,
  id,
  style = {}
}) {
  const rid = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: rid,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    id: rid,
    type: "button",
    role: "switch",
    "aria-checked": checked,
    disabled: disabled,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      position: 'relative',
      width: 38,
      height: 22,
      flex: '0 0 auto',
      background: checked ? 'var(--accent)' : 'var(--line-400)',
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      padding: 0,
      transition: 'background var(--dur) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 19 : 3,
      width: 16,
      height: 16,
      background: '#fff',
      borderRadius: '50%',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left var(--dur) var(--ease-out)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Textarea — multiline text field matching Input styling. */
function Textarea({
  label,
  hint,
  error,
  rows = 4,
  disabled = false,
  fullWidth = true,
  id,
  style = {},
  containerStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const rid = id || React.useId();
  const borderColor = error ? 'var(--danger-500)' : focus ? 'var(--accent)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: fullWidth ? '100%' : undefined,
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: rid,
    style: {
      display: 'block',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-body)',
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: rid,
    rows: rows,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      resize: 'vertical',
      padding: '9px 11px',
      background: disabled ? 'var(--cream-200)' : 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-control)',
      boxShadow: focus && !error ? 'var(--shadow-focus)' : 'none',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--text-heading)',
      outline: 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 5,
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--danger-700)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/icon/Icon.jsx
try { (() => {
/**
 * Icon — thin wrapper over Lucide icons (loaded from CDN as `window.lucide`).
 * Renders into a ref'd span via innerHTML so React never fights Lucide's
 * placeholder→SVG swap. Inherits `currentColor`.
 */
function Icon({
  name,
  size = 18,
  strokeWidth = 2,
  className = '',
  style = {},
  label
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = `<i data-lucide="${name}"></i>`;
    if (typeof window !== 'undefined' && window.lucide) {
      try {
        window.lucide.createIcons();
      } catch (e) {/* noop */}
    }
    const svg = el.querySelector('svg');
    if (svg) {
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('stroke-width', strokeWidth);
      svg.style.display = 'block';
    }
  }, [name, size, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: `mi-icon ${className}`,
    role: label ? 'img' : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      lineHeight: 0,
      width: size,
      height: size,
      flex: '0 0 auto',
      color: 'inherit',
      ...style
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icon/Icon.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — primary action element. Single orange accent, near-square corners.
 * Variants: primary | secondary | ghost | danger. Sizes: sm | md | lg.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  iconOnly = false,
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  className = '',
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      h: 30,
      px: 10,
      fs: 'var(--text-sm)',
      gap: 6,
      ic: 15
    },
    md: {
      h: 36,
      px: 14,
      fs: 'var(--text-base)',
      gap: 7,
      ic: 17
    },
    lg: {
      h: 44,
      px: 20,
      fs: 'var(--text-md)',
      gap: 8,
      ic: 19
    }
  };
  const s = sizes[size] || sizes.md;
  const palettes = {
    primary: {
      bg: 'var(--accent)',
      color: 'var(--text-on-accent)',
      border: 'transparent',
      hover: 'var(--accent-hover)',
      active: 'var(--accent-active)'
    },
    secondary: {
      bg: 'var(--surface-card)',
      color: 'var(--text-heading)',
      border: 'var(--border-strong)',
      hover: 'var(--surface-hover)',
      active: 'var(--cream-300)'
    },
    ghost: {
      bg: 'transparent',
      color: 'var(--text-body)',
      border: 'transparent',
      hover: 'var(--surface-hover)',
      active: 'var(--cream-300)'
    },
    danger: {
      bg: 'var(--danger-500)',
      color: '#fff',
      border: 'transparent',
      hover: 'var(--danger-700)',
      active: 'var(--danger-700)'
    }
  };
  const p = palettes[variant] || palettes.primary;
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const isDisabled = disabled || loading;
  const bg = isDisabled ? undefined : down ? p.active : hover ? p.hover : p.bg;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: isDisabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
    className: `mi-btn ${className}`,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.h,
      width: fullWidth ? '100%' : undefined,
      padding: iconOnly ? 0 : `0 ${s.px}px`,
      minWidth: iconOnly ? s.h : undefined,
      fontFamily: 'var(--font-sans)',
      fontSize: s.fs,
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-snug)',
      color: isDisabled ? 'var(--text-disabled)' : p.color,
      background: isDisabled ? 'var(--cream-200)' : bg,
      border: `1px solid ${isDisabled ? 'var(--border)' : p.border}`,
      borderRadius: 'var(--radius-control)',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      boxShadow: variant === 'primary' && !isDisabled ? 'var(--shadow-xs)' : 'none',
      transition: 'background var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
      transform: down && !isDisabled ? 'translateY(0.5px)' : 'none',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), loading && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "loader-circle",
    size: s.ic,
    className: "mi-spin"
  }), !loading && icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.ic
  }), !iconOnly && children, !loading && iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.ic
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — square icon-only action. For toolbars, table rows, popovers.
 * Variants: ghost (default) | secondary | primary | danger. Sizes: sm | md | lg.
 */
function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  active = false,
  title,
  onClick,
  className = '',
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      d: 28,
      ic: 16
    },
    md: {
      d: 34,
      ic: 18
    },
    lg: {
      d: 40,
      ic: 20
    }
  };
  const s = sizes[size] || sizes.md;
  const palettes = {
    ghost: {
      bg: 'transparent',
      color: 'var(--text-muted)',
      border: 'transparent',
      hover: 'var(--surface-hover)',
      activeBg: 'var(--accent-soft)',
      activeColor: 'var(--accent-text)'
    },
    secondary: {
      bg: 'var(--surface-card)',
      color: 'var(--text-body)',
      border: 'var(--border-strong)',
      hover: 'var(--surface-hover)',
      activeBg: 'var(--accent-soft)',
      activeColor: 'var(--accent-text)'
    },
    primary: {
      bg: 'var(--accent)',
      color: '#fff',
      border: 'transparent',
      hover: 'var(--accent-hover)',
      activeBg: 'var(--accent)',
      activeColor: '#fff'
    },
    danger: {
      bg: 'transparent',
      color: 'var(--danger-500)',
      border: 'transparent',
      hover: 'var(--danger-50)',
      activeBg: 'var(--danger-50)',
      activeColor: 'var(--danger-700)'
    }
  };
  const p = palettes[variant] || palettes.ghost;
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    title: title,
    "aria-label": title,
    "aria-pressed": active,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    className: `mi-iconbtn ${className}`,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: s.d,
      height: s.d,
      color: disabled ? 'var(--text-disabled)' : active ? p.activeColor : p.color,
      background: disabled ? 'transparent' : active ? p.activeBg : hover ? p.hover : p.bg,
      border: `1px solid ${active && variant === 'secondary' ? 'var(--accent)' : p.border}`,
      borderRadius: 'var(--radius-control)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.ic
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data-display/Stat.jsx
try { (() => {
/**
 * Stat — KPI block: label, big mono value, optional delta and icon.
 * delta sign drives color (up=success, down=danger) unless `invertDelta`.
 */
function Stat({
  label,
  value,
  unit,
  delta,
  deltaLabel,
  icon,
  invertDelta = false,
  style = {}
}) {
  const hasDelta = delta !== undefined && delta !== null && delta !== '';
  const up = typeof delta === 'number' ? delta >= 0 : String(delta).trim().startsWith('+');
  const good = invertDelta ? !up : up;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: 26,
      height: 26,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--accent-soft)',
      color: 'var(--accent-text)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 15
  })), /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-3xl)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-heading)',
      letterSpacing: 'var(--ls-tight)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      fontWeight: 'var(--fw-medium)'
    }
  }, unit)), hasDelta && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--fw-semibold)',
      color: good ? 'var(--ok-fg)' : 'var(--bad-fg)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: up ? 'trending-up' : 'trending-down',
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, delta), deltaLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-faint)',
      fontWeight: 'var(--fw-regular)',
      fontFamily: 'var(--font-sans)'
    }
  }, deltaLabel)));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data-display/Stat.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
/**
 * Badge — small label for counts, categories, metadata.
 * tone: neutral | accent | success | warning | danger | info. variant: soft | solid | outline.
 */
function Badge({
  children,
  tone = 'neutral',
  variant = 'soft',
  icon,
  size = 'md',
  style = {}
}) {
  const tones = {
    neutral: {
      fg: 'var(--ink-700)',
      bg: 'var(--cream-200)',
      bd: 'var(--border)',
      solid: 'var(--ink-700)'
    },
    accent: {
      fg: 'var(--accent-text)',
      bg: 'var(--accent-soft)',
      bd: 'var(--orange-200)',
      solid: 'var(--accent)'
    },
    success: {
      fg: 'var(--ok-fg)',
      bg: 'var(--ok-bg)',
      bd: '#BFE0CC',
      solid: 'var(--success-500)'
    },
    warning: {
      fg: 'var(--warn-fg)',
      bg: 'var(--warn-bg)',
      bd: '#EAD8A6',
      solid: 'var(--warning-500)'
    },
    danger: {
      fg: 'var(--bad-fg)',
      bg: 'var(--bad-bg)',
      bd: '#E6C3BD',
      solid: 'var(--danger-500)'
    },
    info: {
      fg: 'var(--info-fg)',
      bg: 'var(--info-bg)',
      bd: '#BFD0E4',
      solid: 'var(--info-500)'
    }
  };
  const t = tones[tone] || tones.neutral;
  const sz = size === 'sm' ? {
    h: 18,
    fs: 'var(--text-2xs)',
    px: 6,
    ic: 11
  } : {
    h: 22,
    fs: 'var(--text-xs)',
    px: 8,
    ic: 12
  };
  const styles = {
    soft: {
      color: t.fg,
      background: t.bg,
      border: '1px solid transparent'
    },
    solid: {
      color: '#fff',
      background: t.solid,
      border: '1px solid transparent'
    },
    outline: {
      color: t.fg,
      background: 'transparent',
      border: `1px solid ${t.bd}`
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: sz.h,
      padding: `0 ${sz.px}px`,
      fontFamily: 'var(--font-sans)',
      fontSize: sz.fs,
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-snug)',
      lineHeight: 1,
      borderRadius: 'var(--radius-xs)',
      whiteSpace: 'nowrap',
      ...styles[variant],
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: sz.ic
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/** Checkbox — square check with label. Near-square 2px radius. */
function Checkbox({
  label,
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  id,
  style = {}
}) {
  const rid = id || React.useId();
  const on = checked || indeterminate;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: rid,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 18,
      height: 18,
      flex: '0 0 auto',
      background: on ? 'var(--accent)' : 'var(--surface-card)',
      border: `1.5px solid ${on ? 'var(--accent)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-xs)',
      color: '#fff',
      transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)'
    }
  }, indeterminate ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "minus",
    size: 13
  }) : checked ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 13,
    strokeWidth: 3
  }) : null), /*#__PURE__*/React.createElement("input", {
    id: rid,
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: 'absolute',
      opacity: 0,
      width: 0,
      height: 0
    }
  }), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — text field with optional leading/trailing icon, label, hint, error.
 */
function Input({
  label,
  hint,
  error,
  icon,
  iconRight,
  size = 'md',
  prefix,
  suffix,
  disabled = false,
  fullWidth = true,
  id,
  className = '',
  style = {},
  containerStyle = {},
  ...rest
}) {
  const sizes = {
    sm: {
      h: 30,
      fs: 'var(--text-sm)',
      px: 9
    },
    md: {
      h: 36,
      fs: 'var(--text-base)',
      px: 11
    },
    lg: {
      h: 44,
      fs: 'var(--text-md)',
      px: 13
    }
  };
  const s = sizes[size] || sizes.md;
  const [focus, setFocus] = React.useState(false);
  const rid = id || React.useId();
  const borderColor = error ? 'var(--danger-500)' : focus ? 'var(--accent)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: fullWidth ? '100%' : undefined,
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: rid,
    style: {
      display: 'block',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-body)',
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: s.h,
      padding: `0 ${s.px}px`,
      background: disabled ? 'var(--cream-200)' : 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-control)',
      boxShadow: focus && !error ? 'var(--shadow-focus)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      cursor: disabled ? 'not-allowed' : 'text'
    }
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16,
    style: {
      color: 'var(--text-faint)'
    }
  }), prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontSize: s.fs,
      fontFamily: 'var(--font-mono)'
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: rid,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    className: className,
    style: {
      flex: 1,
      minWidth: 0,
      height: '100%',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: s.fs,
      color: 'var(--text-heading)',
      ...style
    }
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontSize: s.fs
    }
  }, suffix), iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: 16,
    style: {
      color: 'var(--text-faint)'
    }
  })), (hint || error) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      marginTop: 5,
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--danger-700)' : 'var(--text-muted)'
    }
  }, error && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "circle-alert",
    size: 13
  }), error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
/**
 * SegmentedControl — compact view/mode switcher (e.g. Mapa / Lista).
 * options: array of { value, label, icon? }.
 */
function SegmentedControl({
  options = [],
  value,
  onChange,
  size = 'md',
  style = {}
}) {
  const sizes = {
    sm: {
      h: 28,
      fs: 'var(--text-xs)',
      px: 9,
      ic: 14
    },
    md: {
      h: 34,
      fs: 'var(--text-sm)',
      px: 12,
      ic: 15
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      padding: 2,
      background: 'var(--cream-200)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-control)',
      ...style
    }
  }, options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    const active = opt.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.value,
      type: "button",
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(opt.value),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: s.h,
        padding: `0 ${s.px}px`,
        background: active ? 'var(--surface-card)' : 'transparent',
        color: active ? 'var(--text-heading)' : 'var(--text-muted)',
        border: active ? '1px solid var(--border)' : '1px solid transparent',
        borderRadius: 'calc(var(--radius-control) - 1px)',
        fontFamily: 'var(--font-sans)',
        fontSize: s.fs,
        fontWeight: active ? 'var(--fw-semibold)' : 'var(--fw-medium)',
        cursor: 'pointer',
        boxShadow: active ? 'var(--shadow-xs)' : 'none',
        transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)'
      }
    }, opt.icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: opt.icon,
      size: s.ic
    }), opt.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Select — native select styled to match the system, with chevron. */
function Select({
  label,
  hint,
  error,
  options = [],
  placeholder,
  size = 'md',
  disabled = false,
  fullWidth = true,
  id,
  value,
  onChange,
  style = {},
  containerStyle = {},
  children,
  ...rest
}) {
  const sizes = {
    sm: {
      h: 30,
      fs: 'var(--text-sm)',
      px: 9
    },
    md: {
      h: 36,
      fs: 'var(--text-base)',
      px: 11
    },
    lg: {
      h: 44,
      fs: 'var(--text-md)',
      px: 13
    }
  };
  const s = sizes[size] || sizes.md;
  const [focus, setFocus] = React.useState(false);
  const rid = id || React.useId();
  const borderColor = error ? 'var(--danger-500)' : focus ? 'var(--accent)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: fullWidth ? '100%' : undefined,
      ...containerStyle
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: rid,
    style: {
      display: 'block',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--text-body)',
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: rid,
    value: value,
    onChange: onChange,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: s.h,
      padding: `0 ${s.px + 22}px 0 ${s.px}px`,
      background: disabled ? 'var(--cream-200)' : 'var(--surface-card)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-control)',
      boxShadow: focus && !error ? 'var(--shadow-focus)' : 'none',
      fontFamily: 'var(--font-sans)',
      fontSize: s.fs,
      color: value ? 'var(--text-heading)' : 'var(--text-faint)',
      outline: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  }), children), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16,
    style: {
      position: 'absolute',
      right: s.px,
      pointerEvents: 'none',
      color: 'var(--text-muted)'
    }
  })), (hint || error) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 5,
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--danger-700)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
/**
 * Sidebar — the app's dark navigation shell. Charcoal background, cream text,
 * orange active state. Logo lockup on top, user footer on the bottom.
 *
 * items: array of { id, label, icon, badge? } or { divider: true } or { section: 'LABEL' }.
 */
function Sidebar({
  items = [],
  active,
  onSelect,
  logoSrc,
  brand = 'Masa Ideas',
  product,
  user,
  collapsed = false,
  footerItems = [],
  style = {}
}) {
  const W = collapsed ? 'var(--sidebar-w-collapsed)' : 'var(--sidebar-w)';
  const NavItem = ({
    it
  }) => {
    const isActive = it.id === active;
    const [hover, setHover] = React.useState(false);
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: () => onSelect && onSelect(it.id),
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      title: collapsed ? it.label : undefined,
      style: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        width: '100%',
        height: 38,
        padding: collapsed ? 0 : '0 10px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        background: isActive ? 'color-mix(in srgb, var(--accent) 16%, transparent)' : hover ? 'var(--sidebar-raised)' : 'transparent',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        color: isActive ? '#fff' : 'var(--text-on-dark-muted)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-base)',
        fontWeight: isActive ? 'var(--fw-semibold)' : 'var(--fw-medium)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)'
      }
    }, isActive && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: -8,
        top: 7,
        bottom: 7,
        width: 3,
        borderRadius: 999,
        background: 'var(--accent)'
      }
    }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 18,
      style: {
        color: isActive ? 'var(--accent)' : 'inherit'
      }
    }), !collapsed && /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, it.label), !collapsed && it.badge !== undefined && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-2xs)',
        fontWeight: 'var(--fw-semibold)',
        color: isActive ? '#fff' : 'var(--text-on-dark-muted)',
        background: isActive ? 'var(--accent)' : 'var(--sidebar-raised)',
        padding: '1px 6px',
        borderRadius: 999
      }
    }, it.badge));
  };
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: W,
      flex: `0 0 ${W}`,
      height: '100%',
      background: 'var(--sidebar-bg)',
      borderRight: '1px solid var(--char-800)',
      display: 'flex',
      flexDirection: 'column',
      padding: collapsed ? '14px 8px' : '14px 16px',
      transition: 'width var(--dur) var(--ease-out)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: collapsed ? '4px 0 16px' : '4px 4px 18px',
      justifyContent: collapsed ? 'center' : 'flex-start'
    }
  }, logoSrc && /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "",
    style: {
      height: 30,
      width: 30,
      flex: '0 0 auto'
    }
  }), !collapsed && /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 17,
      color: '#fff',
      letterSpacing: '-0.01em',
      whiteSpace: 'nowrap'
    }
  }, brand), product && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      color: 'var(--text-on-dark-muted)'
    }
  }, product))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      flex: 1,
      overflowY: 'auto'
    }
  }, items.map((it, i) => {
    if (it.divider) return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        height: 1,
        background: 'var(--char-800)',
        margin: '10px 4px'
      }
    });
    if (it.section) return collapsed ? /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        height: 8
      }
    }) : /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--char-600)',
        padding: '12px 10px 6px'
      }
    }, it.section);
    return /*#__PURE__*/React.createElement(NavItem, {
      key: it.id,
      it: it
    });
  })), user && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 12,
      padding: collapsed ? 0 : '10px 8px',
      justifyContent: collapsed ? 'center' : 'flex-start',
      borderTop: '1px solid var(--char-800)',
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 30,
      height: 30,
      borderRadius: '50%',
      background: 'var(--accent)',
      color: '#fff',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 12,
      flex: '0 0 auto'
    }
  }, (user.name || '?').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()), !collapsed && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      lineHeight: 1.25,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-on-dark)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, user.name), user.role && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--text-on-dark-muted)'
    }
  }, user.role)), !collapsed && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 16,
    style: {
      color: 'var(--char-600)'
    }
  })));
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
/**
 * Tabs — underline tab bar. tabs: array of { value, label, icon?, count? }.
 */
function Tabs({
  tabs = [],
  value,
  onChange,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      alignItems: 'stretch',
      gap: 4,
      borderBottom: '1px solid var(--border)',
      ...style
    }
  }, tabs.map(t => {
    const tab = typeof t === 'string' ? {
      value: t,
      label: t
    } : t;
    const active = tab.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: tab.value,
      type: "button",
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(tab.value),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        padding: '10px 12px',
        marginBottom: -1,
        background: 'transparent',
        border: 'none',
        borderBottom: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
        color: active ? 'var(--text-heading)' : 'var(--text-muted)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-base)',
        fontWeight: active ? 'var(--fw-semibold)' : 'var(--fw-medium)',
        cursor: 'pointer',
        transition: 'color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)'
      }
    }, tab.icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: tab.icon,
      size: 16
    }), tab.label, tab.count !== undefined && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-2xs)',
        fontWeight: 'var(--fw-semibold)',
        color: active ? 'var(--accent-text)' : 'var(--text-faint)',
        background: active ? 'var(--accent-soft)' : 'var(--cream-200)',
        padding: '1px 6px',
        borderRadius: 'var(--radius-pill)'
      }
    }, tab.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/overlays/Modal.jsx
try { (() => {
/**
 * Modal — centered dialog shell with scrim, optional icon chip, header, body, footer.
 * Closes on Esc and scrim click. Near-square 6px corners.
 */
function Modal({
  open,
  onClose,
  title,
  subtitle,
  icon,
  iconTone = 'accent',
  children,
  footer,
  width = 520,
  style = {}
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape' && onClose) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  const tones = {
    accent: {
      bg: 'var(--accent-soft)',
      fg: 'var(--accent-text)'
    },
    neutral: {
      bg: 'var(--cream-200)',
      fg: 'var(--text-muted)'
    },
    success: {
      bg: 'var(--ok-bg)',
      fg: 'var(--ok-fg)'
    }
  };
  const t = tones[iconTone] || tones.accent;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 'var(--z-modal)',
      background: 'rgba(28,27,26,0.38)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      animation: 'mi-fade var(--dur) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: '100%',
      maxHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden',
      animation: 'mi-pop var(--dur) var(--ease-out)',
      ...style
    }
  }, (title || icon) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 13,
      padding: '18px 20px 14px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 38,
      height: 38,
      flex: '0 0 auto',
      borderRadius: 'var(--radius-md)',
      background: t.bg,
      color: t.fg
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-xl)',
      lineHeight: 1.2
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginTop: 3
    }
  }, subtitle)), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    size: "sm",
    title: "Cerrar",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      overflowY: 'auto'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      padding: '14px 20px',
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--cream-100)'
    }
  }, footer)));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/Modal.jsx", error: String((e && e.message) || e) }); }

// components/overlays/ImportDialog.jsx
try { (() => {
/** Clean, simple spreadsheet illustration (on-brand: warm + accent badge). */
function SheetArt({
  size = 60
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 60 60",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "6",
    width: "31",
    height: "44",
    rx: "3",
    fill: "#fff",
    stroke: "var(--ink-400)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 19h31M11 30h31M11 41h31M23 19v22M34 19v22",
    stroke: "var(--line-400)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "6",
    width: "31",
    height: "13",
    rx: "3",
    fill: "var(--cream-200)"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11.5",
    y: "13.5",
    width: "30",
    height: "5.5",
    fill: "var(--cream-200)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 19h31",
    stroke: "var(--line-400)",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M11 9.5a3 3 0 0 1 3-3h25a3 3 0 0 1 3 3",
    stroke: "var(--ink-400)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "44",
    cy: "44",
    r: "12",
    fill: "var(--accent)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M39.5 44.2l3.1 3.1 5.6-6.4",
    stroke: "#fff",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
const FIELD_MAP = {
  carteles: [{
    col: 'Código',
    to: 'id'
  }, {
    col: 'Dirección',
    to: 'dir'
  }, {
    col: 'Barrio',
    to: 'barrio'
  }, {
    col: 'Medida',
    to: 'medida'
  }, {
    col: 'Precio',
    to: 'precio'
  }],
  oportunidades: [{
    col: 'Cliente',
    to: 'cliente'
  }, {
    col: 'Contacto',
    to: 'contacto'
  }, {
    col: 'Etapa',
    to: 'etapa'
  }, {
    col: 'Valor',
    to: 'valor'
  }, {
    col: 'Cierre',
    to: 'cierre'
  }],
  clientes: [{
    col: 'Razón social',
    to: 'cliente'
  }, {
    col: 'Contacto',
    to: 'contacto'
  }, {
    col: 'Email',
    to: 'email'
  }, {
    col: 'Rubro',
    to: 'tag'
  }]
};

/**
 * ImportDialog — Excel/CSV import flow: dropzone → detected file + column map → progress → done.
 * Visual/mock only (no real parsing). entity drives the column mapping and copy.
 */
function ImportDialog({
  open,
  onClose,
  entity = 'carteles',
  rows = 16,
  onImported
}) {
  const [stage, setStage] = React.useState('drop'); // drop | ready | importing | done
  const [drag, setDrag] = React.useState(false);
  const [pct, setPct] = React.useState(0);
  const fileInput = React.useRef(null);
  const label = entity;
  const fileName = `${entity}_junio2026.xlsx`;
  const fields = FIELD_MAP[entity] || FIELD_MAP.carteles;
  React.useEffect(() => {
    if (!open) {
      setStage('drop');
      setDrag(false);
      setPct(0);
    }
  }, [open]);
  React.useEffect(() => {
    if (stage !== 'importing') return;
    setPct(0);
    const iv = setInterval(() => setPct(p => {
      if (p >= 100) {
        clearInterval(iv);
        setStage('done');
        return 100;
      }
      return Math.min(100, p + 9);
    }), 110);
    return () => clearInterval(iv);
  }, [stage]);
  const pick = () => setStage('ready');
  const footer = stage === 'drop' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    icon: "download",
    onClick: () => {}
  }, "Descargar plantilla"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    onClick: onClose
  }, "Cancelar")) : stage === 'ready' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    onClick: () => setStage('drop')
  }, "Atr\xE1s"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    icon: "file-up",
    onClick: () => setStage('importing')
  }, "Importar ", rows, " filas")) : stage === 'done' ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    icon: "check",
    onClick: () => {
      onImported && onImported(rows);
      onClose && onClose();
    }
  }, "Listo") : null;
  return /*#__PURE__*/React.createElement(__ds_scope.Modal, {
    open: open,
    onClose: onClose,
    width: 520,
    icon: "file-up",
    title: `Importar ${label} desde Excel`,
    subtitle: "Sub\xED un archivo .xlsx o .csv. Detectamos las columnas autom\xE1ticamente.",
    footer: footer
  }, stage === 'drop' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    onClick: () => fileInput.current && fileInput.current.click(),
    onDragOver: e => {
      e.preventDefault();
      setDrag(true);
    },
    onDragLeave: () => setDrag(false),
    onDrop: e => {
      e.preventDefault();
      setDrag(false);
      pick();
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      padding: '34px 24px',
      textAlign: 'center',
      cursor: 'pointer',
      border: `2px dashed ${drag ? 'var(--accent)' : 'var(--border-strong)'}`,
      borderRadius: 'var(--radius-md)',
      background: drag ? 'var(--accent-soft)' : 'var(--cream-100)',
      transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(SheetArt, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-md)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-heading)'
    }
  }, "Arrastr\xE1 tu archivo ac\xE1"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, "o hac\xE9 clic para seleccionarlo \xB7 .xlsx, .xls, .csv")), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    size: "sm",
    icon: "folder-open",
    onClick: e => {
      e.stopPropagation();
      pick();
    }
  }, "Seleccionar archivo"), /*#__PURE__*/React.createElement("input", {
    ref: fileInput,
    type: "file",
    accept: ".xlsx,.xls,.csv",
    style: {
      display: 'none'
    },
    onChange: pick
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-faint)',
      marginTop: 12,
      lineHeight: 1.5
    }
  }, "Tip: descarg\xE1 la plantilla para asegurarte de que las columnas coincidan. Las filas con c\xF3digo existente se actualizan; las nuevas se crean.")), stage === 'ready' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 14px',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--cream-100)'
    }
  }, /*#__PURE__*/React.createElement(SheetArt, {
    size: 36
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-heading)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, fileName), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, rows, " filas \xB7 ", fields.length, " columnas detectadas")), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "circle-check",
    size: 20,
    style: {
      color: 'var(--success-500)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      margin: '16px 0 8px'
    }
  }, "Mapeo de columnas"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, fields.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.to,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      padding: '6px 10px',
      background: 'var(--cream-200)',
      borderRadius: 'var(--radius-sm)',
      color: 'var(--text-body)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)'
    }
  }, f.col), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 15,
    style: {
      color: 'var(--text-faint)',
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      padding: '6px 10px',
      border: '1px solid var(--orange-200)',
      background: 'var(--accent-soft)',
      borderRadius: 'var(--radius-sm)',
      color: 'var(--accent-text)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600
    }
  }, f.to), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 15,
    style: {
      color: 'var(--success-500)',
      flex: '0 0 auto'
    }
  }))))), stage === 'importing' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 4px 8px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(SheetArt, null), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-md)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-heading)',
      marginTop: 12
    }
  }, "Importando ", label, "\u2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: 'var(--cream-200)',
      borderRadius: 999,
      overflow: 'hidden',
      margin: '14px 0 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      background: 'var(--accent)',
      borderRadius: 999,
      transition: 'width 0.1s linear'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, Math.round(rows * pct / 100), " / ", rows, " filas")), stage === 'done' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 4px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: 'var(--ok-bg)',
      color: 'var(--success-500)',
      margin: '0 auto 14px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 30,
    strokeWidth: 2.5
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-2xl)',
      color: 'var(--text-heading)'
    }
  }, "Importaci\xF3n completa"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, "Se importaron ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-heading)'
    }
  }, rows, " ", label), " correctamente.")));
}
Object.assign(__ds_scope, { ImportDialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlays/ImportDialog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/inventory/InventoryApp.jsx
try { (() => {
const {
  Sidebar,
  Button,
  IconButton,
  SegmentedControl,
  StatusPill,
  Icon,
  ImportDialog,
  EmptyState
} = window.DesignSystem_27db72;
const {
  MapView,
  InventoryPanel
} = window;
const NAV = [{
  section: 'Operación'
}, {
  id: 'inventario',
  label: 'Inventario',
  icon: 'map-pin',
  badge: 16
}, {
  id: 'pipeline',
  label: 'Pipeline',
  icon: 'kanban',
  badge: 18
}, {
  id: 'propuestas',
  label: 'Propuestas',
  icon: 'file-text'
}, {
  id: 'clientes',
  label: 'Clientes',
  icon: 'users'
}, {
  divider: true
}, {
  section: 'Cuenta'
}, {
  id: 'reportes',
  label: 'Reportes',
  icon: 'chart-no-axes-column'
}, {
  id: 'config',
  label: 'Configuración',
  icon: 'settings'
}];
function InventoryTable({
  items,
  fmt,
  selected,
  onSelect,
  proposalIds,
  onAdd
}) {
  if (items.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflow: 'auto',
        padding: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--surface-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)'
      }
    }, /*#__PURE__*/React.createElement(EmptyState, {
      art: "search",
      title: "Sin carteles",
      description: "Ning\xFAn cartel coincide con la b\xFAsqueda o los filtros activos."
    })));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--cream-100)'
    }
  }, ['Código', 'Dirección', 'Barrio', 'Tipo', 'Medida', 'Estado', 'Cliente', 'Precio / mes', ''].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      textAlign: i === 7 ? 'right' : 'left',
      padding: '11px 16px',
      fontSize: 'var(--text-2xs)',
      fontWeight: 600,
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      borderBottom: '1px solid var(--border)',
      whiteSpace: 'nowrap'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, items.map(b => /*#__PURE__*/React.createElement("tr", {
    key: b.id,
    onClick: () => onSelect(b.id),
    style: {
      cursor: 'pointer',
      background: selected === b.id ? 'var(--accent-soft)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--accent-text)',
      fontWeight: 600
    }
  }, b.id), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)',
      color: 'var(--text-heading)',
      fontWeight: 500
    }
  }, b.dir), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)',
      color: 'var(--text-muted)'
    }
  }, b.barrio), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)',
      color: 'var(--text-muted)'
    }
  }, b.tipo), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, b.medida), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    status: b.estado,
    size: "sm"
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)',
      color: b.cliente ? 'var(--text-body)' : 'var(--text-faint)'
    }
  }, b.cliente || '—'), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)',
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)',
      fontWeight: 500
    }
  }, fmt.money(b.precio)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '7px 12px',
      borderBottom: '1px solid var(--border-subtle)',
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: proposalIds.includes(b.id) ? 'check' : 'plus',
    size: "sm",
    variant: proposalIds.includes(b.id) ? 'primary' : 'ghost',
    title: "Agregar a propuesta",
    onClick: e => {
      e.stopPropagation();
      if (b.estado !== 'ocupado') onAdd(b.id);
    }
  }))))))));
}
function InventoryApp() {
  const all = window.MI_INVENTORY;
  const fmt = window.MI_FMT;
  const [view, setView] = React.useState('mapa');
  const [query, setQuery] = React.useState('');
  const [status, setStatus] = React.useState([]);
  const [barrios, setBarrios] = React.useState([]);
  const [tipos, setTipos] = React.useState([]);
  const [ilumOnly, setIlumOnly] = React.useState(false);
  const [selected, setSelected] = React.useState('MI-1097');
  const [proposalIds, setProposalIds] = React.useState(['MI-0245']);
  const [toast, setToast] = React.useState(null);
  const [importOpen, setImportOpen] = React.useState(false);
  const items = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter(b => {
      if (status.length && !status.includes(b.estado)) return false;
      if (barrios.length && !barrios.includes(b.barrio)) return false;
      if (tipos.length && !tipos.includes(b.tipo)) return false;
      if (ilumOnly && !b.ilum) return false;
      if (q && !`${b.id} ${b.dir} ${b.barrio} ${b.tipo}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [all, query, status, barrios, tipos, ilumOnly]);
  const matchedIds = React.useMemo(() => new Set(items.map(b => b.id)), [items]);
  const filtersActive = status.length > 0 || barrios.length > 0 || tipos.length > 0 || ilumOnly || query.trim() !== '';

  // KPIs del inventario completo (salud de la cartera)
  const kpi = React.useMemo(() => {
    const ocupados = all.filter(b => b.estado === 'ocupado').length;
    const ingreso = all.filter(b => b.estado === 'ocupado' || b.estado === 'reservado').reduce((a, b) => a + b.precio, 0);
    const hoy = new Date('2026-06-21T00:00');
    const porVencer = all.filter(b => {
      if (!b.vence) return false;
      const d = (new Date(b.vence + 'T00:00') - hoy) / 864e5;
      return d >= 0 && d <= 30;
    }).length;
    return {
      ocupacionPct: Math.round(ocupados / all.length * 100),
      ingresoShort: fmt.moneyShort(ingreso),
      porVencer
    };
  }, [all, fmt]);
  const toggleStatus = s => setStatus(cur => cur.includes(s) ? cur.filter(x => x !== s) : [...cur, s]);
  const toggleBarrio = b => setBarrios(cur => cur.includes(b) ? cur.filter(x => x !== b) : [...cur, b]);
  const toggleTipo = t => setTipos(cur => cur.includes(t) ? cur.filter(x => x !== t) : [...cur, t]);
  const clearAll = () => {
    setStatus([]);
    setBarrios([]);
    setTipos([]);
    setIlumOnly(false);
    setQuery('');
  };
  const addToProposal = id => {
    setProposalIds(cur => {
      if (cur.includes(id)) return cur;
      const b = all.find(x => x.id === id);
      setToast(`${id} · ${b.dir} agregado a la propuesta`);
      return [...cur, id];
    });
  };
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    logoSrc: "../../assets/logo_mark.png",
    brand: "Masa Ideas",
    product: "Gesti\xF3n interna",
    items: NAV,
    active: "inventario",
    onSelect: () => {},
    user: {
      name: 'Lucía Fernández',
      role: 'Ejecutiva comercial'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      height: 'var(--topbar-h)',
      flex: '0 0 var(--topbar-h)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '0 20px',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-2xl)'
    }
  }, "Inventario"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)'
    }
  }, "CABA \xB7 v\xEDa p\xFAblica")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(SegmentedControl, {
    value: view,
    onChange: setView,
    options: [{
      value: 'mapa',
      label: 'Mapa',
      icon: 'map'
    }, {
      value: 'lista',
      label: 'Lista',
      icon: 'list'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 26,
      background: 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "file-down",
    size: "md"
  }, "Propuesta", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 700,
      color: '#fff',
      background: 'var(--accent)',
      borderRadius: 999,
      padding: '1px 7px'
    }
  }, proposalIds.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 26,
      background: 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "file-up",
    onClick: () => setImportOpen(true)
  }, "Importar"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "plus"
  }, "Nuevo cartel")), view === 'mapa' ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: 'relative',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(MapView, {
    mapSrc: "./assets/ba-map.png",
    items: all,
    selected: selected,
    onSelect: setSelected,
    dimUnmatched: filtersActive,
    matchedIds: matchedIds,
    fmt: fmt,
    onAdd: addToProposal,
    proposalIds: proposalIds
  })), /*#__PURE__*/React.createElement(InventoryPanel, {
    items: items,
    all: all,
    selected: selected,
    fmt: fmt,
    kpi: kpi,
    query: query,
    setQuery: setQuery,
    status: status,
    toggleStatus: toggleStatus,
    barrios: barrios,
    toggleBarrio: toggleBarrio,
    tipos: tipos,
    toggleTipo: toggleTipo,
    ilumOnly: ilumOnly,
    setIlumOnly: setIlumOnly,
    clearAll: clearAll,
    proposalIds: proposalIds,
    onSelect: setSelected,
    onAdd: addToProposal
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 24px 0',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-heading)'
    }
  }, items.length), " carteles")), /*#__PURE__*/React.createElement(InventoryTable, {
    items: items,
    fmt: fmt,
    selected: selected,
    onSelect: setSelected,
    proposalIds: proposalIds,
    onAdd: addToProposal
  }))), /*#__PURE__*/React.createElement(ImportDialog, {
    open: importOpen,
    onClose: () => setImportOpen(false),
    entity: "carteles",
    rows: 16,
    onImported: n => setToast(`${n} carteles importados desde Excel`)
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      left: '50%',
      bottom: 28,
      transform: 'translateX(-50%)',
      zIndex: 800,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--char-900)',
      color: 'var(--text-on-dark)',
      padding: '11px 16px',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "circle-check",
    size: 17,
    style: {
      color: 'var(--status-disponible)'
    }
  }), toast));
}
window.InventoryApp = InventoryApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/inventory/InventoryApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/inventory/InventoryPanel.jsx
try { (() => {
const {
  Icon,
  Input,
  StatusPill,
  IconButton,
  EmptyState
} = window.DesignSystem_27db72;
const STATUSES = ['disponible', 'reservado', 'ocupado', 'mantenimiento'];

/* ---------- KPI strip (estado global del inventario) ---------- */
function Kpi({
  label,
  value,
  tone
}) {
  const color = tone === 'warn' ? 'var(--warning-700, #8a5d05)' : tone === 'accent' ? 'var(--accent-text)' : 'var(--text-heading)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      padding: '0 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      fontSize: 10,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-lg)',
      fontWeight: 600,
      color,
      marginTop: 3,
      fontVariantNumeric: 'tabular-nums'
    }
  }, value));
}
function KpiStrip({
  kpi
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      padding: '12px 4px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--cream-100)'
    }
  }, /*#__PURE__*/React.createElement(Kpi, {
    label: "Ocupaci\xF3n",
    value: kpi.ocupacionPct + '%'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Ingreso / mes",
    value: kpi.ingresoShort,
    tone: "accent"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement(Kpi, {
    label: "Vencen 30d",
    value: kpi.porVencer,
    tone: kpi.porVencer > 0 ? 'warn' : 'default'
  }));
}

/* ---------- Búsqueda estilo Google Maps (autocomplete) ---------- */
function SearchBox({
  all,
  query,
  setQuery,
  onPickCartel,
  onPickBarrio
}) {
  const [open, setOpen] = React.useState(false);
  const q = query.trim().toLowerCase();
  const sugg = React.useMemo(() => {
    if (!q) return {
      barrios: [],
      carteles: []
    };
    const barrioMap = {};
    all.forEach(b => {
      if (b.barrio.toLowerCase().includes(q)) {
        barrioMap[b.barrio] = barrioMap[b.barrio] || {
          barrio: b.barrio,
          zona: b.zona,
          n: 0
        };
        barrioMap[b.barrio].n++;
      }
    });
    const barrios = Object.values(barrioMap).slice(0, 3);
    const carteles = all.filter(b => `${b.id} ${b.dir}`.toLowerCase().includes(q)).slice(0, 5);
    return {
      barrios,
      carteles
    };
  }, [all, q]);
  const hasSugg = sugg.barrios.length > 0 || sugg.carteles.length > 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "search",
    placeholder: "Buscar direcci\xF3n, c\xF3digo o localidad\u2026",
    value: query,
    onChange: e => {
      setQuery(e.target.value);
      setOpen(true);
    },
    onFocus: () => setOpen(true),
    onBlur: () => setTimeout(() => setOpen(false), 140),
    size: "md"
  }), open && q && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      left: 0,
      right: 0,
      zIndex: 60,
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-popover)',
      overflow: 'hidden',
      maxHeight: 360,
      overflowY: 'auto'
    }
  }, !hasSugg && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 14px',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-faint)'
    }
  }, "Sin coincidencias para \u201C", query, "\u201D."), sugg.barrios.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      fontSize: 10,
      padding: '9px 14px 4px',
      color: 'var(--text-faint)'
    }
  }, "Localidades"), sugg.barrios.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.barrio,
    type: "button",
    onMouseDown: e => {
      e.preventDefault();
      onPickBarrio(s.barrio);
      setOpen(false);
    },
    style: sgStyle
  }, /*#__PURE__*/React.createElement("span", {
    style: sgIcon('var(--accent-soft)', 'var(--accent-text)')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map",
    size: 15
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-heading)'
    }
  }, s.barrio), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-faint)'
    }
  }, "Zona ", s.zona, " \xB7 ", s.n, " ", s.n === 1 ? 'cartel' : 'carteles')), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    size: 14,
    style: {
      color: 'var(--text-faint)'
    }
  })))), sugg.carteles.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: sugg.barrios.length > 0 ? '1px solid var(--border-subtle)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      fontSize: 10,
      padding: '9px 14px 4px',
      color: 'var(--text-faint)'
    }
  }, "Carteles"), sugg.carteles.map(b => /*#__PURE__*/React.createElement("button", {
    key: b.id,
    type: "button",
    onMouseDown: e => {
      e.preventDefault();
      onPickCartel(b.id);
      setOpen(false);
    },
    style: sgStyle
  }, /*#__PURE__*/React.createElement("span", {
    style: sgIcon('var(--cream-200)', 'var(--text-muted)')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 15
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: 'left',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-heading)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, b.dir), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: 'var(--accent-text)'
    }
  }, b.id), " \xB7 ", b.barrio)))))));
}
const sgStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  width: '100%',
  padding: '8px 12px',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'left'
};
const sgIcon = (bg, fg) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 28,
  height: 28,
  borderRadius: 'var(--radius-sm)',
  background: bg,
  color: fg,
  flex: '0 0 auto'
});

/* ---------- Popover de filtro reutilizable ---------- */
function FilterDropdown({
  icon,
  label,
  count,
  children,
  align = 'left'
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  const active = count > 0;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(o => !o),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 30,
      padding: '0 10px',
      background: active ? 'var(--accent-soft)' : 'var(--surface-card)',
      border: `1px solid ${active ? 'var(--orange-300)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-control)',
      color: active ? 'var(--accent-text)' : 'var(--text-body)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 14
  }), label, active ? ` · ${count}` : '', /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 13,
    style: {
      opacity: 0.7
    }
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 'calc(100% + 6px)',
      [align]: 0,
      zIndex: 70,
      minWidth: 220,
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-popover)',
      overflow: 'hidden'
    }
  }, children));
}
function CheckItem({
  label,
  sub,
  checked,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggle,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: '100%',
      padding: '7px 12px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 'var(--radius-xs)',
      flex: '0 0 auto',
      border: `1.5px solid ${checked ? 'var(--accent)' : 'var(--border-strong)'}`,
      background: checked ? 'var(--accent)' : 'transparent',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, checked && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12,
    style: {
      color: '#fff'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)',
      fontWeight: checked ? 600 : 400
    }
  }, label), sub != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-faint)'
    }
  }, sub));
}

/* ---------- Fila de cartel ---------- */
function Row({
  b,
  selected,
  fmt,
  inProposal,
  onSelect,
  onAdd
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => onSelect(b.id),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      gap: 11,
      padding: '12px 16px',
      cursor: 'pointer',
      background: selected ? 'var(--accent-soft)' : hover ? 'var(--surface-hover)' : 'transparent',
      borderLeft: `2px solid ${selected ? 'var(--accent)' : 'transparent'}`,
      borderBottom: '1px solid var(--border-subtle)',
      transition: 'background var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--accent-text)',
      fontWeight: 600
    }
  }, b.id), b.ilum && /*#__PURE__*/React.createElement(Icon, {
    name: "lightbulb",
    size: 12,
    style: {
      color: 'var(--warning-500)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--text-heading)',
      fontWeight: 'var(--fw-medium)',
      marginTop: 2,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, b.dir), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 5
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    status: b.estado,
    size: "sm"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-faint)'
    }
  }, b.barrio, " \xB7 ", b.medida))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)',
      fontWeight: 500,
      whiteSpace: 'nowrap'
    }
  }, fmt.money(b.precio)), hover || inProposal ? /*#__PURE__*/React.createElement(IconButton, {
    icon: inProposal ? 'check' : 'plus',
    size: "sm",
    variant: inProposal ? 'primary' : 'secondary',
    title: inProposal ? 'En la propuesta' : 'Agregar a propuesta',
    onClick: e => {
      e.stopPropagation();
      if (b.estado !== 'ocupado') onAdd(b.id);
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-faint)',
      fontFamily: 'var(--font-sans)'
    }
  }, "/ mes")));
}

/** InventoryPanel — right rail: KPIs + búsqueda + filtros + lista de carteles. */
function InventoryPanel({
  items,
  all,
  selected,
  fmt,
  kpi,
  query,
  setQuery,
  status,
  toggleStatus,
  ilumOnly,
  setIlumOnly,
  barrios,
  toggleBarrio,
  tipos,
  toggleTipo,
  clearAll,
  proposalIds,
  onSelect,
  onAdd
}) {
  // localidades agrupadas por zona, con conteo
  const byZona = React.useMemo(() => {
    const m = {};
    all.forEach(b => {
      m[b.zona] = m[b.zona] || {};
      m[b.zona][b.barrio] = (m[b.zona][b.barrio] || 0) + 1;
    });
    return m;
  }, [all]);
  const tipoList = React.useMemo(() => {
    const m = {};
    all.forEach(b => {
      m[b.tipo] = (m[b.tipo] || 0) + 1;
    });
    return Object.entries(m);
  }, [all]);
  const anyFilter = status.length || ilumOnly || barrios.length || tipos.length || query.trim();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 372,
      flex: '0 0 372px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      borderLeft: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(KpiStrip, {
    kpi: kpi
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 12px',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-xl)'
    }
  }, "Carteles"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-heading)'
    }
  }, items.length), " / ", all.length)), /*#__PURE__*/React.createElement(SearchBox, {
    all: all,
    query: query,
    setQuery: setQuery,
    onPickCartel: id => {
      onSelect(id);
    },
    onPickBarrio: b => {
      if (!barrios.includes(b)) toggleBarrio(b);
      setQuery('');
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 7,
      marginTop: 11
    }
  }, /*#__PURE__*/React.createElement(FilterDropdown, {
    icon: "map-pin",
    label: "Localidad",
    count: barrios.length
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 320,
      overflowY: 'auto',
      padding: '4px 0'
    }
  }, window.MI_ZONAS.filter(z => byZona[z]).map(z => /*#__PURE__*/React.createElement("div", {
    key: z
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      fontSize: 10,
      padding: '8px 12px 3px',
      color: 'var(--text-faint)'
    }
  }, "Zona ", z), Object.entries(byZona[z]).sort().map(([barrio, n]) => /*#__PURE__*/React.createElement(CheckItem, {
    key: barrio,
    label: barrio,
    sub: n,
    checked: barrios.includes(barrio),
    onToggle: () => toggleBarrio(barrio)
  })))))), /*#__PURE__*/React.createElement(FilterDropdown, {
    icon: "layout-panel-top",
    label: "Tipo",
    count: tipos.length
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '5px 0'
    }
  }, tipoList.map(([t, n]) => /*#__PURE__*/React.createElement(CheckItem, {
    key: t,
    label: t,
    sub: n,
    checked: tipos.includes(t),
    onToggle: () => toggleTipo(t)
  })))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setIlumOnly(!ilumOnly),
    title: "Solo iluminados",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 30,
      padding: '0 10px',
      background: ilumOnly ? 'var(--accent-soft)' : 'var(--surface-card)',
      border: `1px solid ${ilumOnly ? 'var(--orange-300)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-control)',
      color: ilumOnly ? 'var(--accent-text)' : 'var(--text-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lightbulb",
    size: 14
  }), "Luz")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 7,
      flexWrap: 'wrap',
      marginTop: 9
    }
  }, STATUSES.map(s => {
    const on = status.includes(s);
    return /*#__PURE__*/React.createElement("button", {
      key: s,
      type: "button",
      onClick: () => toggleStatus(s),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 28,
        padding: '0 10px',
        background: on ? 'var(--accent-soft)' : 'var(--surface-card)',
        border: `1px solid ${on ? 'var(--orange-300)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-pill)',
        color: on ? 'var(--accent-text)' : 'var(--text-body)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        textTransform: 'capitalize'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: `var(--status-${s === 'mantenimiento' ? 'mantenim' : s})`
      }
    }), s);
  })), anyFilter ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      flexWrap: 'wrap',
      marginTop: 10
    }
  }, barrios.map(b => /*#__PURE__*/React.createElement("span", {
    key: b,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      height: 24,
      padding: '0 4px 0 9px',
      background: 'var(--cream-200)',
      borderRadius: 'var(--radius-pill)',
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-body)',
      fontWeight: 600
    }
  }, b, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => toggleBarrio(b),
    style: {
      display: 'inline-flex',
      border: 'none',
      background: 'none',
      cursor: 'pointer',
      color: 'var(--text-faint)',
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 12
  })))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: clearAll,
    style: {
      marginLeft: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--accent-text)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 13
  }), "Limpiar")) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, items.length === 0 ? /*#__PURE__*/React.createElement(EmptyState, {
    art: "search",
    title: "Sin resultados",
    description: "Ning\xFAn cartel coincide con el filtro. Limpi\xE1 la b\xFAsqueda para ver todos."
  }) : items.map(b => /*#__PURE__*/React.createElement(Row, {
    key: b.id,
    b: b,
    selected: selected === b.id,
    fmt: fmt,
    inProposal: proposalIds.includes(b.id),
    onSelect: onSelect,
    onAdd: onAdd
  }))));
}
window.InventoryPanel = InventoryPanel;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/inventory/InventoryPanel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/inventory/MapView.jsx
try { (() => {
const {
  Icon,
  StatusPill,
  Button,
  IconButton,
  Thumbnail
} = window.DesignSystem_27db72;
const STATUS_COLOR = {
  disponible: 'var(--status-disponible)',
  reservado: 'var(--status-reservado)',
  ocupado: 'var(--status-ocupado)',
  mantenimiento: 'var(--status-mantenim)'
};
function Marker({
  b,
  selected,
  dim,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  const color = STATUS_COLOR[b.estado] || 'var(--ink-400)';
  const big = selected || hover;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onClick(b.id);
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-label": b.id,
    style: {
      position: 'absolute',
      left: `${b.x}%`,
      top: `${b.y}%`,
      transform: 'translate(-50%, -100%)',
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      zIndex: selected ? 30 : big ? 20 : 10,
      opacity: dim && !selected ? 0.35 : 1,
      transition: 'opacity var(--dur) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block',
      width: big ? 30 : 24,
      height: big ? 30 : 24,
      transition: 'all var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: color,
      borderRadius: '50% 50% 50% 0',
      transform: 'rotate(45deg)',
      boxShadow: selected ? '0 0 0 3px #fff, 0 4px 10px rgba(40,30,16,0.35)' : '0 2px 5px rgba(40,30,16,0.30)',
      border: '1.5px solid rgba(255,255,255,0.85)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      width: big ? 9 : 7,
      height: big ? 9 : 7,
      borderRadius: '50%',
      background: '#fff'
    }
  })));
}
function Popup({
  b,
  fmt,
  onClose,
  onAdd,
  inProposal
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      left: `${b.x}%`,
      top: `${b.y}%`,
      transform: 'translate(-50%, calc(-100% - 34px))',
      width: 268,
      zIndex: 40,
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-popover)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(Thumbnail, {
    kind: "billboard",
    width: "100%",
    ratio: "16 / 7",
    rounded: false,
    label: "Foto del cartel",
    style: {
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px 10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--accent-text)',
      fontWeight: 600
    }
  }, b.id), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      color: 'var(--text-heading)',
      lineHeight: 1.15,
      marginTop: 2
    }
  }, b.dir)), /*#__PURE__*/React.createElement(IconButton, {
    icon: "x",
    size: "sm",
    title: "Cerrar",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    status: b.estado
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, b.barrio, " \xB7 ", b.tipo))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--cream-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '8px 14px',
      borderRight: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      fontSize: 10
    }
  }, "Medida"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)',
      marginTop: 2
    }
  }, b.medida, b.ilum ? ' · luz' : '')), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '8px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      fontSize: 10
    }
  }, "Precio / mes"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)',
      marginTop: 2
    }
  }, fmt.money(b.precio)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 10,
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "file-text",
    style: {
      flex: 1
    }
  }, "Ficha"), /*#__PURE__*/React.createElement(Button, {
    variant: inProposal ? 'secondary' : 'primary',
    size: "sm",
    icon: inProposal ? 'check' : 'plus',
    disabled: b.estado === 'ocupado',
    onClick: () => onAdd(b.id),
    style: {
      flex: 1.4
    }
  }, inProposal ? 'Agregado' : 'A propuesta')));
}

/** MapView — full-bleed map with status pins, hover/selection and a popup. */
function MapView({
  mapSrc,
  items,
  selected,
  onSelect,
  dimUnmatched,
  matchedIds,
  fmt,
  onAdd,
  proposalIds = []
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => onSelect(null),
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: '#E9E5DB'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: mapSrc,
    alt: "Mapa de Buenos Aires",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      userSelect: 'none'
    },
    draggable: false
  }), items.map(b => /*#__PURE__*/React.createElement(Marker, {
    key: b.id,
    b: b,
    selected: selected === b.id,
    dim: dimUnmatched && matchedIds && !matchedIds.has(b.id),
    onClick: onSelect
  })), selected && items.find(b => b.id === selected) && /*#__PURE__*/React.createElement(Popup, {
    b: items.find(b => b.id === selected),
    fmt: fmt,
    onClose: () => onSelect(null),
    onAdd: onAdd,
    inProposal: proposalIds.includes(selected)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      bottom: 16,
      background: 'rgba(255,255,255,0.94)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-sm)',
      padding: '10px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 2
    }
  }, "Estado"), Object.entries(STATUS_COLOR).map(([k, c]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 'var(--text-xs)',
      color: 'var(--text-body)',
      textTransform: 'capitalize'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: c
    }
  }), k))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 16,
      bottom: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "plus",
    variant: "secondary",
    title: "Acercar",
    style: {
      background: '#fff',
      boxShadow: 'var(--shadow-sm)'
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "minus",
    variant: "secondary",
    title: "Alejar",
    style: {
      background: '#fff',
      boxShadow: 'var(--shadow-sm)'
    }
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "locate-fixed",
    variant: "secondary",
    title: "Mi ubicaci\xF3n",
    style: {
      background: '#fff',
      boxShadow: 'var(--shadow-sm)'
    }
  })));
}
window.MapView = MapView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/inventory/MapView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/inventory/data.js
try { (() => {
// Masa Ideas — inventario de ejemplo (carteles de vía pública en CABA)
// x/y = posición en % sobre el mapa estilizado (ba-map.png)
window.MI_INVENTORY = [{
  id: 'MI-0428',
  dir: 'Av. Corrientes 3200',
  barrio: 'Balvanera',
  zona: 'Centro',
  tipo: 'Frente',
  medida: '8 × 4 m',
  estado: 'disponible',
  precio: 480000,
  ilum: true,
  x: 38,
  y: 52,
  cliente: null,
  vence: null
}, {
  id: 'MI-1097',
  dir: 'Au. 25 de Mayo km 4',
  barrio: 'San Cristóbal',
  zona: 'Sur',
  tipo: 'Cartelera',
  medida: '12 × 5 m',
  estado: 'ocupado',
  precio: 1250000,
  ilum: true,
  x: 46,
  y: 64,
  cliente: 'Cervecería del Plata',
  vence: '2026-09-30'
}, {
  id: 'MI-0533',
  dir: 'Av. Cabildo 2100',
  barrio: 'Belgrano',
  zona: 'Norte',
  tipo: 'Frente',
  medida: '6 × 3 m',
  estado: 'disponible',
  precio: 390000,
  ilum: false,
  x: 30,
  y: 24,
  cliente: null,
  vence: null
}, {
  id: 'MI-0781',
  dir: 'Av. Santa Fe 1850',
  barrio: 'Recoleta',
  zona: 'Norte',
  tipo: 'Medianera',
  medida: '10 × 8 m',
  estado: 'reservado',
  precio: 920000,
  ilum: true,
  x: 44,
  y: 38,
  cliente: 'Banco Sur',
  vence: '2026-07-15'
}, {
  id: 'MI-1320',
  dir: 'Au. Perito Moreno km 7',
  barrio: 'Flores',
  zona: 'Oeste',
  tipo: 'Cartelera',
  medida: '12 × 5 m',
  estado: 'disponible',
  precio: 1100000,
  ilum: true,
  x: 20,
  y: 70,
  cliente: null,
  vence: null
}, {
  id: 'MI-0245',
  dir: 'Av. del Libertador 4400',
  barrio: 'Palermo',
  zona: 'Norte',
  tipo: 'LED',
  medida: '6 × 4 m',
  estado: 'ocupado',
  precio: 1850000,
  ilum: true,
  x: 52,
  y: 30,
  cliente: 'AutoNova',
  vence: '2026-11-20'
}, {
  id: 'MI-0902',
  dir: 'Av. Rivadavia 7600',
  barrio: 'Flores',
  zona: 'Oeste',
  tipo: 'Frente',
  medida: '8 × 4 m',
  estado: 'mantenimiento',
  precio: 420000,
  ilum: true,
  x: 24,
  y: 58,
  cliente: null,
  vence: null
}, {
  id: 'MI-1450',
  dir: 'Av. Juan B. Justo 3100',
  barrio: 'Villa Crespo',
  zona: 'Centro',
  tipo: 'Medianera',
  medida: '9 × 6 m',
  estado: 'disponible',
  precio: 680000,
  ilum: false,
  x: 36,
  y: 44,
  cliente: null,
  vence: null
}, {
  id: 'MI-0067',
  dir: 'Au. Illia km 2',
  barrio: 'Retiro',
  zona: 'Norte',
  tipo: 'Cartelera',
  medida: '14 × 5 m',
  estado: 'ocupado',
  precio: 1600000,
  ilum: true,
  x: 56,
  y: 22,
  cliente: 'TelCo Móvil',
  vence: '2026-08-31'
}, {
  id: 'MI-1188',
  dir: 'Av. Pueyrredón 900',
  barrio: 'Once',
  zona: 'Centro',
  tipo: 'Frente',
  medida: '7 × 4 m',
  estado: 'disponible',
  precio: 520000,
  ilum: true,
  x: 40,
  y: 48,
  cliente: null,
  vence: null
}, {
  id: 'MI-0619',
  dir: 'Av. Córdoba 5200',
  barrio: 'Palermo',
  zona: 'Norte',
  tipo: 'LED',
  medida: '5 × 3 m',
  estado: 'reservado',
  precio: 1400000,
  ilum: true,
  x: 48,
  y: 40,
  cliente: 'Farma+',
  vence: '2026-07-01'
}, {
  id: 'MI-1502',
  dir: 'Av. Directorio 2400',
  barrio: 'Caballito',
  zona: 'Centro',
  tipo: 'Frente',
  medida: '8 × 4 m',
  estado: 'disponible',
  precio: 450000,
  ilum: false,
  x: 32,
  y: 62,
  cliente: null,
  vence: null
}, {
  id: 'MI-0354',
  dir: 'Au. Dellepiane km 3',
  barrio: 'Liniers',
  zona: 'Oeste',
  tipo: 'Cartelera',
  medida: '12 × 5 m',
  estado: 'ocupado',
  precio: 1150000,
  ilum: true,
  x: 16,
  y: 66,
  cliente: 'Hiper Norte',
  vence: '2026-10-12'
}, {
  id: 'MI-0810',
  dir: 'Av. Las Heras 2600',
  barrio: 'Recoleta',
  zona: 'Norte',
  tipo: 'Medianera',
  medida: '10 × 7 m',
  estado: 'disponible',
  precio: 870000,
  ilum: true,
  x: 46,
  y: 34,
  cliente: null,
  vence: null
}, {
  id: 'MI-1271',
  dir: 'Av. Triunvirato 4200',
  barrio: 'Villa Urquiza',
  zona: 'Norte',
  tipo: 'Frente',
  medida: '6 × 3 m',
  estado: 'mantenimiento',
  precio: 360000,
  ilum: false,
  x: 28,
  y: 16,
  cliente: null,
  vence: null
}, {
  id: 'MI-0488',
  dir: 'Av. Boedo 1200',
  barrio: 'Boedo',
  zona: 'Sur',
  tipo: 'Frente',
  medida: '8 × 4 m',
  estado: 'disponible',
  precio: 470000,
  ilum: true,
  x: 42,
  y: 58,
  cliente: null,
  vence: null
}];

// Localidades de CABA agrupadas por zona (para el filtro de localidad)
window.MI_ZONAS = ['Norte', 'Centro', 'Sur', 'Oeste'];
window.MI_FMT = {
  money: n => '$' + n.toLocaleString('es-AR'),
  moneyShort: n => n >= 1e6 ? '$' + (n / 1e6).toLocaleString('es-AR', {
    maximumFractionDigits: 1
  }) + 'M' : '$' + (n / 1e3).toFixed(0) + 'k',
  date: s => s ? new Date(s + 'T00:00').toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }) : '—'
};
window.MI_STATUS_LABEL = {
  disponible: 'Disponible',
  reservado: 'Reservado',
  ocupado: 'Ocupado',
  mantenimiento: 'Mantenimiento'
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/inventory/data.js", error: String((e && e.message) || e) }); }

// ui_kits/pipeline/DealCard.jsx
try { (() => {
const {
  Icon,
  Avatar,
  Badge
} = window.DesignSystem_27db72;
function DealCard({
  deal,
  fmt,
  onOpen,
  dragging,
  onDragStart,
  onDragEnd
}) {
  const [hover, setHover] = React.useState(false);
  const stage = window.MI_STAGES.find(s => s.id === deal.etapa);
  return /*#__PURE__*/React.createElement("div", {
    draggable: true,
    onDragStart: e => onDragStart(e, deal.id),
    onDragEnd: onDragEnd,
    onClick: () => onOpen(deal.id),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      boxShadow: dragging ? 'var(--shadow-lg)' : hover ? 'var(--shadow-md)' : 'var(--shadow-xs)',
      padding: '11px 12px',
      cursor: 'pointer',
      opacity: dragging ? 0.5 : 1,
      transform: hover && !dragging ? 'translateY(-1px)' : 'none',
      transition: 'box-shadow var(--dur) var(--ease-out), transform var(--dur) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-base)',
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-heading)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, deal.cliente), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-faint)',
      marginTop: 1
    }
  }, deal.id)), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    variant: "outline",
    size: "sm"
  }, deal.tag)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6,
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-lg)',
      fontWeight: 500,
      color: 'var(--text-heading)',
      letterSpacing: '-0.01em'
    }
  }, fmt.moneyShort(deal.valor)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-faint)'
    }
  }, "\xB7 ", deal.carteles, " carteles")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 9
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4,
      background: 'var(--cream-200)',
      borderRadius: 999,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${deal.prob}%`,
      height: '100%',
      background: stage ? stage.tone : 'var(--accent)',
      borderRadius: 999
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: deal.owner,
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-muted)'
    }
  }, deal.prob, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 12
  }), fmt.date(deal.cierre))));
}
window.DealCard = DealCard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pipeline/DealCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pipeline/DealDrawer.jsx
try { (() => {
const {
  Icon,
  Avatar,
  Badge,
  Button,
  IconButton,
  StatusPill
} = window.DesignSystem_27db72;
function Field({
  label,
  children,
  mono
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      fontSize: 10,
      marginBottom: 3
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--text-heading)',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
      fontWeight: mono ? 500 : 400
    }
  }, children));
}
function DealDrawer({
  deal,
  fmt,
  onClose,
  onMove
}) {
  if (!deal) return null;
  const stages = window.MI_STAGES;
  const stage = stages.find(s => s.id === deal.etapa);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(28,27,26,0.32)',
      zIndex: 500
    }
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: 420,
      zIndex: 510,
      background: 'var(--surface-card)',
      borderLeft: '1px solid var(--border)',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--accent-text)',
      fontWeight: 600
    }
  }, deal.id), /*#__PURE__*/React.createElement(IconButton, {
    icon: "x",
    size: "sm",
    title: "Cerrar",
    onClick: onClose
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-2xl)',
      marginTop: 4
    }
  }, deal.cliente), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "accent",
    variant: "soft"
  }, deal.tag), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, deal.contacto))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      padding: 16,
      background: 'var(--cream-100)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Valor total",
    mono: true
  }, fmt.money(deal.valor)), /*#__PURE__*/React.createElement(Field, {
    label: "Carteles",
    mono: true
  }, deal.carteles), /*#__PURE__*/React.createElement(Field, {
    label: "Probabilidad",
    mono: true
  }, deal.prob, "%"), /*#__PURE__*/React.createElement(Field, {
    label: "Cierre estimado",
    mono: true
  }, fmt.date(deal.cierre))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 8
    }
  }, "Etapa"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, stages.map(s => {
    const active = s.id === deal.etapa;
    const idx = stages.findIndex(x => x.id === deal.etapa);
    const sIdx = stages.findIndex(x => x.id === s.id);
    const done = sIdx < idx;
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      type: "button",
      onClick: () => onMove(deal.id, s.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 10px',
        borderRadius: 'var(--radius-sm)',
        border: `1px solid ${active ? 'var(--orange-300)' : 'transparent'}`,
        background: active ? 'var(--accent-soft)' : 'transparent',
        cursor: 'pointer',
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 18,
        height: 18,
        borderRadius: '50%',
        flex: '0 0 auto',
        background: done ? s.tone : active ? s.tone : 'var(--cream-200)',
        color: '#fff'
      }
    }, (done || active) && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 12,
      strokeWidth: 3
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-base)',
        fontWeight: active ? 'var(--fw-semibold)' : 'var(--fw-regular)',
        color: active ? 'var(--text-heading)' : 'var(--text-muted)'
      }
    }, s.label));
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 10
    }
  }, "Actividad reciente"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, [{
    ic: 'send',
    t: 'Propuesta enviada por email',
    d: 'hace 2 días',
    who: deal.owner
  }, {
    ic: 'phone',
    t: 'Llamada de seguimiento',
    d: 'hace 4 días',
    who: deal.owner
  }, {
    ic: 'file-text',
    t: 'Oportunidad creada',
    d: 'hace 1 semana',
    who: deal.owner
  }].map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--cream-200)',
      color: 'var(--text-muted)',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: a.ic,
    size: 15
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)'
    }
  }, a.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-faint)'
    }
  }, a.who, " \xB7 ", a.d))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      borderTop: '1px solid var(--border)',
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "file-text",
    style: {
      flex: 1
    }
  }, "Ver propuesta"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "circle-check",
    style: {
      flex: 1
    }
  }, "Marcar ganado"))));
}
window.DealDrawer = DealDrawer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pipeline/DealDrawer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pipeline/DealList.jsx
try { (() => {
const {
  Avatar,
  Badge,
  StatusPill
} = window.DesignSystem_27db72;
function DealList({
  deals,
  fmt,
  onOpen
}) {
  const stages = window.MI_STAGES;
  const stageLabel = id => (stages.find(s => s.id === id) || {}).label;
  const stageTone = id => (stages.find(s => s.id === id) || {}).tone;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: 'var(--cream-100)'
    }
  }, ['Oportunidad', 'Etapa', 'Rubro', 'Responsable', 'Prob.', 'Cierre', 'Valor'].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      textAlign: i === 6 || i === 4 ? 'right' : 'left',
      padding: '11px 16px',
      fontSize: 'var(--text-2xs)',
      fontWeight: 600,
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      borderBottom: '1px solid var(--border)',
      whiteSpace: 'nowrap'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, deals.map(d => /*#__PURE__*/React.createElement("tr", {
    key: d.id,
    onClick: () => onOpen(d.id),
    style: {
      cursor: 'pointer'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--surface-hover)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent'
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-heading)'
    }
  }, d.cliente), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-faint)'
    }
  }, d.id, " \xB7 ", d.contacto)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(StatusPill, {
    label: stageLabel(d.etapa),
    color: stageTone(d.etapa),
    size: "sm"
  })), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    variant: "outline",
    size: "sm"
  }, d.tag)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: d.owner,
    size: 22
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, d.owner))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)',
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, d.prob, "%"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, fmt.date(d.cierre)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)',
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)',
      fontWeight: 500
    }
  }, fmt.money(d.valor))))))));
}
window.DealList = DealList;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pipeline/DealList.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pipeline/KanbanBoard.jsx
try { (() => {
const {
  Icon,
  EmptyState
} = window.DesignSystem_27db72;
function KanbanBoard({
  deals,
  fmt,
  onOpen,
  onMove
}) {
  const stages = window.MI_STAGES;
  const [dragId, setDragId] = React.useState(null);
  const [overStage, setOverStage] = React.useState(null);
  const onDragStart = (e, id) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = 'move';
  };
  const onDragEnd = () => {
    setDragId(null);
    setOverStage(null);
  };
  const onDrop = stageId => {
    if (dragId) onMove(dragId, stageId);
    setDragId(null);
    setOverStage(null);
  };
  const colTotal = sid => deals.filter(d => d.etapa === sid).reduce((a, d) => a + d.valor, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      gap: 12,
      padding: 20,
      alignItems: 'stretch',
      minHeight: 0,
      minWidth: 0
    }
  }, stages.map(stage => {
    const col = deals.filter(d => d.etapa === stage.id);
    const isOver = overStage === stage.id;
    return /*#__PURE__*/React.createElement("div", {
      key: stage.id,
      onDragOver: e => {
        e.preventDefault();
        setOverStage(stage.id);
      },
      onDragLeave: () => setOverStage(s => s === stage.id ? null : s),
      onDrop: () => onDrop(stage.id),
      style: {
        flex: '1 1 0',
        minWidth: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: isOver ? 'var(--accent-soft)' : 'var(--bg-sunken)',
        border: `1px solid ${isOver ? 'var(--orange-300)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '11px 12px',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: stage.tone,
        flex: '0 0 auto'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--fw-semibold)',
        color: 'var(--text-heading)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        minWidth: 0
      }
    }, stage.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-2xs)',
        color: 'var(--text-faint)',
        background: 'var(--cream-50)',
        border: '1px solid var(--border)',
        borderRadius: 999,
        padding: '0 6px'
      }
    }, col.length), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 15,
      style: {
        color: 'var(--text-faint)',
        cursor: 'pointer'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '6px 8px 2px',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-2xs)',
        color: 'var(--text-muted)'
      }
    }, fmt.moneyShort(colTotal(stage.id))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        overflowY: 'auto',
        padding: '6px 8px 10px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, col.map(d => /*#__PURE__*/React.createElement(window.DealCard, {
      key: d.id,
      deal: d,
      fmt: fmt,
      onOpen: onOpen,
      dragging: dragId === d.id,
      onDragStart: onDragStart,
      onDragEnd: onDragEnd
    })), col.length === 0 && /*#__PURE__*/React.createElement(EmptyState, {
      art: "board",
      compact: true,
      title: "Arrastr\xE1 una oportunidad ac\xE1",
      style: {
        border: '1px dashed var(--border-strong)',
        borderRadius: 'var(--radius-sm)',
        margin: 2
      }
    })));
  }));
}
window.KanbanBoard = KanbanBoard;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pipeline/KanbanBoard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pipeline/PipelineApp.jsx
try { (() => {
const {
  Sidebar,
  Button,
  Stat,
  SegmentedControl,
  Icon,
  Input,
  ImportDialog
} = window.DesignSystem_27db72;
const NAV = [{
  section: 'Operación'
}, {
  id: 'inventario',
  label: 'Inventario',
  icon: 'map-pin',
  badge: 16
}, {
  id: 'pipeline',
  label: 'Pipeline',
  icon: 'kanban',
  badge: 18
}, {
  id: 'propuestas',
  label: 'Propuestas',
  icon: 'file-text'
}, {
  id: 'clientes',
  label: 'Clientes',
  icon: 'users'
}, {
  divider: true
}, {
  section: 'Cuenta'
}, {
  id: 'reportes',
  label: 'Reportes',
  icon: 'chart-no-axes-column'
}, {
  id: 'config',
  label: 'Configuración',
  icon: 'settings'
}];
function PipelineApp() {
  const fmt = window.MI_CRM_FMT;
  const [deals, setDeals] = React.useState(window.MI_DEALS);
  const [view, setView] = React.useState('tablero');
  const [open, setOpen] = React.useState(null);
  const [query, setQuery] = React.useState('');
  const [importOpen, setImportOpen] = React.useState(false);
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return deals;
    return deals.filter(d => `${d.id} ${d.cliente} ${d.contacto} ${d.tag} ${d.owner}`.toLowerCase().includes(q));
  }, [deals, query]);
  const move = (id, etapa) => setDeals(cur => cur.map(d => d.id === id ? {
    ...d,
    etapa,
    prob: etapa === 'ganado' ? 100 : d.prob
  } : d));
  const openDeal = deals.find(d => d.id === open);
  const totalPond = deals.filter(d => d.etapa !== 'ganado').reduce((a, d) => a + d.valor * d.prob / 100, 0);
  const ganadoMes = deals.filter(d => d.etapa === 'ganado').reduce((a, d) => a + d.valor, 0);
  const abiertas = deals.filter(d => d.etapa !== 'ganado').length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    logoSrc: "../../assets/logo_mark.png",
    brand: "Masa Ideas",
    product: "Gesti\xF3n interna",
    items: NAV,
    active: "pipeline",
    onSelect: () => {},
    user: {
      name: 'Lucía Fernández',
      role: 'Ejecutiva comercial'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      height: 'var(--topbar-h)',
      flex: '0 0 var(--topbar-h)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '0 20px',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-2xl)'
    }
  }, "Pipeline comercial"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 220
    }
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "search",
    placeholder: "Buscar oportunidad\u2026",
    size: "sm",
    value: query,
    onChange: e => setQuery(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(SegmentedControl, {
    value: view,
    onChange: setView,
    options: [{
      value: 'tablero',
      label: 'Tablero',
      icon: 'kanban'
    }, {
      value: 'lista',
      label: 'Lista',
      icon: 'list'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 26,
      background: 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "file-up",
    onClick: () => setImportOpen(true)
  }, "Importar"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "plus"
  }, "Nueva oportunidad")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      padding: '14px 24px',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "Pipeline ponderado",
    value: fmt.moneyShort(totalPond),
    icon: "trending-up",
    delta: "+12%",
    deltaLabel: "vs mes anterior"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Ganado este mes",
    value: fmt.moneyShort(ganadoMes),
    icon: "circle-check"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Oportunidades abiertas",
    value: abiertas,
    icon: "folder-open"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      background: 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Tasa de cierre",
    value: "34",
    unit: "%",
    icon: "target",
    delta: "+3 pts"
  })), view === 'tablero' ? /*#__PURE__*/React.createElement(window.KanbanBoard, {
    deals: filtered,
    fmt: fmt,
    onOpen: setOpen,
    onMove: move
  }) : /*#__PURE__*/React.createElement(window.DealList, {
    deals: filtered,
    fmt: fmt,
    onOpen: setOpen
  }), open && /*#__PURE__*/React.createElement(window.DealDrawer, {
    deal: openDeal,
    fmt: fmt,
    onClose: () => setOpen(null),
    onMove: move
  })), /*#__PURE__*/React.createElement(ImportDialog, {
    open: importOpen,
    onClose: () => setImportOpen(false),
    entity: "oportunidades",
    rows: 12
  }));
}
window.PipelineApp = PipelineApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pipeline/PipelineApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pipeline/data.js
try { (() => {
// Masa Ideas — pipeline comercial (CRM) de ejemplo
window.MI_STAGES = [{
  id: 'prospecto',
  label: 'Prospecto',
  tone: 'var(--ink-400)'
}, {
  id: 'contactado',
  label: 'Contactado',
  tone: 'var(--info-500)'
}, {
  id: 'propuesta',
  label: 'Propuesta enviada',
  tone: 'var(--accent)'
}, {
  id: 'negociacion',
  label: 'Negociación',
  tone: 'var(--warning-500)'
}, {
  id: 'ganado',
  label: 'Ganado',
  tone: 'var(--success-500)'
}];
window.MI_DEALS = [{
  id: 'OP-204',
  cliente: 'Cervecería del Plata',
  contacto: 'Martín Aguirre',
  etapa: 'negociacion',
  valor: 7500000,
  carteles: 5,
  prob: 70,
  cierre: '2026-07-10',
  owner: 'Lucía Fernández',
  tag: 'Bebidas'
}, {
  id: 'OP-198',
  cliente: 'AutoNova',
  contacto: 'Paula Giménez',
  etapa: 'propuesta',
  valor: 11100000,
  carteles: 6,
  prob: 50,
  cierre: '2026-07-22',
  owner: 'Diego Roca',
  tag: 'Automotriz'
}, {
  id: 'OP-211',
  cliente: 'Banco Sur',
  contacto: 'Roberto Costa',
  etapa: 'propuesta',
  valor: 4600000,
  carteles: 4,
  prob: 45,
  cierre: '2026-08-05',
  owner: 'Lucía Fernández',
  tag: 'Finanzas'
}, {
  id: 'OP-176',
  cliente: 'TelCo Móvil',
  contacto: 'Sofía Paz',
  etapa: 'ganado',
  valor: 9600000,
  carteles: 6,
  prob: 100,
  cierre: '2026-06-18',
  owner: 'Diego Roca',
  tag: 'Telecom'
}, {
  id: 'OP-220',
  cliente: 'Farma+',
  contacto: 'Nadia Ruiz',
  etapa: 'contactado',
  valor: 2800000,
  carteles: 2,
  prob: 25,
  cierre: '2026-08-30',
  owner: 'Lucía Fernández',
  tag: 'Salud'
}, {
  id: 'OP-223',
  cliente: 'Hiper Norte',
  contacto: 'Julián Vera',
  etapa: 'contactado',
  valor: 5750000,
  carteles: 5,
  prob: 30,
  cierre: '2026-09-02',
  owner: 'Camila Sosa',
  tag: 'Retail'
}, {
  id: 'OP-231',
  cliente: 'Estudio Lex',
  contacto: 'Inés Molina',
  etapa: 'prospecto',
  valor: 1900000,
  carteles: 2,
  prob: 10,
  cierre: '2026-09-20',
  owner: 'Camila Sosa',
  tag: 'Servicios'
}, {
  id: 'OP-235',
  cliente: 'Viñedos del Sur',
  contacto: 'Tomás Bravo',
  etapa: 'prospecto',
  valor: 3400000,
  carteles: 3,
  prob: 15,
  cierre: '2026-10-01',
  owner: 'Diego Roca',
  tag: 'Bebidas'
}, {
  id: 'OP-240',
  cliente: 'GymFit',
  contacto: 'Lara Núñez',
  etapa: 'negociacion',
  valor: 2100000,
  carteles: 2,
  prob: 65,
  cierre: '2026-07-15',
  owner: 'Lucía Fernández',
  tag: 'Fitness'
}, {
  id: 'OP-188',
  cliente: 'Inmobiliaria Centro',
  contacto: 'Hernán Díaz',
  etapa: 'propuesta',
  valor: 3950000,
  carteles: 3,
  prob: 40,
  cierre: '2026-08-12',
  owner: 'Camila Sosa',
  tag: 'Inmobiliaria'
}, {
  id: 'OP-241',
  cliente: 'EduTech',
  contacto: 'Valeria Ponce',
  etapa: 'prospecto',
  valor: 1500000,
  carteles: 1,
  prob: 10,
  cierre: '2026-10-10',
  owner: 'Diego Roca',
  tag: 'Educación'
}];
window.MI_CRM_FMT = {
  money: n => '$' + n.toLocaleString('es-AR'),
  moneyShort: n => n >= 1e6 ? '$' + (n / 1e6).toLocaleString('es-AR', {
    maximumFractionDigits: 1
  }) + 'M' : '$' + (n / 1e3).toFixed(0) + 'k',
  date: s => s ? new Date(s + 'T00:00').toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short'
  }) : '—'
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pipeline/data.js", error: String((e && e.message) || e) }); }

// ui_kits/proposals/BillboardPreview.jsx
try { (() => {
const {
  Icon,
  IconButton
} = window.DesignSystem_27db72;

/* Convierte "8 × 4 m" → relación de aspecto numérica (ancho/alto). */
function ratioFromMedida(medida) {
  const m = (medida || '').replace(',', '.').match(/([\d.]+)\s*[×x]\s*([\d.]+)/i);
  if (!m) return 16 / 9;
  const w = parseFloat(m[1]),
    h = parseFloat(m[2]);
  if (!w || !h) return 16 / 9;
  return Math.min(3.2, Math.max(1.1, w / h));
}

/**
 * BillboardPreview — mockup del cartel con la creatividad de la marca.
 * Subí (o arrastrá) una imagen y se compone sobre la estructura del cartel.
 */
function BillboardPreview({
  b,
  creative,
  onCreative,
  height = 188,
  showCaption = true
}) {
  const inputRef = React.useRef(null);
  const [drag, setDrag] = React.useState(false);
  const ratio = ratioFromMedida(b.medida);
  const readFile = file => {
    if (!file || !file.type.startsWith('image/')) return;
    const r = new FileReader();
    r.onload = () => onCreative(b.id, r.result);
    r.readAsDataURL(file);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    onClick: () => inputRef.current && inputRef.current.click(),
    onDragOver: e => {
      e.preventDefault();
      setDrag(true);
    },
    onDragLeave: () => setDrag(false),
    onDrop: e => {
      e.preventDefault();
      setDrag(false);
      readFile(e.dataTransfer.files[0]);
    },
    title: creative ? 'Cambiar creatividad' : 'Subir creatividad',
    style: {
      position: 'relative',
      height,
      cursor: 'pointer',
      overflow: 'hidden',
      borderRadius: 'var(--radius-md)',
      border: `1px solid ${drag ? 'var(--accent)' : 'var(--border)'}`,
      boxShadow: drag ? 'var(--shadow-focus)' : 'none',
      background: 'linear-gradient(180deg, #EFEBE2 0%, #E7E2D8 62%, #DED8CB 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '74%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, b.ilum && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '28%',
      width: '76%',
      justifyContent: 'space-between',
      marginBottom: 2
    }
  }, [0, 1].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 14,
      height: 5,
      borderRadius: '3px 3px 0 0',
      background: 'var(--char-700)',
      boxShadow: creative ? '0 6px 14px 2px rgba(240,160,40,0.55)' : 'none'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: b.ilum ? 'calc(100% - 8px)' : '100%',
      aspectRatio: String(ratio),
      background: '#fff',
      border: '5px solid var(--char-900)',
      borderRadius: 2,
      boxShadow: '0 10px 22px rgba(40,30,16,0.28)',
      overflow: 'hidden'
    }
  }, creative ? /*#__PURE__*/React.createElement("img", {
    src: creative,
    alt: "Creatividad",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      color: 'var(--text-faint)',
      backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 9px, rgba(180,170,150,0.14) 9px, rgba(180,170,150,0.14) 10px)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "image-up",
    size: 22
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      fontWeight: 600,
      textAlign: 'center',
      padding: '0 8px'
    }
  }, "Sub\xED o arrastr\xE1 la pieza"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '34%',
      marginTop: -1
    }
  }, [0, 1].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 7,
      height: 22,
      background: 'var(--char-700)'
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      width: '64%',
      height: 4,
      borderRadius: 2,
      background: 'rgba(40,30,16,0.14)',
      marginTop: 1
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 8,
      left: 8,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-on-dark)',
      background: 'rgba(28,27,26,0.78)',
      padding: '2px 7px',
      borderRadius: 'var(--radius-xs)'
    }
  }, b.medida), creative && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onCreative(b.id, null);
    },
    title: "Quitar creatividad",
    style: {
      position: 'absolute',
      top: 6,
      right: 6,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
      border: 'none',
      borderRadius: 'var(--radius-xs)',
      background: 'rgba(28,27,26,0.78)',
      color: '#fff',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 14
  })), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "file",
    accept: "image/*",
    style: {
      display: 'none'
    },
    onChange: e => readFile(e.target.files[0])
  })), showCaption && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 8,
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xs)',
      color: 'var(--accent-text)',
      fontWeight: 600
    }
  }, b.id), b.ilum && /*#__PURE__*/React.createElement(Icon, {
    name: "lightbulb",
    size: 11,
    style: {
      color: 'var(--warning-500)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)',
      fontWeight: 'var(--fw-medium)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, b.dir)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 'var(--text-2xs)',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      color: creative ? 'var(--status-disponible)' : 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: creative ? 'circle-check' : 'circle-dashed',
    size: 13
  }), creative ? 'Pieza cargada' : 'Sin pieza')));
}
window.BillboardPreview = BillboardPreview;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/proposals/BillboardPreview.jsx", error: String((e && e.message) || e) }); }

// ui_kits/proposals/ProposalBuilder.jsx
try { (() => {
const {
  Icon,
  Input,
  Select,
  Checkbox,
  IconButton,
  Button
} = window.DesignSystem_27db72;
function PickRow({
  b,
  fmt,
  checked,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      padding: '9px 14px',
      borderBottom: '1px solid var(--border-subtle)',
      cursor: 'pointer',
      background: checked ? 'var(--accent-soft)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: checked,
    onChange: () => onToggle(b.id)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xs)',
      color: 'var(--accent-text)',
      fontWeight: 600
    }
  }, b.id), b.ilum && /*#__PURE__*/React.createElement(Icon, {
    name: "lightbulb",
    size: 11,
    style: {
      color: 'var(--warning-500)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)',
      fontWeight: 'var(--fw-medium)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, b.dir), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-faint)'
    }
  }, b.barrio, " \xB7 ", b.tipo, " \xB7 ", b.medida)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)'
    }
  }, fmt.moneyShort(b.precio)));
}
function ProposalBuilder({
  cliente,
  setCliente,
  meses,
  setMeses,
  desc,
  setDesc,
  selected,
  toggle,
  fmt,
  onExport,
  onImport
}) {
  const bbs = window.MI_PROP_BILLBOARDS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 380,
      flex: '0 0 380px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      borderRight: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 18px',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-xl)'
    }
  }, "Armar propuesta"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, "Eleg\xED cliente, per\xEDodo y carteles. La vista previa se actualiza al instante.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Cliente",
    icon: "building-2",
    value: cliente,
    onChange: e => setCliente(e.target.value),
    placeholder: "Raz\xF3n social"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Duraci\xF3n de la campa\xF1a",
    value: String(meses),
    onChange: e => setMeses(Number(e.target.value)),
    options: [{
      value: '1',
      label: '1 mes'
    }, {
      value: '3',
      label: '3 meses'
    }, {
      value: '6',
      label: '6 meses'
    }, {
      value: '12',
      label: '12 meses'
    }]
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Descuento (%)",
    type: "number",
    prefix: "%",
    value: desc,
    onChange: e => setDesc(Math.max(0, Math.min(40, Number(e.target.value) || 0)))
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 18px 8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Carteles disponibles"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    icon: "file-up",
    onClick: onImport
  }, "Importar")), bbs.map(b => /*#__PURE__*/React.createElement(PickRow, {
    key: b.id,
    b: b,
    fmt: fmt,
    checked: selected.includes(b.id),
    onToggle: toggle
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      borderTop: '1px solid var(--border)',
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "save",
    style: {
      flex: 1
    }
  }, "Guardar"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "file-down",
    style: {
      flex: 1.3
    },
    onClick: onExport,
    disabled: selected.length === 0
  }, "Exportar PDF")));
}
window.ProposalBuilder = ProposalBuilder;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/proposals/ProposalBuilder.jsx", error: String((e && e.message) || e) }); }

// ui_kits/proposals/ProposalDoc.jsx
try { (() => {
const {
  Icon,
  Thumbnail,
  EmptyState
} = window.DesignSystem_27db72;
function ProposalDoc({
  cliente,
  meses,
  desc,
  selected,
  fmt,
  creatives = {}
}) {
  const bbs = window.MI_PROP_BILLBOARDS.filter(b => selected.includes(b.id));
  const mensual = bbs.reduce((a, b) => a + b.precio, 0);
  const subtotal = mensual * meses;
  const descMonto = subtotal * (desc / 100);
  const total = subtotal - descMonto;
  const alcanceTotal = bbs.reduce((a, b) => a + parseInt(b.alcance) * 1000, 0);
  const hoy = new Date().toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  const validez = new Date(Date.now() + 15 * 864e5).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "prop-doc",
    style: {
      width: 760,
      margin: '0 auto',
      background: '#fff',
      boxShadow: 'var(--shadow-lg)',
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--char-900)',
      color: '#fff',
      padding: '28px 40px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo_mark.png",
    alt: "",
    style: {
      height: 40,
      width: 40
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: 22,
      letterSpacing: '-0.01em'
    }
  }, "Masa Ideas"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-on-dark-muted)'
    }
  }, "V\xEDa p\xFAblica \xB7 Buenos Aires"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      color: 'var(--orange-300)'
    }
  }, "Propuesta comercial"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: '#fff',
      marginTop: 3
    }
  }, "PR-2026-0142"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '26px 40px 18px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Preparada para"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 28,
      color: 'var(--text-heading)',
      lineHeight: 1.1
    }
  }, cliente || 'Nombre del cliente')), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right',
      fontSize: 13,
      color: 'var(--text-muted)',
      lineHeight: 1.7
    }
  }, /*#__PURE__*/React.createElement("div", null, "Fecha: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-body)'
    }
  }, hoy)), /*#__PURE__*/React.createElement("div", null, "Campa\xF1a: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-body)'
    }
  }, meses, " ", meses === 1 ? 'mes' : 'meses')), /*#__PURE__*/React.createElement("div", null, "Ejecutiva: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-body)'
    }
  }, "Luc\xEDa Fern\xE1ndez")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 40px 6px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 17,
      fontStyle: 'italic',
      color: 'var(--text-muted)',
      lineHeight: 1.5
    }
  }, "Una selecci\xF3n de ", bbs.length, " ", bbs.length === 1 ? 'emplazamiento' : 'emplazamientos', " de alto tr\xE1nsito para poner a ", cliente || 'tu marca', " donde la ciudad la ve.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 0,
      margin: '14px 40px 4px',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, [{
    l: 'Carteles',
    v: bbs.length || '—'
  }, {
    l: 'Alcance mensual est.',
    v: alcanceTotal ? (alcanceTotal / 1e6).toLocaleString('es-AR', {
      maximumFractionDigits: 1
    }) + 'M' : '—'
  }, {
    l: 'Inversión mensual',
    v: mensual ? fmt.moneyShort(mensual) : '—'
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      padding: '14px 18px',
      borderRight: i < 2 ? '1px solid var(--border)' : 'none',
      background: i === 2 ? 'var(--accent-soft)' : 'var(--cream-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      fontSize: 10
    }
  }, s.l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 22,
      fontWeight: 500,
      color: i === 2 ? 'var(--accent-text)' : 'var(--text-heading)',
      marginTop: 3
    }
  }, s.v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 40px 8px'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['Código', 'Emplazamiento', 'Tipo / medida', 'Alcance', 'Precio / mes'].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      textAlign: i >= 3 ? 'right' : 'left',
      padding: '0 0 9px',
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-faint)',
      borderBottom: '1.5px solid var(--ink-900)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, bbs.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 5,
    style: {
      padding: '8px 0'
    }
  }, /*#__PURE__*/React.createElement(EmptyState, {
    art: "document",
    title: "Propuesta vac\xEDa",
    description: "Eleg\xED carteles del panel para verlos ac\xE1."
  }))) : bbs.map(b => /*#__PURE__*/React.createElement("tr", {
    key: b.id
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 0',
      borderBottom: '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--accent-text)',
      fontWeight: 600
    }
  }, b.id), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 0',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Thumbnail, {
    kind: "billboard",
    width: 44,
    ratio: "4 / 3",
    src: creatives[b.id],
    label: b.dir
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 'var(--fw-semibold)',
      color: 'var(--text-heading)'
    }
  }, b.dir), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-faint)'
    }
  }, b.barrio)))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 0',
      borderBottom: '1px solid var(--border-subtle)',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, b.tipo, " \xB7 ", b.medida), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 0',
      borderBottom: '1px solid var(--border-subtle)',
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--text-body)'
    }
  }, b.alcance, "/mes"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '11px 0',
      borderBottom: '1px solid var(--border-subtle)',
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--text-heading)',
      fontWeight: 500
    }
  }, fmt.money(b.precio))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '6px 40px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 320,
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(Totline, {
    l: `Subtotal (${meses} ${meses === 1 ? 'mes' : 'meses'})`,
    v: fmt.money(subtotal),
    fmt: fmt,
    muted: true
  }), desc > 0 && /*#__PURE__*/React.createElement(Totline, {
    l: `Descuento ${desc}%`,
    v: '– ' + fmt.money(descMonto),
    accent: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--ink-900)',
      margin: '5px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 18,
      color: 'var(--text-heading)'
    }
  }, "Total campa\xF1a"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 24,
      fontWeight: 600,
      color: 'var(--text-heading)'
    }
  }, fmt.money(total))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--text-faint)',
      textAlign: 'right'
    }
  }, "+ IVA \xB7 valores en pesos argentinos"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22,
      padding: '16px 40px',
      borderTop: '1px solid var(--border)',
      background: 'var(--cream-100)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--text-muted)',
      lineHeight: 1.6,
      maxWidth: 420
    }
  }, "Incluye impresi\xF3n, colocaci\xF3n y mantenimiento durante todo el per\xEDodo. Sujeto a disponibilidad al momento de la firma.", /*#__PURE__*/React.createElement("br", null), "Validez de la propuesta: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-body)'
    }
  }, validez), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 14,
      color: 'var(--text-heading)'
    }
  }, "masaideas.com.ar"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--text-faint)'
    }
  }, "+54 11 4000-0000"))));
}
function Totline({
  l,
  v,
  accent,
  muted
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: muted ? 'var(--text-muted)' : accent ? 'var(--accent-text)' : 'var(--text-body)'
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: accent ? 'var(--accent-text)' : 'var(--text-body)',
      fontWeight: accent ? 600 : 400
    }
  }, v));
}
window.ProposalDoc = ProposalDoc;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/proposals/ProposalDoc.jsx", error: String((e && e.message) || e) }); }

// ui_kits/proposals/ProposalSteps.jsx
try { (() => {
const {
  Icon,
  Input,
  Select,
  Button,
  IconButton,
  StatusPill
} = window.DesignSystem_27db72;

/* ---------- Stepper horizontal ---------- */
const STEPS = [{
  n: 1,
  label: 'Cliente',
  icon: 'building-2'
}, {
  n: 2,
  label: 'Carteles',
  icon: 'map-pin'
}, {
  n: 3,
  label: 'Creatividad',
  icon: 'image'
}, {
  n: 4,
  label: 'Condiciones',
  icon: 'sliders-horizontal'
}, {
  n: 5,
  label: 'Revisión',
  icon: 'file-check'
}];
function Stepper({
  step,
  setStep,
  maxReached
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 0
    }
  }, STEPS.map((s, i) => {
    const done = s.n < step;
    const active = s.n === step;
    const reachable = s.n <= maxReached;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: s.n
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      disabled: !reachable,
      onClick: () => reachable && setStep(s.n),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        background: 'none',
        border: 'none',
        padding: '0 4px',
        cursor: reachable ? 'pointer' : 'default',
        opacity: reachable ? 1 : 0.5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: '50%',
        flex: '0 0 auto',
        background: active ? 'var(--accent)' : done ? 'var(--accent-soft)' : 'var(--cream-200)',
        color: active ? '#fff' : done ? 'var(--accent-text)' : 'var(--text-faint)',
        border: active ? 'none' : `1px solid ${done ? 'var(--orange-300)' : 'var(--border)'}`,
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)',
        fontWeight: 700
      }
    }, done ? /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 15
    }) : s.n), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-sm)',
        fontWeight: active ? 700 : 600,
        color: active ? 'var(--text-heading)' : done ? 'var(--text-body)' : 'var(--text-faint)',
        whiteSpace: 'nowrap'
      }
    }, s.label)), i < STEPS.length - 1 && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 26,
        height: 1.5,
        margin: '0 6px',
        background: s.n < step ? 'var(--orange-300)' : 'var(--border)'
      }
    }));
  }));
}
function StepHeader({
  eyebrow,
  title,
  desc
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      color: 'var(--accent-text)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-2xl)',
      marginTop: 6
    }
  }, title), desc && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, desc));
}

/* ---------- Paso 1 · Cliente ---------- */
function StepCliente({
  cliente,
  setField
}) {
  const rubros = ['Bebidas', 'Automotriz', 'Banca y finanzas', 'Telecomunicaciones', 'Retail', 'Salud', 'Tecnología', 'Inmobiliaria', 'Otro'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 600,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(StepHeader, {
    eyebrow: "Paso 1 de 5",
    title: "\xBFPara qui\xE9n es la propuesta?",
    desc: "Estos datos encabezan el documento que ve el cliente."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-sm)',
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 15
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Raz\xF3n social",
    icon: "building-2",
    placeholder: "Ej. Cervecer\xEDa del Plata S.A.",
    value: cliente.nombre,
    onChange: e => setField('nombre', e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 13
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Persona de contacto",
    icon: "user",
    placeholder: "Nombre y apellido",
    value: cliente.contacto,
    onChange: e => setField('contacto', e.target.value),
    containerStyle: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    icon: "mail",
    placeholder: "contacto@empresa.com",
    value: cliente.email,
    onChange: e => setField('email', e.target.value),
    containerStyle: {
      flex: 1
    }
  })), /*#__PURE__*/React.createElement(Select, {
    label: "Rubro",
    placeholder: "Eleg\xED un rubro",
    value: cliente.rubro,
    onChange: e => setField('rubro', e.target.value),
    options: rubros
  })));
}

/* ---------- Paso 2 · Carteles ---------- */
function CartelPick({
  b,
  fmt,
  checked,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 14px',
      cursor: 'pointer',
      background: checked ? 'var(--accent-soft)' : 'var(--surface-card)',
      border: `1px solid ${checked ? 'var(--orange-300)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-md)',
      transition: 'background var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: 'var(--radius-xs)',
      flex: '0 0 auto',
      border: `1.5px solid ${checked ? 'var(--accent)' : 'var(--border-strong)'}`,
      background: checked ? 'var(--accent)' : 'transparent',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, checked && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 13,
    style: {
      color: '#fff'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xs)',
      color: 'var(--accent-text)',
      fontWeight: 600
    }
  }, b.id), b.ilum && /*#__PURE__*/React.createElement(Icon, {
    name: "lightbulb",
    size: 11,
    style: {
      color: 'var(--warning-500)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)',
      fontWeight: 'var(--fw-medium)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, b.dir), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-faint)'
    }
  }, b.barrio, " \xB7 ", b.tipo, " \xB7 ", b.medida, " \xB7 ", b.alcance, "/mes")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-heading)',
      fontWeight: 500,
      whiteSpace: 'nowrap'
    }
  }, fmt.moneyShort(b.precio)));
}
function StepCarteles({
  bbs,
  selected,
  toggle,
  fmt
}) {
  const sel = bbs.filter(b => selected.includes(b.id));
  const mensual = sel.reduce((a, b) => a + b.precio, 0);
  const alcance = sel.reduce((a, b) => a + parseInt(b.alcance) * 1000, 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 960,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(StepHeader, {
    eyebrow: "Paso 2 de 5",
    title: "Eleg\xED los carteles",
    desc: "Sum\xE1 emplazamientos a la campa\xF1a. El resumen se actualiza al instante."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 10,
      minWidth: 0
    }
  }, bbs.map(b => /*#__PURE__*/React.createElement(CartelPick, {
    key: b.id,
    b: b,
    fmt: fmt,
    checked: selected.includes(b.id),
    onToggle: () => toggle(b.id)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 248,
      flex: '0 0 248px',
      position: 'sticky',
      top: 0,
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-sm)',
      padding: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Selecci\xF3n"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-4xl)',
      fontWeight: 500,
      color: 'var(--text-heading)',
      lineHeight: 1,
      margin: '8px 0 2px'
    }
  }, sel.length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, sel.length === 1 ? 'cartel elegido' : 'carteles elegidos'), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--border)',
      margin: '16px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      fontSize: 10
    }
  }, "Inversi\xF3n / mes"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xl)',
      color: 'var(--accent-text)',
      fontWeight: 600,
      marginTop: 2
    }
  }, mensual ? fmt.money(mensual) : '—')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      fontSize: 10
    }
  }, "Alcance mensual est."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-lg)',
      color: 'var(--text-heading)',
      fontWeight: 500,
      marginTop: 2
    }
  }, alcance ? (alcance / 1e6).toLocaleString('es-AR', {
    maximumFractionDigits: 1
  }) + 'M' : '—'))))));
}

/* ---------- Paso 3 · Creatividad ---------- */
function StepCreatividad({
  bbs,
  selected,
  creatives,
  setCreative,
  applyToAll
}) {
  const sel = bbs.filter(b => selected.includes(b.id));
  const loaded = sel.filter(b => creatives[b.id]).length;
  const firstCreative = sel.map(b => creatives[b.id]).find(Boolean);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16,
      marginBottom: 20,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      color: 'var(--accent-text)'
    }
  }, "Paso 3 de 5"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-2xl)',
      marginTop: 6
    }
  }, "Previsualiz\xE1 la pieza en cada cartel"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-base)',
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, "Sub\xED (o arrastr\xE1) la creatividad de la marca y mir\xE1 c\xF3mo se ve montada.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-heading)'
    }
  }, loaded), " / ", sel.length, " con pieza"), firstCreative && /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    icon: "copy",
    onClick: () => applyToAll(firstCreative)
  }, "Aplicar a todos"))), sel.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '48px 0',
      color: 'var(--text-faint)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "image-off",
    size: 30
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      fontSize: 'var(--text-base)'
    }
  }, "Todav\xEDa no elegiste carteles. Volv\xE9 al paso anterior para sumarlos.")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 18
    }
  }, sel.map(b => /*#__PURE__*/React.createElement(window.BillboardPreview, {
    key: b.id,
    b: b,
    creative: creatives[b.id],
    onCreative: setCreative
  }))));
}

/* ---------- Paso 4 · Condiciones ---------- */
function StepCondiciones({
  bbs,
  selected,
  meses,
  setMeses,
  desc,
  setDesc,
  fmt
}) {
  const sel = bbs.filter(b => selected.includes(b.id));
  const mensual = sel.reduce((a, b) => a + b.precio, 0);
  const subtotal = mensual * meses;
  const descMonto = subtotal * (desc / 100);
  const total = subtotal - descMonto;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(StepHeader, {
    eyebrow: "Paso 4 de 5",
    title: "Condiciones comerciales",
    desc: "Defin\xED el per\xEDodo y el descuento. Los totales se recalculan solos."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'flex-start',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 280,
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-sm)',
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Duraci\xF3n de la campa\xF1a",
    value: String(meses),
    onChange: e => setMeses(Number(e.target.value)),
    options: [{
      value: '1',
      label: '1 mes'
    }, {
      value: '3',
      label: '3 meses'
    }, {
      value: '6',
      label: '6 meses'
    }, {
      value: '12',
      label: '12 meses'
    }]
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Descuento (%)",
    type: "number",
    prefix: "%",
    value: desc,
    onChange: e => setDesc(Math.max(0, Math.min(40, Number(e.target.value) || 0))),
    hint: "Hasta 40%."
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 300,
      flex: '0 0 300px',
      minWidth: 260,
      background: 'var(--char-900)',
      color: '#fff',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-md)',
      padding: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      color: 'var(--orange-300)'
    }
  }, "Total estimado"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9,
      marginTop: 14,
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Line, {
    l: `Inversión / mes`,
    v: fmt.money(mensual)
  }), /*#__PURE__*/React.createElement(Line, {
    l: `Subtotal · ${meses} ${meses === 1 ? 'mes' : 'meses'}`,
    v: fmt.money(subtotal)
  }), desc > 0 && /*#__PURE__*/React.createElement(Line, {
    l: `Descuento ${desc}%`,
    v: '– ' + fmt.money(descMonto),
    accent: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'rgba(255,255,255,0.16)',
      margin: '14px 0'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)'
    }
  }, "Total"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xl)',
      fontWeight: 600
    }
  }, fmt.money(total))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-on-dark-muted)',
      textAlign: 'right',
      marginTop: 4
    }
  }, "+ IVA \xB7 en pesos"))));
}
function Line({
  l,
  v,
  accent
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: accent ? 'var(--orange-300)' : 'var(--text-on-dark-muted)'
    }
  }, l), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      color: accent ? 'var(--orange-300)' : '#fff'
    }
  }, v));
}
window.ProposalSteps = {
  Stepper,
  StepCliente,
  StepCarteles,
  StepCreatividad,
  StepCondiciones
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/proposals/ProposalSteps.jsx", error: String((e && e.message) || e) }); }

// ui_kits/proposals/ProposalsApp.jsx
try { (() => {
const {
  Sidebar,
  Button,
  IconButton,
  Icon,
  ImportDialog
} = window.DesignSystem_27db72;
const {
  Stepper,
  StepCliente,
  StepCarteles,
  StepCreatividad,
  StepCondiciones
} = window.ProposalSteps;
const NAV = [{
  section: 'Operación'
}, {
  id: 'inventario',
  label: 'Inventario',
  icon: 'map-pin',
  badge: 16
}, {
  id: 'pipeline',
  label: 'Pipeline',
  icon: 'kanban',
  badge: 18
}, {
  id: 'propuestas',
  label: 'Propuestas',
  icon: 'file-text'
}, {
  id: 'clientes',
  label: 'Clientes',
  icon: 'users'
}, {
  divider: true
}, {
  section: 'Cuenta'
}, {
  id: 'reportes',
  label: 'Reportes',
  icon: 'chart-no-axes-column'
}, {
  id: 'config',
  label: 'Configuración',
  icon: 'settings'
}];
function ProposalsApp() {
  const fmt = window.MI_PROP_FMT;
  const bbs = window.MI_PROP_BILLBOARDS;
  const [step, setStep] = React.useState(1);
  const [maxReached, setMaxReached] = React.useState(1);
  const [cliente, setCliente] = React.useState({
    nombre: 'Cervecería del Plata',
    contacto: 'Martín Aguirre',
    email: 'compras@cerveceriadelplata.com',
    rubro: 'Bebidas'
  });
  const [meses, setMeses] = React.useState(3);
  const [desc, setDesc] = React.useState(10);
  const [selected, setSelected] = React.useState(['MI-0245', 'MI-0067', 'MI-0781']);
  const [creatives, setCreatives] = React.useState({});
  const [toast, setToast] = React.useState(null);
  const [importOpen, setImportOpen] = React.useState(false);
  const setField = (k, v) => setCliente(c => ({
    ...c,
    [k]: v
  }));
  const toggle = id => setSelected(cur => cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id]);
  const setCreative = (id, src) => setCreatives(c => {
    const n = {
      ...c
    };
    if (src) n[id] = src;else delete n[id];
    return n;
  });
  const applyToAll = src => setCreatives(() => {
    const n = {};
    selected.forEach(id => {
      n[id] = src;
    });
    return n;
  });
  const goTo = n => {
    setStep(n);
    setMaxReached(m => Math.max(m, n));
  };
  const canContinue = step === 1 ? cliente.nombre.trim() !== '' : step === 2 ? selected.length > 0 : true;
  const onSend = () => {
    setToast(`Propuesta enviada a ${cliente.nombre}`);
    setTimeout(() => setToast(null), 2800);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--bg-page)'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    logoSrc: "../../assets/logo_mark.png",
    brand: "Masa Ideas",
    product: "Gesti\xF3n interna",
    items: NAV,
    active: "propuestas",
    onSelect: () => {},
    user: {
      name: 'Lucía Fernández',
      role: 'Ejecutiva comercial'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      height: 'var(--topbar-h)',
      flex: '0 0 var(--topbar-h)',
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '0 20px',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Propuestas"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 15,
    style: {
      color: 'var(--text-faint)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-heading)',
      fontWeight: 'var(--fw-semibold)'
    }
  }, cliente.nombre || 'Nueva propuesta')), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: "save"
  }, "Guardar borrador")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '14px 24px',
      background: 'var(--surface-card)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(Stepper, {
    step: step,
    setStep: goTo,
    maxReached: maxReached
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: step === 5 ? '28px 24px' : '32px 28px',
      background: step === 5 ? 'var(--bg-sunken)' : 'var(--bg-page)'
    }
  }, step === 1 && /*#__PURE__*/React.createElement(StepCliente, {
    cliente: cliente,
    setField: setField
  }), step === 2 && /*#__PURE__*/React.createElement(StepCarteles, {
    bbs: bbs,
    selected: selected,
    toggle: toggle,
    fmt: fmt
  }), step === 3 && /*#__PURE__*/React.createElement(StepCreatividad, {
    bbs: bbs,
    selected: selected,
    creatives: creatives,
    setCreative: setCreative,
    applyToAll: applyToAll
  }), step === 4 && /*#__PURE__*/React.createElement(StepCondiciones, {
    bbs: bbs,
    selected: selected,
    meses: meses,
    setMeses: setMeses,
    desc: desc,
    setDesc: setDesc,
    fmt: fmt
  }), step === 5 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.ProposalDoc, {
    cliente: cliente.nombre,
    meses: meses,
    desc: desc,
    selected: selected,
    fmt: fmt,
    creatives: creatives
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 28
    }
  }))), /*#__PURE__*/React.createElement("footer", {
    style: {
      flex: '0 0 auto',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 24px',
      background: 'var(--surface-card)',
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: "arrow-left",
    disabled: step === 1,
    onClick: () => goTo(step - 1)
  }, "Atr\xE1s"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), step === 2 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-muted)',
      marginRight: 4
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-heading)'
    }
  }, selected.length), " ", selected.length === 1 ? 'cartel' : 'carteles'), step === 3 && /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "file-up",
    onClick: () => setImportOpen(true)
  }, "Importar piezas"), step < 5 ? /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: "arrow-right",
    disabled: !canContinue,
    onClick: () => goTo(step + 1)
  }, "Continuar") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "file-down",
    onClick: () => setToast('Propuesta exportada en PDF')
  }, "Exportar PDF"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "send",
    onClick: onSend
  }, "Enviar al cliente")))), /*#__PURE__*/React.createElement(ImportDialog, {
    open: importOpen,
    onClose: () => setImportOpen(false),
    entity: "carteles",
    rows: 16
  }), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      left: '50%',
      bottom: 28,
      transform: 'translateX(-50%)',
      zIndex: 800,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--char-900)',
      color: 'var(--text-on-dark)',
      padding: '11px 16px',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      fontSize: 'var(--text-sm)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "circle-check",
    size: 17,
    style: {
      color: 'var(--status-disponible)'
    }
  }), toast));
}
window.ProposalsApp = ProposalsApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/proposals/ProposalsApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/proposals/data.js
try { (() => {
// Masa Ideas — datos para el generador de propuestas
window.MI_PROP_BILLBOARDS = [{
  id: 'MI-0245',
  dir: 'Av. del Libertador 4400',
  barrio: 'Palermo',
  tipo: 'LED',
  medida: '6 × 4 m',
  precio: 1850000,
  ilum: true,
  alcance: '420k'
}, {
  id: 'MI-0781',
  dir: 'Av. Santa Fe 1850',
  barrio: 'Recoleta',
  tipo: 'Medianera',
  medida: '10 × 8 m',
  precio: 920000,
  ilum: true,
  alcance: '310k'
}, {
  id: 'MI-0428',
  dir: 'Av. Corrientes 3200',
  barrio: 'Balvanera',
  tipo: 'Frente',
  medida: '8 × 4 m',
  precio: 480000,
  ilum: true,
  alcance: '180k'
}, {
  id: 'MI-0067',
  dir: 'Au. Illia km 2',
  barrio: 'Retiro',
  tipo: 'Cartelera',
  medida: '14 × 5 m',
  precio: 1600000,
  ilum: true,
  alcance: '520k'
}, {
  id: 'MI-0619',
  dir: 'Av. Córdoba 5200',
  barrio: 'Palermo',
  tipo: 'LED',
  medida: '5 × 3 m',
  precio: 1400000,
  ilum: true,
  alcance: '290k'
}, {
  id: 'MI-1188',
  dir: 'Av. Pueyrredón 900',
  barrio: 'Once',
  tipo: 'Frente',
  medida: '7 × 4 m',
  precio: 520000,
  ilum: true,
  alcance: '210k'
}, {
  id: 'MI-0810',
  dir: 'Av. Las Heras 2600',
  barrio: 'Recoleta',
  tipo: 'Medianera',
  medida: '10 × 7 m',
  precio: 870000,
  ilum: true,
  alcance: '270k'
}, {
  id: 'MI-1320',
  dir: 'Au. Perito Moreno km 7',
  barrio: 'Flores',
  tipo: 'Cartelera',
  medida: '12 × 5 m',
  precio: 1100000,
  ilum: true,
  alcance: '350k'
}];
window.MI_PROP_FMT = {
  money: n => '$' + Math.round(n).toLocaleString('es-AR'),
  moneyShort: n => n >= 1e6 ? '$' + (n / 1e6).toLocaleString('es-AR', {
    maximumFractionDigits: 1
  }) + 'M' : '$' + (n / 1e3).toFixed(0) + 'k'
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/proposals/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Thumbnail = __ds_scope.Thumbnail;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.ImportDialog = __ds_scope.ImportDialog;

__ds_ns.Modal = __ds_scope.Modal;

})();
