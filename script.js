const CONTACT_EMAIL = 'praiseadebayo684@gmail.com';
const WHATSAPP_NUMBER = '2340000000000';

const photos = [
  { id: '1511285560929-80b456fea0bc', cat: 'weddings' },
  { id: '1507003211169-0a1dd7228f2d', cat: 'portraits' },
  { id: '1470225620780-dba8ba36b745', cat: 'landscapes' },
  { id: '1540575467063-178a50c2df87', cat: 'events' },
  { id: '1606216794074-735e91aa2c92', cat: 'weddings' },
  { id: '1494790108377-be9c29b29330', cat: 'portraits' },
  { id: '1464822759023-fed622ff2c3b', cat: 'landscapes' },
  { id: '1505236858219-8359eb29e329', cat: 'events' },
  { id: '1583939003579-730e3918a45a', cat: 'weddings' },
  { id: '1438761681033-6461ffad8d80', cat: 'portraits' },
  { id: '1501854140801-50d01698950b', cat: 'landscapes' },
  { id: '1515934751635-c81c6bc9a2d8', cat: 'weddings' },
  { id: '1500648767791-00dcc994a43e', cat: 'portraits' },
  { id: '1469474968028-56623f02e42e', cat: 'landscapes' },
  { id: '1529636798458-92182e662485', cat: 'events' },
  { id: '1534528741775-53994a69daeb', cat: 'portraits' },
  { id: '1506905925346-21bda4d32df4', cat: 'landscapes' },
  { id: '1520854221256-17451cc331bf', cat: 'weddings' },
];
const src = (id, w) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

const grid = document.getElementById('grid');
let visible = photos;

function render(filter) {
  visible = filter === 'all' ? photos : photos.filter(p => p.cat === filter);
  grid.innerHTML = visible.map((p, i) => `
    <figure data-index="${i}">
      <img src="${src(p.id, 800)}" alt="${p.cat} photo" loading="lazy">
      <figcaption>${p.cat}</figcaption>
    </figure>`).join('');
}
render('all');

document.getElementById('filters').addEventListener('click', e => {
  const btn = e.target.closest('.filter');
  if (!btn) return;
  document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === btn));
  render(btn.dataset.filter);
});

const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
let current = 0;
function openLb(i) {
  current = (i + visible.length) % visible.length;
  lbImg.src = src(visible[current].id, 1800);
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
}
function closeLb() { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); }
grid.addEventListener('click', e => {
  const fig = e.target.closest('figure');
  if (fig) openLb(Number(fig.dataset.index));
});
document.getElementById('lbClose').onclick = closeLb;
document.getElementById('lbPrev').onclick = () => openLb(current - 1);
document.getElementById('lbNext').onclick = () => openLb(current + 1);
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') openLb(current - 1);
  if (e.key === 'ArrowRight') openLb(current + 1);
});

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));
const navLinks = document.getElementById('navLinks');
document.getElementById('navToggle').onclick = () => navLinks.classList.toggle('open');
navLinks.addEventListener('click', e => { if (e.target.tagName === 'A') navLinks.classList.remove('open'); });

const packageSelect = document.getElementById('packageSelect');
document.querySelectorAll('[data-package]').forEach(a =>
  a.addEventListener('click', () => { packageSelect.value = a.dataset.package; }));

const form = document.getElementById('contactForm');
function buildMessage() {
  const d = new FormData(form);
  return `Hi Praise, I'd like to book a shoot.\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nPackage: ${d.get('package')}\nDate: ${d.get('date') || 'Not decided'}\n\n${d.get('message')}`;
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const subject = encodeURIComponent('Booking request - ' + new FormData(form).get('package'));
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodeURIComponent(buildMessage())}`;
});
document.getElementById('waBtn').addEventListener('click', () => {
  if (!form.reportValidity()) return;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`, '_blank');
});

document.getElementById('year').textContent = new Date().getFullYear();
