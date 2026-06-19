
const toggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

const filterButtons = document.querySelectorAll('[data-filter]');
const searchInput = document.querySelector('#courseSearch');
const cards = document.querySelectorAll('#catalogGrid .course-card');
let activeFilter = 'Todos';
function normalize(str){ return (str || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
function applyFilters(){
  const query = normalize(searchInput?.value || '');
  cards.forEach(card => {
    const cat = card.getAttribute('data-category') || '';
    const name = card.getAttribute('data-name') || '';
    const matchFilter = activeFilter === 'Todos' || cat === activeFilter;
    const matchQuery = !query || normalize(name + ' ' + cat).includes(query);
    card.style.display = (matchFilter && matchQuery) ? '' : 'none';
  });
}
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    applyFilters();
  });
});
if (searchInput) searchInput.addEventListener('input', applyFilters);

const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => link.addEventListener('click', e => {
  const target = document.querySelector(link.getAttribute('href'));
  if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
}));

const whatsappForm = document.querySelector('#whatsappForm');
if (whatsappForm) {
  whatsappForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(whatsappForm);
    const nome = (data.get('nome') || '').toString().trim();
    const telefone = (data.get('telefone') || '').toString().trim();
    const curso = (data.get('curso') || '').toString().trim();
    const mensagemLivre = (data.get('mensagem') || '').toString().trim();
    const linhas = [
      'Olá, Instituto Azul!',
      '',
      `Meu nome é ${nome}.`,
      `Meu WhatsApp: ${telefone}.`
    ];
    if (curso) linhas.push(`Tenho interesse em: ${curso}.`);
    linhas.push(mensagemLivre ? `Mensagem: ${mensagemLivre}` : 'Quero saber mais detalhes sobre cursos, valores e matrícula.');
    const texto = encodeURIComponent(linhas.join('\n'));
    window.open(`https://wa.me/5545988156388?text=${texto}`, '_blank');
  });
}

document.querySelectorAll('.newsletter').forEach(form => {
  form.addEventListener('submit', (e) => e.preventDefault());
});

document.querySelectorAll('.newsletter').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]')?.value?.trim() || '';
    const linhas = [
      'Olá, Instituto Azul!',
      '',
      'Quero receber notícias e novidades dos cursos.'
    ];
    if (email) linhas.push(`Meu e-mail é: ${email}.`);
    const texto = encodeURIComponent(linhas.join('\n'));
    window.open(`https://wa.me/5545988156388?text=${texto}`, '_blank');
  });
});
