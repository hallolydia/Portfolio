// Videos with data-hold: freeze on the last frame for N ms, then replay
document.querySelectorAll('video[data-hold]').forEach((video) => {
  const hold = Number(video.dataset.hold) || 0;
  video.addEventListener('ended', () => {
    setTimeout(() => {
      video.currentTime = 0;
      video.play();
    }, hold);
  });
});
