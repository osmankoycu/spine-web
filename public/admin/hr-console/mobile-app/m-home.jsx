// Home (Overview) + its two drill-downs. Employer surface: Cobalt-led,
// numbers up front, marigold only for the enrollment alert.
const { Avatar: MAvatar, Badge: MBadge } = window.HealDesignSystem_c10ba9;

const M_RANGES = {
  '30D': { label: 'Last 30 days', dates: 'Jun 26 – Jul 26, 2026' },
  'QTD': { label: 'Quarter to date', dates: 'Jul 1 – Jul 26, 2026' },
  'YTD': { label: 'Year to date', dates: 'Jan 1 – Jul 26, 2026' },
  '12M': { label: 'Trailing 12 months', dates: 'Aug 2025 – Jul 2026' }
};

const M_RAMP = ['var(--cobalt-400)', 'var(--cobalt-300)', 'var(--aqua-400)', 'var(--aqua-300)', 'var(--gray-500)'];

const M_SOURCES = [
  { name: 'Plan optimization', val: 218, note: 'Level-funded plan priced against your own claims history, not an industry table.' },
  { name: 'In-network steerage', val: 98, note: 'Care Navigation routed 412 provider searches to in-network options.' },
  { name: 'Rx generic substitution', val: 76, note: '14 members switched to generics — $1,840/mo of it in the last week.' },
  { name: 'Fight Back appeals', val: 54, note: '61 claims defended, 43 reversed. Largest single reversal: $4,210.' },
  { name: 'ER → urgent care', val: 41, note: '41% fewer emergency-room visits than the 152-life norm.' }
].map((s, i) => ({ ...s, color: M_RAMP[i] }));

const ACT_ICON = { good: ['ph-check-circle', 'var(--success)', 'var(--success-bg)'], warn: ['ph-flag', 'var(--warning)', 'var(--warning-bg)'], info: ['ph-sparkle', 'var(--cobalt-400)', 'var(--info-bg)'] };

function ActivityRow({ r, tap }) {
  const [ico, fg, bg] = ACT_ICON[r.tone] || ACT_ICON.info;
  return (
    <div className={`row${tap ? ' tap' : ''}`}>
      <span className="ico" style={{ background: bg, color: fg }}><i className={`ph ${ico}`} /></span>
      <span className="body">
        <span className="rt">{r.who}</span>
        <span className="rs">{r.what}</span>
      </span>
      <span className="when">{r.when}</span>
    </div>);
}

function HomeScreen({ range, onRange, onOpenRange, onPush, onToast, onBell, onWorkspace, onGoTab, stamp, onRefresh }) {
  const r = M_RANGES[range];
  return (
    <Screen
      label="home"
      title="Overview"
      subtitle={<>HockeyStack · <b>152</b> employees · <b>241</b> lives covered</>}
      onRefresh={onRefresh}
      leading={<button className="nav-btn" onClick={onWorkspace} aria-label="Workspace"><MAvatar name="Hockey Stack" size={30} tone="cobalt" /></button>}
      trailing={<button className="nav-btn" onClick={onBell} aria-label="Notifications"><i className="ph ph-bell" /><span className="dot" /></button>}
      pinned={<Segmented options={['30D', 'QTD', 'YTD', '12M']} value={range} onChange={onRange} />}>

      <div className="stack">
        <button className="card oe tap" onClick={() => onToast('2027 recommendation lands in the full build')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="eyebrow" style={{ color: 'var(--marigold-600)' }}>2027 Open Enrollment</span>
            <MBadge tone="new">New</MBadge>
          </div>
          <div className="t">Your tailored group plan for next year is ready to review</div>
          <div className="cta">Review recommendation <i className="ph ph-arrow-right" /></div>
        </button>

        <div className="card">
          <div className="card-head">
            <div>
              <span className="eyebrow">Total savings · {r.label}</span>
              <div className="hero-val">$487K</div>
            </div>
            <span className="delta good"><i className="ph-bold ph-arrow-down" style={{ fontSize: 11 }} />21.4%</span>
          </div>
          <div className="card-s" style={{ marginTop: 8, marginBottom: 12 }}>
            Against the traditional-broker baseline. {r.dates}.
          </div>
          <TrendChart data={SAVINGS_TREND} />
        </div>

        <div className="kpis">
          <div className="kpi">
            <span className="v">1,247</span>
            <span className="k">HR tickets deflected</span>
            <span className="n good"><i className="ph-bold ph-arrow-up" />76% of inbound</span>
          </div>
          <div className="kpi">
            <span className="v">$12.0K</span>
            <span className="k">Cost per employee</span>
            <span className="n good"><i className="ph-bold ph-arrow-down" />$2.4K vs market</span>
          </div>
          <div className="kpi">
            <span className="v">84<span style={{ fontSize: 13, color: 'var(--text-disabled)', fontWeight: 500 }}>/100</span></span>
            <span className="k">Employee NPS · 118 responses</span>
            <span className="n good"><i className="ph-bold ph-arrow-up" />22 since launch</span>
          </div>
          <div className="kpi">
            <span className="v">4,392</span>
            <span className="k">Agent interactions this quarter</span>
            <span className="n">6 agents live</span>
          </div>
        </div>

        <div className="card">
          <div className="card-head" style={{ marginBottom: 14 }}>
            <div>
              <div className="card-t">Where the savings come from</div>
              <div className="card-s">$487K across five sources</div>
            </div>
          </div>
          <SourceBars items={M_SOURCES.slice(0, 3)} max={218} />
          <button className="row more tap" style={{ margin: '10px -16px -16px', borderTop: '.5px solid var(--line)', padding: '0 16px' }}
            onClick={() => onPush('savings')}>
            All five sources <i className="ph-bold ph-caret-right chev" style={{ color: 'var(--cobalt-400)', fontSize: 13 }} />
          </button>
        </div>

        <div>
          <div className="group-label">Needs you</div>
          <div className="list">
            {COMP_TASKS.filter((t) => t.stage === 'you').map((t, i) =>
              <button key={i} className="row tap" onClick={() => onGoTab('compliance')}>
                <span className="ico" style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}><i className="ph ph-hand-pointing" /></span>
                <span className="body"><span className="rt">{t.title}</span><span className="rs">Due {t.due} · {t.days} days · {t.owner}</span></span>
                <i className="ph-bold ph-caret-right chev" style={{ fontSize: 13 }} />
              </button>)}
          </div>
        </div>

        <div>
          <div className="group-label">Recent activity</div>
          <div className="list">
            {RECENT_ACTIVITY.slice(0, 4).map((a, i) => <ActivityRow key={i} r={a} />)}
            <button className="row more tap" onClick={() => onPush('activity')}>
              See all activity <i className="ph-bold ph-caret-right" style={{ fontSize: 13 }} />
            </button>
          </div>
        </div>

        <div className="ed">
          <p>The $487K is not a forecast. It is money that stayed in your account — 61 defended claims, 14 drug switches, and a plan priced against <em>your</em> claims history.</p>
          <span className="by">Spine ops · weekly note to Alex</span>
        </div>

        <div className="foot"><span className="live" />{`${stamp} · pull to refresh`}</div>
      </div>
    </Screen>);
}

function SavingsDetail({ onBack }) {
  return (
    <Screen label="savings-detail" title="Savings" subtitle="Year to date · five sources"
      onBack={onBack} backLabel="Overview"
      trailing={<button className="nav-btn" aria-label="Share"><i className="ph ph-export" /></button>}>
      <div className="stack">
        <div className="card">
          <span className="eyebrow">Verified savings</span>
          <div className="hero-val">$487K</div>
          <div className="card-s" style={{ marginTop: 8, marginBottom: 12 }}>Monthly claims-fund run-rate against the projected no-Spine baseline.</div>
          <TrendChart data={SAVINGS_TREND} height={160} />
        </div>
        <div className="card">
          <div className="card-t" style={{ marginBottom: 14 }}>Every source</div>
          <SourceBars items={M_SOURCES} max={218} />
        </div>
        <div>
          <div className="group-label">Method</div>
          <div className="list">
            <div className="row"><span className="body"><span className="rt">Baseline</span><span className="rs">2026 renewal quote from your prior broker, trended at 9.7%</span></span></div>
            <div className="row"><span className="body"><span className="rt">Verification</span><span className="rs">Carrier claims file, reconciled monthly</span></span></div>
            <div className="row"><span className="body"><span className="rt">Next recalculation</span><span className="rs">Tonight, 02:00 PT</span></span><span className="val">Aug 1</span></div>
          </div>
        </div>
      </div>
    </Screen>);
}

function ActivityDetail({ onBack }) {
  const groups = [
    ['Today', RECENT_ACTIVITY.filter((a) => a.when.indexOf('h ago') > -1)],
    ['Yesterday', RECENT_ACTIVITY.filter((a) => a.when === 'yesterday')],
    ['Earlier this week', RECENT_ACTIVITY.filter((a) => a.when.indexOf('d ago') > -1)]
  ];
  return (
    <Screen label="activity-detail" title="Activity" subtitle="Last 7 days · 6 agents"
      onBack={onBack} backLabel="Overview">
      <div className="stack">
        {groups.map(([g, rows]) => rows.length > 0 &&
          <div key={g}>
            <div className="group-label">{g}</div>
            <div className="list">{rows.map((a, i) => <ActivityRow key={i} r={a} />)}</div>
          </div>)}
        <div className="foot">Individual health data is never shown to HR.</div>
      </div>
    </Screen>);
}

Object.assign(window, { HomeScreen, SavingsDetail, ActivityDetail, M_RANGES });
