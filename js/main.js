// Efeito de digitação
const frases = ['Desenvolvedor Full-Stack', 'Suporte técnico de dia, full-stack por convicção', 'Design em interface, ideias em sistemas'];
const typed = document.getElementById('typed');
let f = 0, c = 0, apagando = false;
(function digitar() {
  const txt = frases[f];
  typed.textContent = txt.slice(0, c);
  if (!apagando && c === txt.length) { apagando = true; return setTimeout(digitar, 1400); }
  if (apagando && c === 0) { apagando = false; f = (f + 1) % frases.length; }
  c += apagando ? -1 : 1;
  setTimeout(digitar, apagando ? 35 : 75);
})();

// Contadores animados
document.querySelectorAll('[data-n]').forEach(el => {
  const alvo = +el.dataset.n; let v = 0;
  const t = setInterval(() => { el.textContent = ++v; if (v >= alvo) clearInterval(t); }, 1200 / alvo);
});

// Spotlight + tilt nos cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    card.style.setProperty('--mx', x + 'px');
    card.style.setProperty('--my', y + 'px');
    card.style.transform = `perspective(600px) rotateX(${(y / r.height - .5) * -6}deg) rotateY(${(x / r.width - .5) * 6}deg)`;
  });
  card.addEventListener('pointerleave', () => card.style.transform = '');
});
