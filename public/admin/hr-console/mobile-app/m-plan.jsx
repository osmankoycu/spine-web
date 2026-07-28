// Plan & Costs — costs, benchmarks and the renewal. Wide desktop tables
// become one card per comparison set.

const BENCH_YOU = BENCHMARK.find((b) => b.highlight);
const BENCH_REST = BENCHMARK.filter((b) => !b.highlight);
const money = (n) => '$' + n.toLocaleString('en-US');

function PlanScreen({ onAsk, onToast }) {
  const [view, setView] = React.useState('costs');
  return (
    <Screen label="plan" title="Plan & Costs" subtitle={<>Level-funded · loss ratio <b>0.68</b> · renewal in <b>47</b> days</>}
      leading={<span style={{ width: 8 }} />}
      trailing={<button className="nav-btn" onClick={() => onToast('Export arrives with the full build')} aria-label="Export"><i className="ph ph-export" /></button>}
      pinned={<Segmented options={[{ id: 'costs', label: 'Costs' }, { id: 'bench', label: 'Benchmarks' }, { id: 'renewal', label: 'Renewal' }]} value={view} onChange={setView} />}>

      {view === 'costs' &&
        <div className="stack">
          <div className="card">
            <span className="eyebrow">Blended annual cost</span>
            <div className="hero-val" style={{ fontSize: 40 }}>$2.24M</div>
            <div className="card-s" style={{ marginTop: 8 }}>$487K below the no-Spine baseline of $2.73M.</div>
            <div style={{ marginTop: 14 }}>
              <div className="kv"><span className="k">Employer</span><span className="v">$1.82M</span><span className="n">21% under the market average for this group size</span></div>
              <div className="kv"><span className="k">Employees</span><span className="v">$413K</span><span className="n">43% under market — you cover 82% of premium</span></div>
              <div className="kv"><span className="k">Per employee</span><span className="v">$12,005</span><span className="n">market average for a 152-person group is $15,240</span></div>
            </div>
          </div>

          <div className="card">
            <div className="card-t">Funding mix</div>
            <div className="card-s">Level-funded plans return the unused claims fund to you</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 14 }}>
              <Donut pct={88} sub="level-funded" />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="kv"><span className="k">Level-funded</span><span className="v">134</span></div>
                <div className="kv"><span className="k">Fully-insured</span><span className="v">18</span></div>
                <div className="kv"><span className="k">Fund balance</span><span className="v">$214K</span></div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-t">Risk appetite</div>
            <div className="card-s" style={{ marginBottom: 14 }}>Where employees actually landed at election</div>
            <SourceBars max={46} items={[
              { name: 'High (HDHP + HSA)', val: 46, color: 'var(--cobalt-400)' },
              { name: 'Medium (PPO Standard)', val: 28, color: 'var(--cobalt-300)' },
              { name: 'Low (PPO Premium, $0 ded)', val: 14, color: 'var(--aqua-400)' },
              { name: 'Waived', val: 12, color: 'var(--gray-500)' }
            ].map((x) => ({ ...x, val: x.val }))} />
            <div className="foot" style={{ paddingBottom: 0 }}>Values are % of enrolled employees</div>
          </div>
        </div>}

      {view === 'bench' &&
        <div className="stack">
          <div className="card feature">
            <span className="eyebrow">Your plan</span>
            <div className="card-t" style={{ fontSize: 17, marginTop: 4 }}>{BENCH_YOU.plan}</div>
            <div style={{ marginTop: 12 }}>
              <div className="kv"><span className="k">Employer spend</span><span className="v">{money(BENCH_YOU.spend)}<span style={{ fontSize: 11, opacity: .7 }}>/ee</span></span></div>
              <div className="kv"><span className="k">Employee out-of-pocket</span><span className="v">{money(BENCH_YOU.employee)}</span></div>
              <div className="kv"><span className="k">Deductible · network</span><span className="v">{BENCH_YOU.deductible} · {BENCH_YOU.network}</span></div>
              <div className="kv"><span className="k">Satisfaction</span><span className="v">{BENCH_YOU.satisfaction}/100</span></div>
            </div>
          </div>

          <div className="sec-title">Compared with</div>
          {BENCH_REST.map((b, i) =>
            <div key={i} className="card">
              <div className="card-head">
                <div className="card-t">{b.plan}</div>
                <span className="pill good"><i className="ph-bold ph-arrow-down" style={{ fontSize: 10 }} />{`${Math.round((1 - BENCH_YOU.spend / b.spend) * 100)}% cheaper`}</span>
              </div>
              <div style={{ marginTop: 10 }}>
                <div className="kv"><span className="k">Employer spend</span><span className="v">{money(b.spend)}<span style={{ fontSize: 11, color: 'var(--text-muted)' }}>/ee</span></span></div>
                <div className="kv"><span className="k">Employee out-of-pocket</span><span className="v">{money(b.employee)}</span></div>
                <div className="kv"><span className="k">Deductible · network</span><span className="v" style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 13.5 }}>{b.deductible} · {b.network}</span></div>
                <div className="kv">
                  <span className="k">Satisfaction</span>
                  <span className="v">{b.satisfaction}</span>
                  <span className="util" style={{ gridColumn: '1/-1', marginTop: -4 }}>
                    <span className="track"><span style={{ width: b.satisfaction + '%', background: 'var(--gray-500)' }} /></span>
                  </span>
                </div>
              </div>
            </div>)}
          <div className="foot">KFF 2026 medians · 100–200 employee cohort</div>
        </div>}

      {view === 'renewal' &&
        <div className="stack">
          <div className="card">
            <div className="card-head">
              <div>
                <span className="eyebrow">Q3 2026 window opens in</span>
                <div className="hero-val" style={{ fontSize: 40 }}>47 days</div>
              </div>
              <span className="pill warn"><i className="ph ph-flag" />Action needed</span>
            </div>
            <div className="card-s" style={{ marginTop: 8 }}>Sep 12, 2026 · carrier decision due two weeks earlier.</div>
          </div>

          <div className="card">
            <div className="kv"><span className="k">Projected increase</span><span className="v" style={{ color: 'var(--success)' }}>+2.4%</span><span className="n">the market is renewing at +9.7%</span></div>
            <div className="kv"><span className="k">Claims fund balance</span><span className="v">$214K</span><span className="n">returnable surplus if the year closes here</span></div>
            <div className="kv"><span className="k">Loss ratio</span><span className="v">0.68</span><span className="n">healthy band is 0.55–0.85</span></div>
          </div>

          <div className="card">
            <div className="card-t">Spine recommendation</div>
            <p style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--text-secondary)', marginTop: 8 }}>Renew with the current carrier and re-shop stop-loss. Two carriers quoted a lower attachment point last month; we expect a 3–5% saving on the stop-loss layer alone.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
              <button className="btn-primary" onClick={onAsk}><i className="ph-fill ph-chat-teardrop-dots" />Ask Spine about the renewal</button>
              <button className="btn-ghost" onClick={() => onToast('Renewal timeline arrives with the full build')}>See the renewal timeline</button>
            </div>
          </div>

          <div className="ed">
            <p>Your renewal is not a negotiation that starts in September. It started the night we repriced your first claim.</p>
            <span className="by">Spine ops · renewal desk</span>
          </div>
        </div>}
    </Screen>);
}

Object.assign(window, { PlanScreen });
