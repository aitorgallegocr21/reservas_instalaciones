// --- IMPORTACIONES ---
import './components/MainHeader.js';
import { toggleTheme, applySavedTheme } from "./functions/theme-logic.js";
import { toggleMenu } from "./functions/menu-logic.js";
import { initFilters } from "./pages/instalaciones/filter-logic.js";
import { initReservationModal } from "./pages/instalaciones/modal-logic.js";
import { initMatchmakingPage } from "./pages/matchmaking/matchmaking-index.js";



// --- ORQUESTADOR DE TODAS LAS FUNCIONES --- 

let isAppInitialized = false; // Bandera de control

const initApp = () => {
    if (isAppInitialized) return; // Si ya se inició, salimos
    isAppInitialized = true;

    console.log("Inicializando aplicación...");

    // Aplica ya un tema si existe en la memoria del navegador
    applySavedTheme();

    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        // Limpiamos escuchador previo para evitar duplicados si se llama dos veces
        themeToggle.removeEventListener("click", toggleTheme);
        themeToggle.addEventListener("click", toggleTheme);
    }

    const menuToggle = document.querySelector(".mobile-nav-toggle");
    if (menuToggle) {
        menuToggle.removeEventListener("click", toggleMenu);
        menuToggle.addEventListener("click", toggleMenu);
    }

    // --- LÓGICA DE INSTALACIONES ---
    initFilters();      // <-- LÓGICA DE FILTROS | Solo se ejecutará si existen los botones de filtro en el DOM --
    initReservationModal(); // <-- INICIALIZACIÓN DEL MODAL

    // --- LÓGICA DE MATCHMAKING ---
    // Importante: initMatchmakingPage ya tiene su propia comprobación de existencia
    initMatchmakingPage();
};



// --- ESCUCHADOR ---
// Si el componente se cargó después de la verificación, se ejecuta cuando avise
window.addEventListener("header-ready", initApp);



// --- VERIFICACIÓN ---
// Si el componente ya terminó antes de llegar aquí, se ejecuta initApp lo antes posible
if (document.querySelector('main-header')) {
    // Si ya existe un elemento con el contenido inyectado, forzamos inicio
    const hasContent = document.querySelector('main-header').innerHTML.trim() !== "";
    if (hasContent) initApp();
}