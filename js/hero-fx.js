// Fundo animado original: hexágonos digitais flutuando + cortes de luz (inspirado em UI de RPG virtual)
(() => {
  const c = document.getElementById('fx');
  if (!c) return;
  const ctx = c.getContext('2d');
  const reduzir = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w, h, hexes = [], cortes = [], proximo = 0;

  function ajustar() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    c.width = w * dpr; c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    hexes = Array.from({ length: Math.round(w / 38) }, novoHex);
  }
  function novoHex() {
    return { x: Math.random() * w, y: Math.random() * h, r: 6 + Math.random() * 18,
             v: .15 + Math.random() * .45, a: .15 + Math.random() * .45, rot: Math.random() * 6.28, g: (Math.random() - .5) * .004 };
  }
  function hex(x, y, r, rot) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = rot + i * Math.PI / 3;
      ctx[i ? 'lineTo' : 'moveTo'](x + r * Math.cos(a), y + r * Math.sin(a));
    }
    ctx.closePath();
  }
  function novoCorte() {
    const y = Math.random() * h * .7, ang = -.35 - Math.random() * .4, len = w * (.5 + Math.random() * .4);
    cortes.push({ x: Math.random() * w * .5, y, ang, len, t: 0 });
  }
  function quadro(ts) {
    ctx.clearRect(0, 0, w, h);
    for (const p of hexes) {
      p.y -= p.v; p.rot += p.g;
      if (p.y < -30) { p.y = h + 30; p.x = Math.random() * w; }
      ctx.strokeStyle = `rgba(120,200,255,${p.a})`; ctx.lineWidth = 1;
      ctx.shadowColor = '#5cc8ff'; ctx.shadowBlur = 8;
      hex(p.x, p.y, p.r, p.rot); ctx.stroke();
    }
    if (ts > proximo) { novoCorte(); proximo = ts + 2500 + Math.random() * 3500; }
    cortes = cortes.filter(s => s.t < 1);
    for (const s of cortes) {
      s.t += .025;
      const f = s.t, tail = Math.max(0, f - .35), cos = Math.cos(s.ang), sin = Math.sin(s.ang);
      const x1 = s.x + cos * s.len * tail, y1 = s.y + sin * s.len * tail;
      const x2 = s.x + cos * s.len * f,    y2 = s.y + sin * s.len * f;
      const g = ctx.createLinearGradient(x1, y1, x2, y2);
      g.addColorStop(0, 'rgba(92,200,255,0)'); g.addColorStop(1, `rgba(255,255,255,${1 - f})`);
      ctx.strokeStyle = g; ctx.lineWidth = 3; ctx.shadowColor = '#8fdcff'; ctx.shadowBlur = 18;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    }
    ctx.shadowBlur = 0;
    if (!reduzir) requestAnimationFrame(quadro);
  }
  addEventListener('resize', ajustar);
  ajustar(); requestAnimationFrame(quadro);
})();
