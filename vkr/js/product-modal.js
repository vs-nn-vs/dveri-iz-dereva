document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('productModal');
  if (!modal) return;

  const img = document.getElementById('productModalImg');
  const titleEl = document.getElementById('productModalTitle');
  const specsEl = document.getElementById('productModalSpecs');
  const descEl = document.getElementById('productModalDesc');
  const prevBtn = modal.querySelector('[data-prev]');
  const nextBtn = modal.querySelector('[data-next]');

  const allCards = document.querySelectorAll('.product-card, .portfolio-item');

  let visibleCards = [];
  let currentIndex = 0;

  function isVisible(card) {
    return window.getComputedStyle(card).display !== 'none';
  }

  function getVisibleCards() {
    return Array.from(allCards).filter(isVisible);
  }

  function renderModal(card) {
    const thumb = card.querySelector('img');
    if (!thumb) return;

    img.src = thumb.src;
    img.alt = thumb.alt;

    titleEl.textContent = card.dataset.fullTitle || thumb.alt || '';
    descEl.textContent = card.dataset.description || '';

    specsEl.innerHTML = '';
    const fields = [
      ['Материал', card.dataset.material],
      ['Размер', card.dataset.size],
      ['Цена', card.dataset.price]
    ];
    fields.forEach(([label, value]) => {
      if (value) {
        const li = document.createElement('li');
        const parts = value.split('|');
        const mainValue = parts[0];
        const note = parts[1];

        li.innerHTML = `
          <span>${label}</span>
          <span class="product-modal__specs-value">
            <b>${mainValue}</b>
            ${note ? `<small>${note}</small>` : ''}
          </span>
        `;
        specsEl.appendChild(li);
      }
    });

    // Скрываем стрелки, если пролистывать нечего
    const hideNav = visibleCards.length <= 1;
    if (prevBtn) prevBtn.classList.toggle('is-hidden', hideNav);
    if (nextBtn) nextBtn.classList.toggle('is-hidden', hideNav);
  }

  function openModal(card) {
    // Пересчитываем список видимых карточек на момент открытия —
    // так учитывается текущий активный фильтр на products.html
    visibleCards = getVisibleCards();
    currentIndex = visibleCards.indexOf(card);
    if (currentIndex === -1) currentIndex = 0;

    renderModal(visibleCards[currentIndex]);

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showByOffset(offset) {
    const total = visibleCards.length;
    if (total === 0) return;
    currentIndex = (currentIndex + offset + total) % total; // зацикливаем список
    renderModal(visibleCards[currentIndex]);
  }

  allCards.forEach(card => {
    card.style.cursor = 'zoom-in';
    card.addEventListener('click', () => openModal(card));
  });

  if (prevBtn) prevBtn.addEventListener('click', () => showByOffset(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => showByOffset(1));

  modal.querySelectorAll('[data-close]').forEach(el =>
    el.addEventListener('click', closeModal)
  );

  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('is-open')) return;

    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') showByOffset(1);
    if (e.key === 'ArrowLeft') showByOffset(-1);
  });
});
