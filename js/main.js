
import { toggleTheme, applySavedTheme } from './functions/theme-logic.js';
import { toggleMenu } from './functions/menu-logic.js';

document.addEventListener('DOMContentLoaded', () => {
    
    // Inicialización (Estado inicial)
    applySavedTheme();

    // Eventos de Tema
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Eventos de Menú Móvil
    const menuToggle = document.querySelector('.mobile-nav-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

});