const roles = ['Python Developer', 'Full-Stack Developer', 'Software Developer', 'Computer Science Student'];
const roleNode = document.querySelector('.role-word');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let roleIndex = 0;
if (roleNode && !prefersReducedMotion) {
  window.setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleNode.classList.remove('role-word');
    void roleNode.offsetWidth;
    roleNode.textContent = roles[roleIndex];
    roleNode.classList.add('role-word');
  }, 2600);
}

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navLinks?.classList.toggle('open', open);
});
navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Open menu');
}));

const header = document.querySelector('.header');
const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add('visible'));
}

document.querySelector('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = encodeURIComponent(String(form.get('subject') || 'Portfolio enquiry'));
  const body = encodeURIComponent(`Name: ${form.get('name')}\nEmail: ${form.get('email')}\n\n${form.get('message')}`);
  const note = document.querySelector('#form-note');
  if (note) note.textContent = 'Opening your email app with the message details. If it did not open, email maheshbellale3@gmail.com directly.';
  window.location.href = `mailto:maheshbellale3@gmail.com?subject=${subject}&body=${body}`;
});

document.querySelector('#year').textContent = String(new Date().getFullYear());
