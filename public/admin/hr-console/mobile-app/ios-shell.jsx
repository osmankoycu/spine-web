// iOS shell primitives for the Spine HR mobile app: status bar, screen +
// large-title nav, tab bar, sheets, action sheets, segmented control, toast.

function StatusBar() {
  const c = 'var(--ink)';
  return (
    <div className="statusbar">
      <span className="sb-time">9:41</span>
      <span className="sb-icons">
        <svg width="18" height="11" viewBox="0 0 19 12"><rect x="0" y="7.5" width="3.2" height="4.5" rx=".7" fill={c} /><rect x="4.8" y="5" width="3.2" height="7" rx=".7" fill={c} /><rect x="9.6" y="2.5" width="3.2" height="9.5" rx=".7" fill={c} /><rect x="14.4" y="0" width="3.2" height="12" rx=".7" fill={c} /></svg>
        <svg width="16" height="11" viewBox="0 0 17 12"><path d="M8.5 3.2c2.3 0 4.4.9 5.9 2.4l1.1-1.1A9.8 9.8 0 0 0 8.5 1.5 9.8 9.8 0 0 0 1.5 4.5l1.1 1.1A8.3 8.3 0 0 1 8.5 3.2Z" fill={c} /><path d="M8.5 6.8c1.4 0 2.6.5 3.5 1.4l1.1-1.1a6.6 6.6 0 0 0-9.2 0L5 8.2c.9-.9 2.1-1.4 3.5-1.4Z" fill={c} /><circle cx="8.5" cy="10.5" r="1.5" fill={c} /></svg>
        <svg width="25" height="12" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity=".35" fill="none" /><rect x="2" y="2" width="20" height="9" rx="2" fill={c} /><path d="M25 4.5v4c.8-.3 1.5-1.3 1.5-2s-.7-1.7-1.5-2Z" fill={c} fillOpacity=".4" /></svg>
      </span>
    </div>);
}

function Segmented({ options, value, onChange }) {
  const i = Math.max(0, options.findIndex((o) => (o.id || o) === value));
  return (
    <div className="seg" style={{ '--n': options.length, '--i': i }}>
      <span className="seg-thumb" />
      {options.map((o) => {
        const id = o.id || o;
        return <button key={id} className={`seg-item${id === value ? ' on' : ''}`} onClick={() => onChange(id)}>{o.label || o}</button>;
      })}
    </div>);
}

// Screen: owns its scroller, fades the compact nav in as the large title
// scrolls away, and handles pull-to-refresh.
function Screen({ title, subtitle, leading, trailing, onBack, backLabel, pinned, onRefresh, label, children }) {
  const [solid, setSolid] = React.useState(false);
  const [padTop, setPadTop] = React.useState(96);
  const [pull, setPull] = React.useState(0);
  const [busy, setBusy] = React.useState(false);
  const navRef = React.useRef(null);
  const scRef = React.useRef(null);
  const drag = React.useRef(null);

  React.useLayoutEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const measure = () => setPadTop(el.offsetHeight + 4);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onScroll = (e) => {
    const y = e.currentTarget.scrollTop;
    setSolid(y > 26);
  };

  const down = (e) => {
    if (!onRefresh || busy) return;
    if (scRef.current && scRef.current.scrollTop <= 0) drag.current = { y: e.clientY, on: false };
  };
  const move = (e) => {
    if (!drag.current) return;
    const dy = e.clientY - drag.current.y;
    if (dy > 0 && scRef.current.scrollTop <= 0) {
      drag.current.on = true;
      setPull(Math.min(84, dy * 0.5));
    } else if (drag.current.on) {
      setPull(0);
    }
  };
  const up = () => {
    if (!drag.current) return;
    const far = pull > 52;
    drag.current = null;
    if (far) {
      setBusy(true); setPull(50);
      window.setTimeout(() => { setBusy(false); setPull(0); onRefresh && onRefresh(); }, 1100);
    } else setPull(0);
  };

  return (
    <>
      <div className={`nav${solid ? ' solid' : ''}`} ref={navRef}>
        <div className="nav-row">
          <div className="nav-side">
            {onBack ?
              <button className="nav-back" onClick={onBack}><i className="ph ph-caret-left" /><span>{backLabel || 'Back'}</span></button> :
              leading}
          </div>
          <div className="nav-mid">{title}</div>
          <div className="nav-side end">{trailing}</div>
        </div>
      </div>

      <div className="scroll" ref={scRef} onScroll={onScroll}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={up}>
        <div className={`ptr${busy ? ' spin' : ''}`} style={{ top: padTop - 34, height: 34, opacity: Math.min(1, pull / 34) }}>
          <i className={busy ? 'ph ph-circle-notch' : 'ph ph-arrow-down'} style={{ transform: busy ? null : `rotate(${Math.min(180, pull * 3.4)}deg)`, transition: 'transform .12s linear' }} />
        </div>
        <div className="scroll-inner" data-screen-label={label}
          style={{ paddingTop: padTop + pull, transition: drag.current ? 'none' : 'padding-top .3s var(--ease)' }}>
          <div className="lt">
            <h1>{title}</h1>
            {subtitle && <div className="lt-sub">{subtitle}</div>}
          </div>
          {pinned && <div className="sticky-bar">{pinned}</div>}
          {children}
        </div>
      </div>
    </>);
}

function TabBar({ tabs, active, onPick }) {
  return (
    <div className="tabbar">
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <button key={t.id} className={`tab${on ? ' on' : ''}`} onClick={() => onPick(t.id)}>
            <i className={`${on ? 'ph-fill' : 'ph'} ph-${t.icon}`} />
            <span>{t.label}</span>
            {t.badge && <span className="badge">{t.badge}</span>}
          </button>);
      })}
    </div>);
}

// Bottom sheet with grabber + drag-to-dismiss.
function Sheet({ open, onClose, title, action, children }) {
  const [mounted, setMounted] = React.useState(open);
  const [closing, setClosing] = React.useState(false);
  const [dy, setDy] = React.useState(0);
  const drag = React.useRef(null);

  React.useEffect(() => {
    if (open) { setMounted(true); setClosing(false); setDy(0); return; }
    if (!mounted) return;
    setClosing(true);
    const t = window.setTimeout(() => { setMounted(false); setClosing(false); }, 260);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!mounted) return null;
  const down = (e) => { drag.current = e.clientY; e.currentTarget.setPointerCapture(e.pointerId); };
  const move = (e) => { if (drag.current != null) setDy(Math.max(0, e.clientY - drag.current)); };
  const up = () => { if (drag.current == null) return; drag.current = null; if (dy > 90) onClose(); else setDy(0); };

  const host = document.querySelector('.phone');
  const node = (
    <>
      <div className={`scrim${closing ? ' out' : ''}`} onClick={onClose} />
      <div className={`sheet${closing ? ' out' : ''}`}
        style={dy ? { transform: `translateY(${dy}px)`, transition: 'none' } : null}>
        <div onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} style={{ flexShrink: 0, touchAction: 'none' }}>
          <div className="grabber" />
          <div className="sheet-head">
            <h3>{title}</h3>
            {action || <button className="done" onClick={onClose}>Done</button>}
          </div>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </>);
  return host ? ReactDOM.createPortal(node, host) : node;
}

// iOS action sheet — the mobile stand-in for a desktop dropdown.
function ActionSheet({ open, onClose, title, message, options, value, onPick }) {
  const [mounted, setMounted] = React.useState(open);
  const [closing, setClosing] = React.useState(false);
  React.useEffect(() => {
    if (open) { setMounted(true); setClosing(false); return; }
    if (!mounted) return;
    setClosing(true);
    const t = window.setTimeout(() => { setMounted(false); setClosing(false); }, 260);
    return () => window.clearTimeout(t);
  }, [open]);
  if (!mounted) return null;
  return (
    <>
      <div className={`scrim${closing ? ' out' : ''}`} onClick={onClose} />
      <div className={`asheet${closing ? ' out' : ''}`}>
        <div className="agroup">
          {(title || message) &&
            <div className="ahead">
              {title && <div className="t">{title}</div>}
              {message && <div className="m">{message}</div>}
            </div>}
          {options.map((o) =>
            <button key={o.id} className={`aopt${o.id === value ? ' on' : ''}`} onClick={() => { onPick(o.id); onClose(); }}>
              <span>{o.label}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {o.hint && <span className="k">{o.hint}</span>}
                {o.id === value && <i className="ph-bold ph-check" style={{ fontSize: 15 }} />}
              </span>
            </button>)}
        </div>
        <button className="acancel" onClick={onClose}>Cancel</button>
      </div>
    </>);
}

function Toast({ msg, onDone }) {
  const [out, setOut] = React.useState(false);
  React.useEffect(() => {
    setOut(false);
    const a = window.setTimeout(() => setOut(true), 2100);
    const b = window.setTimeout(onDone, 2400);
    return () => { window.clearTimeout(a); window.clearTimeout(b); };
  }, [msg]);
  return <div className={`toast${out ? ' out' : ''}`}>{msg}</div>;
}

Object.assign(window, { StatusBar, Segmented, Screen, TabBar, Sheet, ActionSheet, Toast });
