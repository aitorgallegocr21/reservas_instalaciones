import './components/MainHeader.js';
import { toggleTheme, applySavedTheme } from "./functions/theme-logic.js";
import { toggleMenu } from "./functions/menu-logic.js";

// Esta función busca los botones (Cambia tema y menú desplegable)
// para asignarles sus funciones
const initApp = () => {
    // Aplica ya un tema si existe en la memoria del navegador
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

// Ejecuta la función initApp cuando se detecte que la cabecera está lista y cargada en el DOM
window.addEventListener("header-ready", initApp);

// Verificación de seguridad: si el componente ya cargó, inicializamos
if (document.querySelector('main-header')) {
    // Si ya existe un elemento con el contenido inyectado, forzamos inicio
    const hasContent = document.querySelector('main-header').innerHTML.trim() !== "";
    if (hasContent) initApp();
}