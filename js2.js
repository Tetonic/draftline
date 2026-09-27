/* Draftline concept mockup (front end only, fictional data). Scripts share top-level scope; load order matters. */

  const fi = (m) => (m._seen ? '' : ' fade-in');
  function msgHTML(m, idx) {
    switch (m.t) {
      case 'welcome':
        return `<div class="welcome${fi(m)}">
          <div class="wl-ic">${ic('sparkles', 'lg')}</div>
          <h3>Northfork is ready to edit</h3>
          <p>You're working in a private Draft, so nothing goes live until you publish. Click anything on the page to point at it, then tell me what to change.</p>
          <div class="sugg-label">Try one of these</div>
          <div class="sugg">
            <button data-act="suggest" data-text="Change the headline to “${NEW_HEADLINE}” and make the button our Ember orange.">${ic('sparkles', 'sm')}Refresh the hero headline and button</button>
            <button data-act="suggest" data-text="Add a short FAQ section above the footer with 4 questions about repairs.">${ic('sparkles', 'sm')}Add an FAQ section above the footer</button>
            <button data-act="suggest" data-text="Improve the page title and meta description for SEO.">${ic('sparkles', 'sm')}Improve the SEO title and description</button>
          </div>
        </div>`;
      case 'user':
        return `<div class="m-user${fi(m)}">${m.chips.length ? `<div class="chips">${m.chips.map((c) => chipHTML(c, false)).join('')}</div>` : ''}${esc(m.text)}</div>`;
      case 'typing':
        return `<div class="m-ai"><span class="typing"><i></i><i></i><i></i></span></div>`;
      case 'ai':
        return `<div class="m-ai${fi(m)}">${m.thought ? `<span class="thought">${ic('sparkles', 'sm')}Thought for ${m.thought}s</span>` : ''}${m.html}</div>`;
      case 'work': {
        const done = m.steps.every((s) => s.done), nd = m.steps.filter((s) => s.done).length;
        return `<div class="work${fi(m)}">
          <div class="work-head" data-act="toggle-work" data-i="${idx}" style="cursor:pointer">${done ? `<span style="color:var(--green);display:flex">${ic('checkCircle')}</span>` : '<span class="spinner"></span>'}${done ? `Worked for ${m.secs}s` : 'Working…'}<span class="muted">${nd}/${m.steps.length} steps ${ic(m.open ? 'chevDown' : 'chevRight', 'sm')}</span></div>
          ${m.open ? `<div class="work-steps">${m.steps.map((s) => `<div class="step ${s.done ? '' : 'pending'}">${s.done ? ic('check', 'sm') : s.active ? '<span class="spinner" style="width:12px;height:12px"></span>' : ic('commit', 'sm')}${s.label} ${s.file ? `<span class="mono">${s.file}</span>` : ''}</div>`).join('')}</div>` : ''}
        </div>`;
      }
      case 'changes': {
        const add = m.files.reduce((a, f) => a + f.add, 0), del = m.files.reduce((a, f) => a + f.del, 0);
        return `<div class="changes${fi(m)}">
          <div class="changes-head">${ic('file')}<b>${m.files.length} file${m.files.length > 1 ? 's' : ''} changed</b><span class="plus">+${add}</span><span class="minus">−${del}</span><span style="margin-left:auto" class="hash" data-tip="Saved as a commit on <span class='mono'>draft/fall-refresh</span>">${m.hash}</span></div>
          ${m.files.map((f, fi) => {
            const dir = f.path.slice(0, f.path.lastIndexOf('/') + 1), name = f.path.slice(dir.length), open = m.open.includes(fi);
            return `<div class="file-row ${open ? 'open' : ''}" data-act="toggle-diff" data-i="${idx}" data-f="${fi}">${ic('chevRight', 'sm chev')}<span><span class="fdir">${dir}</span><span class="fname">${name}</span></span><span class="stats"><span class="plus">+${f.add}</span><span class="minus">−${f.del}</span></span></div>${open ? diffHTML(f) : ''}`;
          }).join('')}
          <div class="changes-foot">
            ${m.state === 'pending' ? `<button class="btn" data-act="undo-change" data-i="${idx}">${ic('undo', 'sm')}Undo</button><button class="btn btn-primary" data-act="keep-change" data-i="${idx}">${ic('check', 'sm')}Keep</button>`
              : m.state === 'kept' ? `<span class="state"><span style="color:var(--green);display:flex">${ic('checkCircle', 'sm')}</span>Kept · saved to Draft</span>`
              : `<span class="state">${ic('undo', 'sm')}Undone · previous version restored</span>`}
            <button class="btn btn-ghost" style="margin-left:auto" data-act="view-on-page">${ic('eye', 'sm')}View on page</button>
          </div>
        </div>`;
      }
      case 'sys':
        return `<div class="m-sys${fi(m)}">${m.html}</div>`;
    }
    return '';
  }
  function renderChat() { const el = $('#msgs'); if (!el) return; el.innerHTML = S.msgs.map(msgHTML).join(''); S.msgs.forEach((m) => { m._seen = true; }); el.scrollTop = el.scrollHeight; }
  function renderChatKeep() { const el = $('#msgs'); if (!el) return; const t = el.scrollTop; el.innerHTML = S.msgs.map(msgHTML).join(''); S.msgs.forEach((m) => { m._seen = true; }); el.scrollTop = t; }
  const push = (m) => { S.msgs.push(m); renderChat(); return m; };
  const unpush = (m) => { S.msgs.splice(S.msgs.indexOf(m), 1); };
  function setSandbox(v) { S.sandbox = v; renderChrome(); }

  async function send() {
    if (S.busy) return;
    const input = $('#input');
    const text = input.value.trim();
    if (!text && !S.selected.length) return;
    const chips = S.selected.slice();
    push({ t: 'user', text: text || 'Can you tweak these?', chips });
    input.value = ''; autosize();
    S.selected = []; popover = null; hoverKey = null;
    S.busy = true; renderChips(); renderChrome(); drawOverlays(); updateSend();
    const keys = chips.map((c) => c.key);
    const wantsHero = !S.heroDone && (keys.includes('heroTitle') || keys.includes('heroCta') || /headline|hero/i.test(text));
    const quoted = (text.match(/[“"]([^”"]+)[”"]/) || [])[1];
    const textChip = chips.find((c) => { const el = $(`#site [data-key="${c.key}"]`); return el && el.hasAttribute('data-text'); });
    try {
      if (wantsHero) await heroScript();
      else if (quoted && textChip) await textScript(textChip, quoted);
      else await genericScript();
    } finally { S.busy = false; renderChrome(); drawOverlays(); updateSend(); }
  }

  async function runSteps(steps, per = 650) {
    const w = push({ t: 'work', open: true, secs: Math.round((steps.length * per) / 1000 + 2), steps: steps.map((s) => ({ ...s, done: false })) });
    for (const s of w.steps) { s.active = true; renderChat(); await sleep(per); s.active = false; s.done = true; }
    w.open = false; renderChat();
  }

  async function heroScript() {
    const typing = push({ t: 'typing' }); await sleep(900); unpush(typing);
    push({ t: 'ai', thought: 4, html: `<p>Here's my plan:</p><ol>
      <li>Change the headline in <code>Hero.astro</code> to “${NEW_HEADLINE}”</li>
      <li>Add an <code>ember</code> button style and use it for the hero button only, so your other buttons stay green</li>
      <li>Check color contrast, then refresh the preview</li></ol>` });
    await sleep(700);
    setSandbox('working');
    await runSteps([
      { label: 'Read', file: 'src/components/Hero.astro' },
      { label: 'Read', file: 'src/components/Button.astro' },
      { label: 'Edited', file: 'Hero.astro' },
      { label: 'Edited', file: 'src/styles/buttons.css' },
      { label: 'Refreshed preview' },
    ]);
    S.site.headline = NEW_HEADLINE; S.site.ember = true; S.heroDone = true;
    if (S.page !== 'home') S.page = 'home';
    renderSite(); flash(['heroTitle', 'heroCta']);
    setSandbox('synced');
    const h = 'a41c9e2';
    S.changes.unshift({ id: 'hero', title: 'Updated hero headline and button color', who: 'Assistant', kind: 'ai', time: 'Just now', hash: h,
      files: HERO_FILES.map(({ path, add, del }) => ({ path, add, del })),
      revert: () => { S.site.headline = ORIGINAL_HEADLINE; S.site.ember = false; S.heroDone = false; } });
    renderChrome();
    push({ t: 'ai', html: `<p>Done. The hero now reads <b>“${NEW_HEADLINE}”</b> and the button uses Ember <code>#C2562B</code>. White text on Ember has a 4.7:1 contrast ratio, which passes WCAG AA.</p>` });
    push({ t: 'changes', changeId: 'hero', hash: h, files: HERO_FILES, open: [0], state: 'pending' });
  }

  async function textScript(chip, value) {
    const typing = push({ t: 'typing' }); await sleep(800); unpush(typing);
    const [path, line] = chip.file.split(':'), fname = path.split('/').pop();
    push({ t: 'ai', thought: 2, html: `<p>I'll update the <b>${esc(chip.name.toLowerCase())}</b> text in <code>${fname}</code>.</p>` });
    setSandbox('working');
    await runSteps([{ label: 'Read', file: path }, { label: 'Edited', file: fname }, { label: 'Refreshed preview' }], 550);
    const el = $(`#site [data-key="${chip.key}"]`); const before = el ? el.innerText.trim() : '';
    const prev = S.site.text[chip.key]; S.site.text[chip.key] = value;
    renderSite(); flash([chip.key]); setSandbox('synced');
    const h = hash(), id = 'c' + h;
    S.changes.unshift({ id, title: `Updated ${chip.name.toLowerCase()} text`, who: 'Assistant', kind: 'ai', time: 'Just now', hash: h, files: [{ path, add: 1, del: 1 }],
      revert: () => { if (prev == null) delete S.site.text[chip.key]; else S.site.text[chip.key] = prev; } });
    renderChrome();
    push({ t: 'ai', html: `<p>Done. It now reads “${esc(value)}”.</p>` });
    push({ t: 'changes', changeId: id, hash: h, files: [{ path, add: 1, del: 1, lines: [['del', line, '  ' + before], ['add', line, '  ' + value]] }], open: [0], state: 'pending' });
  }

  async function genericScript() {
    const typing = push({ t: 'typing' }); await sleep(900); unpush(typing);
    push({ t: 'ai', thought: 3, html: `<p>Happy to help. In the real product I'd read the relevant Astro components, make the edit, and save it to your Draft as a new change.</p><p class="muted" style="font-size:12.5px;line-height:1.55">This is a clickable mockup, so only a few scripted edits are wired up. Try selecting the <b>hero heading</b> and <b>hero button</b>, or select any text and ask for new wording in quotes.</p>` });
  }

  function flash(keys) {
    const ov = $('#fx'); if (!ov) return;
    keys.forEach((k) => {
      const el = $(`#site [data-key="${k}"]`); if (!el) return;
      const r = rel(el), d = document.createElement('div');
      d.className = 'ov sel flash';
      d.style.cssText = `top:${r.top}px;left:${r.left}px;width:${r.w}px;height:${r.h}px;transition:opacity 1.2s ease;`;
      ov.appendChild(d);
      setTimeout(() => { d.style.opacity = '0'; }, 900);
      setTimeout(() => d.remove(), 2200);
    });
  }

