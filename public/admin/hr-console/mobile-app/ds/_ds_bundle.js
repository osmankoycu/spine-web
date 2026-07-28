/* @ds-bundle: {"format":3,"namespace":"HealDesignSystem_c10ba9","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/display/Eyebrow.jsx"},{"name":"Stat","sourcePath":"components/display/Stat.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"726787013ce0","components/actions/IconButton.jsx":"0ccf5e6b4aee","components/display/Avatar.jsx":"05c70398585d","components/display/Card.jsx":"11d711161347","components/display/Eyebrow.jsx":"50d158717e77","components/display/Stat.jsx":"02cc791abc56","components/feedback/Badge.jsx":"cfe29107040b","components/feedback/Tag.jsx":"bff87ba75842","components/feedback/Toast.jsx":"b1ed50430663","components/forms/Input.jsx":"02e14819acbd","components/forms/Switch.jsx":"edfd10538049","ui_kits/employee-app/EmployeeApp.jsx":"6a7dc139c16b","ui_kits/employer-dashboard/DashboardApp.jsx":"02123de80b4b","ui_kits/employer-dashboard/Sidebar.jsx":"bf2205fbe178","ui_kits/marketing-site/MarketingSite.jsx":"4a07d86410cc"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HealDesignSystem_c10ba9 = window.HealDesignSystem_c10ba9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Heal primary button. Cobalt is the system action color. Marigold is
 * marketing/joy ONLY — never a primary action inside the broker tool.
 */
function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  iconLeft = null,
  iconRight = null,
  children,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      fontSize: '13px',
      padding: '6px 12px',
      gap: '6px',
      height: '32px'
    },
    md: {
      fontSize: '15px',
      padding: '9px 16px',
      gap: '8px',
      height: '40px'
    },
    lg: {
      fontSize: '16px',
      padding: '12px 22px',
      gap: '8px',
      height: '48px'
    }
  };
  const variants = {
    primary: {
      background: 'var(--cobalt-400)',
      color: 'var(--pure-white)',
      border: '1px solid var(--cobalt-400)',
      '--hover-bg': 'var(--cobalt-500)',
      '--hover-bd': 'var(--cobalt-500)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--cobalt-400)',
      border: '1px solid var(--cobalt-400)',
      '--hover-bg': 'var(--cobalt-100)',
      '--hover-bd': 'var(--cobalt-400)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text)',
      border: '1px solid transparent',
      '--hover-bg': 'var(--gray-100)',
      '--hover-bd': 'transparent'
    },
    soft: {
      background: 'var(--cobalt-100)',
      color: 'var(--cobalt-600)',
      border: '1px solid transparent',
      '--hover-bg': 'var(--cobalt-200)',
      '--hover-bd': 'transparent'
    },
    contextual: {
      /* employee surface */
      background: 'var(--aqua-400)',
      color: 'var(--aqua-700)',
      border: '1px solid var(--aqua-400)',
      '--hover-bg': 'var(--aqua-500)',
      '--hover-bd': 'var(--aqua-500)'
    },
    marigold: {
      /* marketing / email / joy only */
      background: 'var(--marigold-500)',
      color: 'var(--pure-white)',
      border: '1px solid var(--marigold-500)',
      '--hover-bg': 'var(--marigold-600)',
      '--hover-bd': 'var(--marigold-600)'
    }
  };
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;
  const styleObj = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--weight-medium)',
    fontSize: s.fontSize,
    lineHeight: 1,
    letterSpacing: '0',
    borderRadius: 'var(--radius-button)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    whiteSpace: 'nowrap',
    transition: 'background var(--duration-fast) var(--ease-out-quart), border-color var(--duration-fast) var(--ease-out-quart)',
    ...v,
    ...style
  };
  const onEnter = e => {
    if (disabled) return;
    e.currentTarget.style.background = v['--hover-bg'];
    e.currentTarget.style.borderColor = v['--hover-bd'];
  };
  const onLeave = e => {
    if (disabled) return;
    e.currentTarget.style.background = v.background;
    e.currentTarget.style.borderColor = (v.border || '').split(' ').pop();
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    style: styleObj,
    disabled: disabled,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave
  }, rest), iconLeft && /*#__PURE__*/React.createElement("i", {
    className: iconLeft,
    style: {
      fontSize: '1.15em',
      lineHeight: 0
    }
  }), children, iconRight && /*#__PURE__*/React.createElement("i", {
    className: iconRight,
    style: {
      fontSize: '1.15em',
      lineHeight: 0
    }
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Square icon-only button using a Phosphor icon class (Regular weight).
 * Load the Phosphor web font on the page: `ph ph-<name>`.
 */
function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  label = '',
  style = {},
  ...rest
}) {
  const dim = {
    sm: 32,
    md: 40,
    lg: 48
  }[size] || 40;
  const fontSize = {
    sm: 16,
    md: 20,
    lg: 24
  }[size] || 20;
  const variants = {
    ghost: {
      background: 'transparent',
      color: 'var(--text)',
      border: '1px solid transparent',
      hover: 'var(--gray-100)'
    },
    soft: {
      background: 'var(--cobalt-100)',
      color: 'var(--cobalt-600)',
      border: '1px solid transparent',
      hover: 'var(--cobalt-200)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text)',
      border: '1px solid var(--gray-400)',
      hover: 'var(--gray-100)'
    },
    primary: {
      background: 'var(--cobalt-400)',
      color: 'var(--pure-white)',
      border: '1px solid var(--cobalt-400)',
      hover: 'var(--cobalt-500)'
    }
  };
  const v = variants[variant] || variants.ghost;
  const styleObj = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dim,
    height: dim,
    padding: 0,
    borderRadius: 'var(--radius-button)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    fontSize,
    transition: 'background var(--duration-fast) var(--ease-out-quart)',
    ...v,
    ...style
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    disabled: disabled,
    style: styleObj,
    onMouseEnter: e => {
      if (!disabled) e.currentTarget.style.background = v.hover;
    },
    onMouseLeave: e => {
      if (!disabled) e.currentTarget.style.background = v.background;
    }
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: icon,
    style: {
      lineHeight: 0
    }
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Circular avatar with image or initials. Cool-gray fallback. */
function Avatar({
  src = '',
  name = '',
  size = 40,
  tone = 'gray',
  style = {},
  ...rest
}) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const tones = {
    gray: {
      bg: 'var(--gray-200)',
      fg: 'var(--gray-800)'
    },
    cobalt: {
      bg: 'var(--cobalt-100)',
      fg: 'var(--cobalt-600)'
    },
    aqua: {
      bg: 'var(--aqua-100)',
      fg: 'var(--aqua-600)'
    }
  };
  const t = tones[tone] || tones.gray;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: 'var(--radius-full)',
      overflow: 'hidden',
      background: t.bg,
      color: t.fg,
      flexShrink: 0,
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--weight-medium)',
      fontSize: Math.round(size * 0.4),
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Rising white card on Surface. Hairline border, 12px radius, NO shadow by
 * default (Heal is shadow-light). `accent` adds the 4px marigold left border
 * used for customer-story / editorial blocks.
 */
function Card({
  padding = '24px',
  radius = 'card',
  accent = false,
  raised = false,
  interactive = false,
  children,
  style = {},
  ...rest
}) {
  const radii = {
    button: 'var(--radius-button)',
    card: 'var(--radius-card)',
    hero: 'var(--radius-hero)',
    modal: 'var(--radius-modal)'
  };
  const styleObj = {
    background: 'var(--pure-white)',
    border: '1px solid var(--gray-300)',
    borderLeft: accent ? '4px solid var(--marigold-400)' : '1px solid var(--gray-300)',
    borderRadius: accent ? `0 ${radii[radius] ? '12px' : '12px'} 12px 0` : radii[radius] || 'var(--radius-card)',
    boxShadow: raised ? 'var(--shadow-card)' : 'var(--shadow-none)',
    padding,
    transition: interactive ? 'border-color var(--duration-fast) var(--ease-out-quart)' : undefined,
    cursor: interactive ? 'pointer' : undefined,
    ...style
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: styleObj,
    onMouseEnter: interactive ? e => {
      e.currentTarget.style.borderColor = 'var(--gray-400)';
    } : undefined,
    onMouseLeave: interactive ? e => {
      e.currentTarget.style.borderColor = 'var(--gray-300)';
    } : undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow / section label. Caption-2: uppercase, +12% tracking, cobalt by
 * default. Marigold for editorial (customer story) contexts.
 */
function Eyebrow({
  tone = 'cobalt',
  children,
  style = {},
  ...rest
}) {
  const colors = {
    cobalt: 'var(--cobalt-400)',
    marigold: 'var(--marigold-500)',
    aqua: 'var(--aqua-600)',
    muted: 'var(--text-muted)',
    onDark: 'var(--cobalt-200)'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-sans)',
      fontSize: '12px',
      fontWeight: 'var(--weight-semibold)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      lineHeight: 1.3,
      color: colors[tone] || colors.cobalt,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/display/Stat.jsx
try { (() => {
/**
 * KPI stat. The number is Geist Mono (data voice). Optional trend with
 * semantic color. Use for dashboard hero numbers and proof points.
 */
function Stat({
  value,
  label = '',
  prefix = '',
  suffix = '',
  trend = null,
  // { dir: 'down'|'up', value: '12%' }
  trendGood = 'down',
  // which direction is positive (costs: down is good)
  tone = 'ink',
  // 'ink' | 'cobalt' | 'marigold' | 'aqua'
  size = 'lg',
  style = {}
}) {
  const colors = {
    ink: 'var(--text-strong)',
    cobalt: 'var(--cobalt-400)',
    marigold: 'var(--marigold-500)',
    aqua: 'var(--aqua-600)'
  };
  const valueSize = {
    sm: '24px',
    md: '32px',
    lg: '44px'
  }[size] || '44px';
  const good = trend && trend.dir === trendGood;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--weight-bold)',
      fontSize: valueSize,
      lineHeight: 1,
      letterSpacing: '-0.02em',
      color: colors[tone] || colors.ink,
      fontVariantNumeric: 'tabular-nums'
    }
  }, prefix, value, suffix), trend && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '2px',
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      fontWeight: 'var(--weight-medium)',
      color: good ? 'var(--success)' : 'var(--gray-600)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: trend.dir === 'down' ? 'ph ph-arrow-down' : 'ph ph-arrow-up',
    style: {
      lineHeight: 0
    }
  }), trend.value)), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '13px',
      color: 'var(--text-muted)',
      lineHeight: 1.4
    }
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Stat.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small uppercase badge. Marigold for NEW / FAMILY (joy/brand);
 * cobalt for info; neutral gray otherwise. Caption-2 bold uppercase.
 */
function Badge({
  tone = 'neutral',
  children,
  style = {},
  ...rest
}) {
  const tones = {
    new: {
      background: 'var(--marigold-400)',
      color: 'var(--pure-white)'
    },
    family: {
      background: 'var(--marigold-400)',
      color: 'var(--pure-white)'
    },
    accent: {
      background: 'var(--marigold-100)',
      color: 'var(--marigold-700)'
    },
    info: {
      background: 'var(--cobalt-100)',
      color: 'var(--cobalt-600)'
    },
    neutral: {
      background: 'var(--gray-200)',
      color: 'var(--gray-800)'
    },
    success: {
      background: 'var(--success-bg)',
      color: 'var(--success-strong)'
    },
    aqua: {
      background: 'var(--aqua-100)',
      color: 'var(--aqua-600)'
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: '11px',
      fontWeight: 'var(--weight-bold)',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      lineHeight: 1,
      padding: '4px 7px',
      borderRadius: 'var(--radius-subtle)',
      ...t,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Categorical pill. `color` selects a decorative-palette hue (agent tiles,
 * tags) — decorative colors NEVER carry semantic meaning. For status use
 * the `status` prop instead (success/error/warning/info).
 */
const DEC = ['brick', 'sun', 'olive', 'mint', 'teal', 'sky', 'periwinkle', 'iris', 'rose'];
function Tag({
  color = 'sky',
  status = null,
  icon = null,
  children,
  style = {},
  ...rest
}) {
  let bg, stroke, fg;
  if (status) {
    const map = {
      success: ['var(--success-bg)', 'var(--success-soft)', 'var(--success-strong)'],
      error: ['var(--error-bg)', 'var(--error-soft)', 'var(--error-strong)'],
      warning: ['var(--warning-bg)', 'var(--warning-soft)', 'var(--warning-strong)'],
      info: ['var(--info-bg)', 'var(--info-soft)', 'var(--info-strong)']
    };
    [bg, stroke, fg] = map[status] || map.info;
  } else {
    const c = DEC.includes(color) ? color : 'sky';
    bg = `var(--dec-${c}-bg)`;
    stroke = `var(--dec-${c}-stroke)`;
    fg = `var(--dec-${c}-dark)`;
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      fontFamily: 'var(--font-sans)',
      fontSize: '12px',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 1,
      padding: '4px 9px',
      background: bg,
      color: fg,
      border: `1.5px solid ${stroke}`,
      borderRadius: 'var(--radius-full)',
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("i", {
    className: icon,
    style: {
      fontSize: '13px',
      lineHeight: 0
    }
  }), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Semantic toast: bg + 4px left border + icon circle + message.
 * The 4 semantic tones carry state. `accent` (marigold) is for joy / new
 * feature announcements ONLY — never for state.
 */
function Toast({
  tone = 'success',
  title = '',
  children,
  onClose,
  style = {},
  ...rest
}) {
  const map = {
    success: {
      bg: 'var(--success-bg)',
      line: 'var(--success)',
      fg: 'var(--success-strong)',
      icon: 'ph ph-check'
    },
    error: {
      bg: 'var(--error-bg)',
      line: 'var(--error)',
      fg: 'var(--error-strong)',
      icon: 'ph ph-warning'
    },
    warning: {
      bg: 'var(--warning-bg)',
      line: 'var(--warning)',
      fg: 'var(--warning-strong)',
      icon: 'ph ph-warning'
    },
    info: {
      bg: 'var(--info-bg)',
      line: 'var(--info)',
      fg: 'var(--info-strong)',
      icon: 'ph ph-info'
    },
    accent: {
      bg: 'var(--marigold-100)',
      line: 'var(--marigold-400)',
      fg: 'var(--marigold-700)',
      icon: 'ph ph-star'
    }
  };
  const t = map[tone] || map.success;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      background: t.bg,
      borderLeft: `4px solid ${t.line}`,
      borderRadius: 'var(--radius-button)',
      padding: '14px 16px',
      fontFamily: 'var(--font-sans)',
      maxWidth: '420px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: 24,
      height: 24,
      borderRadius: 'var(--radius-full)',
      background: t.line,
      color: 'var(--pure-white)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '15px'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: t.icon,
    style: {
      lineHeight: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: '15px',
      lineHeight: 1.5,
      color: t.fg
    }
  }, title && /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 'var(--weight-semibold)'
    }
  }, title, " "), children), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'transparent',
      color: t.fg,
      cursor: 'pointer',
      fontSize: '16px',
      lineHeight: 0,
      opacity: 0.6,
      padding: 2
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-x"
  })));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Heal text input. Hairline border, 6px radius, cobalt focus ring.
 * Shadow-light: elevation comes from border + surface, never shadow.
 */
function Input({
  label = '',
  helper = '',
  error = '',
  icon = null,
  type = 'text',
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const inputId = id || (label ? `inp-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--error)' : focused ? 'var(--cobalt-400)' : 'var(--gray-400)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: '13px',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-secondary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: disabled ? 'var(--gray-100)' : 'var(--pure-white)',
      border: `${focused ? '2px' : '1px'} solid ${borderColor}`,
      borderRadius: 'var(--radius-input)',
      padding: focused ? '7px 11px' : '8px 12px',
      transition: 'border-color var(--duration-fast) var(--ease-out-quart)',
      opacity: disabled ? 0.6 : 1
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    className: icon,
    style: {
      fontSize: '18px',
      color: 'var(--text-muted)',
      lineHeight: 0
    }
  }), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    disabled: disabled,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: '15px',
      color: 'var(--text)',
      lineHeight: 1.5,
      minWidth: 0
    }
  }, rest))), (error || helper) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '13px',
      color: error ? 'var(--error)' : 'var(--text-muted)'
    }
  }, error || helper));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Heal toggle switch. Cobalt when on (or aqua on employee surfaces). */
function Switch({
  checked = false,
  onChange = () => {},
  disabled = false,
  tone = 'cobalt',
  label = '',
  style = {},
  ...rest
}) {
  const onColor = tone === 'aqua' ? 'var(--aqua-400)' : 'var(--cobalt-400)';
  const track = /*#__PURE__*/React.createElement("span", _extends({
    role: "switch",
    "aria-checked": checked,
    tabIndex: disabled ? -1 : 0,
    onClick: () => !disabled && onChange(!checked),
    onKeyDown: e => {
      if (!disabled && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        onChange(!checked);
      }
    },
    style: {
      position: 'relative',
      width: 40,
      height: 24,
      flexShrink: 0,
      borderRadius: 'var(--radius-full)',
      background: checked ? onColor : 'var(--gray-400)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'background var(--duration-base) var(--ease-out-quart)'
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: checked ? 18 : 2,
      width: 20,
      height: 20,
      borderRadius: 'var(--radius-full)',
      background: 'var(--pure-white)',
      transition: 'left var(--duration-base) var(--ease-out-quart)'
    }
  }));
  if (!label) return track;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-sans)',
      fontSize: '15px',
      color: 'var(--text)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style
    }
  }, track, label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// ui_kits/employee-app/EmployeeApp.jsx
try { (() => {
/* Heal employee mobile app — aqua-led concierge in your pocket. */
const {
  Button,
  IconButton,
  Card,
  Badge,
  Tag,
  Avatar,
  Stat
} = window.HealDesignSystem_c10ba9;

/* ---- Home tab ---- */
function HomeTab() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(180deg, var(--aqua-100), var(--aqua-400))',
      padding: '56px 22px 28px',
      color: 'var(--aqua-700)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: '0.04em',
      opacity: 0.8
    }
  }, "Good morning, Maya"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 30,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      marginTop: 4,
      lineHeight: 1.1
    }
  }, "You're covered.", /*#__PURE__*/React.createElement("br", null), "Here's what's new.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 18px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      marginTop: -16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "16px",
    raised: true,
    style: {
      borderRadius: 'var(--radius-hero)',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '9999px',
      background: 'var(--aqua-100)',
      color: 'var(--aqua-600)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 22,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-chat-circle-dots"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Ask Heal anything"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "Bills, coverage, referrals \u2014 24/7")), /*#__PURE__*/React.createElement("i", {
    className: "ph ph-arrow-right",
    style: {
      color: 'var(--aqua-600)',
      fontSize: 18
    }
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "18px",
    style: {
      borderRadius: 'var(--radius-hero)',
      border: '1px solid var(--gray-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "family"
  }, "Family"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "2 hours ago")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 19,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: '-0.01em',
      lineHeight: 1.3
    }
  }, "Maya's referral renewed."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      color: 'var(--text-muted)',
      marginTop: 4,
      lineHeight: 1.45
    }
  }, "Pediatric specialist + in-network. No paperwork needed."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--marigold-100)',
      color: 'var(--marigold-700)',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 500,
      padding: '4px 10px',
      borderRadius: 'var(--radius-input)'
    }
  }, "Next: Oct 14"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--marigold-500)'
    }
  }, "View \u2192"))), /*#__PURE__*/React.createElement(Card, {
    padding: "18px",
    style: {
      borderRadius: 'var(--radius-hero)',
      border: '1px solid var(--gray-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--text-muted)',
      marginBottom: 12
    }
  }, "Saved for you this year"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    prefix: "$",
    value: "1,840",
    label: "On prescriptions",
    size: "md",
    tone: "aqua"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "3",
    label: "Bills contested",
    size: "md"
  })))));
}

/* ---- Ask Heal chat tab ---- */
function ChatTab() {
  const [messages, setMessages] = React.useState([{
    from: 'heal',
    text: "Hi Maya — I'm Heal. Ask me about a bill, your coverage, or finding care. What's on your mind?"
  }]);
  const [draft, setDraft] = React.useState('');
  const scroller = React.useRef(null);
  const canned = "That's a generic version of your medication — usually about $14 instead of $90. Your plan covers it the same way. Want me to send the script to a pharmacy near you?";
  const send = text => {
    const t = (text || draft).trim();
    if (!t) return;
    setMessages(m => [...m, {
      from: 'me',
      text: t
    }]);
    setDraft('');
    setTimeout(() => setMessages(m => [...m, {
      from: 'heal',
      text: canned
    }]), 600);
  };
  React.useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [messages]);
  const chips = ['Is this bill right?', 'Find a therapist', 'Generic for my Rx?'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '52px 18px 12px',
      borderBottom: '0.5px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--surface)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/heal-mark-aqua.svg",
    style: {
      height: 28
    },
    alt: "Heal"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 17,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Ask Heal"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--success)',
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 9999,
      background: 'var(--success)'
    }
  }), "Online \xB7 replies in seconds"))), /*#__PURE__*/React.createElement("div", {
    ref: scroller,
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, messages.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start',
      maxWidth: '82%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '11px 14px',
      borderRadius: 18,
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      lineHeight: 1.45,
      background: m.from === 'me' ? 'var(--aqua-400)' : 'var(--pure-white)',
      color: m.from === 'me' ? 'var(--aqua-700)' : 'var(--text)',
      border: m.from === 'me' ? 'none' : '0.5px solid var(--border)',
      borderBottomRightRadius: m.from === 'me' ? 4 : 18,
      borderBottomLeftRadius: m.from === 'me' ? 18 : 4
    }
  }, m.text)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 14px 8px',
      display: 'flex',
      gap: 7,
      overflowX: 'auto'
    }
  }, chips.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => send(c),
    style: {
      whiteSpace: 'nowrap',
      flexShrink: 0,
      border: '1px solid var(--aqua-200)',
      background: 'var(--aqua-100)',
      color: 'var(--aqua-600)',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 500,
      padding: '7px 12px',
      borderRadius: 9999,
      cursor: 'pointer'
    }
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 14px 28px',
      borderTop: '0.5px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--surface)'
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: draft,
    onChange: e => setDraft(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter') send();
    },
    placeholder: "Message Heal\u2026",
    style: {
      flex: 1,
      border: '1px solid var(--gray-400)',
      borderRadius: 9999,
      padding: '11px 16px',
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      outline: 'none',
      background: 'var(--pure-white)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => send(),
    "aria-label": "Send",
    style: {
      width: 42,
      height: 42,
      borderRadius: 9999,
      border: 'none',
      background: 'var(--aqua-400)',
      color: 'var(--aqua-700)',
      fontSize: 20,
      cursor: 'pointer',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-arrow-up"
  }))));
}

/* ---- Coverage tab ---- */
function CoverageTab() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '52px 18px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 28,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)'
    }
  }, "Your coverage"), /*#__PURE__*/React.createElement(Card, {
    padding: "18px",
    style: {
      borderRadius: 'var(--radius-hero)',
      border: '1px solid var(--gray-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: 'var(--aqua-600)'
    }
  }, "Level-funded PPO \xB7 Aetna"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 26,
      fontWeight: 700,
      color: 'var(--text-strong)',
      marginTop: 8,
      letterSpacing: '-0.02em'
    }
  }, "$20 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 400,
      color: 'var(--text-muted)'
    }
  }, "primary care copay"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    color: "sky",
    icon: "ph ph-stethoscope"
  }, "Medical"), /*#__PURE__*/React.createElement(Tag, {
    color: "iris",
    icon: "ph ph-tooth"
  }, "Dental"), /*#__PURE__*/React.createElement(Tag, {
    color: "sun",
    icon: "ph ph-eye"
  }, "Vision"), /*#__PURE__*/React.createElement(Tag, {
    color: "mint",
    icon: "ph ph-pill"
  }, "Pharmacy"), /*#__PURE__*/React.createElement(Tag, {
    color: "teal",
    icon: "ph ph-brain"
  }, "Mental health")), /*#__PURE__*/React.createElement(Button, {
    variant: "contextual",
    fullWidth: true,
    iconLeft: "ph ph-identification-card"
  }, "Show my insurance card"));
}

/* ---- Phone shell + tab bar ---- */
function EmployeeApp() {
  const [tab, setTab] = React.useState('home');
  const tabs = [{
    id: 'home',
    icon: 'ph ph-house',
    label: 'Home'
  }, {
    id: 'ask',
    icon: 'ph ph-chat-circle-dots',
    label: 'Ask Heal'
  }, {
    id: 'coverage',
    icon: 'ph ph-shield-check',
    label: 'Coverage'
  }, {
    id: 'profile',
    icon: 'ph ph-user',
    label: 'Profile'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: 'var(--gray-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 800,
      background: 'var(--surface)',
      borderRadius: 44,
      overflow: 'hidden',
      position: 'relative',
      boxShadow: '0 24px 60px rgba(14,20,25,0.18)',
      border: '10px solid var(--gray-1000)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      zIndex: 10,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 600,
      color: tab === 'home' ? 'var(--aqua-700)' : 'var(--text-strong)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", null, "9:41"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 6,
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-cell-signal-full"
  }), /*#__PURE__*/React.createElement("i", {
    className: "ph ph-wifi-high"
  }), /*#__PURE__*/React.createElement("i", {
    className: "ph ph-battery-full"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflowY: 'auto',
      paddingBottom: 76
    }
  }, tab === 'home' && /*#__PURE__*/React.createElement(HomeTab, null), tab === 'ask' && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 800
    }
  }, /*#__PURE__*/React.createElement(ChatTab, null)), tab === 'coverage' && /*#__PURE__*/React.createElement(CoverageTab, null), tab === 'profile' && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '52px 18px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Maya Rivera",
    size: 72,
    tone: "aqua"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 22,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Maya Rivera"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, "Atlas Robotics \xB7 Member since 2025"), /*#__PURE__*/React.createElement(Card, {
    padding: "14px",
    style: {
      width: '100%',
      borderRadius: 'var(--radius-card)',
      marginTop: 10,
      textAlign: 'left',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--text-muted)',
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-lock-key",
    style: {
      color: 'var(--aqua-600)',
      marginRight: 6
    }
  }), "Your individual health data is never shared with your employer."))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 76,
      background: 'var(--pure-white)',
      borderTop: '0.5px solid var(--border)',
      display: 'flex',
      paddingBottom: 14
    }
  }, tabs.map(tb => {
    const on = tab === tb.id;
    return /*#__PURE__*/React.createElement("button", {
      key: tb.id,
      onClick: () => setTab(tb.id),
      style: {
        flex: 1,
        border: 'none',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        cursor: 'pointer',
        color: on ? 'var(--aqua-500)' : 'var(--gray-500)',
        paddingTop: 10
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: tb.icon,
      style: {
        fontSize: 23,
        lineHeight: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 11,
        fontWeight: on ? 600 : 500
      }
    }, tb.label));
  }))));
}
window.EmployeeApp = EmployeeApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/employee-app/EmployeeApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/employer-dashboard/DashboardApp.jsx
try { (() => {
/* Employer dashboard — screens + shell. Composes Heal primitives from the bundle. */
const {
  Button,
  IconButton,
  Card,
  Stat,
  Eyebrow,
  Badge,
  Tag,
  Toast,
  Avatar,
  Input
} = window.HealDesignSystem_c10ba9;

/* ---------------- Topbar ---------------- */
function Topbar({
  title,
  subtitle
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '18px 32px',
      borderBottom: '0.5px solid var(--border)',
      background: 'var(--surface)',
      position: 'sticky',
      top: 0,
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 24,
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: 'var(--text-strong)'
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2px 0 0',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, subtitle)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240
    }
  }, /*#__PURE__*/React.createElement(Input, {
    icon: "ph ph-magnifying-glass",
    placeholder: "Search employees, claims\u2026"
  })), /*#__PURE__*/React.createElement(IconButton, {
    icon: "ph ph-bell",
    variant: "outline",
    label: "Notifications"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: "ph ph-plus"
  }, "Add employee")));
}

/* ---------------- Overview ---------------- */
function OverviewScreen({
  onToast
}) {
  const agents = [{
    color: 'sky',
    icon: 'ph ph-shield-check',
    name: 'Claims Defense',
    meta: '4 claims contested this week'
  }, {
    color: 'mint',
    icon: 'ph ph-pill',
    name: 'Rx Optimizer',
    meta: '$2,140 saved on generics'
  }, {
    color: 'periwinkle',
    icon: 'ph ph-calculator',
    name: 'Renewal Modeler',
    meta: 'Re-priced 3 hrs ago'
  }, {
    color: 'sun',
    icon: 'ph ph-chat-circle',
    name: 'Employee Concierge',
    meta: '38 questions answered'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '9999px',
      background: 'var(--marigold-400)',
      marginTop: 8,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    tone: "marigold"
  }, "Renewal \xB7 action needed"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '8px 0 4px',
      fontFamily: 'var(--font-sans)',
      fontSize: 20,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "12 employees pending plan election"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-muted)',
      lineHeight: 1.5
    }
  }, "Open enrollment closes in ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--cobalt-600)'
    }
  }, "6 days"), ". Send a reminder to outstanding team members.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "View list"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: () => onToast('success', 'Reminder sent.', 'Nudged 12 employees to elect a plan.')
  }, "Send reminder"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "20px"
  }, /*#__PURE__*/React.createElement(Stat, {
    prefix: "$",
    value: "1.24M",
    label: "Annual benefits cost",
    size: "md",
    trend: {
      dir: 'down',
      value: '25%'
    }
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "20px"
  }, /*#__PURE__*/React.createElement(Stat, {
    prefix: "$",
    value: "312K",
    label: "Projected savings (2026)",
    size: "md",
    tone: "cobalt"
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "20px"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "128",
    label: "Covered employees",
    size: "md"
  })), /*#__PURE__*/React.createElement(Card, {
    padding: "20px"
  }, /*#__PURE__*/React.createElement(Stat, {
    value: "81",
    label: "Employee NPS",
    size: "md",
    tone: "aqua",
    trend: {
      dir: 'up',
      value: '6'
    },
    trendGood: "up"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Cost trajectory"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "success"
  }, "On track"))), /*#__PURE__*/React.createElement(CostChart, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Legend, {
    color: "var(--cobalt-400)",
    label: "Your plan"
  }), /*#__PURE__*/React.createElement(Legend, {
    color: "var(--gray-400)",
    label: "Old broker (counterfactual)",
    dashed: true
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 14px',
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Heal agents at work"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, agents.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.name,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: 'var(--radius-button)',
      background: `var(--dec-${a.color}-bg)`,
      border: `1.5px solid var(--dec-${a.color}-stroke)`,
      color: `var(--dec-${a.color}-dark)`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: a.icon
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, a.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, a.meta)), /*#__PURE__*/React.createElement("i", {
    className: "ph ph-caret-right",
    style: {
      color: 'var(--text-muted)',
      fontSize: 16
    }
  })))))));
}
function Legend({
  color,
  label,
  dashed
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 0,
      borderTop: `${dashed ? '1.5px dashed' : '2px solid'} ${color}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, label));
}
function CostChart() {
  // simple inline SVG line chart, brand-colored, carbon-restrained
  const w = 460,
    h = 150,
    pad = 8;
  const plan = [60, 58, 55, 52, 50, 47, 44, 42];
  const old = [60, 63, 66, 70, 73, 77, 81, 85];
  const max = 90,
    min = 35;
  const x = (i, n) => pad + i * (w - pad * 2) / (n - 1);
  const y = v => h - pad - (v - min) / (max - min) * (h - pad * 2);
  const path = arr => arr.map((v, i) => `${i ? 'L' : 'M'}${x(i, arr.length).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${w} ${h}`,
    style: {
      width: '100%',
      height: 150
    }
  }, [0, 1, 2, 3].map(g => /*#__PURE__*/React.createElement("line", {
    key: g,
    x1: pad,
    x2: w - pad,
    y1: pad + g * (h - pad * 2) / 3,
    y2: pad + g * (h - pad * 2) / 3,
    stroke: "rgba(14,20,25,0.08)",
    strokeWidth: "0.5"
  })), /*#__PURE__*/React.createElement("path", {
    d: path(old),
    fill: "none",
    stroke: "var(--gray-400)",
    strokeWidth: "1.5",
    strokeDasharray: "4 4"
  }), /*#__PURE__*/React.createElement("path", {
    d: path(plan),
    fill: "none",
    stroke: "var(--cobalt-400)",
    strokeWidth: "2"
  }), plan.map((v, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: x(i, plan.length),
    cy: y(v),
    r: "2.5",
    fill: "var(--cobalt-400)"
  })));
}

/* ---------------- Employees ---------------- */
function EmployeesScreen() {
  const rows = [{
    name: 'Priya Shah',
    email: 'priya@atlas.co',
    plan: 'Level-funded PPO',
    status: 'active',
    cost: '486'
  }, {
    name: 'Marcus Lee',
    email: 'marcus@atlas.co',
    plan: 'Level-funded PPO',
    status: 'active',
    cost: '486'
  }, {
    name: 'Ana Torres',
    email: 'ana@atlas.co',
    plan: 'HDHP + HSA',
    status: 'pending',
    cost: '—'
  }, {
    name: 'Sam Okafor',
    email: 'sam@atlas.co',
    plan: 'Level-funded PPO + Family',
    status: 'family',
    cost: '1,240'
  }, {
    name: 'Jess Kim',
    email: 'jess@atlas.co',
    plan: 'HDHP + HSA',
    status: 'active',
    cost: '402'
  }, {
    name: 'Dev Patel',
    email: 'dev@atlas.co',
    plan: 'Not elected',
    status: 'pending',
    cost: '—'
  }];
  const statusEl = s => {
    if (s === 'active') return /*#__PURE__*/React.createElement(Tag, {
      status: "success",
      icon: "ph ph-check-circle"
    }, "Active");
    if (s === 'pending') return /*#__PURE__*/React.createElement(Tag, {
      status: "warning",
      icon: "ph ph-clock"
    }, "Pending");
    if (s === 'family') return /*#__PURE__*/React.createElement(Badge, {
      tone: "family"
    }, "Family");
    return null;
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: "0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '16px 20px',
      borderBottom: '0.5px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "All employees"), /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral"
  }, "128 total"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    iconLeft: "ph ph-funnel"
  }, "Filter"))), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      textAlign: 'left'
    }
  }, ['Employee', 'Plan', 'Status', 'Monthly cost', ''].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      padding: '10px 20px',
      fontSize: 11,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'var(--text-muted)',
      borderBottom: '0.5px solid var(--border)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderBottom: '0.5px solid var(--gray-100)'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: r.name,
    size: 32,
    tone: "cobalt"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, r.email)))), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 20px',
      fontSize: 14,
      color: 'var(--text-secondary)'
    }
  }, r.plan), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 20px'
    }
  }, statusEl(r.status)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 20px',
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, r.cost === '—' ? '—' : `$${r.cost}`), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '12px 20px',
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "ph ph-dots-three",
    variant: "ghost",
    size: "sm",
    label: "Actions"
  }))))))));
}

/* ---------------- Plan ---------------- */
function PlanScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      display: 'grid',
      gridTemplateColumns: '1.3fr 1fr',
      gap: 16,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Eyebrow, null, "Current plan \xB7 2026"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '8px 0 4px',
      fontFamily: 'var(--font-sans)',
      fontSize: 22,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Level-funded PPO"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 18px',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-muted)',
      lineHeight: 1.5
    }
  }, "A ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--cobalt-600)'
    }
  }, "level-funded plan"), " means you pay a fixed monthly amount and get money back when claims come in under projection. Modeled against your team's actual claims."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 16,
      borderTop: '0.5px solid var(--border)',
      paddingTop: 18
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    prefix: "$",
    value: "1,500",
    label: "Deductible (individual)",
    size: "sm"
  }), /*#__PURE__*/React.createElement(Stat, {
    prefix: "$",
    value: "20",
    label: "Primary care copay",
    size: "sm"
  }), /*#__PURE__*/React.createElement(Stat, {
    value: "Aetna",
    label: "Network",
    size: "sm",
    tone: "cobalt"
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 0 14px',
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Coverage"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    color: "sky",
    icon: "ph ph-stethoscope"
  }, "Medical"), /*#__PURE__*/React.createElement(Tag, {
    color: "iris",
    icon: "ph ph-tooth"
  }, "Dental"), /*#__PURE__*/React.createElement(Tag, {
    color: "sun",
    icon: "ph ph-eye"
  }, "Vision"), /*#__PURE__*/React.createElement(Tag, {
    color: "mint",
    icon: "ph ph-pill"
  }, "Pharmacy"), /*#__PURE__*/React.createElement(Tag, {
    color: "teal",
    icon: "ph ph-brain"
  }, "Mental health"), /*#__PURE__*/React.createElement(Tag, {
    color: "rose",
    icon: "ph ph-baby"
  }, "Family / fertility")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      paddingTop: 16,
      borderTop: '0.5px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    iconLeft: "ph ph-file-text"
  }, "Download plan documents"))));
}

/* ---------------- App shell ---------------- */
function DashboardApp() {
  const [active, setActive] = React.useState('overview');
  const [toast, setToast] = React.useState(null);
  const showToast = (tone, title, body) => {
    setToast({
      tone,
      title,
      body
    });
    setTimeout(() => setToast(null), 4000);
  };
  const titles = {
    overview: ['Good morning, Dana', "Here's where your benefits stand today."],
    employees: ['Employees', 'Manage coverage and plan elections.'],
    plan: ['Plan & coverage', 'Your level-funded plan, modeled nightly.'],
    claims: ['Claims defense', 'Every claim, contested in real time.'],
    reports: ['Reports', 'Cost, utilization, and renewal modeling.']
  };
  const [t, sub] = titles[active] || titles.overview;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--surface)'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: active,
    onNav: setActive
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflowY: 'auto',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    title: t,
    subtitle: sub
  }), active === 'overview' && /*#__PURE__*/React.createElement(OverviewScreen, {
    onToast: showToast
  }), active === 'employees' && /*#__PURE__*/React.createElement(EmployeesScreen, null), active === 'plan' && /*#__PURE__*/React.createElement(PlanScreen, null), (active === 'claims' || active === 'reports') && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      padding: '64px 24px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-compass-tool",
    style: {
      fontSize: 40,
      color: 'var(--gray-400)'
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-muted)',
      maxWidth: 360
    }
  }, "This surface is part of the kit's navigation. Hook it up to the ", t.toLowerCase(), " data when building for real."))), toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 50
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: toast.tone,
    title: toast.title,
    onClose: () => setToast(null),
    style: {
      boxShadow: 'var(--shadow-dropdown)'
    }
  }, toast.body))));
}
window.DashboardApp = DashboardApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/employer-dashboard/DashboardApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/employer-dashboard/Sidebar.jsx
try { (() => {
/* Employer dashboard sidebar — cobalt-led chrome on near-ink rail */

function Sidebar({
  active,
  onNav
}) {
  const items = [{
    id: 'overview',
    icon: 'ph ph-squares-four',
    label: 'Overview'
  }, {
    id: 'employees',
    icon: 'ph ph-users-three',
    label: 'Employees'
  }, {
    id: 'plan',
    icon: 'ph ph-shield-check',
    label: 'Plan & coverage'
  }, {
    id: 'claims',
    icon: 'ph ph-receipt',
    label: 'Claims defense'
  }, {
    id: 'reports',
    icon: 'ph ph-chart-line-up',
    label: 'Reports'
  }];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      width: 240,
      flexShrink: 0,
      background: 'var(--cobalt-700)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 14px',
      gap: 4,
      height: '100%',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '4px 8px 20px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/heal-mark-white.svg",
    alt: "Heal",
    style: {
      height: 26
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/heal-logo-white.svg",
    alt: "Heal",
    style: {
      height: 20
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--cobalt-300)',
      padding: '8px 10px 6px'
    }
  }, "Atlas Robotics"), items.map(it => {
    const on = active === it.id;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onNav(it.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 11,
        width: '100%',
        padding: '10px 10px',
        border: 'none',
        borderRadius: 'var(--radius-button)',
        background: on ? 'var(--cobalt-600)' : 'transparent',
        color: on ? 'var(--pure-white)' : 'var(--cobalt-200)',
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        fontWeight: on ? 600 : 500,
        cursor: 'pointer',
        textAlign: 'left'
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: it.icon,
      style: {
        fontSize: 19,
        lineHeight: 0
      }
    }), it.label);
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNav('overview'),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      width: '100%',
      padding: '10px',
      border: 'none',
      borderRadius: 'var(--radius-button)',
      background: 'transparent',
      color: 'var(--cobalt-200)',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 500,
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "ph ph-gear",
    style: {
      fontSize: 19,
      lineHeight: 0
    }
  }), "Settings"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px',
      color: 'var(--cobalt-200)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 30,
      height: 30,
      borderRadius: '9999px',
      background: 'var(--cobalt-500)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 600
    }
  }, "DM"), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--pure-white)'
    }
  }, "Dana Mehta"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      color: 'var(--cobalt-300)'
    }
  }, "Head of People")))));
}
window.Sidebar = Sidebar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/employer-dashboard/Sidebar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/MarketingSite.jsx
try { (() => {
/* Heal marketing site — employer landing. Cobalt hero + aqua moments. */
const {
  Button,
  Card,
  Eyebrow,
  Badge,
  Stat,
  Tag
} = window.HealDesignSystem_c10ba9;
function Nav() {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      padding: '16px 40px',
      background: 'rgba(250,250,250,0.85)',
      backdropFilter: 'saturate(180%) blur(12px)',
      borderBottom: '0.5px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/heal-logo-cobalt.svg",
    alt: "Heal",
    style: {
      height: 26
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      marginLeft: 12
    }
  }, ['Product', 'Pricing', 'Customers', 'About'].map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--text-secondary)',
      textDecoration: 'none'
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--text)',
      textDecoration: 'none'
    }
  }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Request demo")));
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--cobalt-400)',
      padding: '88px 40px 96px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: '0 auto',
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--cobalt-200)'
    }
  }, "Employer \xB7 New in 2026"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '18px 0 0',
      fontFamily: 'var(--font-sans)',
      fontSize: 64,
      fontWeight: 600,
      lineHeight: 1.04,
      letterSpacing: '-0.03em',
      color: 'var(--pure-white)',
      maxWidth: 880
    }
  }, "Better plans. Lower costs. ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: 'var(--marigold-200)'
    }
  }, "No PEO.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '22px 0 0',
      fontFamily: 'var(--font-sans)',
      fontSize: 19,
      lineHeight: 1.5,
      color: 'var(--cobalt-100)',
      maxWidth: 560
    }
  }, "The AI-native broker for 30\u2013500 person tech startups. We design your plan around your actual team, defend every claim, and re-price it every night. Free for employers."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 30
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'var(--pure-white)',
      color: 'var(--cobalt-400)',
      border: 'none',
      borderRadius: 'var(--radius-button)',
      padding: '13px 24px',
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, "Request demo"), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'transparent',
      color: 'var(--cobalt-100)',
      border: '1px solid var(--cobalt-300)',
      borderRadius: 'var(--radius-button)',
      padding: '13px 24px',
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, "See plans")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--cobalt-200)'
    }
  }, "Used by 20+ tech companies \xB7 Live in days \xB7 HIPAA & SOC 2")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.10,
      backgroundImage: 'radial-gradient(#fff 28%, transparent 32%)',
      backgroundSize: '10px 10px',
      maskImage: 'linear-gradient(to left, #000, transparent 55%)',
      WebkitMaskImage: 'linear-gradient(to left, #000, transparent 55%)'
    }
  }));
}
function ProofStrip() {
  const stats = [{
    v: '25%',
    l: 'Average cost saving'
  }, {
    v: '$4K',
    l: 'Saved per employee'
  }, {
    v: '80+',
    l: 'Employee NPS'
  }, {
    v: '75%',
    l: 'Fewer HR tickets'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '40px 40px',
      borderBottom: '0.5px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24
    }
  }, stats.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 40,
      fontWeight: 700,
      color: 'var(--cobalt-400)',
      letterSpacing: '-0.02em'
    }
  }, s.v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, s.l)))));
}
function Pillars() {
  const items = [{
    icon: 'ph ph-eye',
    title: 'Clarity',
    body: 'Healthcare is opaque. Heal makes it legible — every employee gets a 24/7 concierge in their pocket.',
    tone: 'aqua'
  }, {
    icon: 'ph ph-arrows-clockwise',
    title: 'Continuous optimization',
    body: 'Brokers set your plan once. Heal re-evaluates it every night against your actual claims.',
    tone: 'cobalt'
  }, {
    icon: 'ph ph-scales',
    title: 'Aligned incentives',
    body: 'We earn from carriers, not from you. Free for employers because the business model aligns.',
    tone: 'marigold'
  }];
  const toneColor = {
    aqua: 'var(--aqua-600)',
    cobalt: 'var(--cobalt-400)',
    marigold: 'var(--marigold-500)'
  };
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '72px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "How it works"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '12px 0 36px',
      fontFamily: 'var(--font-sans)',
      fontSize: 40,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      maxWidth: 600
    }
  }, "Three things your current broker won't do."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16
    }
  }, items.map(it => /*#__PURE__*/React.createElement(Card, {
    key: it.title,
    padding: "24px"
  }, /*#__PURE__*/React.createElement("i", {
    className: it.icon,
    style: {
      fontSize: 28,
      color: toneColor[it.tone]
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '16px 0 8px',
      fontFamily: 'var(--font-sans)',
      fontSize: 20,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, it.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--text-muted)'
    }
  }, it.body))))));
}
function CustomerStory() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '24px 40px 72px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    accent: true,
    padding: "40px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--marigold-500)'
    }
  }, "Customer story"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '16px 0 0',
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 32,
      lineHeight: 1.32,
      letterSpacing: '-0.01em',
      color: 'var(--text-strong)',
      maxWidth: 760
    }
  }, "\u201CWe saved ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontStyle: 'normal',
      fontWeight: 700,
      color: 'var(--marigold-500)'
    }
  }, "$87K"), " and our team actually understands their plan.\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      color: 'var(--text-tertiary)'
    }
  }, "\u2014 ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--marigold-500)'
    }
  }, "Priya Shah"), ", Head of People at Lumen AI"))));
}
function DualAudience() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '0 40px 72px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: '0 auto',
      borderRadius: 'var(--radius-hero)',
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--cobalt-600)',
      padding: '44px 36px',
      color: 'var(--pure-white)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--cobalt-200)'
    }
  }, "For employers"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '14px 0 10px',
      fontFamily: 'var(--font-sans)',
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: '-0.01em'
    }
  }, "Your plan, re-evaluated every night."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--cobalt-100)'
    }
  }, "Level-funded plans modeled against your real claims. Every saved claim is a smaller renewal.")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--aqua-400)',
      padding: '44px 36px',
      color: 'var(--aqua-700)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--aqua-600)'
    }
  }, "For employees"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '14px 0 10px',
      fontFamily: 'var(--font-sans)',
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: '-0.01em'
    }
  }, "A benefits expert in your pocket, 24/7."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      lineHeight: 1.5,
      color: 'var(--aqua-600)'
    }
  }, "Don't pay that bill. Ask Heal first \u2014 in plain language, any time."))));
}
function CtaFooter() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--cobalt-700)',
      padding: '72px 40px 40px',
      color: 'var(--pure-white)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 44,
      fontWeight: 600,
      letterSpacing: '-0.025em',
      lineHeight: 1.05,
      maxWidth: 640
    }
  }, "We replaced our broker. ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: 'var(--marigold-300)'
    }
  }, "So can you.")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '18px 0 28px',
      fontFamily: 'var(--font-sans)',
      fontSize: 18,
      color: 'var(--cobalt-200)',
      maxWidth: 480
    }
  }, "Same carriers. Same networks. Lower costs. Live in days."), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'var(--pure-white)',
      color: 'var(--cobalt-600)',
      border: 'none',
      borderRadius: 'var(--radius-button)',
      padding: '14px 26px',
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, "Request a demo \u2192"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 64,
      paddingTop: 24,
      borderTop: '0.5px solid var(--cobalt-600)',
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/heal-logo-white.svg",
    alt: "Heal",
    style: {
      height: 20,
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--cobalt-300)'
    }
  }, "\xA9 2026 Heal Labs, Inc. \xB7 HIPAA \xB7 SOC 2 \xB7 GDPR-aligned"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--cobalt-300)',
      fontStyle: 'italic'
    }
  }, "Ask Heal. Get Clarity."))));
}
function MarketingSite() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface)'
    }
  }, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(ProofStrip, null), /*#__PURE__*/React.createElement(Pillars, null), /*#__PURE__*/React.createElement(CustomerStory, null), /*#__PURE__*/React.createElement(DualAudience, null), /*#__PURE__*/React.createElement(CtaFooter, null));
}
window.MarketingSite = MarketingSite;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/MarketingSite.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

})();
