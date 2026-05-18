// GNB scroll shadow
const gnb = document.getElementById('gnb');
window.addEventListener('scroll', () => {
  gnb.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

// Active nav based on current page path
const currentPath = window.location.pathname;
document.querySelectorAll('.gnb__nav a').forEach(a => {
  const segment = a.getAttribute('href').replace(/\//g, '');
  if (segment && currentPath.includes(segment)) {
    a.classList.add('active');
  }
});

// Hamburger — toggle open state + animate bars
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  // Prevent body scroll when menu is open
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

const mobileCta = document.querySelector('.gnb__mobile-cta');
if (mobileCta) {
  mobileCta.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
}

// Scroll reveal — bolt.new style: fade + slide up, staggered
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // 같은 프레임에 여러 요소가 들어오면 순서대로 스태거
      const delay = i * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px' // 뷰포트 하단 40px 전에 트리거
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// Email copy button — click anywhere on button to copy & show "Copied!"
document.querySelectorAll('.footer__email-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const email = btn.dataset.email;
    const action = btn.querySelector('.footer__email-action');
    const finish = () => {
      action.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        action.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 2000);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(finish);
    } else {
      // Fallback for older browsers
      const ta = Object.assign(document.createElement('textarea'), { value: email });
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      finish();
    }
  });
});
