(function () {
  var cv = document.getElementById('ghost'), c = cv.getContext('2d');
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var COARSE = matchMedia('(hover: none)').matches;
  var D = Math.min(window.devicePixelRatio || 1, 2);
  var src = [
    'const work = await portfolio.load({ year: 2026 });',
    'function render(idea) { return paper.press(idea); }',
    'for (const project of work) shelf.add(project);',
    'if (curious) { reader.scroll(); } else { wait(); }',
    'export default { name, craft, notes, contact };',
    'type Case = { problem: string; outcome: string };',
    'page.refresh({ mode: "partial", ghosting: true });',
    'tape.stick(scrap, { angle: -3, stars: true });',
    'while (making) { learn(); ship(); write(); }'
  ];
  var FONT = '12px "JetBrains Mono", monospace', LH = 17, PAD = 8, RADIUS = 115;
  var REST = 'rgba(96, 88, 74, .055)', LIT = '#7a7264', PEAK = COARSE ? .2 : .3, DECAY = .972;
  var W = 0, H = 0, CW = 7.2, cols = 0, rows = 0, lines = [], g = null, base = null;
  var x = -999, y = -999, tx = -999, ty = -999, seen = false, t = 0, dirty = true, lit = 0;
  var clears = [].slice.call(document.querySelectorAll('[data-clear]'));

  function build() {
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W * D; cv.height = H * D;
    c.setTransform(D, 0, 0, D, 0, 0);
    c.font = FONT; CW = c.measureText('M').width || 7.2;
    cols = Math.ceil((W - PAD) / CW); rows = Math.ceil(H / LH);
    lines = [];
    for (var r = 0; r < rows; r++) {
      var s = ' '.repeat((r * 5) % 9), k = r * 2;
      while (s.length < cols + 2) { s += src[k % src.length] + '  '; k++; }
      lines.push(s.slice(0, cols));
    }
    g = new Float32Array(cols * rows);
    base = document.createElement('canvas');
    base.width = W * D; base.height = H * D;
    var q = base.getContext('2d');
    q.scale(D, D); q.font = FONT; q.textBaseline = 'top'; q.fillStyle = REST;
    for (var i = 0; i < rows; i++) q.fillText(lines[i], PAD, i * LH + 4);
    dirty = true;
  }

  function frame() {
    requestAnimationFrame(frame);
    if (!RM && COARSE && !seen) {
      t += .008; tx = W * (.5 + .36 * Math.sin(t)); ty = H * (.5 + .34 * Math.cos(t * 1.4)); dirty = true;
    }
    if (!dirty && !lit) return;
    dirty = false;
    if (x < -900 && tx > -900) { x = tx; y = ty; }
    x += (tx - x) * .24; y += (ty - y) * .24;
    if (Math.abs(tx - x) + Math.abs(ty - y) > .5) dirty = true;

    c.clearRect(0, 0, W, H);
    c.drawImage(base, 0, 0, W, H);
    lit = 0;
    if (!RM) {
      c.font = FONT; c.textBaseline = 'top'; c.fillStyle = LIT;
      var R2 = RADIUS * RADIUS;
      for (var r = 0; r < rows; r++) {
        var py = r * LH + 4, ln = lines[r];
        for (var q = 0; q < cols; q++) {
          var n = r * cols + q, px = PAD + q * CW, dx = px - x, dy = py - y, d = dx * dx + dy * dy;
          if (d < R2) {
            var v = Math.min(1, (1 - Math.sqrt(d) / RADIUS) * 2.1);
            if (v > g[n]) g[n] = v;
          } else g[n] *= DECAY;
          if (g[n] > .03) {
            lit++;
            var ch = ln.charAt(q);
            if (ch !== ' ') { c.globalAlpha = g[n] * PEAK; c.fillText(ch, px, py); }
          } else g[n] = 0;
        }
      }
      c.globalAlpha = 1;
    }
    for (var i = 0; i < clears.length; i++) {
      var b = clears[i].getBoundingClientRect();
      if (b.bottom > 0 && b.top < H) c.clearRect(b.left - 6, b.top - 6, b.width + 12, b.height + 12);
    }
  }

  window.addEventListener('pointermove', function (e) { tx = e.clientX; ty = e.clientY; seen = true; dirty = true; }, { passive: true });
  window.addEventListener('scroll', function () { dirty = true; }, { passive: true });
  window.addEventListener('resize', build);
  build();
  if (document.fonts && document.fonts.load) document.fonts.load(FONT).then(build);
  requestAnimationFrame(frame);

  document.querySelectorAll('.stk').forEach(function (s) {
    var ox = 0, oy = 0;
    s.addEventListener('pointerdown', function (e) {
      e.preventDefault(); s.setPointerCapture(e.pointerId);
      var sx = e.clientX - ox, sy = e.clientY - oy;
      function mv(v) { ox = v.clientX - sx; oy = v.clientY - sy; s.style.setProperty('--dx', ox + 'px'); s.style.setProperty('--dy', oy + 'px'); }
      function up() { s.removeEventListener('pointermove', mv); s.removeEventListener('pointerup', up); s.removeEventListener('pointercancel', up); }
      s.addEventListener('pointermove', mv); s.addEventListener('pointerup', up); s.addEventListener('pointercancel', up);
    });
  });

  var count = document.getElementById('count');
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) count.textContent = e.target.dataset.slide; });
  }, { rootMargin: '-45% 0px -45% 0px' });
  document.querySelectorAll('[data-slide]').forEach(function (s) { io.observe(s); });
})();

(function () {
  var total = document.getElementById('total');
  if (total) total.textContent = document.querySelectorAll('[data-slide]').length;

  var box = document.getElementById('portrait');
  if (!box) return;
  var cv = box.querySelector('canvas'), c = cv.getContext('2d');
  var RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var COARSE = matchMedia('(hover: none)').matches;
  var D = Math.min(window.devicePixelRatio || 1, 2);
  var FONT = '7px "JetBrains Mono", monospace', CW = 4.2, LH = 7, RADIUS = 92, INK = '#1c1a17';
  var text = 'const self = await curiosity.load(); while (awake) { learn(); build(); ship(); } hardProblems.forEach(solve); export default srishti; ';
  var img = new Image(), W = 0, H = 0, cols = 0, rows = 0, inside, dark, edge, g, x = -999, y = -999, hot = false, t = 0, dirty = true, wake = 0, within = false;

  function build() {
    if (!img.naturalWidth) return;
    W = cv.clientWidth; H = cv.clientHeight;
    if (!W || !H) return;
    cv.width = W * D; cv.height = H * D;
    c.setTransform(D, 0, 0, D, 0, 0);
    c.font = FONT; CW = c.measureText('M').width || 5.6;
    cols = Math.floor(W / CW); rows = Math.floor(H / LH);
    var o = document.createElement('canvas'); o.width = cols; o.height = rows;
    var q = o.getContext('2d', { willReadFrequently: true });
    var s = Math.min(W / img.naturalWidth, H / img.naturalHeight);
    var dw = img.naturalWidth * s / CW, dh = img.naturalHeight * s / LH;
    q.drawImage(img, (cols - dw) / 2, (rows - dh) * .55, dw, dh);
    var d = q.getImageData(0, 0, cols, rows).data, n = cols * rows;
    inside = new Uint8Array(n); dark = new Float32Array(n); edge = new Uint8Array(n); g = new Float32Array(n);
    var lum = new Float32Array(n);
    for (var i = 0; i < n; i++) {
      var p = i * 4, a = d[p + 3] / 255;
      lum[i] = (d[p] * .299 + d[p + 1] * .587 + d[p + 2] * .114) / 255;
      inside[i] = a > .5 ? 1 : 0;
      dark[i] = 1 - lum[i];
    }
    for (var r = 0; r < rows; r++) for (var k = 0; k < cols; k++) {
      var m = r * cols + k;
      if (!inside[m]) continue;
      var L = k ? m - 1 : m, R = k < cols - 1 ? m + 1 : m, U = r ? m - cols : m, B = r < rows - 1 ? m + cols : m;
      var boundary = !inside[L] || !inside[R] || !inside[U] || !inside[B];
      var diff = Math.abs(lum[L] - lum[R]) + Math.abs(lum[U] - lum[B]);
      edge[m] = boundary || diff > .42 ? 1 : 0;
    }
    if (RM) g.fill(.85);
    dirty = true;
  }

  function frame() {
    requestAnimationFrame(frame);
    if (!g) return;
    if (COARSE && !RM && hot) { t += .02; x = W * (.5 + .34 * Math.sin(t)); y = H * (.45 + .36 * Math.cos(t * 1.3)); dirty = true; }
    var goal = within || hot ? 1 : 0;
    if (Math.abs(goal - wake) > .004) { wake += (goal - wake) * .05; dirty = true; }
    var live = false;
    if (!dirty) { for (var z = 0; z < g.length; z += 7) if (g[z] > .02) { live = true; break; } if (!live || RM) return; }
    dirty = false;
    c.clearRect(0, 0, W, H);
    c.font = FONT; c.textBaseline = 'top'; c.fillStyle = INK;
    for (var r = 0; r < rows; r++) for (var k = 0; k < cols; k++) {
      var n = r * cols + k;
      if (!inside[n]) continue;
      var px = k * CW, py = r * LH;
      if (!RM) {
        var dx = px - x, dy = py - y, d = Math.sqrt(dx * dx + dy * dy);
        if (d < RADIUS) { var v = Math.min(1, (1 - d / RADIUS) * 2.4); if (v > g[n]) g[n] = v; }
        else g[n] *= .982;
      }
      var tone = Math.min(1, Math.max(0, (dark[n] - .13) / .42));
      var a = Math.max(edge[n] ? .3 * (1 - wake) : 0, Math.max(g[n], wake * .92) * tone);
      var level = Math.max(g[n], wake);
      if (level > .02) {
        c.globalAlpha = level * .62 * Math.pow(Math.min(1, dark[n] * 1.15), 1.35);
        c.fillRect(px, py, CW + .4, LH + .4);
      }
      if (a > .02) {
        c.globalAlpha = a; c.fillStyle = dark[n] > .6 && level > .35 ? '#ece4d8' : INK;
        c.fillText(text.charAt((r * 7 + k) % text.length), px, py);
        c.fillStyle = INK;
      }
    }
    c.globalAlpha = 1;
  }

  box.addEventListener('pointermove', function (e) {
    var b = cv.getBoundingClientRect(); x = e.clientX - b.left; y = e.clientY - b.top; within = true; dirty = true;
  });
  box.addEventListener('pointerleave', function () { x = -999; y = -999; within = false; dirty = true; });
  if (COARSE) box.querySelector('.label').textContent = 'i wake up on my own';
  if (COARSE) new IntersectionObserver(function (es) { hot = es[0].isIntersecting; }, { threshold: .4 }).observe(box);
  img.onload = build;
  img.src = box.dataset.src;
  window.addEventListener('resize', build);
  if (document.fonts && document.fonts.load) document.fonts.load(FONT).then(build);
  requestAnimationFrame(frame);
})();
