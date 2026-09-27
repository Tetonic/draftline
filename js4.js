/* Draftline concept mockup (front end only, fictional data). Scripts share top-level scope; load order matters. */
  /* ---------- direct edits (no AI) ---------- */
  function addDirectChange(key, title, prevFn, icon) {
    const el = $(`#site [data-key="${key}"]`);
    const name = el ? el.dataset.name : key, file = el ? el.dataset.file : 'src/pages/index.astro';
    const h = hash();
    S.changes.unshift({ id: 'd' + h, title, who: 'You', kind: 'you', time: 'Just now', hash: h, files: [{ path: file.split(':')[0], add: 1, del: 1 }], revert: prevFn });
    renderChrome();
    push({ t: 'sys', html: `${ic(icon, 'sm')}You edited <b style="color:var(--text2);font-weight:500">${esc(name)}</b> directly · saved as <span class="hash">${h}</span>` });
  }
  function directText(key, val) {
    const el = $(`#site [data-key="${key}"]`); if (!el || !val) return;
    const prev = S.site.text[key], name = el.dataset.name;
    S.site.text[key] = val; popover = null; renderSite(); flash([key]);
    addDirectChange(key, `Edited text: ${name}`, () => { if (prev == null) delete S.site.text[key]; else S.site.text[key] = prev; }, 'pencil');
  }
  function directColor(key, prop, c, n) {
    const el = $(`#site [data-key="${key}"]`); if (!el) return;
    const prev = S.site.color[key] ? { ...S.site.color[key] } : null, name = el.dataset.name;
    if (c) S.site.color[key] = { ...(S.site.color[key] || {}), [prop]: c }; else delete S.site.color[key];
    renderSite(); flash([key]);
    addDirectChange(key, c ? `Changed ${name.toLowerCase()} color to ${n}` : `Reset ${name.toLowerCase()} color`, () => { if (prev) S.site.color[key] = prev; else delete S.site.color[key]; }, 'palette');
  }
  function revertChange(id, fromDrawer) {
    const i = S.changes.findIndex((c) => c.id === id); if (i < 0) return;
    const c = S.changes[i]; c.revert(); S.changes.splice(i, 1); confirmId = null;
    S.msgs.forEach((m) => { if (m.t === 'changes' && m.changeId === id) m.state = 'undone'; });
    renderSite(); renderChrome(); renderChatKeep(); if (fromDrawer) renderDrawer();
    toast(`Reverted “${esc(c.title)}”`);
  }
  const clearSel = () => { S.selected = []; popover = null; renderChips(); renderChrome(); drawOverlays(); };

  /* ---------- actions ---------- */
  const setInput = (v) => { const i = $('#input'); i.value = v; autosize(); updateSend(); i.focus(); };
  const A = {
    'noop': () => {},
    'toast': (el) => toast(el.dataset.msg),
    'go-projects': () => { location.hash = '#/'; },
    'open-site': (el) => {
      if (el.dataset.id === 'northfork') location.hash = '#/editor';
      else { toast('Only Northfork is wired up in this mockup. Opening it instead…'); setTimeout(() => { location.hash = '#/editor'; }, 900); }
    },
    'connect': () => renderConnect(),
    'template': () => renderTemplates(),
    'pick-tpl': (el) => { tplSel = +el.dataset.i; renderTemplates(); },
    'import': (el) => renderSetup(el.dataset.name),
    'close-layer': () => { layer.innerHTML = ''; confirmId = null; },
    'close-layer-bg': (el, e) => { if (e.target === el) A['close-layer'](); },
    'toggle-select': () => { S.selecting = !S.selecting; if (!S.selecting) { hoverKey = null; popover = null; } renderChrome(); drawOverlays(); },
    'device': (el) => { S.device = el.dataset.d; renderChrome(); setTimeout(drawOverlays, 400); },
    'reload': () => { renderSite(false); toast('Preview reloaded'); },
    'page-menu': (el) => openMenu(el, `<div class="mhead">Pages</div>${Site.pages.map((p) => `<button class="mi ${p.id === S.page ? 'on' : ''}" data-act="goto-page" data-p="${p.id}">${ic('file', 'sm')}${p.name}<span class="sub">${p.path}</span>${p.id === S.page ? `<span class="check" style="margin-left:8px">${ic('check', 'sm')}</span>` : ''}</button>`).join('')}<div class="mdiv"></div><button class="mi" data-act="new-page">${ic('plus', 'sm')}New page<span class="sub">ask the assistant</span></button>`, 'center'),
    'goto-page': (el) => { S.page = el.dataset.p; popover = null; hoverKey = null; renderSite(false); renderChrome(); },
    'new-page': () => setInput('Create a new “Stores” page listing our three locations, and add it to the nav.'),
    'model-menu': (el) => openMenu(el, `<div class="mhead">Model</div>
      ${[['Opus 5.5', 'Most capable · default'], ['Sonnet 5', 'Faster for small edits'], ['Haiku 5', 'Quickest, simple copy tweaks']].map(([n, d]) => `<button class="mi ${S.model === n ? 'on' : ''}" data-act="set-model" data-m="${n}">${claude}<span>Claude ${n}<span class="mi-desc">${d}</span></span>${S.model === n ? `<span class="check">${ic('check', 'sm')}</span>` : ''}</button>`).join('')}`, el.id === 'modelFoot' ? 'left' : 'right'),
    'set-model': (el) => { S.model = el.dataset.m; renderChrome(); },
    'site-menu': (el) => openMenu(el, `<button class="mi" data-act="go-projects">${ic('grid', 'sm')}All sites</button><button class="mi" data-act="toast" data-msg="Site settings (mock)">${ic('settings', 'sm')}Site settings</button><button class="mi" data-act="toast" data-msg="Would open tetonic/northfork-site on GitHub (mock)">${ic('github', 'sm')}Open repo on GitHub<span class="sub">northfork-site</span></button>`),
    'sandbox-menu': (el) => openMenu(el, `<div style="padding:10px 12px 8px;width:300px"><div style="display:flex;align-items:center;gap:8px;font-weight:600"><span class="dot pulse"></span>Sandbox running</div>
      <div style="margin-top:10px;display:grid;grid-template-columns:auto 1fr;gap:7px 16px;font-size:12.5px"><span class="muted">Provider</span><span>Vercel Sandbox · iad1</span><span class="muted">Preview server</span><span class="mono">astro dev · :4321</span><span class="muted">Draft branch</span><span class="mono">draft/fall-refresh</span><span class="muted">Preview</span><span>Synced a few seconds ago</span><span class="muted">Sleeps after</span><span>30 min idle</span></div></div>
      <div class="mdiv"></div><button class="mi" data-act="toast" data-msg="Sandbox restarted (mock)">${ic('refresh', 'sm')}Restart sandbox</button><button class="mi" data-act="toast" data-msg="Would open a terminal in the sandbox (mock)">${ic('terminal', 'sm')}Open terminal<span class="sub">for developers</span></button>`, 'right'),
    'staging': () => toast('Staging preview: draft--northfork.draftline.app (mock URL)'),
    'drawer': () => { confirmId = null; renderDrawer(); },
    'ask-revert': (el) => { confirmId = el.dataset.id; renderDrawer(); },
    'cancel-revert': () => { confirmId = null; renderDrawer(); },
    'do-revert': (el) => revertChange(el.dataset.id, true),
    'publish': () => { pub = { state: 'review' }; renderPublish(); },
    'do-publish': () => doPublish(),
    'send': () => send(),
    'suggest': (el) => setInput(el.dataset.text),
    'rm-chip': (el) => { S.selected = S.selected.filter((c) => !(c.key === el.dataset.key && c.page === el.dataset.page)); popover = null; renderChips(); renderChrome(); drawOverlays(); },
    'deselect': (el) => { S.selected = S.selected.filter((c) => !(c.key === el.dataset.key && c.page === S.page)); popover = null; renderChips(); renderChrome(); drawOverlays(); },
    'ask-ai': () => { popover = null; drawOverlays(); $('#input').focus(); },
    'edit-text': (el) => { popover = popover && popover.key === el.dataset.key && popover.type === 'text' ? null : { key: el.dataset.key, type: 'text' }; drawOverlays(); },
    'edit-color': (el) => { popover = popover && popover.key === el.dataset.key && popover.type === 'color' ? null : { key: el.dataset.key, type: 'color' }; drawOverlays(); },
    'pop-cancel': () => { popover = null; drawOverlays(); },
    'pop-save-text': (el) => directText(el.dataset.key, $('#popText').value.trim()),
    'pop-color': (el) => directColor(el.dataset.key, el.dataset.prop, el.dataset.c, el.dataset.n),
    'toggle-work': (el) => { const m = S.msgs[+el.dataset.i]; m.open = !m.open; renderChatKeep(); },
    'toggle-diff': (el) => { const m = S.msgs[+el.dataset.i], f = +el.dataset.f; m.open = m.open.includes(f) ? m.open.filter((x) => x !== f) : m.open.concat(f); renderChatKeep(); },
    'keep-change': (el) => { S.msgs[+el.dataset.i].state = 'kept'; renderChatKeep(); toast('Kept. It’s saved in your Draft.'); },
    'undo-change': (el) => { const m = S.msgs[+el.dataset.i]; revertChange(m.changeId, false); m.state = 'undone'; renderChatKeep(); },
    'view-on-page': () => {
      if (S.page !== 'home') { S.page = 'home'; renderSite(false); renderChrome(); }
      $('#vp').scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => flash(['heroTitle', 'heroCta']), 350);
    },
  };

  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-act]');
    const inMenu = e.target.closest('.menu');
    if (menuEl && (!inMenu || a) && !(a && /-menu$/.test(a.dataset.act) && !inMenu)) closeMenu();
    if (!a) return;
    if (a.tagName === 'A') e.preventDefault();
    hideTip();
    const f = A[a.dataset.act]; if (f) f(a, e);
  });
  document.addEventListener('keydown', (e) => {
    const typing = /INPUT|TEXTAREA/.test(document.activeElement.tagName);
    if (e.key === 'Escape') {
      if (menuEl) return closeMenu();
      if (layer.innerHTML && pub.state !== 'publishing') return A['close-layer']();
      if (popover) { popover = null; return drawOverlays(); }
      if (S.selected.length && $('#vp')) clearSel();
      return;
    }
    if (!typing && !layer.innerHTML && (e.key === 'v' || e.key === 'V') && !e.metaKey && !e.ctrlKey && $('#vp')) A['toggle-select']();
  });

  /* ---------- router ---------- */
  function route() {
    layer.innerHTML = ''; closeMenu(); hideTip(); hoverKey = null; popover = null;
    if (location.hash.startsWith('#/editor')) renderEditor(); else renderProjects();
  }
  window.addEventListener('hashchange', route);
  window.__mock = { S, A };
  route();
