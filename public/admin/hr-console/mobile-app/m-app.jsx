// App shell: tab bar, per-tab push stacks with swipe-back, sheets, toast.
const { Avatar: AAvatar } = window.HealDesignSystem_c10ba9;

const TABS = [
  { id: 'home', icon: 'house', label: 'Home' },
  { id: 'people', icon: 'users-three', label: 'People' },
  { id: 'plan', icon: 'bank', label: 'Plan' },
  { id: 'health', icon: 'heartbeat', label: 'Health' },
  { id: 'compliance', icon: 'shield-check', label: 'Compliance', badge: String(COMP_TASKS.filter((t) => t.stage === 'you' || t.stage === 'expert').length) }
];

function PushedScreen({ onPop, children }) {
  const [entering, setEntering] = React.useState(true);
  React.useEffect(() => { const t = window.setTimeout(() => setEntering(false), 420); return () => window.clearTimeout(t); }, []);
  const [dx, setDx] = React.useState(0);
  const drag = React.useRef(null);
  const down = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    if (e.clientX - r.left < 34) drag.current = e.clientX;
  };
  const move = (e) => { if (drag.current != null) setDx(Math.max(0, e.clientX - drag.current)); };
  const up = () => { if (drag.current == null) return; drag.current = null; if (dx > 90) onPop(); else setDx(0); };
  return (
    <div className={`screen pushed${entering ? ' in' : ''}`}
      onAnimationEnd={(e) => { if (e.target === e.currentTarget) setEntering(false); }}
      style={dx ? { transform: `translateX(${dx}px)`, transition: 'none' } : { transition: 'transform .3s var(--ease)' }}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
      {children}
    </div>);
}

function AskSheet({ open, onClose, onToast }) {
  const prompts = [
    ['Why did claims drop in May?', 'ph-trend-down'],
    ['Who is not enrolled yet?', 'ph-user-circle-dashed'],
    ['Draft the renewal note for the CFO', 'ph-note-pencil']
  ];
  return (
    <Sheet open={open} onClose={onClose} title="Ask Spine">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '2px 2px 16px' }}>
        <img src="assets/spine-agent-avatar.png" alt="" style={{ width: 44, height: 44, borderRadius: 9999, objectFit: 'cover', background: 'var(--gray-100)' }} />
        <div style={{ fontSize: 13.5, lineHeight: 1.4, color: 'var(--text-secondary)' }}>Ask anything about your plan, your spend or a single claim. I read tonight's repricing too.</div>
      </div>
      <div className="list">
        {prompts.map((p, i) =>
          <button key={i} className="row tap" onClick={() => { onClose(); onToast('Spine chat arrives with the full build'); }}>
            <span className="ico" style={{ background: 'var(--info-bg)', color: 'var(--cobalt-400)' }}><i className={`ph ${p[1]}`} /></span>
            <span className="body"><span className="rt">{p[0]}</span></span>
            <i className="ph-bold ph-caret-right chev" style={{ fontSize: 13 }} />
          </button>)}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
        <div style={{ flex: 1, height: 44, borderRadius: 9999, border: '1px solid var(--border-input)', display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: 14, color: 'var(--text-disabled)' }}>Message Spine…</div>
        <button className="nav-btn" style={{ background: 'var(--cobalt-400)', color: '#fff', width: 44, height: 44 }} onClick={() => { onClose(); onToast('Spine chat arrives with the full build'); }}><i className="ph-fill ph-arrow-up" /></button>
      </div>
    </Sheet>);
}

const NOTIFS = [
  ['Fight Back won an appeal', '$4,210 out-of-network denial reversed for M.R.', '3h ago', 'good'],
  ['Colorado new-hire report', 'Filing deadline in 4 days for 2 employees', 'yesterday', 'warn'],
  ['2027 recommendation ready', 'Level-funded renewal, +2.4% vs market +9.7%', '2d ago', 'info']
];

function App() {
  const [tab, setTab] = React.useState(() => {
    try {
      const t = localStorage.getItem('spine-mobile-tab');
      return TABS.some((x) => x.id === t) ? t : 'home';
    } catch (e) { return 'home'; }
  });
  const [stacks, setStacks] = React.useState({ home: [], people: [], plan: [], health: [], compliance: [] });
  const [popping, setPopping] = React.useState(null);
  const [range, setRange] = React.useState('YTD');
  const [rangeOpen, setRangeOpen] = React.useState(false);
  const [ask, setAsk] = React.useState(false);
  const [bell, setBell] = React.useState(false);
  const [ws, setWs] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [stamp, setStamp] = React.useState('Recalculated 4 min ago');
  const [hint, setHint] = React.useState(false);

  React.useEffect(() => {
    const fit = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
      const narrow = window.matchMedia('(max-width: 520px)').matches;
      document.body.classList.toggle('fullbleed', standalone || narrow);
      const s = Math.min(1, (window.innerHeight - 52) / 874, (window.innerWidth - 24) / 402);
      document.documentElement.style.setProperty('--ps', standalone || narrow ? 1 : Math.max(0.4, s).toFixed(3));
      let dismissed = false;
      try { dismissed = localStorage.getItem('spine-mobile-hint') === '1'; } catch (e) {}
      setHint(!standalone && narrow && !dismissed && /iPhone|iPad|iPod/.test(navigator.userAgent));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  React.useEffect(() => { try { localStorage.setItem('spine-mobile-tab', tab); } catch (e) {} }, [tab]);

  const stack = stacks[tab] || [];
  const push = (id) => setStacks((s) => ({ ...s, [tab]: [...s[tab], id] }));
  const pop = () => {
    const cur = stacks[tab];
    if (!cur.length) return;
    setPopping(cur[cur.length - 1]);
    window.setTimeout(() => setPopping(null), 320);
    setStacks((s) => ({ ...s, [tab]: s[tab].slice(0, -1) }));
  };
  const say = (m) => setToast(m);

  const renderPushed = (id) => {
    if (id === 'savings') return <SavingsDetail onBack={pop} />;
    if (id === 'activity') return <ActivityDetail onBack={pop} />;
    if (id.indexOf('task:') === 0) return <TaskDetail index={+id.slice(5)} onBack={pop} onToast={say} />;
    if (id.indexOf('cstate:') === 0) return <StateCompDetail code={id.slice(7)} onBack={pop} />;
    return null;
  };

  return (
    <div className="stage">
      <div className="phone">
        <div className="island" />
        <StatusBar />

        <div className="screens">
          <div className={`screen base${stack.length ? ' behind' : ''}`}>
            {tab === 'home' &&
              <HomeScreen range={range} onRange={setRange} onOpenRange={() => setRangeOpen(true)}
                onPush={push} onToast={say} onBell={() => setBell(true)} onWorkspace={() => setWs(true)}
                onGoTab={setTab} stamp={stamp} onRefresh={() => setStamp('Recalculated just now')} />}
            {tab === 'people' && <PeopleScreen onAsk={() => setAsk(true)} />}
            {tab === 'plan' && <PlanScreen onAsk={() => setAsk(true)} onToast={say} />}
            {tab === 'health' && <HealthScreen onAsk={() => setAsk(true)} onToast={say} />}
            {tab === 'compliance' && <ComplianceScreen onPush={push} onToast={say} onAsk={() => setAsk(true)} />}
          </div>
          {stack.map((id) => <PushedScreen key={id} onPop={pop}>{renderPushed(id)}</PushedScreen>)}
          {popping && <div className="screen pushed out">{renderPushed(popping)}</div>}
        </div>

        {!stack.length &&
          <button className="fab" onClick={() => setAsk(true)} aria-label="Ask Spine">
            <i className="ph-fill ph-chat-teardrop-dots" />
          </button>}

        <TabBar tabs={TABS} active={tab} onPick={(id) => { setTab(id); }} />

        <ActionSheet open={rangeOpen} onClose={() => setRangeOpen(false)}
          title="Date range" message="Applies to every figure on this screen"
          value={range} onPick={setRange}
          options={Object.keys(M_RANGES).map((k) => ({ id: k, label: M_RANGES[k].label, hint: M_RANGES[k].dates }))} />

        <Sheet open={bell} onClose={() => setBell(false)} title="Notifications">
          <div className="list">
            {NOTIFS.map((n, i) =>
              <div key={i} className="row">
                <span className="ico" style={{ background: n[3] === 'good' ? 'var(--success-bg)' : n[3] === 'warn' ? 'var(--warning-bg)' : 'var(--info-bg)', color: n[3] === 'good' ? 'var(--success)' : n[3] === 'warn' ? 'var(--warning)' : 'var(--cobalt-400)' }}>
                  <i className={`ph ${n[3] === 'good' ? 'ph-check-circle' : n[3] === 'warn' ? 'ph-flag' : 'ph-sparkle'}`} />
                </span>
                <span className="body"><span className="rt">{n[0]}</span><span className="rs">{n[1]}</span></span>
                <span className="when">{n[2]}</span>
              </div>)}
          </div>
        </Sheet>

        <Sheet open={ws} onClose={() => setWs(false)} title="Workspace">
          <div className="list">
            <div className="row">
              <AAvatar name="Hockey Stack" size={30} tone="cobalt" />
              <span className="body"><span className="rt">HockeyStack</span><span className="rs">152 employees · Aetna + UHC</span></span>
              <i className="ph-bold ph-check" style={{ color: 'var(--cobalt-400)', fontSize: 14 }} />
            </div>
            <div className="row">
              <AAvatar name="Alex Johnson" size={30} />
              <span className="body"><span className="rt">Alex Johnson</span><span className="rs">HR Director · admin</span></span>
            </div>
            <button className="row tap" onClick={() => { setWs(false); setRangeOpen(true); }}>
              <span className="ico" style={{ background: 'var(--gray-100)', color: 'var(--text-secondary)' }}><i className="ph ph-calendar-blank" /></span>
              <span className="body"><span className="rt">Date range</span><span className="rs">{M_RANGES[range].dates}</span></span>
              <i className="ph-bold ph-caret-right chev" style={{ fontSize: 13 }} />
            </button>
            <button className="row tap" onClick={() => { setWs(false); say('Documents arrive with the full build'); }}>
              <span className="ico" style={{ background: 'var(--gray-100)', color: 'var(--text-secondary)' }}><i className="ph ph-files" /></span>
              <span className="body"><span className="rt">Documents</span><span className="rs">SPD, ACA filings, ERISA wrap, COBRA</span></span>
              <i className="ph-bold ph-caret-right chev" style={{ fontSize: 13 }} />
            </button>
            <button className="row tap" onClick={() => { setWs(false); say('Settings arrive with the full build'); }}>
              <span className="ico" style={{ background: 'var(--gray-100)', color: 'var(--text-secondary)' }}><i className="ph ph-gear-six" /></span>
              <span className="body"><span className="rt">Settings</span><span className="rs">Admins, integrations, appearance</span></span>
              <i className="ph-bold ph-caret-right chev" style={{ fontSize: 13 }} />
            </button>
          </div>
        </Sheet>

        <AskSheet open={ask} onClose={() => setAsk(false)} onToast={say} />

        {toast && <Toast msg={toast} onDone={() => setToast(null)} />}

        {hint &&
          <div className="hint">
            <i className="ph ph-export" />
            <span>Share → <b>Add to Home Screen</b> to run Spine full screen.</span>
            <button className="x" onClick={() => { setHint(false); try { localStorage.setItem('spine-mobile-hint', '1'); } catch (e) {} }}><i className="ph ph-x" /></button>
          </div>}

        <div className="home-ind" />
      </div>
      <div className="cap">Spine HR · iOS — Home</div>
    </div>);
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
