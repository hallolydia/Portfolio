// Deployed site only (not local dev): disabled work cards are not clickable
(function () {
  const h = location.hostname;
  const isLocal = h === 'localhost' || h === '127.0.0.1' || h === '[::1]' || h.endsWith('.local');
  if (isLocal) return;
  document.documentElement.classList.add('is-deployed');
  document.querySelectorAll('.work-card--disabled .work-card__link').forEach(a => {
    a.removeAttribute('href');
    a.setAttribute('aria-disabled', 'true');
    a.setAttribute('tabindex', '-1');
  });
})();

// GNB — stays visible while scrolling down, hides on scroll up
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
    const delta = currentY - lastScrollY;
    // Visible while scrolling down; hides on a slight scroll up. Always visible near the very top.
    const shouldHide = delta < 0 && currentY > 10;
    const shouldShow = delta > 0 || currentY <= 10;

    if (shouldHide && gnbVisible) {
      // Hide: chewy — a tiny squash down (anticipation), then snaps up
      gnb.style.transition = 'transform 0.38s cubic-bezier(0.55, -0.45, 0.75, 0.15)';
      gnb.classList.add('gnb--hidden');
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      gnbVisible = false;
      // Hero inner floats up with GNB
      if (heroInner) {
        heroInner.style.transition = 'transform 0.28s cubic-bezier(0.4, 0, 1, 0.6)';
        heroInner.style.transform = 'translateY(-28px)';
      }
    } else if (shouldShow && !gnbVisible) {
      // Reveal: chewy spring — overshoots and settles (the bar's --gnb-bleed hides any gap at the top)
      gnb.style.transition = 'transform 0.62s cubic-bezier(0.34, 1.56, 0.64, 1)';
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


// Work pins when its bottom meets the viewport bottom, so Strength covers it on the way up
(function () {
  const work = document.getElementById('work');
  if (!work) return;
  const setStick = () => {
    work.style.setProperty('--work-stick', Math.min(0, window.innerHeight - work.offsetHeight) + 'px');
  };
  setStick();
  window.addEventListener('resize', setStick);
  window.addEventListener('load', setStick);
  if ('ResizeObserver' in window) new ResizeObserver(setStick).observe(work);
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

// Custom cursor — 12px dot that follows with a spring (slight overshoot + squash across the motion),
// morphing into a text bar (height = font size) when over text. Mouse/trackpad only.
(function initCursor() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<div class="cursor__shape"></div>';
  document.body.appendChild(cursor);

  const STIFFNESS = 600; // spring pull toward the pointer
  const DAMPING   = 24;  // < critical → bouncy overshoot that settles quickly
  let tx = 0, ty = 0, x = 0, y = 0, vx = 0, vy = 0;
  let isText = false, started = false, raf = 0, last = 0;

  // Over a glyph of text (not links/buttons or big section titles)? Returns its font size, else 0.
  function textSizeAt(px, py) {
    let node, offset;
    if (document.caretPositionFromPoint) {
      const pos = document.caretPositionFromPoint(px, py);
      if (!pos) return 0;
      node = pos.offsetNode; offset = pos.offset;
    } else if (document.caretRangeFromPoint) {
      const r = document.caretRangeFromPoint(px, py);
      if (!r) return 0;
      node = r.startContainer; offset = r.startOffset;
    } else return 0;
    if (!node || node.nodeType !== 3 || !node.textContent.trim()) return 0;
    const el = node.parentElement;
    if (!el || el.closest('a, button, [role="button"], input, textarea, select, .section__title')) return 0;
    const range = document.createRange();
    for (const o of [offset, offset - 1]) {
      if (o < 0 || o >= node.length) continue;
      range.setStart(node, o);
      range.setEnd(node, o + 1);
      for (const rc of range.getClientRects()) {
        if (px >= rc.left - 1 && px <= rc.right + 1 && py >= rc.top && py <= rc.bottom) {
          return parseFloat(getComputedStyle(el).fontSize) || 0;
        }
      }
    }
    return 0;
  }

  function render() {
    let t = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    if (!isText && !reduceMotion) {
      const speed = Math.hypot(vx, vy);
      const s = Math.min(speed / 2600, 0.3);
      if (s > 0.01) {
        const a = Math.atan2(vy, vx);
        t += ` rotate(${a}rad) scale(${(1 - s * 0.5).toFixed(3)}, ${(1 + s).toFixed(3)}) rotate(${-a}rad)`;
      }
    }
    cursor.style.transform = t;
  }

  function tick(now) {
    const dt = Math.min((now - last) / 1000 || 0.016, 1 / 30);
    last = now;
    if (reduceMotion) {
      x = tx; y = ty; vx = vy = 0;
    } else {
      vx += (STIFFNESS * (tx - x) - DAMPING * vx) * dt;
      vy += (STIFFNESS * (ty - y) - DAMPING * vy) * dt;
      x += vx * dt;
      y += vy * dt;
    }
    render();
    const settled = Math.abs(tx - x) < 0.05 && Math.abs(ty - y) < 0.05 && Math.hypot(vx, vy) < 0.5;
    if (settled) { x = tx; y = ty; vx = vy = 0; render(); raf = 0; return; }
    raf = requestAnimationFrame(tick);
  }

  function wake() {
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
  }

  function setText(size) {
    const next = size > 0;
    if (next) cursor.style.setProperty('--cursor-text-h', `${Math.round(size)}px`);
    if (next !== isText) {
      isText = next;
      cursor.classList.toggle('is-text', isText);
    }
  }

  window.addEventListener('pointermove', e => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    tx = e.clientX; ty = e.clientY;
    if (!started) {
      started = true;
      x = tx; y = ty;
      document.documentElement.classList.add('has-cursor');
    }
    cursor.classList.add('is-visible');
    cursor.classList.toggle('is-link', !!(e.target.closest && e.target.closest('a[href]')));
    setText(textSizeAt(tx, ty));
    wake();
  }, { passive: true });

  // Content can move under a still pointer while scrolling
  window.addEventListener('scroll', () => { if (started) setText(textSizeAt(tx, ty)); }, { passive: true });

  document.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));
  document.addEventListener('mouseenter', () => { if (started) cursor.classList.add('is-visible'); });
})();

// What's Next cards: videos stay unloaded until the section is near the viewport,
// so the extra thumbnails never slow down the case study itself.
(function initWhatsNextVideos() {
  const videos = document.querySelectorAll('.whats-next video[data-wn-lazy]');
  if (!videos.length) return;
  const start = v => {
    v.preload = 'auto';
    v.load();
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  };
  if (!('IntersectionObserver' in window)) { videos.forEach(start); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      start(e.target);
    });
  }, { rootMargin: '400px 0px' });
  videos.forEach(v => io.observe(v));
})();

// Analytics events (GA4): readable names for what gets clicked.
// gtag only sends from lydia-oh.com and never from the owner's opted-out browsers (see the head snippet).
(function initAnalyticsEvents() {
  const track = (name, params) => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', name, Object.assign({ transport_type: 'beacon' }, params));
  };
  const clean = s => (s || '').replace(/\s+/g, ' ').trim();
  const labelOf = el => clean(el.dataset.text || el.getAttribute('aria-label') || el.textContent);
  const PROJECTS = { memecore: 'MemeCore', 'mel-ai': 'Mel', 'sk-hmi': 'SK', spot: 'SPOT', 'security-collab': 'INSS' };
  const NAVI = { Work: 'Navi_Work', About: 'Navi_About', Lab: 'Navi_Lab' };

  document.addEventListener('click', e => {
    const el = e.target.closest && e.target.closest('a, button');
    if (!el) return;
    const href = el.getAttribute('href') || '';
    const inGnb = !!el.closest('.gnb');
    const path0 = location.pathname;
    const where = el.closest('.gnb__mobile-nav') ? 'mobile_menu'
      : inGnb ? 'navi'
      : el.closest('.footer') ? 'footer'
      : /^\/about/.test(path0) ? 'about_page'
      : /^\/article/.test(path0) ? 'article_page'
      : /^\/lab/.test(path0) ? 'lab_page'
      : 'page';

    // Project cards: home grid, Work list, What's Next
    if (el.matches('.work-card__link')) {
      const slug = (href.match(/work\/([^/]+)/) || [])[1] || href;
      const path = location.pathname.replace(/index\.html$/, '');
      const placement = el.closest('.whats-next') ? 'whats_next' : path === '/' ? 'home' : path === '/work/' ? 'work_list' : 'other';
      track('project_click', { item: PROJECTS[slug] || slug, placement });
      return;
    }
    // Resume (opens the Drive file)
    if (/drive\.google\.com/.test(href)) { track('Navi_Resume', { placement: where }); return; }
    // LinkedIn: one event for every LinkedIn button (navi, mobile menu, footer, About page, Article page)
    if (/linkedin\.com/.test(href)) { track('Linkedin', { placement: where }); return; }
    // Navigation bar
    if (inGnb) {
      if (el.matches('.gnb__hamburger')) return;
      if (el.matches('.gnb__logo')) { track('Navi_Home', { placement: where }); return; }
      const label = labelOf(el);
      track(NAVI[label] || ('Navi_' + label.replace(/\W+/g, '_')), { placement: where });
      return;
    }
    // Footer and other social links
    if (el.matches('.footer__email-btn')) { track('email_copy', { placement: 'footer' }); return; }
    // Lab items are Behance links: counted as lab_item_click (which work) and as a Behance click
    if (el.matches('.lab-item[href]')) {
      const t = el.querySelector('.lab-item__title');
      track('lab_item_click', { item: clean((t || el).textContent).slice(0, 60) });
      track('Behance', { placement: 'lab_item' });
      return;
    }
    // Every other Behance button (footer, About page icon)
    if (/behance\.net/.test(href)) { track('Behance', { placement: where }); }
  }, true);
})();
