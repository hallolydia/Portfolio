// GNB — hide on scroll down, reveal on scroll up (chewy easing)
const gnb = document.getElementById('gnb');
let lastScrollY = window.scrollY;
let rafPending = false;
let gnbVisible = true;

window.addEventListener('scroll', () => {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    const currentY = window.scrollY;
    const goingDown = currentY > lastScrollY && currentY > 80;

    if (goingDown && gnbVisible) {
      // Hide: sharp, snappy — disappears before you notice
      gnb.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 1, 0.6)';
      gnb.classList.add('gnb--hidden');
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      gnbVisible = false;
    } else if (!goingDown && !gnbVisible) {
      // Reveal: spring bounce — tense snap-back
      gnb.style.transition = 'transform 0.42s cubic-bezier(0.34, 1.35, 0.64, 1)';
      gnb.classList.remove('gnb--hidden');
      gnbVisible = true;
    }

    lastScrollY = currentY;
    rafPending = false;
  });
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
});

mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// Scroll reveal — bolt.new style: fade + slide up, staggered
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = i * 60;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
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
