// Play case-study clips only while they are on screen (keeps page weight low)
(function () {
  var videos = document.querySelectorAll('video[data-lazy-video]');
  if (!videos.length) return;

  function start(v) {
    if (v.preload !== 'auto') v.preload = 'auto';
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }

  if (!('IntersectionObserver' in window)) {
    videos.forEach(start);
    return;
  }

  var onScreen = new Set();

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var v = entry.target;
      if (entry.isIntersecting) {
        onScreen.add(v);
        start(v);
      } else {
        onScreen.delete(v);
        v.pause();
      }
    });
  }, { rootMargin: '200px 0px' });

  videos.forEach(function (v) { io.observe(v); });

  // A tab opened in the background can't start playback — retry when it becomes visible
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) onScreen.forEach(start);
  });
})();
