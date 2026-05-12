import { state } from './state.js';
import { updateSummary } from './summary-manager.js';

/**
 * Gestiona el cambio de pestañas (Tabs) en la página de matchmaking.
 */
export const initTabs = () => {
    const tabCreate = document.getElementById('tab-create');
    const tabOpen = document.getElementById('tab-open');
    const viewCreate = document.getElementById('view-create');
    const viewOpen = document.getElementById('view-open');

    if (!tabCreate || !tabOpen) return;

    // Función interna para actualizar la interfaz
    const updateTabUI = () => {
        const isCreate = state.currentView === 'create';

        // 1. Gestionar clases de los botones (active/inactive)
        tabCreate.classList.toggle('btn-tab-active', isCreate);
        tabOpen.classList.toggle('btn-tab-active', !isCreate);

        // 2. Gestionar accesibilidad (ARIA)
        tabCreate.setAttribute('aria-selected', isCreate);
        tabOpen.setAttribute('aria-selected', !isCreate);

        // 3. Intercambiar visibilidad de las secciones
        // Usamos las clases definidas en tu matchmaking_page.css
        viewCreate.classList.toggle('matchmaking-view-hidden', !isCreate);
        viewOpen.classList.toggle('matchmaking-view-hidden', isCreate);
        
        console.log(`Vista cambiada a: ${state.currentView}`);

        // LLAMADA CLAVE: Cada vez que cambie la pestaña, actualizamos el resumen
        updateSummary();
    };

    // Eventos de clic utilizando funciones de flecha
    tabCreate.addEventListener('click', () => {
        state.currentView = 'create';
        updateTabUI();
    });

    tabOpen.addEventListener('click', () => {
        state.currentView = 'open';
        updateTabUI();
    });

    // Inicializamos el estado visual correcto al cargar
    updateTabUI();
};