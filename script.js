// PixelCraft Digital: lightweight navigation, reveal effects and contact-form email draft.
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); menuToggle?.setAttribute('aria-expanded','false');
}));

// Reveal elements as they enter view; fallback for browsers without IntersectionObserver.
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
} else revealEls.forEach(el => el.classList.add('visible'));

document.querySelector('#year').textContent = new Date().getFullYear();
const backTop = document.querySelector('.back-top');
window.addEventListener('scroll', () => backTop.classList.toggle('visible', window.scrollY > 500));
backTop?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

// Replace this placeholder with your real contact email before publishing.
const CONTACT_EMAIL = 'adetijames812@gmail.com';
document.querySelectorAll('[data-service]').forEach(btn => btn.addEventListener('click', () => {
  const serviceSelect = document.querySelector('#service');
  if (serviceSelect) serviceSelect.value = btn.dataset.service;
}));
document.querySelector('#contactForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  const email = document.querySelector('#email').value.trim();
  const service = document.querySelector('#service').value;
  const message = document.querySelector('#message').value.trim();
  const subject = encodeURIComponent(`PixelCraft Digital enquiry: ${service}`);
  const body = encodeURIComponent(`Name: ${name}\\nEmail: ${email}\\nService: ${service}\\n\\nProject details:\\n${message}`);
  const status = document.querySelector('#formStatus');
  status.textContent = 'Opening your email app. If it does not open, email setup may be needed.';
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});

// WhatsApp placeholder: update with your number in international format, digits only.
const WHATSAPP_NUMBER = '233556934322'; // International digits only
const whatsapp = document.querySelector('#whatsappLink');
whatsapp?.addEventListener('click', event => {
  event.preventDefault();
  if (!WHATSAPP_NUMBER) {
    alert('WhatsApp is not configured yet. Add your number to WHATSAPP_NUMBER in script.js.');
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello PixelCraft Digital, I would like to enquire about your services.')}`, '_blank', 'noopener');
});
