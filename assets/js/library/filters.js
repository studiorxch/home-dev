
const cards = document.querySelectorAll('.track-card');
const filterButtons = document.querySelectorAll('[data-filter]');
let selectedMood = null;
let selectedGenre = null;

function updateGenreButtonsForMood(mood) {
    const genreButtons = document.querySelectorAll('button[data-type="genre"]');
    genreButtons.forEach(btn => {
        const genre = btn.dataset.filter;
        const hasMatch = Array.from(cards).some(card => {
            const moods = (card.dataset.mood || '').split(' ');
            const genres = (card.dataset.genre || '').split(' ');
            return moods.includes(mood) && genres.includes(genre);
        });
        btn.classList.toggle('disabled', !hasMatch);
    });
}

function updateFilters() {
    filterButtons.forEach(btn => btn.classList.remove('active'));

    if (selectedMood) {
        document.querySelector(`[data-filter="${selectedMood}"][data-type="mood"]`)?.classList.add('active');
    }
    if (selectedGenre) {
        document.querySelector(`[data-filter="${selectedGenre}"][data-type="genre"]`)?.classList.add('active');
    }
    if (!selectedMood && !selectedGenre) {
        document.querySelector(`[data-filter="all"]`)?.classList.add('active');
    }

    cards.forEach(card => {
        const moods = (card.dataset.mood || '').split(' ');
        const genres = (card.dataset.genre || '').split(' ');
        const isNoFilter = card.classList.contains('no-filter');

        const moodMatch = !selectedMood || moods.includes(selectedMood);
        const genreMatch = !selectedGenre || genres.includes(selectedGenre);
        const show = (!selectedMood && !selectedGenre) || (moodMatch && genreMatch && !isNoFilter);

        card.style.display = show ? '' : 'none';
    });

    if (selectedMood) {
        updateGenreButtonsForMood(selectedMood);
    } else {
        document.querySelectorAll('button[data-type="genre"]').forEach(btn => btn.classList.remove('disabled'));
    }
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const type = button.dataset.type;
        const value = button.dataset.filter;

        if (value === 'all') {
            selectedMood = null;
            selectedGenre = null;
        } else if (type === 'mood') {
            selectedMood = (selectedMood === value) ? null : value;
        } else if (type === 'genre') {
            selectedGenre = (selectedGenre === value) ? null : value;
        }

        if (typeof gtag === 'function') {
            gtag('event', 'filter_selected', {
                filter_type: type,
                filter_value: value,
                page_location: window.location.pathname
            });
        }

        updateFilters();
    });
});

const params = new URLSearchParams(window.location.search);
const genreFromURL = params.get('genre');
if (genreFromURL) selectedGenre = genreFromURL.toLowerCase();
updateFilters();
