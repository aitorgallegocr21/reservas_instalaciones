import { state } from './modules/state.js';
import { initTabs } from './modules/ui-tabs.js';
import { updateSummary } from './modules/summary-manager.js';
import { initFormManager } from './modules/form-manager.js';
import { initListManager } from './modules/list-manager.js';

/**
 * Función principal que orquestará la lógica de matchmaking.
 * Será llamada desde main.js cuando se cargue la cabecera.
 */
export const initMatchmakingPage = () => {
    // Verificamos si estamos en la página de matchmaking antes de actuar
    const matchmakingForm = document.getElementById('matchmaking-form');
    if (!matchmakingForm) return;

    console.log("Iniciando Matchmaking modular...");

    // Inicializamos los módulos
    initTabs(); // <-- Activamos el control de pestañas
    initFormManager(); // <-- Activamos la lógica del formulario
    initListManager(); // <-- Activamos la lógica de búsqueda y filtros
    updateSummary(); // <-- Primera carga del resumen
};