// Filter tabs
const tabs = document.querySelectorAll('.filter-tab');
const cards = document.querySelectorAll('.work-card[data-tags]');
const emptyState = document.getElementById('workEmpty');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;

    // Update active tab
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Filter cards
    let visibleCount = 0;
    cards.forEach(card => {
      const tags = card.dataset.tags.split(',');
      const show = filter === 'all' || tags.includes(filter);
      card.classList.toggle('hidden', !show);
      if (show) visibleCount++;
    });

    // Empty state
    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  });
});
