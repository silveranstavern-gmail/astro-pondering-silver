function initializeSearch(container) {
  if (container.dataset.searchInitialized === 'true') {
    return;
  }

  const input = container.querySelector('[data-search-input]');
  const cards = Array.from(container.querySelectorAll('[data-search-card]')).filter(
    (element) => element instanceof HTMLElement,
  );
  const emptyState = container.querySelector('[data-empty-state]');
  const tags = Array.from(container.querySelectorAll('[data-search-tag]')).filter(
    (element) => element instanceof HTMLElement,
  );

  if (!input || cards.length === 0) return;

  container.dataset.searchInitialized = 'true';

  const normalize = (value) => value.trim().toLowerCase();

  const update = () => {
    const query = normalize(input.value);
    let visible = 0;

    cards.forEach((card) => {
      const text = card.dataset.searchText ?? '';
      const matches = query.length === 0 || text.includes(query);
      card.classList.toggle('hidden', !matches);
      if (matches) {
        card.removeAttribute('aria-hidden');
        visible += 1;
      } else {
        card.setAttribute('aria-hidden', 'true');
      }
    });

    if (emptyState) {
      emptyState.hidden = visible !== 0;
    }
  };

  const handleTagClick = (event) => {
    event.preventDefault();
    const tag = event.currentTarget;
    const tagText = tag.dataset.searchTag;
    if (tagText) {
      input.value = tagText;
      input.focus();
      update();
    }
  };

  const handleExpandTags = (event) => {
    event.preventDefault();
    const button = event.currentTarget;
    const tagsContainer = button.closest('[data-tags-container]');
    if (!tagsContainer) return;

    const hiddenTags = tagsContainer.querySelectorAll('[data-hidden-tag]');
    const expandText = button.querySelector('[data-expand-text]');
    const collapseText = button.querySelector('[data-collapse-text]');

    const isExpanded = !hiddenTags[0]?.classList.contains('hidden');

    hiddenTags.forEach((tag) => {
      tag.classList.toggle('hidden', isExpanded);
    });

    if (expandText && collapseText) {
      expandText.classList.toggle('hidden', !isExpanded);
      collapseText.classList.toggle('hidden', isExpanded);
    }

    button.title = isExpanded ? 'Show all tags' : 'Show fewer tags';
  };

  const expandButtons = container.querySelectorAll('[data-expand-tags]');

  input.addEventListener('input', update);
  tags.forEach((tag) => tag.addEventListener('click', handleTagClick));
  expandButtons.forEach((btn) => btn.addEventListener('click', handleExpandTags));

  update();
}

const setupSearch = () => {
  document.querySelectorAll('[data-search-container]').forEach((section) => {
    if (section instanceof HTMLElement) {
      initializeSearch(section);
    }
  });
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setupSearch();
} else {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      setupSearch();
    },
    { once: true },
  );
}

document.addEventListener('astro:page-load', () => {
  setupSearch();
});
