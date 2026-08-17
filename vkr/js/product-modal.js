document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('productModal');
  if (!modal) return;

  const img = document.getElementById('productModalImg');
  const titleEl = document.getElementById('productModalTitle');
  const specsEl = document.getElementById('productModalSpecs');
  const descEl = document.getElementById('productModalDesc');

  const cards = document.querySelectorAll('.product-card, .portfolio-item');

  function openModal(card) {
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

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cards.forEach(card => {
    card.style.cursor = 'zoom-in';
    card.addEventListener('click', () => openModal(card));
  });

  modal.querySelectorAll('[data-close]').forEach(el =>
    el.addEventListener('click', closeModal)
  );

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
});
