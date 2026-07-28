// People — team composition and geography. Segmented sub-views; the state
// list is the touch surface, the cartogram is the overview.

const STATE_NAMES = { CA: 'California', NY: 'New York', WA: 'Washington', TX: 'Texas', CO: 'Colorado', MA: 'Massachusetts', OR: 'Oregon', IL: 'Illinois', GA: 'Georgia', NC: 'North Carolina', FL: 'Florida', UT: 'Utah', PA: 'Pennsylvania', AZ: 'Arizona' };

function TileMap({ onPick }) {
  const max = Math.max(...Object.values(STATE_DIST));
  const TILE = 44, GAP = 5, COLS = 12, ROWS = 8;
  const W = COLS * TILE + (COLS - 1) * GAP, H = ROWS * TILE + (ROWS - 1) * GAP;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {US_TILES.map(([code, c, r]) => {
        const v = STATE_DIST[code] || 0;
        const t = v / max;
        return (
          <g key={code} onClick={() => v && onPick(code)} style={{ cursor: v ? 'pointer' : 'default' }}>
            <rect x={c * (TILE + GAP)} y={r * (TILE + GAP)} width={TILE} height={TILE} rx="7"
              fill={v ? `rgba(30,84,184,${(0.18 + t * 0.72).toFixed(2)})` : 'var(--gray-100)'}
              stroke="var(--border)" strokeWidth=".5" />
            <text x={c * (TILE + GAP) + TILE / 2} y={r * (TILE + GAP) + TILE / 2 + 5} textAnchor="middle"
              fontSize="15" fontWeight="600" fontFamily="var(--font-mono)"
              fill={!v ? 'var(--text-disabled)' : t > 0.45 ? '#fff' : 'var(--cobalt-600)'}>{code}</text>
          </g>);
      })}
    </svg>);
}

function PeopleScreen({ onAsk }) {
  const [view, setView] = React.useState('team');
  const [state, setState] = React.useState(null);
  const sorted = Object.entries(STATE_DIST).sort((a, b) => b[1] - a[1]);
  const max = sorted[0][1];
  const comp = state ? STATE_COMPLIANCE.find((s) => s.code === state) : null;

  return (
    <Screen label="people" title="People" subtitle={<><b>152</b> employees · <b>89</b> dependents · <b>14</b> states</>}
      leading={<span style={{ width: 8 }} />}
      trailing={<button className="nav-btn" onClick={onAsk} aria-label="Ask Spine"><i className="ph ph-magnifying-glass" /></button>}
      pinned={<Segmented options={[{ id: 'team', label: 'Team' }, { id: 'states', label: 'States' }]} value={view} onChange={setView} />}>

      {view === 'team' &&
        <div className="stack">
          <div className="kpis">
            <div className="kpi"><span className="v">152</span><span className="k">Employees</span><span className="n good"><i className="ph-bold ph-arrow-up" />34 hires YTD</span></div>
            <div className="kpi"><span className="v">89</span><span className="k">Dependents</span><span className="n">1.58 per family</span></div>
            <div className="kpi"><span className="v">31.4</span><span className="k">Average age</span><span className="n">favorable age factor</span></div>
            <div className="kpi"><span className="v">93%</span><span className="k">Retention</span><span className="n good"><i className="ph-bold ph-arrow-up" />4 pts vs median</span></div>
          </div>

          <div className="card">
            <div className="card-t">Age distribution</div>
            <div className="card-s" style={{ marginBottom: 12 }}>71 of 152 sit in the 26–35 band</div>
            <ColumnChart data={AGE_DIST} />
          </div>

          <div className="card">
            <div className="card-t">Plan type mix</div>
            <div className="card-s" style={{ marginBottom: 14 }}>Five plans · share of enrolled employees</div>
            <SplitBar data={PLAN_DIST} />
          </div>

          <div className="card">
            <div className="card-t">Coverage tiers</div>
            <div className="card-s" style={{ marginBottom: 14 }}>Who each employee covers</div>
            <SplitBar data={DEPENDENT_MIX} />
          </div>

          <div className="foot">Roster synced nightly from Rippling</div>
        </div>}

      {view === 'states' &&
        <div className="stack">
          <div className="card">
            <div className="card-t">Where the team works</div>
            <div className="card-s" style={{ marginBottom: 12 }}>Tap a state for its detail. CA + NY carry 45% of headcount.</div>
            <TileMap onPick={setState} />
            <div className="map-scale">
              <span>0</span>
              {[0.2, 0.4, 0.6, 0.8, 1].map((t) => <span key={t} className="sw" style={{ background: `rgba(30,84,184,${(0.18 + t * 0.72).toFixed(2)})` }} />)}
              <span>{max}+</span>
            </div>
          </div>

          <div>
            <div className="sec-title">14 states · 3 international</div>
            <div className="list">
              {sorted.map(([code, n]) =>
                <button key={code} className="state-row" onClick={() => setState(code)}>
                  <span className="code">{code}</span>
                  <span className="nm">{STATE_NAMES[code] || code}</span>
                  <span className="bar"><span style={{ width: (n / max * 100) + '%' }} /></span>
                  <span className="v">{n}</span>
                </button>)}
              <div className="state-row" style={{ opacity: .7 }}>
                <span className="code">—</span>
                <span className="nm">International</span>
                <span className="bar" />
                <span className="v">3</span>
              </div>
            </div>
          </div>
        </div>}

      <Sheet open={!!state} onClose={() => setState(null)} title={state ? (STATE_NAMES[state] || state) : ''}>
        {state &&
          <>
            <div className="card" style={{ marginBottom: 12 }}>
              <div className="bigstat">{STATE_DIST[state]}<span style={{ fontSize: 13, fontFamily: 'var(--font-sans)', fontWeight: 500, color: 'var(--text-muted)', marginLeft: 8 }}>employees</span></div>
              <div className="card-s" style={{ marginTop: 6 }}>{Math.round(STATE_DIST[state] / 152 * 100)}% of headcount{comp ? ` · ${comp.neu} hired this year` : ''}</div>
            </div>
            {comp ?
              <>
                <div className="sec-title">Employment obligations</div>
                <div className="list">
                  {COMPLIANCE_REQS.map((q) =>
                    <div key={q.key} className="row">
                      <span className="body"><span className="rt">{q.label}</span><span className="rs">{q.full}</span></span>
                      <span className={`pill ${comp[q.key]}`}>{comp[q.key] === 'ok' ? 'Filed' : comp[q.key] === 'action' ? 'Action' : comp[q.key] === 'pending' ? 'Filing' : 'N/A'}</span>
                    </div>)}
                </div>
              </> :
              <div className="hipaa"><i className="ph ph-info" /><span>No state-specific employment obligations tracked here yet — Spine opens a checklist the moment you hire in a new state.</span></div>}
          </>}
      </Sheet>
    </Screen>);
}

Object.assign(window, { PeopleScreen, STATE_NAMES });
