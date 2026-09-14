document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.product-card');

    function applyFilter(filterValue) {
        filters.forEach(btn => btn.classList.toggle('active', btn.getAttribute('data-filter') === filterValue));

        cards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    filters.forEach(button => {
        button.addEventListener('click', () => {
            applyFilter(button.getAttribute('data-filter'));
        });
    });
    const hashFilter = window.location.hash.replace('#', '');
    const validFilters = Array.from(filters).map(btn => btn.getAttribute('data-filter'));

    if (hashFilter && validFilters.includes(hashFilter)) {
        applyFilter(hashFilter);
    }
});
