// Terminal interativo
const term = document.getElementById('term'), out = document.getElementById('out'), cmd = document.getElementById('cmd');
const comandos = {
  help: 'Comandos: about, projects, stack, contact, clear',
  about: 'Geovane Paixão — Desenvolvedor Full-Stack em São Luís.\nTI na Universidade Ceuma. Estuda Eng. de Software, ADS e Eng. Mecânica.',
  projects: '• HydrogenI BoxTwin 3D — vencedor do Hackathon do Porto do Itaqui\n• Baja SAE Ceuma — off-road 3D com ESP32-S3\n• HelpDesk+ — chamados full-stack',
  stack: 'HTML, CSS, JS, TypeScript, React, React Native, Node, MongoDB, Python, Java, PHP, Dart, Flutter, Git, Linux, Figma',
  contact: 'Instagram: @eng.geovanepaixao\nGitHub: github.com/Geovannehh'
};
const abrir = () => { term.hidden = false; out.textContent = 'Bem-vindo! Digite help para começar.\n'; cmd.focus(); };
document.getElementById('openTerm').onclick = abrir;
document.getElementById('closeTerm').onclick = () => term.hidden = true;
term.addEventListener('click', e => { if (e.target === term) term.hidden = true; });
cmd.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  const k = cmd.value.trim().toLowerCase(); cmd.value = '';
  if (k === 'clear') { out.textContent = ''; return; }
  out.textContent += `\n$ ${k}\n${comandos[k] || 'comando não encontrado. Digite help.'}\n`;
  out.scrollTop = out.scrollHeight;
});
