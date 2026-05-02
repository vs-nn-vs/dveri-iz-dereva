document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.product-card');

    filters.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Меняем активную кнопку
            filters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // 2. Фильтруем карточки
            cards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Небольшая задержка для эффекта появления
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Скрываем после завершения анимации
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); 
                }
            });
        });
    });
});