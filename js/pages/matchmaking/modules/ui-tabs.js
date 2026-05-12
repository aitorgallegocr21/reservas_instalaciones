import { state } from './state.js';
import { updateSummary } from './summary-manager.js';

export const initTabs = () => {
    const tabCreate = document.getElementById('tab-create');
    const tabOpen = document.getElementById('tab-open');
    const viewCreate = document.getElementById('view-create');
    const viewOpen = document.getElementById('view-open');

    const toggleFiltersBtn = document.getElementById('toggle-filters-btn');
    const filterPanel = document.querySelector('.matchmaking-filters');

    if (!tabCreate || !tabOpen) return;

    /**
     * Sincroniza la visibilidad de los filtros con el estado actual.
     * Centralizamos aquí la lógica para evitar que el botón y el panel se desincronicen.
     */
    const syncFiltersUI = () => {
        if (!filterPanel || !toggleFiltersBtn) return;

        // Aplicamos las clases basándonos estrictamente en el valor del estado
        filterPanel.classList.toggle('hidden', !state.filtersVisible);
        toggleFiltersBtn.classList.toggle('is-active', state.filtersVisible);
    };

    const updateTabUI = () => {
        const isCreate = state.currentView === 'create';

        // 1. Gestión de pestañas y vistas
        tabCreate.classList.toggle('btn-tab-active', isCreate);
        tabOpen.classList.toggle('btn-tab-active', !isCreate);
        viewCreate.classList.toggle('matchmaking-view-hidden', !isCreate);
        viewOpen.classList.toggle('matchmaking-view-hidden', isCreate);

        // 2. Gestión del botón de filtros
        if (toggleFiltersBtn) {
            toggleFiltersBtn.style.display = isCreate ? 'none' : 'flex';
        }

        // 3. Sincronizamos el estado de los filtros (por si acaso)
        syncFiltersUI();

        // 4. Actualizamos el resumen lateral
        updateSummary();
    };

    /**
     * Alterna el estado de visibilidad y actualiza la interfaz
     */
    const toggleFilters = () => {
        state.filtersVisible = !state.filtersVisible; // Invertimos el valor en el estado
        syncFiltersUI(); // Aplicamos el cambio visualmente
    };

    // --- EVENTOS ---
    tabCreate.addEventListener('click', () => {
        state.currentView = 'create';
        updateTabUI();
    });

    tabOpen.addEventListener('click', () => {
        state.currentView = 'open';
        updateTabUI();
    });

    // Escuchamos el clic en el botón de filtros
    toggleFiltersBtn?.addEventListener('click', toggleFilters);

    // Inicialización al cargar el módulo
    updateTabUI();
};