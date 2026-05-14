import { state } from './state.js';
import { updateSummary } from './summary-manager.js';

export const initTabs = () => {
    const tabCreate = document.getElementById('tab-create');
    const tabOpen = document.getElementById('tab-open');
    const viewCreate = document.getElementById('view-create');
    const viewOpen = document.getElementById('view-open');
    const toggleFiltersBtn = document.getElementById('toggle-filters-btn');
    const filterPanel = document.getElementById('filter-panel');

    if (!tabCreate || !tabOpen || !filterPanel) return;

    /**
     * Sincroniza toda la Interfaz basada en el Estado Global
     */
    const renderUI = () => {
        const isCreate = state.currentView === 'create';

        // 1. Pestañas y Vistas
        tabCreate.classList.toggle('btn-tab-active', isCreate);
        tabOpen.classList.toggle('btn-tab-active', !isCreate);
        viewCreate.classList.toggle('matchmaking-view-hidden', !isCreate);
        viewOpen.classList.toggle('matchmaking-view-hidden', isCreate);

        // 2. Visibilidad del Botón de Filtros
        if (toggleFiltersBtn) {
            toggleFiltersBtn.style.display = isCreate ? 'none' : 'flex';
            // Sincronizar apariencia del botón
            toggleFiltersBtn.classList.toggle('is-active', state.filtersVisible);
        }

        // 3. Efecto Acordeón del Panel (Controlado por JS)
        filterPanel.classList.toggle('is-open', state.filtersVisible);

        // 4. Actualizar Resumen
        updateSummary();
    };

    // --- EVENTOS ---

    tabCreate.addEventListener('click', () => {
        state.currentView = 'create';
        state.filtersVisible = false; // REGLA 1: Ocultar al cambiar de pestaña
        renderUI();
    });

    tabOpen.addEventListener('click', () => {
        state.currentView = 'open';
        // No forzamos el cierre aquí para que si vuelve a 'open' decida él si abrirlo
        renderUI();
    });

    toggleFiltersBtn?.addEventListener('click', () => {
        state.filtersVisible = !state.filtersVisible; // Alternar estado
        renderUI();
    });

    // Ejecución inicial: El JS manda sobre el estado inicial
    renderUI();
};