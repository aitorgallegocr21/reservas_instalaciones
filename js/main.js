// --- IMPORTACIONES ---
import './components/MainHeader.js';
import { toggleTheme, applySavedTheme } from "./functions/theme-logic.js";
import { toggleMenu } from "./functions/menu-logic.js";
import { initFilters } from "./instalaciones/filter-logic.js"; // <--- NUEVA IMPORTACIÓN 


// --- DEFINICIÓN DE LA FUNCIONALIDAD DE LOS BOTONES DE LA CABECERA --- 
const initApp = () => {
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


    // --- LÓGICA DE FILTROS ---
    // Solo se ejecutará si existen los botones de filtro en el DOM
    initFilters();
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