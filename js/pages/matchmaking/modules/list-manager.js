import { state } from './state.js';
import { updateSummary } from './summary-manager.js';

/**
 * Inicializa la lógica de la lista de partidos abiertos y filtros.
 */
export const initListManager = () => {
    const filterSport = document.getElementById('filter-sport');
    const filterLevel = document.getElementById('filter-level');
    const clearBtn = document.getElementById('clear-filters-btn');
    const matchesContainer = document.querySelector('.open-matches');

    if (!matchesContainer) return;

    // 1. Escuchar cambios en los filtros
    const handleFilterChange = () => {
        filterMatches(filterSport.value, filterLevel.value);
    };

    filterSport?.addEventListener('change', handleFilterChange);
    filterLevel?.addEventListener('change', handleFilterChange);

    // 2. Botón de limpiar filtros
    clearBtn?.addEventListener('click', () => {
        filterSport.value = 'all';
        filterLevel.value = 'all';
        filterMatches('all', 'all');
    });

    // 3. Selección de partido (Delegación de eventos)
    matchesContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.match-card');
        if (!card) return;

        // Si se pulsa el botón "Unirme"
        if (e.target.classList.contains('btn-join-match')) {
            return alert(`Te has unido al partido: ${card.dataset.matchTitle}`);
        }

        // Seleccionar partido
        selectMatch(card);
    });
};

/**
 * Filtra visualmente las tarjetas de partidos
 */
const filterMatches = (sport, level) => {
    const cards = document.querySelectorAll('.match-card');
    const noMatchesMsg = document.getElementById('no-matches-message');
    let visibleCount = 0;

    cards.forEach(card => {
        const matchSport = card.dataset.matchSport;
        const matchLevel = card.dataset.matchLevel;

        const matchesSport = (sport === 'all' || matchSport === sport);
        // El nivel puede ser una lista (ej: "Iniciación / Intermedio")
        const matchesLevel = (level === 'all' || matchLevel.includes(level));

        if (matchesSport && matchesLevel) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Mostrar mensaje si no hay resultados
    noMatchesMsg?.classList.toggle('hidden', visibleCount > 0);
};

/**
 * Extrae los datos de la tarjeta y actualiza el estado
 */
const selectMatch = (card) => {
    // 1. Gestionar estado visual de selección
    document.querySelectorAll('.match-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');

    // 2. Guardar datos en el estado central
    state.selectedMatch = {
        id: card.dataset.matchId,
        sport: card.dataset.matchSport,
        title: card.dataset.matchTitle,
        date: card.dataset.matchDate,
        level: card.dataset.matchLevel,
        location: card.dataset.matchLocation,
        total: card.dataset.matchTotal,
        available: card.dataset.matchAvailable,
        participants: card.dataset.matchParticipants // Cadena formateada: "Nombre|Nivel;Nombre|Nivel"
    };

    // 3. Actualizar el resumen lateral
    updateSummary();
};