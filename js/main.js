import './components/MainHeader.js';
import { toggleTheme, applySavedTheme } from "./functions/theme-logic.js";
import { toggleMenu } from "./functions/menu-logic.js";

const initApp = () => {
    applySavedTheme();

    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        // Limpiamos listener previo para evitar duplicados si se llama dos veces
        themeToggle.removeEventListener("click", toggleTheme);
        themeToggle.addEventListener("click", toggleTheme);
    }

    const menuToggle = document.querySelector(".mobile-nav-toggle");
    if (menuToggle) {
        menuToggle.removeEventListener("click", toggleMenu);
        menuToggle.addEventListener("click", toggleMenu);
    }
};

// Escucha el evento y también verifica si el header ya está en el DOM
window.addEventListener("header-ready", initApp);

// Verificación de seguridad: si el componente ya cargó, inicializamos
if (document.querySelector('main-header')) {
    // Si ya existe un elemento con el contenido inyectado, forzamos inicio
    const hasContent = document.querySelector('main-header').innerHTML.trim() !== "";
    if (hasContent) initApp();
}