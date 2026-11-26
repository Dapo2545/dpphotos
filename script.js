const CONTACT_EMAIL = 'praiseadebayo684@gmail.com';
const WHATSAPP_NUMBER = '2349112560364';

const photos = [
  { file: 'studio-1', cat: 'studio', title: 'In Session' },
  { file: 'portrait-field-colour', cat: 'portraits', title: 'Terracotta' },
  { file: 'event-velvet', cat: 'events', title: 'Convocation Glow' },
  { file: 'portrait-field-bw', cat: 'portraits', title: 'Breeze' },
  { file: 'studio-2', cat: 'studio', title: 'Deadline' },
  { file: 'event-laugh-bw', cat: 'events', title: 'Pure Joy' },
  { file: 'nature-lily', cat: 'nature', title: 'Still Water' },
  { file: 'portrait-rail', cat: 'portraits', title: 'Pause' },
  { file: 'event-graduate', cat: 'events', title: 'The Graduate' },
  { file: 'portrait-scarf-bw', cat: 'portraits', title: 'Quiet Light' },
  { file: 'event-hat', cat: 'events', title: 'Sunday Best' },
  { file: 'event-conversation', cat: 'events', title: 'Words of Advice' },
  { file: 'portrait-rail-2', cat: 'portraits', title: 'Look Up' },
  { file: 'event-watch-bw', cat: 'events', title: 'On Time' },
  { file: 'portrait-field-bw-2', cat: 'portraits', title: 'Ease' },
  { file: 'nature-palm', cat: 'nature', title: 'Canopy' },
  { file: 'event-mic', cat: 'events', title: 'The Address' },
  { file: 'portrait-shades-bw', cat: 'portraits', title: 'Shades' },
  { file: 'event-shades-bw', cat: 'events', title: 'Crown' },
  { file: 'event-speaker', cat: 'events', title: 'The Speaker' },
];
const labels = { portraits: 'Portraits', events: 'Events', studio: 'Studio', nature: 'Nature' };
const src = p => `images/work/${p.file}.jpg`;

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
      <img src="${src(p)}" alt="${p.title} — ${labels[p.cat]}" loading="lazy">
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
  lbImg.src = src(p);
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
