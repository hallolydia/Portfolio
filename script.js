// GNB scroll shadow
const gnb = document.getElementById('gnb');
window.addEventListener('scroll', () => {
  gnb.classList.toggle('scrolled', window.scrollY > 10);
  updateActiveNav();
}, { passive: true });

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.gnb__nav a');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// Scroll reveal
const revealEls = document.querySelectorAll('.card, .section__title, .section__sub, .hero__inner');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// Contact form (demo only)
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const notice = document.getElementById('formNotice');
  notice.textContent = '메시지가 전송되었습니다. 감사합니다!';
  notice.className = 'form-notice success';
  e.target.reset();
  setTimeout(() => { notice.textContent = ''; notice.className = 'form-notice'; }, 4000);
});
