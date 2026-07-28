// Compliance system of record - three modules (payroll / tax / health) plus the
// notices & workflows view. All numbers are mock but internally consistent with
// HockeyStack: 152 employees, 8 states, Rippling payroll, 4 carriers.
// Status vocabulary everywhere: ok | pending | action | na

const COMP_MODULES = {
  payroll: {
    id: 'payroll', nav: 'Payroll', navDesc: 'Wage-hour & workforce rules',
    title: 'Payroll compliance',
    sub: 'Employees hired, onboarded, classified, paid, and terminated according to federal, state, and local employment rules. Rules refresh nightly; Spine files what it can and escalates what it cannot.',
    dec: 'sky',
    kpis: [
      { k: 'Readiness score', v: '88', unit: '%', note: '4 pts since Q1', tone: 'good' },
      { k: 'Open high-risk gaps', v: '1', note: 'CO new-hire report', tone: 'bad' },
      { k: 'Upcoming deadlines', v: '2', note: 'Next 30 days', tone: 'warn' },
      { k: 'Admin time saved', v: '11', unit: 'hrs/mo', note: 'vs. manual tracking', tone: 'flat' },
      { k: 'Open tasks', v: '4', note: 'Spine ops · 3 · you · 1', tone: 'info' }],

    radar: {
      score: 88,
      lead: 'HockeyStack is payroll audit-ready in 6 of 8 states.',
      rest: 'Colorado and Florida carry the open exposure: new-hire reporting in both, with filings already submitted.',
      bars: [
        { name: 'Wage & hour', pct: 92, tone: 'good' },
        { name: 'Classification', pct: 88, tone: 'good' },
        { name: 'Leave & PFML', pct: 79, tone: 'warn' },
        { name: 'Recordkeeping', pct: 94, tone: 'good' }]

    },
    workflows: {
      title: 'Tracked workflows · 8 states',
      meta: 'Synced with Rippling every payroll run',
      items: [
        { name: 'I-9 Section 2 verification', status: 'ok', tag: 'Current' },
        { name: 'New-hire reporting (8 states)', status: 'action', tag: 'CO + FL open' },
        { name: 'W-4 & state withholding forms', status: 'ok', tag: 'Current' },
        { name: 'Exempt vs non-exempt classification', status: 'ok', tag: 'Audited Jun 2026' },
        { name: 'Minimum wage / overtime / pay frequency', status: 'ok', tag: 'Current' },
        { name: 'Final paycheck rules', status: 'pending', tag: 'CA review open' },
        { name: 'Paid sick leave & PFML flags', status: 'pending', tag: 'WA PFML validating' },
        { name: 'Remote-work state readiness', status: 'pending', tag: '2 states flagged' },
        { name: 'Payroll recordkeeping', status: 'ok', tag: 'Synced · Rippling' },
        { name: 'Handbook state addenda', status: 'pending', tag: 'CA + WA updates' }]

    },
    reqs: [
      { key: 'newhire', label: 'New-hire report', full: 'State new-hire reporting filed within deadline' },
      { key: 'leave', label: 'Sick leave / PFML', full: 'Paid sick-leave and family-leave programs registered and deducted' },
      { key: 'finalpay', label: 'Final pay', full: 'Termination final-paycheck timing policy matches state rule' },
      { key: 'wage', label: 'Wage & OT', full: 'Minimum wage, overtime, and pay-frequency rules applied' },
      { key: 'handbook', label: 'Handbook addendum', full: 'State-specific handbook addendum issued to employees' }],

    rows: [
      { code: 'CA', name: 'California', count: 41, neu: 3, pct: 92, risk: 'medium', next: 'Refresh SDI/PFL notice for 2026', newhire: 'ok', leave: 'ok', finalpay: 'pending', wage: 'ok', handbook: 'pending' },
      { code: 'NY', name: 'New York', count: 28, neu: 2, pct: 90, risk: 'low', next: 'No blocking action', newhire: 'ok', leave: 'ok', finalpay: 'ok', wage: 'ok', handbook: 'ok' },
      { code: 'WA', name: 'Washington', count: 18, neu: 1, pct: 84, risk: 'medium', next: 'Validate PFML deduction mapping', newhire: 'ok', leave: 'pending', finalpay: 'ok', wage: 'ok', handbook: 'pending' },
      { code: 'TX', name: 'Texas', count: 14, neu: 2, pct: 95, risk: 'low', next: 'No blocking action', newhire: 'ok', leave: 'na', finalpay: 'ok', wage: 'ok', handbook: 'ok' },
      { code: 'CO', name: 'Colorado', count: 9, neu: 2, pct: 76, risk: 'high', next: 'File CO new-hire report for 2 hires', newhire: 'action', leave: 'ok', finalpay: 'ok', wage: 'ok', handbook: 'ok' },
      { code: 'OR', name: 'Oregon', count: 7, neu: 1, pct: 88, risk: 'low', next: 'No blocking action', newhire: 'ok', leave: 'ok', finalpay: 'ok', wage: 'ok', handbook: 'ok' },
      { code: 'FL', name: 'Florida', count: 4, neu: 2, pct: 81, risk: 'medium', next: 'Confirm new-hire report receipt', newhire: 'pending', leave: 'na', finalpay: 'ok', wage: 'ok', handbook: 'ok' },
      { code: 'PA', name: 'Pennsylvania', count: 3, neu: 1, pct: 90, risk: 'low', next: 'No blocking action', newhire: 'ok', leave: 'na', finalpay: 'ok', wage: 'ok', handbook: 'ok' }]

  },

  tax: {
    id: 'tax', nav: 'Tax', navDesc: 'Accounts, filings & notices',
    title: 'Tax compliance',
    sub: 'The right tax accounts, registrations, filing schedules, remittance setup, agency logins, and notice handling in every jurisdiction you employ in.',
    dec: 'periwinkle',
    kpis: [
      { k: 'Readiness score', v: '76', unit: '%', note: '2 pts since Q1', tone: 'warn' },
      { k: 'Open high-risk gaps', v: '3', note: '1 in expert review', tone: 'bad' },
      { k: 'Upcoming deadlines', v: '3', note: 'Next 30 days', tone: 'warn' },
      { k: 'Admin time saved', v: '9', unit: 'hrs/mo', note: 'vs. manual tracking', tone: 'flat' },
      { k: 'Open tasks', v: '8', note: 'Spine tax ops · 7 · you · 1', tone: 'info' }],

    radar: {
      score: 76,
      lead: 'HockeyStack is tax audit-ready in 5 of 8 states.',
      rest: 'Pennsylvania withholding and the New York account discrepancy drive most of the exposure; $42K of penalty risk is being actively worked.',
      bars: [
        { name: 'Accounts & registrations', pct: 72, tone: 'warn' },
        { name: 'Filing calendar', pct: 84, tone: 'good' },
        { name: 'Remittance setup', pct: 88, tone: 'good' },
        { name: 'Agency notices', pct: 64, tone: 'bad' }]

    },
    workflows: {
      title: 'Tracked workflows · 11 jurisdictions',
      meta: 'Filing calendar synced with Rippling payroll runs',
      items: [
        { name: 'Federal EIN & IRS payroll tax setup', status: 'ok', tag: 'Verified' },
        { name: 'State withholding accounts', status: 'action', tag: 'PA registration open' },
        { name: 'State unemployment (SUTA) accounts', status: 'pending', tag: 'AZ pending' },
        { name: 'Local payroll tax registrations', status: 'ok', tag: 'NYC · Current' },
        { name: 'FUTA / SUTA rate tracking', status: 'ok', tag: 'Current' },
        { name: 'Form 941 quarterly filing', status: 'pending', tag: 'Due Jul 31' },
        { name: 'Form 940 annual FUTA filing', status: 'ok', tag: 'Scheduled' },
        { name: 'W-2 / W-3 year-end reporting', status: 'ok', tag: 'On track' },
        { name: 'SUTA rate updates', status: 'pending', tag: 'CA EDD notice' },
        { name: 'Agency login vault', status: 'ok', tag: '11 of 11 stored' },
        { name: 'Tax notice inbox', status: 'action', tag: '2 unresolved' },
        { name: 'Digital mailroom', status: 'ok', tag: 'Auto-ingesting' },
        { name: 'Penalty & interest risk tracking', status: 'pending', tag: '$42K monitored' }]

    },
    reqs: [
      { key: 'withholding', label: 'Withholding acct', full: 'State income-tax withholding account registered and active' },
      { key: 'suta', label: 'SUTA / UI acct', full: 'State unemployment-insurance account registered with assigned rate' },
      { key: 'local', label: 'Local tax', full: 'City or county payroll tax registrations where they apply' },
      { key: 'calendar', label: 'Filing calendar', full: 'Deposit and return schedule mapped to payroll runs' },
      { key: 'notices', label: 'Notices clear', full: 'No unresolved agency notices for this jurisdiction' }],

    rows: [
      { code: 'CA', name: 'California', count: 41, neu: 3, pct: 81, risk: 'medium', next: 'Apply new EDD SUTA rate', withholding: 'ok', suta: 'pending', local: 'na', calendar: 'ok', notices: 'pending' },
      { code: 'NY', name: 'New York', count: 28, neu: 2, pct: 69, risk: 'high', next: 'Resolve withholding account discrepancy', withholding: 'action', suta: 'ok', local: 'ok', calendar: 'ok', notices: 'action' },
      { code: 'WA', name: 'Washington', count: 18, neu: 1, pct: 78, risk: 'medium', next: 'Confirm ESD account linkage', withholding: 'na', suta: 'pending', local: 'na', calendar: 'ok', notices: 'ok' },
      { code: 'TX', name: 'Texas', count: 14, neu: 2, pct: 91, risk: 'low', next: 'No blocking action', withholding: 'na', suta: 'ok', local: 'na', calendar: 'ok', notices: 'ok' },
      { code: 'CO', name: 'Colorado', count: 9, neu: 2, pct: 84, risk: 'low', next: 'No blocking action', withholding: 'ok', suta: 'ok', local: 'pending', calendar: 'ok', notices: 'ok' },
      { code: 'OR', name: 'Oregon', count: 7, neu: 1, pct: 79, risk: 'medium', next: 'Register Portland transit tax', withholding: 'ok', suta: 'ok', local: 'action', calendar: 'ok', notices: 'ok' },
      { code: 'FL', name: 'Florida', count: 4, neu: 2, pct: 88, risk: 'low', next: 'No blocking action', withholding: 'na', suta: 'ok', local: 'na', calendar: 'ok', notices: 'ok' },
      { code: 'PA', name: 'Pennsylvania', count: 3, neu: 1, pct: 58, risk: 'high', next: 'Complete state withholding registration', withholding: 'action', suta: 'pending', local: 'action', calendar: 'pending', notices: 'ok' }]

  },

  health: {
    id: 'health', nav: 'Health', navDesc: 'ERISA, ACA, COBRA & plan docs',
    title: 'Health compliance',
    sub: 'Employer-sponsored health and welfare benefits documented, disclosed, monitored, and administered correctly. Because Spine is the broker of record, carrier documents and enrollment data flow in from source.',
    dec: 'teal',
    kpis: [
      { k: 'Readiness score', v: '84', unit: '%', note: '6 pts since Q1', tone: 'good' },
      { k: 'Open high-risk gaps', v: '2', note: 'Section 125 doc missing', tone: 'bad' },
      { k: 'Upcoming deadlines', v: '2', note: 'Next 30 days', tone: 'warn' },
      { k: 'Admin time saved', v: '11', unit: 'hrs/mo', note: 'vs. manual tracking', tone: 'flat' },
      { k: 'Open tasks', v: '6', note: 'Spine benefits ops · 5 · you · 1', tone: 'info' }],

    radar: {
      score: 84,
      lead: 'Plan documentation is complete for 11 of 13 plans.',
      rest: 'The Section 125 cafeteria plan document is missing and ACA 1095-C readiness sits at 68%. Both have workflows open with the counsel partner.',
      bars: [
        { name: 'Plan documents (ERISA)', pct: 81, tone: 'warn' },
        { name: 'ACA reporting', pct: 68, tone: 'bad' },
        { name: 'COBRA administration', pct: 88, tone: 'good' },
        { name: 'HIPAA & privacy', pct: 92, tone: 'good' }]

    },
    workflows: {
      title: 'Tracked workflows · 4 carriers',
      meta: 'Broker-of-record access: carrier documents sync nightly',
      items: [
        { name: 'SBC collection and distribution', status: 'pending', tag: '11 / 13 plans' },
        { name: 'SPD / wrap SPD tracking', status: 'pending', tag: 'Counsel review' },
        { name: 'ERISA disclosure calendar', status: 'ok', tag: 'Current' },
        { name: 'COBRA general notice', status: 'pending', tag: 'Audit open' },
        { name: 'COBRA qualifying-event workflow', status: 'ok', tag: '2 monitored' },
        { name: 'ACA ALE threshold tracking', status: 'ok', tag: 'ALE confirmed' },
        { name: '1094-C / 1095-C readiness', status: 'pending', tag: '68% ready' },
        { name: 'Affordability & minimum value', status: 'ok', tag: 'Passing' },
        { name: 'Section 125 cafeteria plan document', status: 'action', tag: 'Missing' },
        { name: 'Open-enrollment notice checklist', status: 'pending', tag: '4 of 7 done' },
        { name: 'HIPAA / PHI access safeguards', status: 'pending', tag: 'BAA review' },
        { name: 'Carrier document vault', status: 'ok', tag: '4 carriers synced' },
        { name: 'Benefits eligibility audit', status: 'ok', tag: 'Q2 complete' }]

    },
    reqs: [
      { key: 'sbc', label: 'SBC / SPD', full: 'Summary of Benefits & Coverage and plan description distributed' },
      { key: 'cobra', label: 'COBRA', full: 'COBRA general notice and election windows administered' },
      { key: 'aca', label: 'ACA reporting', full: '1095-C data complete for employees in this state' },
      { key: 's125', label: 'Section 125', full: 'Cafeteria plan document covers pre-tax elections' },
      { key: 'mandate', label: 'State mandate', full: 'State-specific coverage mandate or reporting satisfied' }],

    rows: [
      { code: 'CA', name: 'California', count: 41, neu: 3, pct: 88, risk: 'medium', next: 'File CA individual mandate report', sbc: 'ok', cobra: 'ok', aca: 'pending', s125: 'action', mandate: 'pending' },
      { code: 'NY', name: 'New York', count: 28, neu: 2, pct: 86, risk: 'medium', next: 'Distribute updated PPO Silver SBC', sbc: 'pending', cobra: 'ok', aca: 'ok', s125: 'action', mandate: 'na' },
      { code: 'WA', name: 'Washington', count: 18, neu: 1, pct: 85, risk: 'low', next: 'No blocking action', sbc: 'ok', cobra: 'ok', aca: 'ok', s125: 'action', mandate: 'na' },
      { code: 'TX', name: 'Texas', count: 14, neu: 2, pct: 86, risk: 'low', next: 'No blocking action', sbc: 'ok', cobra: 'ok', aca: 'ok', s125: 'action', mandate: 'na' },
      { code: 'CO', name: 'Colorado', count: 9, neu: 2, pct: 79, risk: 'medium', next: 'Close COBRA notice audit', sbc: 'ok', cobra: 'pending', aca: 'pending', s125: 'action', mandate: 'na' },
      { code: 'OR', name: 'Oregon', count: 7, neu: 1, pct: 84, risk: 'low', next: 'No blocking action', sbc: 'ok', cobra: 'ok', aca: 'ok', s125: 'action', mandate: 'na' },
      { code: 'FL', name: 'Florida', count: 4, neu: 2, pct: 82, risk: 'low', next: 'No blocking action', sbc: 'pending', cobra: 'ok', aca: 'ok', s125: 'action', mandate: 'na' },
      { code: 'PA', name: 'Pennsylvania', count: 3, neu: 1, pct: 83, risk: 'low', next: 'No blocking action', sbc: 'ok', cobra: 'ok', aca: 'ok', s125: 'action', mandate: 'na' }]

  }
};

// ===== Notices & workflows =====
// Notices are intake: government, carrier, and vendor mail, classified and routed.
const COMP_NOTICES = [
  { src: 'NY Department of Taxation', subject: 'Withholding account discrepancy, notice NYS-45', kind: 'gov', mod: 'tax', risk: 'high', date: 'Jul 21', owner: 'Spine tax ops', task: 'NY withholding account notice', state: 'NY', unresolved: true },
  { src: 'PA Department of Revenue', subject: 'Employer withholding registration incomplete', kind: 'gov', mod: 'tax', risk: 'high', date: 'Jul 20', owner: 'Spine tax ops', task: 'PA withholding registration', state: 'PA', unresolved: true },
  { src: 'Colorado Department of Labor', subject: 'New-hire report not received for Q3', kind: 'gov', mod: 'payroll', risk: 'high', date: 'Jul 18', owner: 'Spine payroll ops', task: 'CO new-hire report filing', state: 'CO', unresolved: true },
  { src: 'UnitedHealthcare', subject: 'SBC update for PPO Silver plan', kind: 'carrier', mod: 'health', risk: 'medium', date: 'Jul 17', owner: 'Benefits compliance', task: 'SBC distribution checklist', state: '-' },
  { src: 'California EDD', subject: 'SUTA rate notice for 2027', kind: 'gov', mod: 'tax', risk: 'medium', date: 'Jul 15', owner: 'Spine tax ops', task: 'CA SUTA rate update', state: 'CA' },
  { src: 'COBRA administrator', subject: 'Qualifying event election notice pending', kind: 'vendor', mod: 'health', risk: 'medium', date: 'Jul 14', owner: 'Benefits compliance', task: 'COBRA general notice audit', state: '-' },
  { src: 'WA Employment Security', subject: 'PFML premium rate update', kind: 'gov', mod: 'payroll', risk: 'medium', date: 'Jul 11', owner: 'Spine payroll ops', task: 'WA PFML setup validation', state: 'WA' },
  { src: 'Kaiser Permanente', subject: 'Renewal packet available', kind: 'carrier', mod: 'health', risk: 'low', date: 'Jul 8', owner: 'Spine benefits ops', task: 'Kaiser renewal packet intake', state: '-' },
  { src: 'IRS', subject: 'Form 941 deposit schedule confirmation', kind: 'gov', mod: 'tax', risk: 'low', date: 'Jul 3', owner: 'Spine tax ops', task: 'Form 941 quarterly filing', state: '-' }];


const COMP_STAGES = [
  { id: 'detected', label: 'Detected', tone: 'idle' },
  { id: 'progress', label: 'In progress', tone: 'info' },
  { id: 'you', label: 'Waiting on you', tone: 'warn' },
  { id: 'expert', label: 'Expert review', tone: 'bad' },
  { id: 'done', label: 'Closed', tone: 'good' }];


const COMP_TASKS = [
  { title: 'CA individual mandate reporting', mods: ['health'], stage: 'detected', risk: 'medium', due: 'Aug 20', days: 25, owner: 'Benefits compliance', from: null,
    evidence: [{ n: 'Enrollment file', got: true }, { n: 'Covered-individual list', got: false }, { n: 'State submission receipt', got: false }] },
  { title: 'Portland transit tax registration', mods: ['tax'], stage: 'detected', risk: 'medium', due: 'Aug 14', days: 19, owner: 'Spine tax ops', from: null,
    evidence: [{ n: 'Work-location roster', got: true }, { n: 'Registration confirmation', got: false }] },
  { title: 'CO new-hire report filing', mods: ['payroll'], stage: 'progress', risk: 'high', due: 'Jul 30', days: 4, owner: 'Spine payroll ops', from: 'Colorado Department of Labor',
    evidence: [{ n: 'Agency notice PDF', got: true }, { n: 'Payroll roster match', got: true }, { n: 'State submission receipt', got: false }] },
  { title: 'WA PFML setup validation', mods: ['payroll', 'tax'], stage: 'progress', risk: 'medium', due: 'Aug 5', days: 10, owner: 'Spine payroll ops', from: 'WA Employment Security',
    evidence: [{ n: 'PFML account confirmation', got: true }, { n: 'Deduction mapping', got: false }] },
  { title: 'SBC distribution checklist', mods: ['health'], stage: 'progress', risk: 'medium', due: 'Aug 1', days: 6, owner: 'Spine benefits ops', from: 'UnitedHealthcare',
    evidence: [{ n: 'Updated PPO Silver SBC', got: true }, { n: 'Distribution record', got: false }] },
  { title: 'CA final pay policy review', mods: ['payroll'], stage: 'you', risk: 'medium', due: 'Aug 8', days: 13, owner: 'You · HR', from: null,
    evidence: [{ n: 'Handbook policy', got: false }, { n: 'Termination workflow sign-off', got: false }] },
  { title: 'Section 125 cafeteria plan document', mods: ['health'], stage: 'you', risk: 'high', due: 'Aug 15', days: 20, owner: 'You · counsel partner', from: null,
    evidence: [{ n: 'Plan design summary', got: true }, { n: 'Signed plan document', got: false }] },
  { title: 'NY withholding account notice', mods: ['tax'], stage: 'expert', risk: 'high', due: 'Jul 29', days: 3, owner: 'Spine tax ops · specialist', from: 'NY Department of Taxation',
    evidence: [{ n: 'Agency notice PDF', got: true }, { n: 'Payroll tax ID', got: true }, { n: 'Prior filing confirmation', got: false }] },
  { title: 'PA withholding registration', mods: ['tax'], stage: 'expert', risk: 'high', due: 'Aug 3', days: 8, owner: 'Spine tax ops · specialist', from: 'PA Department of Revenue',
    evidence: [{ n: 'Entity documents', got: true }, { n: 'Registration confirmation', got: false }] },
  { title: 'Form 941 quarterly filing', mods: ['tax'], stage: 'progress', risk: 'medium', due: 'Jul 31', days: 5, owner: 'Spine tax ops', from: 'IRS',
    evidence: [{ n: 'Payroll register Q2', got: true }, { n: 'Deposit confirmations', got: true }, { n: 'Filed return', got: false }] },
  { title: 'COBRA general notice audit', mods: ['health'], stage: 'progress', risk: 'medium', due: 'Aug 10', days: 15, owner: 'Benefits compliance', from: 'COBRA administrator',
    evidence: [{ n: 'COBRA vendor agreement', got: true }, { n: 'SPD', got: true }, { n: 'Distribution record', got: false }] },
  { title: 'CA SUTA rate update', mods: ['tax'], stage: 'done', risk: 'low', due: 'Jul 16', days: -10, owner: 'Spine tax ops', from: 'California EDD',
    evidence: [{ n: 'EDD rate notice', got: true }, { n: 'Rippling rate applied', got: true }] },
  { title: 'Kaiser renewal packet intake', mods: ['health'], stage: 'done', risk: 'low', due: 'Jul 9', days: -17, owner: 'Spine benefits ops', from: 'Kaiser Permanente',
    evidence: [{ n: 'Renewal packet PDF', got: true }, { n: 'Rate comparison sheet', got: true }] },
  { title: 'TX new-hire reporting verification', mods: ['payroll'], stage: 'done', risk: 'low', due: 'Jul 2', days: -24, owner: 'Spine payroll ops', from: null,
    evidence: [{ n: 'State submission receipt', got: true }, { n: 'Payroll roster match', got: true }] }];


const MOD_LABEL = { payroll: 'Payroll', tax: 'Tax', health: 'Health' };

Object.assign(window, { COMP_MODULES, COMP_NOTICES, COMP_STAGES, COMP_TASKS, MOD_LABEL });
