// Touch-first charts for the mobile console. No hover: charts are scrubbed
// with a finger and read out in text above the plot.

function TrendChart({ data, height = 148, onIndex }) {
  const [idx, setIdx] = React.useState(data.length - 1);
  const wrap = React.useRef(null);
  const drag = React.useRef(null);
  const W = 320, H = height, PAD = 8;
  const vals = data.flatMap((d) => [d.actual, d.projected]);
  const min = Math.min(...vals) * 0.94, max = Math.max(...vals) * 1.02;
  const x = (i) => PAD + (i / (data.length - 1)) * (W - PAD * 2);
  const y = (v) => H - 18 - ((v - min) / (max - min)) * (H - 34);
  const path = (k) => data.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(d[k]).toFixed(1)}`).join(' ');
  const area = `${path('actual')} L${x(data.length - 1)} ${H - 18} L${x(0)} ${H - 18} Z`;

  const pick = (clientX) => {
    const r = wrap.current.getBoundingClientRect();
    const t = (clientX - r.left) / r.width;
    const i = Math.max(0, Math.min(data.length - 1, Math.round(t * (data.length - 1))));
    setIdx(i); onIndex && onIndex(i);
  };
  const down = (e) => { drag.current = { x: e.clientX, y: e.clientY, live: false }; pick(e.clientX); };
  const move = (e) => {
    const d = drag.current; if (!d) return;
    if (!d.live) {
      if (Math.abs(e.clientY - d.y) > Math.abs(e.clientX - d.x) + 4) { drag.current = null; return; }
      if (Math.abs(e.clientX - d.x) > 3) d.live = true; else return;
    }
    pick(e.clientX);
  };
  const up = () => { drag.current = null; };

  const cur = data[idx];
  const gap = cur.projected - cur.actual;

  return (
    <div>
      <div className="readout">
        <span className="m">{cur.m}</span>
        <span className="v">${cur.actual}K</span>
        <span className="p">baseline ${cur.projected}K</span>
        <span style={{ marginLeft: 'auto', color: 'var(--success)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>−${gap}K</span>
      </div>
      <div ref={wrap} style={{ touchAction: 'pan-y', marginTop: 4, cursor: 'ew-resize' }}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={up}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none" style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            <linearGradient id="tcArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E54B8" stopOpacity=".14" />
              <stop offset="100%" stopColor="#1E54B8" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#tcArea)" />
          <path d={path('projected')} fill="none" stroke="var(--gray-400)" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          <path d={path('actual')} fill="none" stroke="var(--cobalt-400)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <line x1={x(idx)} y1="2" x2={x(idx)} y2={H - 18} stroke="var(--gray-400)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <circle cx={x(idx)} cy={y(cur.projected)} r="3" fill="var(--surface)" stroke="var(--gray-500)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          <circle cx={x(idx)} cy={y(cur.actual)} r="4.5" fill="var(--cobalt-400)" stroke="var(--pure-white)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          {data.map((d, i) => i % 3 === 0 &&
            <text key={i} x={x(i)} y={H - 4} textAnchor={i === 0 ? 'start' : 'middle'}
              fill="var(--text-muted)" fontSize="9" fontFamily="var(--font-mono)">{d.m}</text>)}
        </svg>
      </div>
      <div className="legend" style={{ marginTop: 8 }}>
        <span><i style={{ height: 2, background: 'var(--cobalt-400)', borderRadius: 2 }} />With Spine</span>
        <span><i style={{ height: 0, borderTop: '1.5px dashed var(--gray-400)' }} />Projected baseline</span>
      </div>
    </div>);
}

function SourceBars({ items, max, delay = 60 }) {
  const [on, setOn] = React.useState(false);
  React.useEffect(() => { const t = window.setTimeout(() => setOn(true), delay); return () => window.clearTimeout(t); }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
      {items.map((s, i) =>
        <div key={i} className="bar">
          <span className="nm">{s.name}</span>
          <span className="amt" style={{ color: s.color }}>${s.val}K</span>
          <div className="track"><div className="fill" style={{ width: on ? (s.val / max * 100) + '%' : 0, background: s.color, transitionDelay: `${i * 60}ms` }} /></div>
          {s.note && <span style={{ gridColumn: '1/-1', fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.35 }}>{s.note}</span>}
        </div>)}
    </div>);
}

function ColumnChart({ data, height = 150, unit = '' }) {
  const [sel, setSel] = React.useState(-1);
  const max = Math.max(...data.map((d) => d.count));
  return (
    <div>
      <div className="readout" style={{ marginBottom: 8 }}>
        {sel < 0 ?
          <span>Tap a band to read it</span> :
          <><span className="m">{data[sel].bucket}</span><span className="v">{data[sel].count}{unit}</span>
            <span className="p">{Math.round(data[sel].count / data.reduce((s, d) => s + d.count, 0) * 100)}% of team</span></>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${data.length},1fr)`, gap: 8, alignItems: 'end', height }}>
        {data.map((d, i) =>
          <button key={i} onClick={() => setSel(i === sel ? -1 : i)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
            <span className="mono" style={{ fontSize: 11.5, fontWeight: 600, color: i === sel ? 'var(--cobalt-400)' : 'var(--text-muted)' }}>{d.count}</span>
            <span style={{ width: '100%', height: `${(d.count / max) * (height - 44)}px`, minHeight: 4, borderRadius: 6, background: i === sel ? 'var(--cobalt-400)' : 'var(--cobalt-200)', transition: 'background .18s linear' }} />
            <span style={{ fontSize: 10.5, color: i === sel ? 'var(--text-secondary)' : 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{d.bucket}</span>
          </button>)}
      </div>
    </div>);
}

function Donut({ pct, size = 132, label, sub }) {
  const r = size / 2 - 11, C = 2 * Math.PI * r;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--gray-200)" strokeWidth="14" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--cobalt-400)" strokeWidth="14" strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * C} ${C}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <div className="mono" style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-.04em', color: 'var(--cobalt-400)' }}>{label || pct + '%'}</div>
          {sub && <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>}
        </div>
      </div>
    </div>);
}

function SplitBar({ data, unit = '%' }) {
  return (
    <div>
      <div style={{ display: 'flex', height: 12, borderRadius: 9999, overflow: 'hidden', gap: 2 }}>
        {data.map((d, i) => <span key={i} style={{ width: d.pct + '%', background: d.color }} />)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 14 }}>
        {data.map((d, i) =>
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 13.5 }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: d.color, flexShrink: 0 }} />
            <span style={{ flex: 1, color: 'var(--text)' }}>{d.name}</span>
            <span className="mono" style={{ fontWeight: 600, fontSize: 13 }}>{d.pct}{unit}</span>
          </div>)}
      </div>
    </div>);
}

Object.assign(window, { TrendChart, SourceBars, ColumnChart, Donut, SplitBar });
