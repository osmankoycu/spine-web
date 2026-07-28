// Health & Benefits — the six Spine agents, partner utilization and
// aggregated population risk.

const AGENT_ICON = { plan: 'ph-list-checks', compass: 'ph-compass', pill: 'ph-pill', shield: 'ph-shield-check', search: 'ph-magnifying-glass', users: 'ph-users-three' };
const AGENT_LAST_M = {
  'Plan Picker': ['4 new hires elected HDHP+HSA', '2h ago'],
  'Care Navigation': ['12 ER queries sent to urgent care', 'yesterday'],
  'Meds Finder': ['7 switches to generics · $1,840/mo', 'yesterday'],
  'Fight Back': ['$4,210 denial reversed for M.R.', '3h ago'],
  'Coverage Check': ['196 eligibility questions answered', 'today'],
  'Family Health Hub': ['Maternity pathway opened for 2', '2d ago']
};
const TONE_LABEL = { good: 'ok', warn: 'warn', danger: 'action' };

function HealthScreen({ onAsk, onToast }) {
  const [view, setView] = React.useState('agents');
  const [agent, setAgent] = React.useState(null);
  const a = agent ? AGENTS.find((x) => x.name === agent) : null;

  return (
    <Screen label="health" title="Health & Benefits" subtitle={<><b>6</b> agents live · <b>4,392</b> interactions this quarter</>}
      leading={<span style={{ width: 8 }} />}
      trailing={<button className="nav-btn" onClick={onAsk} aria-label="Ask Spine"><i className="ph ph-chat-teardrop-dots" /></button>}
      pinned={<Segmented options={[{ id: 'agents', label: 'Agents' }, { id: 'partners', label: 'Benefits' }, { id: 'risk', label: 'Risk' }]} value={view} onChange={setView} />}>

      {view === 'agents' &&
        <div className="stack">
          <div className="kpis">
            <div className="kpi"><span className="v">4,392</span><span className="k">Interactions this quarter</span><span className="n good"><i className="ph-bold ph-arrow-up" />18% vs Q2</span></div>
            <div className="kpi"><span className="v">1,247</span><span className="k">Tickets deflected</span><span className="n">76% of inbound</span></div>
          </div>
          {AGENTS.map((ag) => {
            const last = AGENT_LAST_M[ag.name] || ['', ''];
            return (
              <button key={ag.name} className="card tap agent-row" onClick={() => setAgent(ag.name)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <span className="ico" style={{ background: 'var(--info-bg)', color: 'var(--cobalt-400)', width: 34, height: 34, borderRadius: 9, display: 'grid', placeItems: 'center', fontSize: 18 }}>
                    <i className={`ph ${AGENT_ICON[ag.icon] || 'ph-sparkle'}`} />
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span className="nm" style={{ display: 'block' }}>{ag.name}</span>
                    <span className="mt" style={{ display: 'block' }}>{ag.uses.toLocaleString('en-US')} uses · {ag.deflected} deflected</span>
                  </span>
                  <span className="pill good"><i className="ph-bold ph-arrow-up" style={{ fontSize: 10 }} />{`${ag.delta}%`}</span>
                </div>
                <div className="last"><b style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{last[1]}</b> · {last[0]}</div>
              </button>);
          })}
        </div>}

      {view === 'partners' &&
        <div className="stack">
          <div className="card">
            <div className="card-t">Partner benefit utilization</div>
            <div className="card-s">Enrolled of eligible, by stipend partner</div>
          </div>
          <div className="list">
            {PARTNER_BENEFITS.map((p) =>
              <div key={p.name} className="row">
                <span className="ico" style={{ background: 'var(--gray-100)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: 14 }}>{p.name[0]}</span>
                <span className="body">
                  <span className="rt">{p.name} {p.hot && <span className="pill warn" style={{ marginLeft: 4 }}>Hot</span>}</span>
                  <span className="rs">{p.category} · {Math.round(p.enrolled / p.eligible * 100)}% of eligible</span>
                  <span className="util" style={{ marginTop: 7, display: 'block' }}>
                    <span className="track" style={{ display: 'block' }}><span style={{ width: (p.enrolled / p.eligible * 100) + '%', background: 'var(--aqua-400)' }} /></span>
                  </span>
                </span>
                <span className="val">{p.enrolled}/{p.eligible}</span>
              </div>)}
          </div>
          <button className="btn-ghost" onClick={() => onToast('Partner catalog arrives with the full build')}>Browse the partner catalog</button>
        </div>}

      {view === 'risk' &&
        <div className="stack">
          <div className="hipaa">
            <i className="ph ph-shield-check" />
            <span>Aggregated and anonymized. Individual employee health data is never shared with HR. HIPAA · SOC 2.</span>
          </div>
          <div className="card">
            <div className="card-t">Population risk indicators</div>
            <div className="card-s" style={{ marginBottom: 12 }}>Share of members, against the 152-life norm</div>
            {RISK_INDICATORS.map((r) =>
              <div key={r.name} className="kv">
                <span className="k" style={{ color: 'var(--text)' }}>{r.name}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span className="v">{r.value}%</span>
                  <span className={`pill ${TONE_LABEL[r.tone]}`}>{r.label}</span>
                </span>
              </div>)}
          </div>
          <div className="card">
            <div className="card-t">Average utilization</div>
            <div className="card-s" style={{ marginBottom: 12 }}>Per member · year to date</div>
            {UTILIZATION.map((u) =>
              <div key={u.name} className="kv">
                <span className="k" style={{ color: 'var(--text)' }}>{u.name}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span className="v">{u.val}</span>
                  <span className={`pill ${TONE_LABEL[u.tone]}`}>{u.label}</span>
                </span>
              </div>)}
          </div>
          <div className="foot">Mental-health indicators are elevated — Spine added two in-network therapy pathways in June.</div>
        </div>}

      <Sheet open={!!a} onClose={() => setAgent(null)} title={a ? a.name : ''}>
        {a &&
          <>
            <div className="kpis" style={{ marginBottom: 12 }}>
              <div className="kpi"><span className="v">{a.uses.toLocaleString('en-US')}</span><span className="k">Uses this quarter</span><span className="n good"><i className="ph-bold ph-arrow-up" />{`${a.delta}%`}</span></div>
              <div className="kpi"><span className="v">{a.deflected}</span><span className="k">HR tickets deflected</span><span className="n">{`est. ${Math.round(a.deflected * 0.25)}h saved`}</span></div>
            </div>
            <div className="sec-title">Latest</div>
            <div className="list">
              <div className="row"><span className="body"><span className="rt">{(AGENT_LAST_M[a.name] || [''])[0]}</span><span className="rs">{(AGENT_LAST_M[a.name] || ['', ''])[1]}</span></span></div>
              <div className="row"><span className="body"><span className="rt">Employees reached</span><span className="rs">{Math.min(152, Math.round(a.uses / 9))} of 152 this quarter</span></span></div>
            </div>
            <button className="btn-primary" style={{ marginTop: 14 }} onClick={() => { setAgent(null); onAsk(); }}>
              <i className="ph-fill ph-chat-teardrop-dots" />{`Ask about ${a.name}`}
            </button>
          </>}
      </Sheet>
    </Screen>);
}

Object.assign(window, { HealthScreen });
