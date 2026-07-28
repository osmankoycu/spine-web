// Compliance — a top-level tab. The desktop matrix (8 states × 5 duties)
// becomes one card per state; each task drills into its own screen.

const STAGE_ORDER = ['you', 'expert', 'progress', 'detected', 'done'];
const STAGE_TONE = { detected: 'idle', progress: 'info', you: 'warn', expert: 'bad', done: 'good' };
const STAGE_LABEL = { detected: 'Detected', progress: 'In progress', you: 'Waiting on you', expert: 'Expert review', done: 'Closed' };
const REQ_LABEL = { ok: 'Filed', action: 'Action', pending: 'Filing', na: 'N/A' };
const REQ_DOT = { ok: 'var(--success)', action: 'var(--error)', pending: 'var(--cobalt-400)', na: 'var(--gray-400)' };
const RISK_PILL = { high: 'action', medium: 'warn', low: 'na' };

function TaskRow({ t, i, onPush }) {
  return (
    <button className="row tap" onClick={() => onPush('task:' + i)}>
      <span className="ico" style={{ background: 'var(--gray-100)', color: REQ_DOT[t.stage === 'done' ? 'ok' : t.risk === 'high' ? 'action' : 'pending'] }}>
        <i className={`ph ${t.stage === 'done' ? 'ph-check-circle' : t.stage === 'you' ? 'ph-hand-pointing' : 'ph-clock-countdown'}`} />
      </span>
      <span className="body">
        <span className="rt">{t.title}</span>
        <span className="rs">{t.owner} · due {t.due}</span>
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
        <span className={`pill ${RISK_PILL[t.risk]}`}>{t.days < 0 ? 'closed' : t.days + 'd'}</span>
      </span>
      <i className="ph-bold ph-caret-right chev" style={{ fontSize: 13 }} />
    </button>);
}

function ComplianceScreen({ onPush, onToast, onAsk }) {
  const [view, setView] = React.useState('tasks');
  const counts = STAGE_ORDER.reduce((m, s) => (m[s] = COMP_TASKS.filter((t) => t.stage === s).length, m), {});
  return (
    <Screen label="compliance" title="Compliance" subtitle={<><b>{counts.you + counts.expert}</b> need attention · <b>8</b> states with obligations</>}
      leading={<span style={{ width: 8 }} />}
      trailing={<button className="nav-btn" onClick={onAsk} aria-label="Ask Spine"><i className="ph ph-chat-teardrop-dots" /></button>}
      pinned={<Segmented options={[{ id: 'tasks', label: 'Tasks' }, { id: 'states', label: 'States' }, { id: 'notices', label: 'Notices' }]} value={view} onChange={setView} />}>

      {view === 'tasks' &&
        <div className="stack">
          <div className="kpis">
            <div className="kpi"><span className="v" style={{ color: 'var(--warning-strong)' }}>{counts.you}</span><span className="k">Waiting on you</span><span className="n">soonest due Aug 8</span></div>
            <div className="kpi"><span className="v" style={{ color: 'var(--error)' }}>{counts.expert}</span><span className="k">With a Spine specialist</span><span className="n">NY and PA withholding</span></div>
            <div className="kpi"><span className="v">{counts.progress}</span><span className="k">Spine is filing</span><span className="n">no action from you</span></div>
            <div className="kpi"><span className="v">{counts.done}</span><span className="k">Closed this month</span><span className="n good"><i className="ph-bold ph-check" />on time</span></div>
          </div>
          {STAGE_ORDER.map((s) => {
            const rows = COMP_TASKS.map((t, i) => [t, i]).filter(([t]) => t.stage === s);
            if (!rows.length) return null;
            return (
              <div key={s}>
                <div className="sec-title" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span className={`pill ${STAGE_TONE[s]}`}>{STAGE_LABEL[s]}</span>
                  <span>{rows.length}</span>
                </div>
                <div className="list">{rows.map(([t, i]) => <TaskRow key={i} t={t} i={i} onPush={onPush} />)}</div>
              </div>);
          })}
        </div>}

      {view === 'states' &&
        <div className="stack">
          <div className="card">
            <div className="card-t">Obligations by state</div>
            <div className="card-s">Five duties open the moment you employ someone in a state. Tap a state for the detail.</div>
            <div className="chips" style={{ marginTop: 12 }}>
              {[['ok', 'Filed'], ['pending', 'Spine filing'], ['action', 'Needs you'], ['na', 'Not required']].map(([k, l]) =>
                <span key={k} className="chip"><span className="d" style={{ background: REQ_DOT[k] }} />{l}</span>)}
            </div>
          </div>
          {STATE_COMPLIANCE.map((s) => {
            const open = COMPLIANCE_REQS.filter((q) => s[q.key] === 'action').length;
            return (
              <button key={s.code} className="card tap" onClick={() => onPush('cstate:' + s.code)}>
                <div className="card-head">
                  <div>
                    <div className="card-t">{s.name}</div>
                    <div className="card-s">{s.count} employees · {s.neu} hired this year</div>
                  </div>
                  {open ? <span className="pill action">{`${open} to fix`}</span> : <span className="pill ok">All clear</span>}
                </div>
                <div className="chips" style={{ marginTop: 12 }}>
                  {COMPLIANCE_REQS.map((q) =>
                    <span key={q.key} className="chip"><span className="d" style={{ background: REQ_DOT[s[q.key]] }} />{q.label}</span>)}
                </div>
              </button>);
          })}
        </div>}

      {view === 'notices' &&
        <div className="stack">
          <div className="card">
            <div className="card-t">Notice intake</div>
            <div className="card-s">Government, carrier and vendor mail — classified and routed the day it lands.</div>
          </div>
          <div className="list">
            {COMP_NOTICES.map((n, i) =>
              <button key={i} className="row tap" onClick={() => onToast('Notice viewer arrives with the full build')}>
                <span className="ico" style={{ background: n.kind === 'gov' ? 'var(--warning-bg)' : 'var(--gray-100)', color: n.kind === 'gov' ? 'var(--warning)' : 'var(--text-secondary)' }}>
                  <i className={`ph ${n.kind === 'gov' ? 'ph-bank' : 'ph-envelope-simple'}`} />
                </span>
                <span className="body">
                  <span className="rt">{n.src}</span>
                  <span className="rs">{n.subject}</span>
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
                  <span className="when">{n.date}</span>
                  <span className={`pill ${RISK_PILL[n.risk]}`}>{n.risk}</span>
                </span>
              </button>)}
          </div>
          <div className="foot">Spine reads every notice and opens the matching task automatically.</div>
        </div>}
    </Screen>);
}

function TaskDetail({ index, onBack, onToast }) {
  const t = COMP_TASKS[index];
  if (!t) return null;
  const done = t.evidence.filter((e) => e.got).length;
  return (
    <Screen label="task-detail" title={t.title} subtitle={`${t.owner} · due ${t.due}`} onBack={onBack} backLabel="Compliance">
      <div className="stack">
        <div className="card">
          <div className="card-head">
            <span className={`pill ${STAGE_TONE[t.stage]}`}>{STAGE_LABEL[t.stage]}</span>
            <span className={`pill ${RISK_PILL[t.risk]}`}>{`${t.risk} risk`}</span>
          </div>
          <div className="bigstat" style={{ marginTop: 14 }}>{t.days < 0 ? 'Closed' : t.days + ' days'}</div>
          <div className="card-s" style={{ marginTop: 6 }}>{t.days < 0 ? `Filed ${Math.abs(t.days)} days ago` : `until the ${t.due} deadline`}</div>
        </div>

        <div className="card">
          <div className="card-t">Detail</div>
          <div style={{ marginTop: 8 }}>
            <div className="kv"><span className="k">Owner</span><span className="v" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 13.5 }}>{t.owner}</span></div>
            <div className="kv"><span className="k">Module</span><span className="v" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 13.5 }}>{t.mods.map((m) => MOD_LABEL[m]).join(' · ')}</span></div>
            {t.from && <div className="kv"><span className="k">Triggered by</span><span className="v" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 13.5 }}>{t.from}</span></div>}
          </div>
        </div>

        <div className="card">
          <div className="card-head" style={{ marginBottom: 6 }}>
            <div className="card-t">Evidence</div>
            <span className="pill na">{`${done}/${t.evidence.length}`}</span>
          </div>
          {t.evidence.map((e, i) =>
            <div key={i} className="evi">
              <i className={e.got ? 'ph-fill ph-check-circle' : 'ph ph-circle-dashed'} style={{ color: e.got ? 'var(--success)' : 'var(--text-disabled)' }} />
              <span style={{ flex: 1, color: e.got ? 'var(--text)' : 'var(--text-muted)' }}>{e.n}</span>
              {!e.got && <span className="pill pending">pending</span>}
            </div>)}
        </div>

        {t.stage === 'you' &&
          <button className="btn-primary" onClick={() => onToast('Upload flow arrives with the full build')}>
            <i className="ph ph-upload-simple" />Upload what is missing
          </button>}
      </div>
    </Screen>);
}

function StateCompDetail({ code, onBack }) {
  const s = STATE_COMPLIANCE.find((x) => x.code === code);
  if (!s) return null;
  return (
    <Screen label="state-detail" title={s.name} subtitle={`${s.count} employees · ${s.neu} hired this year`} onBack={onBack} backLabel="Compliance">
      <div className="stack">
        <div className="list">
          {COMPLIANCE_REQS.map((q) =>
            <div key={q.key} className="row">
              <span className="ico" style={{ background: 'var(--gray-100)', color: REQ_DOT[s[q.key]] }}><i className="ph ph-file-text" /></span>
              <span className="body"><span className="rt">{q.label}</span><span className="rs">{q.full}</span></span>
              <span className={`pill ${s[q.key]}`}>{REQ_LABEL[s[q.key]]}</span>
            </div>)}
        </div>
        <div className="card">
          <div className="card-t">Documents on file</div>
          <div style={{ marginTop: 8 }}>
            {COMPLIANCE_REQS.filter((q) => s[q.key] === 'ok').map((q) =>
              <div key={q.key} className="evi">
                <i className="ph-fill ph-check-circle" style={{ color: 'var(--success)' }} />
                <span style={{ flex: 1 }}>{q.doc}</span>
              </div>)}
          </div>
        </div>
        <div className="foot">Spine files on your behalf wherever the state allows it.</div>
      </div>
    </Screen>);
}

Object.assign(window, { ComplianceScreen, TaskDetail, StateCompDetail });
