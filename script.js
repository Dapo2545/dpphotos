const CONTACT_EMAIL = 'praiseadebayo684@gmail.com';
const WHATSAPP_NUMBER = '2349112560364';

const photos = [
  { id: '1511285560929-80b456fea0bc', cat: 'weddings', title: 'The Celebration' },
  { id: '1507003211169-0a1dd7228f2d', cat: 'portraits', title: 'Daniel' },
  { id: '1470225620780-dba8ba36b745', cat: 'events', title: 'Afterparty' },
  { id: '1606216794074-735e91aa2c92', cat: 'weddings', title: 'Under the Palms' },
  { id: '1494790108377-be9c29b29330', cat: 'portraits', title: 'Ada' },
  { id: '1505236858219-8359eb29e329', cat: 'events', title: 'Encore' },
  { id: '1515934751635-c81c6bc9a2d8', cat: 'weddings', title: 'The Rings' },
  { id: '1438761681033-6461ffad8d80', cat: 'portraits', title: 'Grace' },
  { id: '1464822759023-fed622ff2c3b', cat: 'landscapes', title: 'Summit' },
  { id: '1529636798458-92182e662485', cat: 'weddings', title: 'The Arch' },
  { id: '1583939003579-730e3918a45a', cat: 'weddings', title: 'Just Married' },
  { id: '1500648767791-00dcc994a43e', cat: 'portraits', title: 'Michael' },
  { id: '1501854140801-50d01698950b', cat: 'landscapes', title: 'Green Hills' },
  { id: '1540575467063-178a50c2df87', cat: 'events', title: 'The Keynote' },
  { id: '1534528741775-53994a69daeb', cat: 'portraits', title: 'Blue Hour' },
  { id: '1520854221256-17451cc331bf', cat: 'weddings', title: 'Hand in Hand' },
  { id: '1506905925346-21bda4d32df4', cat: 'landscapes', title: 'Above the Clouds' },
];
const labels = { weddings: 'Weddings', portraits: 'Portraits', events: 'Events', landscapes: 'Travel' };
const src = (id, w) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80`;

/* Hero slideshow */
const slides = [...document.querySelectorAll('.slide')];
const slideNum = document.getElementById('slideNum');
const slideBar = document.getElementById('slideBar');
let slideIdx = 0;
function runBar() {
  slideBar.classList.remove('run');
  void slideBar.offsetWidth;
  slideBar.classList.add('run');
}
function nextSlide() {
  slides[slideIdx].classList.remove('active');
  slideIdx = (slideIdx + 1) % slides.length;
  slides[slideIdx].classList.add('active');
  slideNum.textContent = String(slideIdx + 1).padStart(2, '0');
  runBar();
}
runBar();
setInterval(nextSlide, 6000);

/* Gallery */
const gallery = document.getElementById('gallery');
const filterBtns = [...document.querySelectorAll('#filters button')];
let visible = photos;
function render(filter) {
  visible = filter === 'all' ? photos : photos.filter(p => p.cat === filter);
  gallery.innerHTML = visible.map((p, i) => `
    <figure data-index="${i}" style="animation-delay:${Math.min(i, 8) * 70}ms">
      <img src="${src(p.id, 900)}" alt="${p.title} — ${labels[p.cat]}" loading="lazy">
      <figcaption>${p.title} &middot; ${labels[p.cat]}</figcaption>
    </figure>`).join('');
  filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
}
render('all');
document.getElementById('filters').addEventListener('click', e => {
  const b = e.target.closest('button');
  if (b) render(b.dataset.filter);
});
document.querySelectorAll('[data-goto]').forEach(a =>
  a.addEventListener('click', () => render(a.dataset.goto)));

/* Lightbox */
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCap = document.getElementById('lbCap');
let cur = 0;
function openLb(i) {
  cur = (i + visible.length) % visible.length;
  const p = visible[cur];
  lbImg.src = src(p.id, 2000);
  lbImg.alt = p.title;
  lbCap.textContent = `${p.title} — ${labels[p.cat]}  ·  ${cur + 1} / ${visible.length}`;
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeLb() {
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
gallery.addEventListener('click', e => {
  const f = e.target.closest('figure');
  if (f) openLb(+f.dataset.index);
});
document.getElementById('lbClose').onclick = closeLb;
document.getElementById('lbPrev').onclick = () => openLb(cur - 1);
document.getElementById('lbNext').onclick = () => openLb(cur + 1);
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') openLb(cur - 1);
  if (e.key === 'ArrowRight') openLb(cur + 1);
});

/* Nav */
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const menu = document.getElementById('mobileMenu');
const onScroll = () => nav.classList.toggle('solid', window.scrollY > window.innerHeight * 0.75);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
burger.onclick = () => {
  const open = menu.classList.toggle('open');
  burger.classList.toggle('open', open);
  nav.classList.toggle('menu-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
};
menu.addEventListener('click', e => {
  if (e.target.tagName !== 'A') return;
  menu.classList.remove('open');
  burger.classList.remove('open');
  nav.classList.remove('menu-open');
  document.body.style.overflow = '';
});

/* Reveal on scroll */
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* Testimonials */
const quotes = [...document.querySelectorAll('.quote')];
const dots = [...document.querySelectorAll('#dots button')];
let q = 0;
function showQuote(i) {
  q = i;
  quotes.forEach((el, j) => el.classList.toggle('active', j === i));
  dots.forEach((el, j) => el.classList.toggle('active', j === i));
}
dots.forEach((d, i) => d.addEventListener('click', () => showQuote(i)));
setInterval(() => showQuote((q + 1) % quotes.length), 7000);

/* Contact */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const packageSelect = document.getElementById('packageSelect');
document.querySelectorAll('[data-package]').forEach(a =>
  a.addEventListener('click', () => { packageSelect.value = a.dataset.package; }));

function validate() {
  let ok = true;
  form.querySelectorAll('[required]').forEach(el => {
    const valid = el.checkValidity() && el.value.trim() !== '';
    el.closest('.field').classList.toggle('invalid', !valid);
    if (!valid) ok = false;
  });
  status.textContent = ok ? '' : 'Please fill in your name, a valid email and a short message.';
  return ok;
}
function message() {
  const d = new FormData(form);
  return `Hello Dpvibes Photography,\n\nName: ${d.get('name')}\nEmail: ${d.get('email')}\nService: ${d.get('package')}\nDate: ${d.get('date') || 'To be confirmed'}\n\n${d.get('message')}`;
}
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validate()) return;
  const subject = encodeURIComponent(`${new FormData(form).get('package')} inquiry — ${new FormData(form).get('name')}`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodeURIComponent(message())}`;
  status.textContent = 'Thank you — your email app is opening with your inquiry ready to send.';
});
document.getElementById('waBtn').addEventListener('click', () => {
  if (!validate()) return;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message())}`, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
