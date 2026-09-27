/* Draftline concept mockup (front end only, fictional data). Scripts share top-level scope; load order matters. */
  /* ---------- menus, tooltips, toasts ---------- */
  let menuEl = null, toastT, tipEl;
  function openMenu(anchor, html, align = 'left') {
    closeMenu();
    const r = anchor.getBoundingClientRect();
    menuEl = document.createElement('div'); menuEl.className = 'menu'; menuEl.innerHTML = html;
    document.body.appendChild(menuEl);
    const w = menuEl.offsetWidth, h = menuEl.offsetHeight;
    const left = align === 'right' ? r.right - w : align === 'center' ? r.left + r.width / 2 - w / 2 : r.left;
    menuEl.style.top = (r.bottom + 6 + h > innerHeight ? r.top - 6 - h : r.bottom + 6) + 'px';
    menuEl.style.left = Math.max(8, Math.min(left, innerWidth - w - 8)) + 'px';
  }
  function closeMenu() { if (menuEl) { menuEl.remove(); menuEl = null; } }
  function toast(msg) {
    document.querySelectorAll('.toast').forEach((t) => t.remove());
    const t = document.createElement('div'); t.className = 'toast';
    t.innerHTML = `<span style="color:#86EFAC;display:flex">${ic('checkCircle')}</span><span>${msg}</span>`;
    document.body.appendChild(t); clearTimeout(toastT); toastT = setTimeout(() => t.remove(), 3400);
  }
  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest('[data-tip]');
    if (tipEl) { tipEl.remove(); tipEl = null; }
    if (!t) return;
    tipEl = document.createElement('div'); tipEl.className = 'tip'; tipEl.innerHTML = t.dataset.tip;
    document.body.appendChild(tipEl);
    const r = t.getBoundingClientRect();
    let top = r.bottom + 8; if (top + tipEl.offsetHeight > innerHeight - 8) top = r.top - tipEl.offsetHeight - 8;
    tipEl.style.top = top + 'px';
    tipEl.style.left = Math.max(8, Math.min(r.left + r.width / 2 - tipEl.offsetWidth / 2, innerWidth - tipEl.offsetWidth - 8)) + 'px';
  });
  function hideTip() { if (tipEl) { tipEl.remove(); tipEl = null; } }

  /* ---------- changes drawer ---------- */
  let confirmId = null;
  const node = (c) => c.kind === 'ai' ? `<span class="node ai">${ic('sparkles', 'sm')}</span>`
    : c.kind === 'mate' ? `<span class="node" style="background:#E0F2FE;color:#0369A1;font-size:10px;font-weight:600">MC</span>`
    : `<span class="node">${ic('pencil', 'sm')}</span>`;
  const whoLabel = (c) => c.who === 'Assistant' ? 'Assistant · Opus 5.5' : esc(c.who);
  function renderDrawer() {
    const n = S.changes.length;
    layer.innerHTML = `<div class="scrim" data-act="close-layer"></div>
    <aside class="drawer">
      <div class="d-head">
        <div class="top"><h2>Changes</h2><button class="icon-btn" data-act="close-layer">${ic('x')}</button></div>
        <p>${n ? `${n} change${n > 1 ? 's' : ''} in your Draft that aren't live yet.` : 'Your Draft matches the live site.'}</p>
        <div class="git-line">${ic('branch', 'sm')}draft/fall-refresh · ${n} commit${n === 1 ? '' : 's'} ahead of main</div>
      </div>
      <div class="d-body">
        <div class="d-group">Draft · not published</div>
        ${n ? S.changes.map((c) => `
          <div class="commit">
            <div class="rail">${node(c)}</div>
            <div class="body">
              <div class="title">${esc(c.title)}</div>
              <div class="meta"><span>${whoLabel(c)}</span>·<span>${c.time}</span>·<span class="hash">${c.hash}</span></div>
              <div class="files">${c.files.map((f) => `${f.path} <span class="plus">+${f.add}</span> <span class="minus">−${f.del}</span>`).join('<br>')}</div>
              ${confirmId === c.id ? `<div class="confirm">Remove this change from the Draft?<button class="btn" data-act="cancel-revert">Cancel</button><button class="btn btn-danger" data-act="do-revert" data-id="${c.id}">Revert</button></div>` : ''}
            </div>
            <div class="acts ${confirmId === c.id ? 'show' : ''}"><button class="btn" data-act="ask-revert" data-id="${c.id}" data-tip="Adds a revert commit to the Draft">${ic('undo', 'sm')}Revert</button></div>
          </div>`).join('') : `<div class="empty"><span style="color:var(--green)">${ic('checkCircle', 'lg')}</span><div style="margin-top:8px">No unpublished changes</div></div>`}
        <div class="d-group" style="margin-top:8px">Live on northfork.com</div>
        ${S.live.map((c) => `
          <div class="commit live"><div class="rail"><span class="node live">${ic('globe', 'sm')}</span></div>
            <div class="body"><div class="title">${esc(c.title)}</div><div class="meta"><span>${whoLabel(c)}</span>·<span>Published ${c.time}</span>·<span class="hash">${c.hash}</span></div></div></div>`).join('')}
      </div>
      <div class="d-foot">
        <button class="btn" data-act="staging">${ic('eye')}Staging preview</button>
        <button class="btn btn-primary" data-act="publish" ${n ? '' : 'disabled'}>${ic('rocket')}Review & publish</button>
      </div>
    </aside>`;
  }

  /* ---------- publish modal ---------- */
  let pub = { state: 'review', steps: [] };
  const stepRow = (s) => `<div class="box-row">${s.done ? `<span style="color:var(--green);display:flex">${ic('checkCircle')}</span>` : s.active ? '<span class="spinner" style="margin:0 1px"></span>' : `<span style="color:#CFCFD6;display:flex">${ic('commit')}</span>`}<span style="${s.done || s.active ? '' : 'color:var(--text3)'}">${esc(s.label)}</span><span class="right mono muted">${s.meta}</span></div>`;
  function renderPublish() {
    const n = S.changes.length;
    let inner;
    if (pub.state === 'review') {
      const files = new Set(); let add = 0, del = 0;
      S.changes.forEach((c) => c.files.forEach((f) => { files.add(f.path); add += f.add; del += f.del; }));
      inner = `
      <div class="m-head"><div><h2>Publish to live</h2><p>Review what's changing before it goes out to everyone.</p></div><button class="icon-btn" data-act="close-layer">${ic('x')}</button></div>
      <div class="m-body">
        <div class="envs">
          <div class="env"><div class="lbl"><span class="dot" style="background:var(--amber)"></span>Draft</div><div class="host"><a href="#" data-act="staging">draft--northfork.draftline.app</a><span style="color:var(--accent);display:flex">${ic('external', 'sm')}</span></div><div class="sub">Staging preview · updated just now</div></div>
          <div class="arrow-c">${ic('arrowRight', 'sm')}</div>
          <div class="env"><div class="lbl"><span class="dot"></span>Live</div><div class="host">${ic('globe', 'sm')}northfork.com</div><div class="sub">Last published Sep 24</div></div>
        </div>
        <div style="font-weight:600;font-size:13px;margin:4px 0 8px">${n ? `${n} change${n === 1 ? '' : 's'} going live` : 'Nothing to publish yet'}</div>
        ${n ? `<div class="box">${S.changes.map((c) => `<div class="box-row">${node(c)}<span style="min-width:0">${esc(c.title)}<div class="muted" style="font-size:12px;margin-top:1px">${whoLabel(c)} · ${c.time}</div></span><span class="right"><span class="hash">${c.hash}</span></span></div>`).join('')}</div>` : ''}
        <div class="checks"><span>${ic('checkCircle', 'sm')}Build passes</span><span>${ic('checkCircle', 'sm')}No broken links</span><span>${ic('checkCircle', 'sm')}Lighthouse 97</span></div>
        <details class="details"><summary>${ic('chevRight', 'sm')}Technical details</summary><pre>git merge --no-ff draft/fall-refresh → main
${n} commits · ${files.size} files changed · +${add} −${del}
Build: astro build (Node 22) · Deploy target: production</pre></details>
      </div>
      <div class="m-foot"><span class="left">${ic('undo', 'sm')}You can roll back any publish later.</span><button class="btn" data-act="close-layer">Cancel</button><button class="btn btn-primary btn-lg" data-act="do-publish" ${n ? '' : 'disabled'}>${ic('rocket')}Publish to live</button></div>`;
    } else if (pub.state === 'publishing') {
      inner = `
      <div class="m-head"><div><h2>Publishing…</h2><p>This usually takes under a minute.</p></div></div>
      <div class="m-body" style="padding-bottom:24px"><div class="box">${pub.steps.map(stepRow).join('')}</div></div>`;
    } else {
      inner = `
      <div class="success">
        <div class="big"><svg class="ic" style="width:30px;height:30px;stroke-width:2.2" viewBox="0 0 24 24">${P.check}</svg></div>
        <h2>Your changes are live</h2>
        <p>${pub.count} change${pub.count === 1 ? '' : 's'} published to northfork.com. Your Draft is up to date.</p>
        <a class="live-link" href="#" data-act="toast" data-msg="Would open northfork.com (fictional site)">${ic('globe', 'sm')}northfork.com ${ic('external', 'sm')}</a>
        <div class="muted mono" style="margin-top:14px;font-size:11.5px">Merged draft/fall-refresh into main · ${pub.hash}</div>
      </div>
      <div class="m-foot" style="justify-content:center"><button class="btn" data-act="drawer">View history</button><button class="btn btn-primary" data-act="close-layer">Done</button></div>`;
    }
    const lock = pub.state === 'publishing';
    layer.innerHTML = `<div class="scrim" ${lock ? '' : 'data-act="close-layer"'}></div><div class="modal-wrap" ${lock ? '' : 'data-act="close-layer-bg"'}><div class="modal">${inner}</div></div>`;
  }
  async function doPublish() {
    pub = { state: 'publishing', steps: [
      { label: 'Merging Draft into production', meta: 'draft → main' },
      { label: 'Building the site', meta: 'astro build' },
      { label: 'Deploying to northfork.com', meta: 'production' },
    ] };
    for (const s of pub.steps) { s.active = true; renderPublish(); await sleep(900); s.active = false; s.done = true; }
    renderPublish(); await sleep(350);
    pub.count = S.changes.length; pub.hash = hash();
    S.live = S.changes.map((c) => ({ title: c.title, who: c.who, time: 'just now', hash: c.hash })).concat(S.live);
    S.changes = [];
    S.msgs.forEach((m) => { if (m.t === 'changes' && m.state === 'pending') m.state = 'kept'; });
    pub.state = 'done'; renderPublish(); renderChrome(); renderChatKeep();
  }

  /* ---------- onboarding modals ---------- */
  const REPOS = [
    ['tetonic/northfork-site', 'Astro 5.2 · updated 2 hours ago', true],
    ['tetonic/lumen-marketing', 'Astro 5.1 · updated 3 days ago', true],
    ['tetonic/cedar-and-salt', 'Astro 4.16 · updated Sep 12', true],
    ['tetonic/field-guide-docs', 'Astro + Starlight · updated Sep 2', true],
    ['tetonic/client-portal', 'Next.js · not an Astro project', false],
  ];
  const TEMPLATES = [['northfork', 'Outdoor brand', 'Shop, journal, story'], ['saas', 'SaaS launch', 'Hero, features, pricing'], ['local', 'Local business', 'Menu, hours, booking'], ['portfolio', 'Portfolio', 'Case studies, about'], ['docs', 'Docs & guides', 'Starlight-based docs'], ['event', 'Event', 'Schedule, speakers, tickets']];
  let tplSel = 1;
  const modal = (inner, wide) => `<div class="scrim" data-act="close-layer"></div><div class="modal-wrap" data-act="close-layer-bg"><div class="modal ${wide ? 'wide' : ''}">${inner}</div></div>`;
  function renderConnect() {
    layer.innerHTML = modal(`
      <div class="m-head"><div><h2>Connect an Astro site</h2><p>Choose a repo. We'll copy it into a private sandbox and start a live preview.</p></div><button class="icon-btn" data-act="close-layer">${ic('x')}</button></div>
      <div class="m-body">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px"><span class="badge green">${ic('github', 'sm')}Connected as @tetonic</span><label class="search" style="flex:1;width:auto">${ic('search', 'sm')}<input placeholder="Search repositories"></label></div>
        <div class="box">${REPOS.map(([n, d, ok]) => `<div class="repo-row" style="${ok ? '' : 'opacity:.55'}">${ic('github')}<div><div class="rn">${n}</div><div class="rd">${d}</div></div>${ok ? `<button class="btn ${n.includes('northfork') ? 'btn-primary' : ''}" data-act="import" data-name="${n}">Import</button>` : '<span class="badge" style="margin-left:auto">Not supported</span>'}</div>`).join('')}</div>
      </div>
      <div class="m-foot"><span class="left">${ic('lock', 'sm')}Access limited to the repos you choose</span></div>`);
  }
  function renderTemplates() {
    layer.innerHTML = modal(`
      <div class="m-head"><div><h2>Start from a template</h2><p>Every template is a real Astro project, and the code lives in your GitHub.</p></div><button class="icon-btn" data-act="close-layer">${ic('x')}</button></div>
      <div class="m-body"><div class="tpl-grid">${TEMPLATES.map(([th, n, d], i) => `<button class="tpl ${i === tplSel ? 'on' : ''}" data-act="pick-tpl" data-i="${i}">${thumb(TH[th])}<div class="tn">${n}<span>${d}</span></div></button>`).join('')}</div></div>
      <div class="m-foot"><span class="left">Creates <span class="mono">tetonic/new-site</span> on GitHub</span><button class="btn" data-act="close-layer">Cancel</button><button class="btn btn-primary" data-act="import" data-name="${TEMPLATES[tplSel][1]} template">Create site</button></div>`, true);
  }
  async function renderSetup(name) {
    const steps = [['Copying ' + name, 'git clone'], ['Installing dependencies', 'pnpm install'], ['Starting the live preview', 'astro dev'], ['Creating your Draft', 'draft/fall-refresh']].map(([label, meta]) => ({ label, meta }));
    const draw = () => {
      layer.innerHTML = `<div class="scrim"></div><div class="modal-wrap"><div class="modal">
      <div class="m-head"><div><h2>Setting up your sandbox</h2><p>A private cloud copy of the site, so edits never touch production.</p></div></div>
      <div class="m-body" style="padding-bottom:24px"><div class="box">${steps.map(stepRow).join('')}</div></div></div></div>`;
    };
    for (const s of steps) { s.active = true; draw(); await sleep(650); s.active = false; s.done = true; }
    draw(); await sleep(300);
    location.hash = '#/editor';
  }

