/* Case study pages: left bar with "Back" on top and the page's TOC (if any) under it */
(function () {
  var side = document.createElement('aside');
  side.className = 'cs-side';

  var back = document.createElement('a');
  back.className = 'cs-back';
  back.href = '/#work';
  back.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>Back';
  // Back always means Home. If the previous page was the home page, step back in history so it keeps
  // its scroll position; otherwise (e.g. arrived from another case study via What's next) go to /#work.
  back.addEventListener('click', function (e) {
    try {
      var ref = document.referrer ? new URL(document.referrer) : null;
      var fromHome = ref && ref.origin === location.origin && /^\/(index\.html)?$/.test(ref.pathname);
      if (fromHome && history.length > 1) {
        e.preventDefault();
        history.back();
      }
    } catch (err) {}
  });
  side.appendChild(back);
  document.body.appendChild(side);

  // Below 1400px (no left bar): line Back up with the left edge of the content's first line
  function alignBack() {
    if (window.innerWidth >= 1400) { side.style.left = ''; return; }
    var first = document.querySelector('.mg-hero .tag, .mc-hero .tag, .sk-hero .tag, .sp-hero .tag, .cs-hero .tag, h1');
    if (first) side.style.left = Math.round(first.getBoundingClientRect().left + window.scrollX) + 'px';
  }
  alignBack();
  window.addEventListener('resize', alignBack);
  window.addEventListener('load', alignBack);

  // The TOC is built by each page's own script, sometimes after this runs: move it in once it exists
  function grabToc() {
    var toc = document.querySelector('.lt-toc');
    if (toc && toc.parentNode !== side) { side.appendChild(toc); return true; }
    return !!toc;
  }
  if (!grabToc()) {
    document.addEventListener('DOMContentLoaded', grabToc);
    window.addEventListener('load', grabToc);
  }
})();
