/* Fictional sample site ("Northfork Outfitters") rendered inside the editor preview.
   Every name, price and review here is made up for the mockup. */
(function () {
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  let S;
  const T = (k, d) => esc(S.text[k] != null ? S.text[k] : d);
  const st = (k, extra) => {
    const c = S.color[k] || {};
    let css = extra || '';
    if (c.bg) css += `background:${c.bg};border-color:${c.bg};`;
    if (c.fg) css += `color:${c.fg};`;
    return css ? ` style="${css}"` : '';
  };
  const sel = (key, name, file, text) =>
    `data-key="${key}" data-name="${name}" data-file="${file}"${text ? ' data-text' : ''}${st(key)}`;

  const mountains = `
  <svg viewBox="0 0 600 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6EBDD"/><stop offset="1" stop-color="#EBD6BA"/></linearGradient>
      <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FA79B"/><stop offset="1" stop-color="#6F8C7E"/></linearGradient>
    </defs>
    <rect width="600" height="520" fill="url(#sky)"/>
    <circle cx="420" cy="150" r="54" fill="#E8A462" opacity=".9"/>
    <path d="M0 300 L90 200 L150 250 L240 140 L330 240 L400 180 L480 250 L540 210 L600 250 L600 520 L0 520Z" fill="#B7C3B3"/>
    <path d="M240 140 L268 172 L252 170 L240 182 L226 168 L214 172Z" fill="#F7F1E8"/>
    <path d="M0 360 L70 290 L130 330 L210 250 L300 340 L380 280 L470 350 L540 300 L600 330 L600 520 L0 520Z" fill="#7F9A86"/>
    <path d="M0 420 L60 380 L140 410 L230 360 L330 420 L420 380 L520 420 L600 395 L600 520 L0 520Z" fill="#48685A"/>
    <g fill="#2E4A3A">
      ${[30, 62, 96, 470, 505, 540, 572].map((x, i) => `<path d="M${x} ${470 - (i % 3) * 8} l14 -46 l14 46z"/>`).join('')}
    </g>
    <rect y="468" width="600" height="52" fill="url(#lake)"/>
    <path d="M0 468 H600" stroke="#F6EBDD" stroke-opacity=".4"/>
  </svg>`;

  const prodArt = {
    shell: `<svg viewBox="0 0 120 120"><path d="M42 26 L60 20 L78 26 L96 40 L90 58 L82 54 L82 98 L38 98 L38 54 L30 58 L24 40Z" fill="#3F6653"/><path d="M60 20 V98" stroke="#2A4638" stroke-width="2"/><path d="M52 22 Q60 34 68 22" fill="none" stroke="#2A4638" stroke-width="3"/></svg>`,
    pack: `<svg viewBox="0 0 120 120"><rect x="34" y="24" width="52" height="76" rx="16" fill="#C2562B"/><rect x="42" y="58" width="36" height="30" rx="8" fill="#A7461F"/><path d="M48 24 Q60 10 72 24" fill="none" stroke="#7A3316" stroke-width="4"/><rect x="42" y="36" width="36" height="6" rx="3" fill="#A7461F"/></svg>`,
    hoodie: `<svg viewBox="0 0 120 120"><path d="M44 30 Q60 14 76 30 L94 44 L88 62 L82 58 L82 98 L38 98 L38 58 L32 62 L26 44Z" fill="#D9B98C"/><path d="M38 52 H82 M38 66 H82 M38 80 H82" stroke="#C4A172" stroke-width="3"/><path d="M50 30 Q60 42 70 30" fill="#C4A172"/></svg>`,
    bottle: `<svg viewBox="0 0 120 120"><rect x="46" y="16" width="28" height="14" rx="4" fill="#2B2F33"/><rect x="40" y="30" width="40" height="72" rx="12" fill="#5B7C99"/><rect x="40" y="52" width="40" height="18" fill="#4A6882"/></svg>`,
  };

  const products = [
    ['product1', 'Ridgeline 3L Shell', '$289', 'shell', '#E7EDE8', 'Waterproof · 410 g'],
    ['product2', 'Talus 28 Daypack', '$149', 'pack', '#F4E4DA', 'Recycled ripstop'],
    ['product3', 'Ember Down Hoodie', '$229', 'hoodie', '#F3ECE1', '800-fill RDS down'],
    ['product4', 'Kettle Insulated Bottle', '$38', 'bottle', '#E4EAF0', '24 oz · keeps cold 24h'],
  ];

  const nav = () => `
    ${S.announce ? `<div class="nf-announce" ${sel('announce', 'Announcement bar', 'src/components/Announcement.astro:6', true)}>${T('announce', 'Fall Sale: 20% off packs and shells through Oct 12.')} <a href="#">Shop the sale →</a></div>` : ''}
    <header class="nf-nav" ${sel('nav', 'Navigation', 'src/components/Nav.astro:9')}>
      <a class="nf-logo" href="#"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M2 20 L9 7 L13 13 L16 9 L22 20Z" fill="currentColor"/></svg>Northfork</a>
      <nav class="nf-links"><a href="#">Shop</a><a href="#">Journal</a><a href="#">Repairs</a><a href="#">About</a></nav>
      <div class="nf-nav-r"><a href="#">Search</a><a href="#" class="nf-cart">Cart (2)</a></div>
    </header>`;

  const footer = () => `
    <footer class="nf-footer" ${sel('footer', 'Footer', 'src/components/Footer.astro:4')}>
      <div class="nf-footer-brand"><div class="nf-logo"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M2 20 L9 7 L13 13 L16 9 L22 20Z" fill="currentColor"/></svg>Northfork</div><p>Outdoor gear designed in Bozeman, Montana. Repaired for life.</p></div>
      <div><h5>Shop</h5><a>Shells</a><a>Packs</a><a>Layers</a><a>Accessories</a></div>
      <div><h5>Company</h5><a>About</a><a>Journal</a><a>Careers</a><a>Stores</a></div>
      <div><h5>Help</h5><a>Repairs</a><a>Shipping</a>${S.warranty ? '<a>Warranty</a>' : ''}<a>Contact</a></div>
      <div class="nf-footer-base">© 2026 Northfork Outfitters (fictional brand, sample content)</div>
    </footer>`;

  const pages = {
    home: () => `
    ${nav()}
    <section class="nf-hero">
      <div class="nf-hero-copy">
        <p class="nf-eyebrow" ${sel('eyebrow', 'Hero eyebrow', 'src/components/Hero.astro:12', true)}>${T('eyebrow', 'Fall ’26 Collection')}</p>
        <h1 class="hero-title" ${sel('heroTitle', 'Hero heading', 'src/components/Hero.astro:14', true)}>${T('heroTitle', S.headline)}</h1>
        <p class="hero-sub" ${sel('heroSub', 'Hero subheading', 'src/components/Hero.astro:17', true)}>${T('heroSub', 'Weatherproof shells, packs and layers, designed in Bozeman and repaired for life.')}</p>
        <div class="nf-ctas">
          <a href="#" class="nf-btn hero-cta${S.ember ? ' is-ember' : ''}" ${sel('heroCta', 'Hero button', 'src/components/Hero.astro:21', true)}>${T('heroCta', 'Shop the collection')}</a>
          <a href="#" class="nf-textlink" ${sel('heroLink', 'Hero secondary link', 'src/components/Hero.astro:24', true)}>${T('heroLink', 'Our repair promise →')}</a>
        </div>
        <div class="nf-rating"><span>★★★★★</span> 4.9 from 12,400 trail reviews</div>
      </div>
      <div class="nf-hero-art" ${sel('heroArt', 'Hero image', 'src/components/Hero.astro:30')}>${mountains}</div>
    </section>
    <section class="nf-press" ${sel('press', 'Press logos', 'src/components/Press.astro:3')}>
      <span>Featured in</span><b>Trailhead Weekly</b><b>ALPINE REVIEW</b><b>The Switchback</b><b>Field&nbsp;&amp;&nbsp;Ridge</b>
    </section>
    <section class="nf-section">
      <div class="nf-section-head">
        <h2 ${sel('productsTitle', 'Products heading', 'src/components/FeaturedProducts.astro:8', true)}>${T('productsTitle', 'Fall essentials')}</h2>
        <a href="#" class="nf-textlink">View all gear →</a>
      </div>
      <div class="nf-grid">
        ${products.map(([k, n, p, a, bg, m]) => `
          <a href="#" class="nf-card" ${sel(k, n + ' card', 'src/components/ProductCard.astro:5')}>
            <div class="nf-card-img" style="background:${bg}">${prodArt[a]}</div>
            <div class="nf-card-body"><div><div class="nf-card-name">${n}</div><div class="nf-card-meta">${m}</div></div><div class="nf-card-price">${p}</div></div>
          </a>`).join('')}
      </div>
    </section>
    <section class="nf-split">
      <div class="nf-split-art" ${sel('splitArt', 'Repairs image', 'src/components/RepairPromise.astro:6')}>
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><rect width="400" height="300" fill="#2E4A3A"/><circle cx="200" cy="150" r="92" fill="none" stroke="#E8A462" stroke-width="2" stroke-dasharray="6 8"/><path d="M160 190 L240 110 M232 102 l16 16 M152 182 l16 16" stroke="#F6EBDD" stroke-width="10" stroke-linecap="round"/></svg>
      </div>
      <div class="nf-split-copy">
        <p class="nf-eyebrow">The Northfork promise</p>
        <h2 ${sel('splitTitle', 'Repairs heading', 'src/components/RepairPromise.astro:11', true)}>${T('splitTitle', 'Repaired for life, not replaced.')}</h2>
        <p ${sel('splitBody', 'Repairs paragraph', 'src/components/RepairPromise.astro:13', true)}>${T('splitBody', 'Rip a shell on granite or blow a zipper at camp? Send it back. Our Bozeman repair shop has fixed 38,000 pieces since 2019, free for the life of your gear.')}</p>
        <a href="#" class="nf-btn nf-btn-ghost" ${sel('splitCta', 'Repairs button', 'src/components/RepairPromise.astro:16', true)}>${T('splitCta', 'Start a repair')}</a>
      </div>
    </section>
    <section class="nf-quote" ${sel('quote', 'Testimonial', 'src/components/Testimonial.astro:4')}>
      <blockquote>“Four seasons on the Beartooth Plateau and the Ridgeline still beads water like day one.”</blockquote>
      <cite>Jess M. · Verified buyer (sample review)</cite>
    </section>
    <section class="nf-news" ${sel('newsletter', 'Newsletter signup', 'src/components/Newsletter.astro:5')}>
      <div><h3>${T('newsTitle', 'Trail notes, twice a month')}</h3><p>Routes, repair tips and early access to drops. No spam.</p></div>
      <form onsubmit="return false"><input placeholder="you@example.com"><button class="nf-btn" type="button">Subscribe</button></form>
    </section>
    ${footer()}`,

    shop: () => `
    ${nav()}
    <section class="nf-page-head"><p class="nf-eyebrow">Shop</p><h1 class="hero-title" ${sel('shopTitle', 'Shop heading', 'src/pages/shop.astro:9', true)}>${T('shopTitle', 'All gear')}</h1><p class="hero-sub">Built to last a decade of weekends.</p></section>
    <section class="nf-section" style="padding-top:8px"><div class="nf-grid">
      ${[...products, ...products].map(([k, n, p, a, bg, m], i) => `<a href="#" class="nf-card" ${sel('s' + i, n + ' card', 'src/components/ProductCard.astro:5')}><div class="nf-card-img" style="background:${bg}">${prodArt[a]}</div><div class="nf-card-body"><div><div class="nf-card-name">${n}</div><div class="nf-card-meta">${m}</div></div><div class="nf-card-price">${p}</div></div></a>`).join('')}
    </div></section>${footer()}`,

    journal: () => `
    ${nav()}
    <section class="nf-page-head"><p class="nf-eyebrow">Journal</p><h1 class="hero-title" ${sel('journalTitle', 'Journal heading', 'src/pages/journal/index.astro:7', true)}>${T('journalTitle', 'Field notes')}</h1><p class="hero-sub">Stories and routes from the Northfork crew.</p></section>
    <section class="nf-section" style="padding-top:8px"><div class="nf-posts">
      ${[['Three days on the Highline Trail', 'Routes', '#E7EDE8'], ['How we patch a 3-layer shell', 'Repairs', '#F4E4DA'], ['Packing list: shoulder-season overnights', 'Guides', '#E4EAF0']].map(([t, c, bg], i) => `<a href="#" class="nf-post" ${sel('post' + i, 'Journal post card', 'src/components/PostCard.astro:4')}><div class="nf-post-img" style="background:${bg}">${mountains}</div><span>${c}</span><h3>${t}</h3></a>`).join('')}
    </div></section>${footer()}`,

    about: () => `
    ${nav()}
    <section class="nf-page-head"><p class="nf-eyebrow">About</p><h1 class="hero-title" ${sel('aboutTitle', 'About heading', 'src/pages/about.astro:8', true)}>${T('aboutTitle', 'Made in the mountains we play in.')}</h1><p class="hero-sub" ${sel('aboutBody', 'About paragraph', 'src/pages/about.astro:10', true)}>${T('aboutBody', 'Northfork started in a Bozeman garage in 2016 with one goal: gear that outlives the trips it’s made for.')}</p></section>
    <section class="nf-split"><div class="nf-split-art">${mountains}</div><div class="nf-split-copy"><h2>32 people. One repair shop. Zero landfill goals.</h2><p>Every product ships with a lifetime repair card and a plan for its second life.</p></div></section>${footer()}`,
  };

  window.Site = {
    pages: [
      { id: 'home', name: 'Home', path: '/' },
      { id: 'shop', name: 'Shop', path: '/shop' },
      { id: 'journal', name: 'Journal', path: '/journal' },
      { id: 'about', name: 'About', path: '/about' },
    ],
    render(page, state) { S = state; return pages[page](); },
  };
})();
