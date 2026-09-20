/* ------------------------------------------------------------------
   Animated background: a "data flow" particle network.
   Nodes drift, link to nearby neighbours, and packets travel the links —
   a literal picture of records moving through a pipeline.
   Canvas 2D so it stays cheap on laptops and degrades gracefully.
   ------------------------------------------------------------------ */
(function () {
  const cv = document.getElementById('bg-canvas');
  if (!cv) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = cv.getContext('2d', { alpha: true });
  let W = 0, H = 0, DPR = 1;
  let nodes = [], packets = [];
  const mouse = { x: -9999, y: -9999, active: false };

  const COLORS = ['255,79,56', '19,146,236', '73,68,64'];  // accent coral, blue, warm brown
  const LINK_DIST = 150;
  const MOUSE_R = 190;

  function sizeOf() {
    const a = window.innerWidth * window.innerHeight;
    if (a < 420000) return 34;      // phones
    if (a < 900000) return 58;      // tablets / small laptops
    return Math.min(96, Math.round(a / 15000));
  }

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    cv.width = W * DPR;
    cv.height = H * DPR;
    cv.style.width = W + 'px';
    cv.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    build();
  }

  function build() {
    const n = sizeOf();
    nodes = Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.7 + 0.7,
      c: COLORS[(Math.random() * COLORS.length) | 0],
      tw: Math.random() * Math.PI * 2
    }));
    packets = [];
  }

  function spawnPacket() {
    if (packets.length > 16 || nodes.length < 2) return;
    const a = (Math.random() * nodes.length) | 0;
    let b = -1, best = LINK_DIST;
    for (let i = 0; i < nodes.length; i++) {
      if (i === a) continue;
      const d = Math.hypot(nodes[i].x - nodes[a].x, nodes[i].y - nodes[a].y);
      if (d < best) { best = d; b = i; }
    }
    if (b < 0) return;
    packets.push({ a, b, t: 0, sp: 0.006 + Math.random() * 0.012, c: nodes[a].c });
  }

  let last = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    if (now - last < 1000 / 60) return;       // cap at ~60fps
    last = now;

    ctx.clearRect(0, 0, W, H);

    // --- move ---
    for (const p of nodes) {
      p.x += p.vx; p.y += p.vy; p.tw += 0.02;
      if (p.x < -40) p.x = W + 40; else if (p.x > W + 40) p.x = -40;
      if (p.y < -40) p.y = H + 40; else if (p.y > H + 40) p.y = -40;

      if (mouse.active) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < MOUSE_R && d > 0.1) {
          const f = (1 - d / MOUSE_R) * 0.5;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }
      }
    }

    // --- links ---
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > LINK_DIST * LINK_DIST) continue;
        const d = Math.sqrt(d2);
        let o = (1 - d / LINK_DIST) * 0.14;
        if (mouse.active) {
          const md = Math.hypot((a.x + b.x) / 2 - mouse.x, (a.y + b.y) / 2 - mouse.y);
          if (md < MOUSE_R) o += (1 - md / MOUSE_R) * 0.26;
        }
        ctx.strokeStyle = 'rgba(' + a.c + ',' + o.toFixed(3) + ')';
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // --- packets travelling the links ---
    for (let k = packets.length - 1; k >= 0; k--) {
      const pk = packets[k];
      pk.t += pk.sp;
      if (pk.t >= 1) { packets.splice(k, 1); continue; }
      const a = nodes[pk.a], b = nodes[pk.b];
      if (!a || !b) { packets.splice(k, 1); continue; }
      const x = a.x + (b.x - a.x) * pk.t;
      const y = a.y + (b.y - a.y) * pk.t;
      const fade = Math.sin(pk.t * Math.PI);
      ctx.fillStyle = 'rgba(' + pk.c + ',' + (fade * 0.55).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(x, y, 2.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(' + pk.c + ',' + (fade * 0.09).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(x, y, 6.5, 0, Math.PI * 2);
      ctx.fill();
    }
    if (Math.random() < 0.06) spawnPacket();

    // --- nodes ---
    for (const p of nodes) {
      const tw = 0.3 + Math.sin(p.tw) * 0.15;
      ctx.fillStyle = 'rgba(' + p.c + ',' + tw.toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  window.addEventListener('resize', () => { clearTimeout(cv._t); cv._t = setTimeout(resize, 180); });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; }, { passive: true });
  window.addEventListener('mouseout', () => { mouse.active = false; });

  resize();
  requestAnimationFrame(frame);
})();
