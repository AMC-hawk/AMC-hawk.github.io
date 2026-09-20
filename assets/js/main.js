/* ------------------------------------------------------------------
   Portfolio behaviour: render from data/, then wire up motion.
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  const $  = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));

  const ICON = {
    gh:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.9 5.33.9 11.6c0 4.9 3.17 9.06 7.57 10.53.55.1.76-.24.76-.53v-2.06c-3.08.67-3.73-1.32-3.73-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.67.08-.67 1.11.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.7-1.49-2.46-.28-5.05-1.23-5.05-5.48 0-1.21.43-2.2 1.14-2.98-.11-.28-.5-1.41.11-2.94 0 0 .93-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.22 2.66.11 2.94.71.78 1.14 1.77 1.14 2.98 0 4.26-2.6 5.2-5.07 5.47.4.35.76 1.03.76 2.08v3.08c0 .3.2.64.77.53a11.11 11.11 0 0 0 7.56-10.53C23.1 5.33 18.27.5 12 .5Z"/></svg>',
    li:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/></svg>',
    mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
    doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3"/></svg>',
    ext:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>',
    pdf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>',
    arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    spark:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M19 5l-4 4M9 15l-4 4"/></svg>',
    flow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="2" y="3" width="7" height="5" rx="1"/><rect x="15" y="16" width="7" height="5" rx="1"/><path d="M5.5 8v5a3 3 0 0 0 3 3h10"/></svg>',
    book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    cloud:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.1 11.3 3.5 3.5 0 0 0 6.5 19z"/></svg>',
    pin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    cap:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m22 9-10-5L2 9l10 5 10-5z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"/></svg>',
    img:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>'
  };

  /* ================= render ================= */

  function renderTimeline() {
    const host = $('#timeline'); if (!host || !window.TIMELINE) return;
    host.innerHTML =
      '<span class="tl-fill" id="tl-fill"></span>' +
      window.TIMELINE.map(t => `
        <article class="tl-item rv">
          <div class="tl-when">${esc(t.when)}${t.now ? ' · <span style="color:var(--green)">current</span>' : ''}</div>
          <h3 class="tl-what">${esc(t.role)}</h3>
          <div class="tl-where">${esc(t.org)}</div>
          <div class="tl-body"><ul>${t.points.map(p => `<li>${p}</li>`).join('')}</ul></div>
        </article>`).join('');
  }

  function renderContrib() {
    const host = $('#contrib'); if (!host || !window.CONTRIB) return;
    host.innerHTML = window.CONTRIB.map((c, i) => `
      <article class="card rv rv-d${i + 1}">
        <div class="proj-top">
          <span class="proj-cat">${esc(c.proj)}</span>
          <span class="proj-yr" style="color:${c.status === 'merged' ? 'var(--green)' : 'var(--amber)'}">
            ${esc(c.pr)} · ${esc(c.status)}
          </span>
        </div>
        <h3 style="font-family:var(--font-m);font-size:14.5px;font-weight:500;margin:16px 0 0;line-height:1.5">${esc(c.title)}</h3>
        <p style="color:var(--ink-muted);font-size:14px;margin:10px 0 0">${c.blurb}</p>
        <div class="proj-links">
          <a href="${esc(c.url)}" target="_blank" rel="noopener">${ICON.gh} View pull request ${ICON.arrow}</a>
        </div>
      </article>`).join('');
  }

  function renderProjects() {
    const host = $('#proj-grid'); if (!host || !window.PROJECTS) return;
    const cats = ['All', ...new Set(window.PROJECTS.map(p => p.cat))];
    const bar = $('#proj-filters');
    if (bar) bar.innerHTML = cats.map((c, i) =>
      `<button class="chip${i === 0 ? ' on' : ''}" data-f="${esc(c)}">${esc(c)}</button>`).join('');

    host.innerHTML = window.PROJECTS.map((p, i) => `
      <article class="card proj rv rv-d${(i % 3) + 1}" data-cat="${esc(p.cat)}">
        ${p.featured ? '<span class="star"></span>' : ''}
        <div class="proj-top">
          <span class="proj-cat">${esc(p.cat)}</span>
          <span class="proj-yr">${esc(p.year)}</span>
        </div>
        <h3>${esc(p.name)}</h3>
        <p>${esc(p.blurb)}</p>
        <div class="stack">${p.stack.map(s => `<i>${esc(s)}</i>`).join('')}</div>
        <div class="proj-links">
          ${p.url
            ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">${ICON.gh} Source ${ICON.arrow}</a>`
            : `<span style="font-family:var(--font-m);font-size:11.5px;color:var(--ink-subtle)">Private build · detailed in résumé</span>`}
          ${p.alt ? `<a href="${esc(p.alt.url)}" target="_blank" rel="noopener">${ICON.ext} ${esc(p.alt.label)}</a>` : ''}
        </div>
      </article>`).join('');

    if (bar) bar.addEventListener('click', e => {
      const b = e.target.closest('.chip'); if (!b) return;
      $$('.chip', bar).forEach(c => c.classList.toggle('on', c === b));
      const f = b.dataset.f;
      $$('.proj', host).forEach(card => {
        card.classList.toggle('gone', f !== 'All' && card.dataset.cat !== f);
      });
    });
  }

  function renderOSS() {
    const host = $('#oss-grid'); if (!host || !window.OSS) return;
    host.innerHTML = window.OSS.map((o, i) => `
      <a class="oss rv rv-d${(i % 4) + 1}" href="${esc(o.url)}" target="_blank" rel="noopener">
        <div class="nm">${esc(o.name)} <span class="lg">${esc(o.lang)}</span></div>
        <div class="nt">${esc(o.note)}</div>
      </a>`).join('');
  }

  function renderResearch() {
    const host = $('#paper-list'); if (!host) return;
    const bar = $('#paper-filters');
    const items = window.RESEARCH || [];

    if (!items.length) {
      if (bar) bar.innerHTML = '';
      host.classList.add('is-empty');
      host.innerHTML = `
        <div class="res-empty">
          <p><b>Notes in progress.</b></p>
          <p>I'm working through the literature on data quality for machine learning —
             validation systems, error detection, label noise and LLM-driven cleaning —
             and writing up my own analysis of each paper. Those write-ups will land here.</p>
        </div>`;
      return;
    }

    const themes = ['All', ...new Set(items.map(r => r.theme).filter(Boolean))];
    if (bar) bar.innerHTML = themes.map((t, i) =>
      `<button class="chip${i === 0 ? ' on' : ''}" data-f="${esc(t)}">${esc(t)}</button>`).join('');

    host.innerHTML = items.map((r, i) => `
      <article class="paper" data-theme="${esc(r.theme || '')}">
        <div class="idx">${String(i + 1).padStart(2, '0')}</div>
        <div>
          <h4>${esc(r.title)}</h4>
          <div class="meta">
            ${r.authors ? `<span>${esc(r.authors)}</span>` : ''}
            ${r.venue ? `<span class="v">${esc(r.venue)}</span>` : ''}
            ${r.year ? `<span>${esc(r.year)}</span>` : ''}
          </div>
          ${r.takeaway ? `<p class="note">${esc(r.takeaway)}</p>` : ''}
        </div>
        <div class="paper-acts">
          ${r.url ? `<a class="plink" href="${esc(r.url)}" target="_blank" rel="noopener">${ICON.ext} Paper</a>` : ''}
        </div>
      </article>`).join('');

    if (bar) bar.addEventListener('click', e => {
      const b = e.target.closest('.chip'); if (!b) return;
      $$('.chip', bar).forEach(c => c.classList.toggle('on', c === b));
      const f = b.dataset.f;
      $$('.paper', host).forEach(card => {
        card.classList.toggle('gone', f !== 'All' && card.dataset.theme !== f);
      });
    });
  }

  function renderIcons() {
    $$('[data-icon]').forEach(el => { el.innerHTML = ICON[el.dataset.icon] || ''; });
  }

  /* ================= motion ================= */

  function reveals() {
    const items = $$('.rv');
    if (REDUCED || !('IntersectionObserver' in window)) {
      items.forEach(i => i.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(i => io.observe(i));

    const tls = $$('.tl-item');
    if (tls.length) {
      const io2 = new IntersectionObserver(es => {
        es.forEach(e => e.target.classList.toggle('in', e.isIntersecting));
      }, { threshold: 0.3 });
      tls.forEach(i => io2.observe(i));
    }
  }

  function counters() {
    const els = $$('[data-count]');
    if (!els.length) return;
    if (REDUCED) { els.forEach(e => e.textContent = e.dataset.count + (e.dataset.suffix || '')); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        io.unobserve(el);
        const to = parseFloat(el.dataset.count);
        const sfx = el.dataset.suffix || '';
        const dur = 1500;
        const t0 = performance.now();
        (function step(now) {
          const k = Math.min((now - t0) / dur, 1);
          const e = 1 - Math.pow(1 - k, 3);
          const v = to * e;
          el.textContent = (to % 1 ? v.toFixed(2) : Math.round(v)) + sfx;
          if (k < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.5 });
    els.forEach(e => io.observe(e));
  }

  function typer() {
    const el = $('#typed'); if (!el) return;
    const words = JSON.parse(el.dataset.words || '[]');
    if (!words.length) return;
    if (REDUCED) { el.textContent = words[0]; return; }
    let w = 0, c = 0, del = false;
    (function tick() {
      const word = words[w];
      c += del ? -1 : 1;
      el.textContent = word.slice(0, c);
      let wait = del ? 42 : 78;
      if (!del && c === word.length) { wait = 1700; del = true; }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; wait = 320; }
      setTimeout(tick, wait);
    })();
  }

  function nav() {
    const header = $('header.nav');
    const burger = $('#burger');
    const menu = $('#mobile-menu');
    const links = $$('.nav-links a');
    const secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);

    let tick = false;
    function onScroll() {
      const y = window.scrollY;
      if (header) header.classList.toggle('stuck', y > 24);

      const doc = document.documentElement.scrollHeight - window.innerHeight;
      const bar = $('#progress');
      if (bar) bar.style.width = (doc > 0 ? (y / doc) * 100 : 0) + '%';

      let cur = null;
      for (const s of secs) if (s.offsetTop - 120 <= y) cur = s;
      links.forEach(a => a.classList.toggle('active', cur && a.getAttribute('href') === '#' + cur.id));

      const fill = $('#tl-fill');
      const tl = $('#timeline');
      if (fill && tl) {
        const r = tl.getBoundingClientRect();
        const p = Math.min(Math.max((window.innerHeight * 0.65 - r.top) / r.height, 0), 1);
        fill.style.height = (p * 100) + '%';
      }
      tick = false;
    }
    window.addEventListener('scroll', () => {
      if (!tick) { tick = true; requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();

    if (burger && menu) {
      const close = () => {
        burger.classList.remove('open'); menu.classList.remove('open');
        document.body.classList.remove('is-locked');
        burger.setAttribute('aria-expanded', 'false');
      };
      burger.addEventListener('click', () => {
        const open = !menu.classList.contains('open');
        burger.classList.toggle('open', open);
        menu.classList.toggle('open', open);
        document.body.classList.toggle('is-locked', open);
        burger.setAttribute('aria-expanded', String(open));
      });
      $$('a', menu).forEach(a => a.addEventListener('click', close));
      window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    }
  }

  function cursor() {
    if (window.matchMedia('(pointer: coarse)').matches || REDUCED) return;
    const ring = $('.cursor'), dot = $('.cursor-dot');
    if (!ring || !dot) return;
    let x = 0, y = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', e => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate(${x}px,${y}px)`;
    }, { passive: true });
    (function loop() {
      rx += (x - rx) * 0.17; ry += (y - ry) * 0.17;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', e => {
      ring.classList.toggle('grow', !!e.target.closest('a,button,.card,.paper,.oss,.fact'));
    });
  }

  function spotlight() {
    if (REDUCED) return;
    document.addEventListener('mousemove', e => {
      const c = e.target.closest('.card');
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      c.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }, { passive: true });
  }

  function preloader() {
    const pl = $('#preload'); if (!pl) return;
    const bar = $('.pl-bar i', pl), pct = $('.pl-pct', pl);
    let v = 0;
    const iv = setInterval(() => {
      v = Math.min(v + Math.random() * 18 + 6, 100);
      if (bar) bar.style.width = v + '%';
      if (pct) pct.textContent = Math.round(v) + '%';
      if (v >= 100) {
        clearInterval(iv);
        setTimeout(() => {
          pl.classList.add('done');
          document.body.classList.remove('is-locked');
          $$('#hero .rv').forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 90));
        }, 260);
      }
    }, 130);
  }

  /* ================= boot ================= */
  function init() {
    renderTimeline();
    renderContrib();
    renderProjects();
    renderOSS();
    renderResearch();
    renderIcons();
    reveals();
    counters();
    typer();
    nav();
    cursor();
    spotlight();
    preloader();
    const y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
