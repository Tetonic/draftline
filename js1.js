/* Draftline concept mockup (front end only, fictional data). Scripts share top-level scope; load order matters. */
  /* ---------- icons ---------- */
  const P = {
    arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"/>', arrowRight: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    chevDown: '<path d="m6 9 6 6 6-6"/>', chevRight: '<path d="m9 18 6-6-6-6"/>',
    pointer: '<path d="M4.04 4.69a.5.5 0 0 1 .65-.65l16 6.5a.5.5 0 0 1-.06.95l-6.13 1.58a2 2 0 0 0-1.43 1.43l-1.58 6.13a.5.5 0 0 1-.95.06z"/>',
    monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    tablet: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M12 18h.01"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M12 18h.01"/>',
    history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5M12 7v5l4 2"/>',
    external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.050-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    template: '<rect x="3" y="3" width="18" height="7" rx="1"/><rect x="3" y="14" width="9" height="7" rx="1"/><rect x="16" y="14" width="5" height="7" rx="1"/>',
    plus: '<path d="M12 5v14M5 12h14"/>', arrowUp: '<path d="m5 12 7-7 7 7M12 19V5"/>',
    sparkles: '<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.140a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.09-3.09a2 2 0 0 0-2.83 0L6 21"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>', check: '<path d="M20 6 9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    commit: '<circle cx="12" cy="12" r="3"/><path d="M3 12h6M15 12h6"/>',
    branch: '<path d="M6 3v12"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
    undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
    pencil: '<path d="M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5z"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.55-2.5 5.55-5.55C21.97 6.01 17.46 2 12 2z"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    element: '<path d="M5 3a2 2 0 0 0-2 2M19 3a2 2 0 0 1 2 2M21 19a2 2 0 0 1-2 2M5 21a2 2 0 0 1-2-2M9 3h1M9 21h1M14 3h1M14 21h1M3 9v1M21 9v1M3 14v1M21 14v1"/>',
    eye: '<path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/>',
    newChat: '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.38 2.63a1 1 0 0 1 3 3l-9.02 9.01a2 2 0 0 1-.85.5l-2.87.84a.5.5 0 0 1-.62-.62l.84-2.87a2 2 0 0 1 .5-.85z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>',
    grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    terminal: '<path d="m4 17 6-6-6-6M12 19h8"/>',
  };
  const ic = (n, c = '') => `<svg class="ic ${c}" viewBox="0 0 24 24">${P[n] || ''}</svg>`;
  const claude = '<span class="claude"><svg viewBox="0 0 24 24"><path d="M12 1.5l2.1 7 7-2.1-5.2 5.1 5.2 5.1-7-2.1-2.1 7-2.1-7-7 2.1 5.2-5.1L2.9 6.4l7 2.1z"/></svg></span>';
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const hash = () => Math.random().toString(16).slice(2, 9);
  const $ = (s, r = document) => r.querySelector(s);
  const app = $('#app'), layer = $('#layer');

  /* ---------- state ---------- */
  const ORIGINAL_HEADLINE = 'Built for the places maps forget.';
  const NEW_HEADLINE = 'Gear built for the long way up.';
  const S = {
    page: 'home', device: 'desktop', selecting: true, selected: [], busy: false, heroDone: false,
    model: 'Opus 5.5', sandbox: 'synced', drawer: false,
    site: { headline: ORIGINAL_HEADLINE, ember: false, announce: true, warranty: true, text: {}, color: {} },
    changes: [], live: [], msgs: [{ t: 'welcome' }],
  };
  S.changes = [
    { id: 'c2', title: 'Added “Warranty” link to the footer', who: 'Maya Chen', kind: 'mate', time: 'Yesterday, 2:40 PM', hash: '8e21b7a', files: [{ path: 'src/components/Footer.astro', add: 1, del: 0 }], revert: () => { S.site.warranty = false; } },
    { id: 'c1', title: 'Added Fall Sale announcement bar', who: 'Assistant', kind: 'ai', time: 'Yesterday, 11:05 AM', hash: '3f9c0d1', files: [{ path: 'src/components/Announcement.astro', add: 14, del: 0 }, { path: 'src/layouts/Base.astro', add: 2, del: 0 }], revert: () => { S.site.announce = false; } },
  ];
  S.live = [
    { title: 'Spring collection landing page', who: 'Danny', time: 'Sep 24', hash: 'd41a7c3' },
    { title: 'Updated shipping policy copy', who: 'Maya Chen', time: 'Sep 19', hash: '0b9e2f4' },
  ];

  /* ---------- thumbnails ---------- */
  function thumb(o) {
    const bar = (w, h, extra) => `<i style="display:block;width:${w};height:${h}px;border-radius:3px;background:${o.fg};${extra || ''}"></i>`;
    return `<div class="thumb" style="background:${o.bg}">
      <div class="t-nav"><i style="width:44px;background:${o.fg};opacity:.8"></i><span style="display:flex;gap:6px"><i style="width:18px;background:${o.fg};opacity:.25"></i><i style="width:18px;background:${o.fg};opacity:.25"></i><i style="width:18px;background:${o.fg};opacity:.25"></i></span></div>
      ${o.center ? `
      <div style="position:absolute;left:0;right:0;top:44px;display:flex;flex-direction:column;align-items:center;gap:7px">
        ${bar('62%', 12)}${bar('44%', 12)}${bar('50%', 5, 'opacity:.3;margin-top:4px')}
        <i style="display:block;width:58px;height:16px;border-radius:8px;background:${o.accent};margin-top:6px"></i></div>
      <div style="position:absolute;left:14%;right:14%;bottom:-18px;height:46px;border-radius:8px 8px 0 0;background:${o.img}"></div>` : `
      <div style="position:absolute;left:14px;top:46px;width:48%;display:flex;flex-direction:column;gap:6px">
        ${bar('90%', 11)}${bar('70%', 11)}${bar('80%', 5, 'opacity:.3;margin-top:4px')}${bar('60%', 5, 'opacity:.3')}
        <i style="display:block;width:54px;height:15px;border-radius:8px;background:${o.accent};margin-top:6px"></i></div>
      <div style="position:absolute;right:14px;top:40px;width:38%;bottom:16px;border-radius:9px;background:${o.img}"></div>`}
    </div>`;
  }
  const TH = {
    northfork: { bg: '#FBF8F3', fg: '#2E4A3A', accent: '#2E4A3A', img: 'linear-gradient(180deg,#F1DFC6 0 35%,#9DB0A0 35% 60%,#48685A 60%)' },
    lumen: { bg: '#0F1222', fg: '#E8E9F5', accent: '#7C8CFF', img: 'linear-gradient(135deg,#2A2F55,#4B3E8E)', center: true },
    cedar: { bg: '#F7EFE6', fg: '#4A2B1F', accent: '#B5532E', img: 'radial-gradient(circle at 40% 40%,#E3B98B,#9C5A35)' },
    tetonic: { bg: '#FFFFFF', fg: '#111827', accent: '#111827', img: 'linear-gradient(135deg,#E0E7FF,#FDE68A)', center: true },
    kestrel: { bg: '#F3F5F7', fg: '#1C2B3A', accent: '#2F6F8F', img: 'linear-gradient(160deg,#C9D6E0,#7F9CB0)' },
    saas: { bg: '#FFFFFF', fg: '#1E1B4B', accent: '#6366F1', img: 'linear-gradient(135deg,#EEF2FF,#C7D2FE)', center: true },
    local: { bg: '#FFF8F0', fg: '#3B2416', accent: '#E0782F', img: 'radial-gradient(circle at 50% 40%,#F5C28F,#C9773F)' },
    portfolio: { bg: '#141414', fg: '#F5F5F5', accent: '#F5F5F5', img: 'linear-gradient(135deg,#3A3A3A,#1F1F1F)' },
    docs: { bg: '#FAFAFA', fg: '#0F172A', accent: '#0EA5E9', img: 'repeating-linear-gradient(180deg,#E2E8F0 0 6px,transparent 6px 14px)' },
    event: { bg: '#FDF2F8', fg: '#500724', accent: '#DB2777', img: 'linear-gradient(135deg,#FBCFE8,#F9A8D4)', center: true },
  };

  /* ---------- projects screen ---------- */
  const SITES = [
    { id: 'northfork', name: 'Northfork Outfitters', url: 'northfork.com', th: 'northfork', edited: 'Edited yesterday by Maya Chen', astro: 'Astro 5.2' },
    { id: 'lumen', name: 'Lumen Analytics', url: 'lumen.so', th: 'lumen', status: ['green', 'Live'], edited: 'Published 3 days ago', astro: 'Astro 5.1' },
    { id: 'cedar', name: 'Cedar & Salt', url: 'cedarandsalt.co', th: 'cedar', status: ['green', 'Live'], edited: 'Published Sep 12', astro: 'Astro 4.16' },
    { id: 'tetonic', name: 'Tetonic', url: 'tetonic.dev', th: 'tetonic', status: ['green', 'Live'], edited: 'Published Sep 20', astro: 'Astro 5.2' },
    { id: 'kestrel', name: 'Kestrel Legal', url: 'kestrel-legal.com', th: 'kestrel', status: ['', 'Sandbox asleep'], edited: 'Edited Aug 30', astro: 'Astro 5.0' },
  ];
  const logo = '<span class="brand-mark"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19 L12 5 L19 19"/><path d="M8.5 13h7"/></svg></span>';
  function renderProjects() {
    document.title = 'Sites · Draftline (concept mockup)';
    const pending = S.changes.length;
    SITES[0].status = pending ? ['amber', `${pending} unpublished change${pending > 1 ? 's' : ''}`] : ['green', 'Live'];
    app.innerHTML = `
    <div class="topnav">
      <div style="display:flex;align-items:center;gap:14px">
        <div class="brand">${logo}Draftline</div>
        <span class="sep"></span>
        <button class="ws" data-act="toast" data-msg="Workspace switcher (mock)"><span class="ws-av">T</span>Tetonic ${ic('chevDown', 'sm')}</button>
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        <span class="badge">Concept mockup · sample data</span>
        <button class="btn btn-ghost" data-act="toast" data-msg="Docs (mock)">Docs</button>
        <span class="avatar">DH</span>
      </div>
    </div>
    <div class="projects fade-in">
      <h1 class="page-title">Good evening, Danny</h1>
      <p class="page-sub">Pick a site to edit, or add a new one. Edits stay in a private Draft until you publish.</p>
      <div class="start-row">
        <button class="start-card" data-act="connect">
          <span class="start-ic" style="background:#111827;color:#fff">${ic('github', 'lg')}</span>
          <span><h3>Connect an existing Astro site</h3><p>Import a GitHub repo. We spin up a private sandbox with a live preview so you can start editing right away.</p></span>
          <span class="go">${ic('arrowRight')}</span>
        </button>
        <button class="start-card" data-act="template">
          <span class="start-ic" style="background:var(--accent-soft);color:var(--accent)">${ic('template', 'lg')}</span>
          <span><h3>Start a new site from a template</h3><p>Choose a starting point and make it yours in chat. We create the GitHub repo for you.</p></span>
          <span class="go">${ic('arrowRight')}</span>
        </button>
      </div>
      <div class="section-row">
        <h2>Your sites <span class="muted" style="font-weight:400">· ${SITES.length}</span></h2>
        <label class="search">${ic('search', 'sm')}<input placeholder="Search sites"></label>
      </div>
      <div class="sites">
        ${SITES.map((s) => `
          <button class="site-card" data-act="open-site" data-id="${s.id}">
            ${thumb(TH[s.th])}
            <div class="site-meta">
              <div class="name">${esc(s.name)}<span class="icon-btn" style="width:26px;height:26px">${ic('more', 'sm')}</span></div>
              <div class="site-url">${s.url}</div>
              <div class="row"><span class="badge ${s.status[0]}">${s.status[0] ? '<span class="dot" style="background:currentColor"></span>' : ''}${s.status[1]}</span><span class="badge">${s.astro}</span></div>
              <div class="site-url" style="margin-top:10px">${s.edited}</div>
            </div>
          </button>`).join('')}
      </div>
      <div class="foot-note">Draftline is a concept mockup by Tetonic. Front end only: every site, person and number here is fictional.</div>
    </div>`;
  }

  /* ---------- editor shell ---------- */
  function renderEditor() {
    document.title = 'Northfork Outfitters · Draftline (concept mockup)';
    app.innerHTML = `
    <div class="editor">
      <div class="ebar">
        <div class="ebar-l">
          <button class="icon-btn" data-act="go-projects" data-tip="All sites">${ic('arrowLeft')}</button>
          <button class="site-switch" data-act="site-menu"><span class="fav"><svg viewBox="0 0 24 24" width="13" height="13"><path d="M2 20 L9 7 L13 13 L16 9 L22 20Z" fill="currentColor"/></svg></span>Northfork Outfitters ${ic('chevDown', 'sm')}</button>
          <span class="draft-pill" data-tip="You're editing a Draft, a private copy of the site.<br><span class='mono'>branch: draft/fall-refresh</span>">${ic('pencil', 'sm')}Draft</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <button class="page-switch" data-act="page-menu">${ic('file', 'sm')}<span id="pageName"></span><span class="path" id="pagePath"></span>${ic('chevDown', 'sm')}</button>
        </div>
        <div class="ebar-r">
          <button class="sandbox" id="sandbox" data-act="sandbox-menu"></button>
          <button class="btn btn-ghost" data-act="drawer" id="changesBtn"></button>
          <button class="btn" data-act="staging" data-tip="Open the staging preview of your Draft">${ic('eye')}Preview</button>
          <button class="btn btn-primary" data-act="publish" id="publishBtn"></button>
        </div>
      </div>
      <div class="ebody">
        <aside class="chat">
          <div class="chat-head">
            <div class="chat-title">${ic('sparkles')}Assistant</div>
            <div style="display:flex;align-items:center;gap:2px">
              <button class="model-btn" id="modelHead" data-act="model-menu"></button>
              <button class="icon-btn" data-act="toast" data-msg="New chat (mock)" data-tip="New chat">${ic('newChat')}</button>
            </div>
          </div>
          <div class="msgs" id="msgs"></div>
          <div class="composer-wrap">
            <div class="composer">
              <div class="chips" id="chips"></div>
              <textarea id="input" rows="1" placeholder="Describe a change, or click something on the page…"></textarea>
              <div class="comp-foot">
                <button class="icon-btn" data-act="toggle-select" id="compSelect" data-tip="Select elements on the page <span class='kbd'>V</span>">${ic('pointer')}</button>
                <button class="icon-btn" data-act="toast" data-msg="Attach an image (mock)" data-tip="Attach an image">${ic('image')}</button>
                <button class="model-btn" id="modelFoot" data-act="model-menu" style="margin-left:2px"></button>
                <button class="send" id="send" data-act="send" disabled>${ic('arrowUp')}</button>
              </div>
            </div>
            <div class="comp-hint">Edits save to your Draft. Nothing goes live until you publish.</div>
          </div>
        </aside>
        <main class="preview">
          <div class="ptool">
            <div class="ptool-l">
              <button class="select-toggle" id="selToggle" data-act="toggle-select">${ic('pointer')}Select <span class="kbd">V</span></button>
              <span class="hint" id="hint"></span>
            </div>
            <div class="seg" id="devices">
              <button data-act="device" data-d="desktop" data-tip="Desktop">${ic('monitor')}</button>
              <button data-act="device" data-d="tablet" data-tip="Tablet · 834px">${ic('tablet')}</button>
              <button data-act="device" data-d="mobile" data-tip="Mobile · 390px">${ic('phone')}</button>
            </div>
          </div>
          <div class="stage">
            <div class="frame" id="frame">
              <div class="fchrome">
                <div class="lights"><i></i><i></i><i></i></div>
                <div class="fnav"><button class="icon-btn" data-act="noop">${ic('arrowLeft', 'sm')}</button><button class="icon-btn" data-act="reload" data-tip="Reload preview">${ic('refresh', 'sm')}</button></div>
                <div class="url">${ic('lock', 'sm')}<span class="host">draft--northfork.draftline.app</span><span id="urlPath" style="margin-left:-7px">/</span></div>
                <button class="icon-btn" data-act="staging" data-tip="Open in new tab">${ic('external', 'sm')}</button>
              </div>
              <div class="viewport" id="vp"></div>
            </div>
          </div>
        </main>
      </div>
    </div>`;
    bindEditor();
    renderSite();
    renderChrome();
    renderChat();
    renderChips();
  }

  function renderChrome() {
    if (!$('#vp')) return;
    const p = Site.pages.find((x) => x.id === S.page);
    $('#pageName').textContent = p.name;
    $('#pagePath').textContent = p.path;
    $('#urlPath').textContent = p.path;
    const n = S.changes.length;
    $('#changesBtn').innerHTML = `${ic('history')}Changes ${n ? `<span class="count">${n}</span>` : ''}`;
    $('#publishBtn').innerHTML = `${ic('rocket')}Publish${n ? ` <span class="count">${n}</span>` : ''}`;
    $('#modelHead').innerHTML = `${claude}Claude ${S.model} ${ic('chevDown', 'sm')}`;
    $('#modelFoot').innerHTML = `${claude}${S.model}`;
    $('#sandbox').innerHTML = S.sandbox === 'working'
      ? `<span class="spinner" style="width:11px;height:11px;border-width:1.5px"></span>Sandbox running · syncing…`
      : `<span class="dot pulse"></span>Sandbox running · preview synced`;
    $('#selToggle').classList.toggle('on', S.selecting);
    $('#compSelect').classList.toggle('on', S.selecting);
    $('#vp').classList.toggle('selecting', S.selecting);
    $('#hint').innerHTML = S.selecting
      ? (S.selected.length ? `${S.selected.length} selected · click more to add · <span class="kbd">Esc</span> clears` : 'Click any element to reference it in chat')
      : 'Browsing · links behave normally';
    document.querySelectorAll('#devices button').forEach((b) => b.classList.toggle('on', b.dataset.d === S.device));
    const f = $('#frame'); f.classList.toggle('tablet', S.device === 'tablet'); f.classList.toggle('mobile', S.device === 'mobile');
  }

  /* ---------- site preview + selection ---------- */
  let hoverKey = null, popover = null;
  function renderSite(keepScroll = true) {
    const vp = $('#vp'); if (!vp) return;
    const top = vp.scrollTop;
    vp.innerHTML = `<div class="site" id="site">${Site.render(S.page, S.site)}<div class="ov-layer" id="ov"></div><div class="ov-layer" id="fx"></div></div>`;
    vp.scrollTop = keepScroll ? top : 0;
    drawOverlays();
  }
  function rel(el) {
    const r = el.getBoundingClientRect(), s = $('#site').getBoundingClientRect();
    return { top: r.top - s.top, left: r.left - s.left, w: r.width, h: r.height, sw: s.width };
  }
  const tagOf = (el) => el.tagName.toLowerCase() + (el.classList[0] ? '.' + el.classList[0] : '');
  function box(r, cls, label) {
    return `<div class="ov ${cls} ${r.top < 28 ? 'inside' : ''}" style="top:${r.top}px;left:${r.left}px;width:${r.w}px;height:${r.h}px"><div class="ov-label">${label}</div></div>`;
  }
  function drawOverlays() {
    const ov = $('#ov'); if (!ov) return;
    let html = '';
    const onPage = S.selected.filter((c) => c.page === S.page);
    S.selected.forEach((c, i) => {
      if (c.page !== S.page) return;
      const el = $(`#site [data-key="${c.key}"]`); if (!el) return;
      html += box(rel(el), 'sel', `<span class="n">${i + 1}</span>${esc(c.name)}`);
    });
    if (hoverKey && S.selecting && !onPage.some((c) => c.key === hoverKey)) {
      const el = $(`#site [data-key="${hoverKey}"]`);
      if (el) html += box(rel(el), 'hover', tagOf(el));
    }
    const last = onPage[onPage.length - 1];
    if (last && S.selecting && !S.busy) {
      const el = $(`#site [data-key="${last.key}"]`);
      if (el) {
        const r = rel(el);
        const below = r.w < 420 || r.top < 44;
        const top = below ? r.top + r.h + 10 : r.top - 42;
        let left = below ? r.left : r.left + r.w - 270;
        left = Math.max(8, Math.min(left, r.sw - 280));
        const text = el.hasAttribute('data-text');
        html += `<div class="actbar" style="top:${top}px;left:${left}px">
          ${text ? `<button data-act="edit-text" data-key="${last.key}">${ic('pencil', 'sm')}Edit text</button>` : ''}
          <button data-act="edit-color" data-key="${last.key}">${ic('palette', 'sm')}Color</button>
          <button data-act="ask-ai">${ic('sparkles', 'sm')}Ask AI</button>
          <span class="div"></span>
          <button data-act="deselect" data-key="${last.key}" data-tip="Deselect" style="padding:0 7px">${ic('x', 'sm')}</button>
        </div>`;
        if (popover && popover.key === last.key) html += popHTML(popover, el, { top: top + 42, left: Math.max(8, Math.min(left, r.sw - 312)) });
      }
    }
    ov.innerHTML = html;
    const ta = ov.querySelector('.pop textarea');
    if (ta && popover && !popover.focused) { ta.focus(); ta.select(); popover.focused = true; }
  }

  const SWATCHES = [['Forest', '#2E4A3A'], ['Ember', '#C2562B'], ['Lake', '#3F6E8C'], ['Sand', '#D9B98C'], ['Ink', '#1F2621'], ['Snow', '#FFFFFF']];
  function popHTML(p, el, pos) {
    if (p.type === 'text') {
      return `<div class="pop" style="top:${pos.top}px;left:${pos.left}px">
        <h4>Edit text <span class="muted mono" style="text-transform:none;letter-spacing:0;font-weight:400">${tagOf(el)}</span></h4>
        <textarea id="popText">${esc(el.innerText.trim())}</textarea>
        <div class="pop-foot"><span class="muted" style="font-size:12px">Saves to Draft, no AI needed</span><span style="display:flex;gap:6px"><button class="btn" data-act="pop-cancel">Cancel</button><button class="btn btn-primary" data-act="pop-save-text" data-key="${p.key}">Save</button></span></div>
      </div>`;
    }
    const isBg = /nf-btn|announce|news|quote|nf-card|nf-nav|nf-footer|nf-press/.test(el.className);
    const prop = isBg ? 'bg' : 'fg';
    const cur = (S.site.color[p.key] || {})[prop];
    return `<div class="pop" style="top:${pos.top}px;left:${pos.left}px">
      <h4>${prop === 'bg' ? 'Background' : 'Text color'} <span class="muted" style="text-transform:none;letter-spacing:0;font-weight:400">Brand palette</span></h4>
      <div class="swatches">${SWATCHES.map(([n, c]) => `<button class="sw ${cur === c ? 'on' : ''}" style="background:${c}" data-act="pop-color" data-key="${p.key}" data-prop="${prop}" data-c="${c}" data-n="${n}" data-tip="${n} <span class='mono'>${c}</span>"></button>`).join('')}</div>
      <div class="sw-row"><span>Something custom? <a href="#" data-act="ask-ai" style="color:var(--accent);text-decoration:none;font-weight:500">Ask AI</a></span><button class="btn btn-ghost" style="height:26px;font-size:12px" data-act="pop-color" data-key="${p.key}" data-prop="${prop}" data-c="">Reset</button></div>
    </div>`;
  }

  function toggleSelect(el) {
    const key = el.dataset.key;
    const i = S.selected.findIndex((c) => c.key === key && c.page === S.page);
    popover = null;
    if (i >= 0) S.selected.splice(i, 1);
    else S.selected.push({ key, name: el.dataset.name, tag: tagOf(el), file: el.dataset.file, page: S.page });
    renderChips(); renderChrome(); drawOverlays();
  }

  function bindEditor() {
    const vp = $('#vp');
    vp.addEventListener('mousemove', (e) => {
      if (!S.selecting || e.target.closest('.actbar,.pop')) return;
      const el = e.target.closest('#site [data-key]');
      const k = el ? el.dataset.key : null;
      if (k !== hoverKey) { hoverKey = k; drawOverlays(); }
    });
    vp.addEventListener('mouseleave', () => { if (hoverKey) { hoverKey = null; drawOverlays(); } });
    vp.addEventListener('click', (e) => {
      if (e.target.closest('.actbar,.pop')) return;
      if (e.target.closest('a')) e.preventDefault();
      if (!S.selecting) return;
      e.preventDefault();
      const el = e.target.closest('#site [data-key]');
      if (el) toggleSelect(el); else if (popover) { popover = null; drawOverlays(); }
    });
    new ResizeObserver(() => drawOverlays()).observe(vp);
    const input = $('#input');
    input.addEventListener('input', () => { autosize(); updateSend(); });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });
  }
  function autosize() { const t = $('#input'); t.style.height = 'auto'; t.style.height = Math.min(t.scrollHeight, 140) + 'px'; }
  function updateSend() { const b = $('#send'); if (b) b.disabled = S.busy || (!$('#input').value.trim() && !S.selected.length); }

  function chipHTML(c, removable) {
    return `<span class="chip" data-tip="${esc(c.name)} · <span class='mono'>${c.tag}</span><br><span class='mono'>${c.file}</span>">${ic('element')}${esc(c.name)}${removable ? `<button class="x" data-act="rm-chip" data-key="${c.key}" data-page="${c.page}">${ic('x', 'sm')}</button>` : ''}</span>`;
  }
  function renderChips() {
    const el = $('#chips'); if (!el) return;
    el.innerHTML = S.selected.map((c) => chipHTML(c, true)).join('');
    el.style.display = S.selected.length ? 'flex' : 'none';
    updateSend();
  }

  /* ---------- chat ---------- */
  const HERO_FILES = [
    { path: 'src/components/Hero.astro', add: 2, del: 2, lines: [
      ['ctx', 12, '  <p class="eyebrow">{eyebrow}</p>'],
      ['del', 14, '  <h1 class="hero-title">Built for the places maps forget.</h1>'],
      ['add', 14, '  <h1 class="hero-title">Gear built for the long way up.</h1>'],
      ['ctx', 17, '  <p class="hero-sub">{subheading}</p>'],
      ['del', 21, '  <Button href="/shop">Shop the collection</Button>'],
      ['add', 21, '  <Button href="/shop" variant="ember">Shop the collection</Button>'],
    ] },
    { path: 'src/styles/buttons.css', add: 3, del: 0, lines: [
      ['ctx', 17, '.btn--primary { background: var(--forest-700); }'],
      ['add', 18, '.btn--ember { background: var(--ember-600); }'],
      ['add', 19, '.btn--ember:hover { background: var(--ember-700); }'],
      ['add', 20, '.btn--ember:focus-visible { outline-color: var(--ember-300); }'],
    ] },
  ];
  const diffHTML = (f) => `<div class="diff">${f.lines.map(([k, n, t]) => `<div class="${k}"><span class="ln">${n}</span>${k === 'add' ? '+ ' : k === 'del' ? '- ' : '  '}${esc(t)}</div>`).join('')}</div>`;
