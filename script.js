// GNB — hide on scroll down, reveal on scroll up (chewy easing)
const gnb = document.getElementById('gnb');
const heroInner = document.querySelector('.hero__inner');
let lastScrollY = window.scrollY;
let rafPending = false;
let gnbVisible = true;

window.addEventListener('scroll', () => {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    const currentY = window.scrollY;
    const goingDown = currentY > lastScrollY && currentY > 10;

    if (goingDown && gnbVisible) {
      // Hide: sharp, snappy — disappears before you notice
      gnb.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 1, 0.6)';
      gnb.classList.add('gnb--hidden');
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      gnbVisible = false;
      // Hero inner floats up with GNB
      if (heroInner) {
        heroInner.style.transition = 'transform 0.28s cubic-bezier(0.4, 0, 1, 0.6)';
        heroInner.style.transform = 'translateY(-28px)';
      }
    } else if (!goingDown && !gnbVisible) {
      // Reveal: spring bounce — tense snap-back
      gnb.style.transition = 'transform 0.42s cubic-bezier(0.34, 1.35, 0.64, 1)';
      gnb.classList.remove('gnb--hidden');
      gnbVisible = true;
      // Hero inner settles back with spring
      if (heroInner) {
        heroInner.style.transition = 'transform 0.42s cubic-bezier(0.34, 1.35, 0.64, 1)';
        heroInner.style.transform = 'translateY(0px)';
      }
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

// Nav sparkle — continuous overlapping per-char color wave while hovered (skyepark-style)
document.querySelectorAll('.gnb__nav a').forEach(a => {
  const textHost = a.querySelector('.gnb__nav-row') || a;
  const walker = document.createTreeWalker(textHost, NodeFilter.SHOW_TEXT);
  const textNode = walker.nextNode();
  if (!textNode) return;

  const container = document.createElement('span');
  container.className = 'gnb__nav-chars';
  const palette = ['#FFCD00', '#EC6700'];
  [...textNode.textContent].forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'gnb__nav-char';
    span.style.setProperty('--pulse-color', palette[i % palette.length]);
    span.textContent = char;
    container.appendChild(span);
  });
  textNode.replaceWith(container);

  const chars = [...textHost.querySelectorAll('.gnb__nav-char')];
  const PULSE_DURATION = 800;
  const STAGGER = 240;
  const LOOP_PAUSE = 3000;
  let timer = null;

  function runFrom(i) {
    const c = chars[i];
    c.classList.remove('pulse');
    void c.offsetWidth;
    c.classList.add('pulse');
    const isLast = i >= chars.length - 1;
    timer = setTimeout(() => runFrom(isLast ? 0 : i + 1), isLast ? STAGGER + LOOP_PAUSE : STAGGER);
  }

  a.addEventListener('mouseenter', () => {
    if (timer) clearTimeout(timer);
    runFrom(0);
  });
  a.addEventListener('mouseleave', () => {
    if (timer) clearTimeout(timer);
    timer = null;
    chars.forEach(c => c.classList.remove('pulse'));
  });
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

// Scroll reveal — fade + slide up, staggered; fires later so user scrolls to see it
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = i * 60;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px 0px 0px'
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Scroll cue — float up + fade out as soon as user starts scrolling
const scrollCue = document.querySelector('.hero__scroll-cue');
if (scrollCue) {
  window.addEventListener('scroll', () => {
    scrollCue.classList.toggle('hero__scroll-cue--hidden', window.scrollY > 10);
  }, { passive: true });
}

// Hero parallax — SVG idle float + scroll parallax, headline/sub scroll only
const heroEmojis   = document.querySelectorAll('.hero__emoji');
const heroHeadline = document.querySelector('.hero__headline');
const heroSub      = document.querySelector('.hero__sub');

if (heroEmojis.length || heroHeadline) {
  let eCur = 0, eTgt = 0;
  let hCur = 0, hTgt = 0, hRaf = null;
  let sCur = 0, sTgt = 0, sRaf = null;

  // Emoji: persistent loop — idle gravity float (sine) layered on top of scroll parallax
  function eTick(ts) {
    const t = ts / 1000;
    eCur += (eTgt - eCur) * 0.05;
    const floatY = Math.sin(t * 0.2 * Math.PI * 2) * 2.5;
    heroEmojis.forEach(el => {
      el.style.transform = `translateY(${(eCur + floatY).toFixed(3)}px)`;
    });
    requestAnimationFrame(eTick);
  }
  requestAnimationFrame(eTick);

  function hTick() {
    hCur += (hTgt - hCur) * 0.028;
    heroHeadline.style.transform = `translateY(${hCur.toFixed(3)}px)`;
    if (Math.abs(hTgt - hCur) > 0.05) hRaf = requestAnimationFrame(hTick);
    else { heroHeadline.style.transform = `translateY(${hTgt}px)`; hRaf = null; }
  }

  function sTick() {
    sCur += (sTgt - sCur) * 0.034;
    heroSub.style.transform = `translateY(${sCur.toFixed(3)}px)`;
    if (Math.abs(sTgt - sCur) > 0.05) sRaf = requestAnimationFrame(sTick);
    else { heroSub.style.transform = `translateY(${sTgt}px)`; sRaf = null; }
  }

  window.addEventListener('scroll', () => {
    const sy  = window.scrollY;
    const vh6 = window.innerHeight * 0.6;

    eTgt = -Math.min(Math.max(sy, 0) / vh6, 1) * 10;

    if (heroHeadline) {
      hTgt = -Math.min(Math.max(sy, 0) / vh6, 1) * 92;
      if (!hRaf) hRaf = requestAnimationFrame(hTick);
    }

    if (heroSub) {
      sTgt = -Math.min(Math.max(sy - 4, 0) / vh6, 1) * 107;
      if (!sRaf) sRaf = requestAnimationFrame(sTick);
    }
  }, { passive: true });
}


// Card-over-card tension — border-radius 56→32 + inner scale-down
(function () {
  const work     = document.getElementById('work');
  const strength = document.getElementById('strength');
  const workInner = work && work.querySelector('.section__inner');

  function cardTick() {
    const vh = window.innerHeight;

    if (work) {
      const wTop = work.getBoundingClientRect().top;

      // Work inner scales down as Strength slides over it
      if (workInner) {
        const tCover = Math.max(0, Math.min(1, -wTop / vh));
        workInner.style.transform = `scale(${(1 - tCover * 0.06).toFixed(4)})`;
      }
    }

    if (strength) {
      const sTop = strength.getBoundingClientRect().top;

      // Strength enters from below: radius 56→32 as it rises into view
      const tIn = Math.max(0, Math.min(1, (vh - sTop) / vh));
      const br  = (56 - tIn * 24).toFixed(1);
      strength.style.borderRadius = `${br}px ${br}px 0 0`;
    }
  }

  window.addEventListener('scroll', cardTick, { passive: true });
  cardTick();
})();

// Strength accordion — toggle open/close with aria-expanded
document.querySelectorAll('.strength-item__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    const body = btn.nextElementSibling;

    btn.setAttribute('aria-expanded', String(!isOpen));
    body.classList.toggle('open', !isOpen);
  });
});

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
