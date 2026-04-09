/**
 * Lógica para abrir y cerrar el menú móvil.
 */
export const toggleMenu = () => {
    const navMenu = document.querySelector('.header-nav');
    const navToggle = document.querySelector('.mobile-nav-toggle');

    if (navMenu && navToggle) {
        // Intercambiamos la clase 'is-active' en el menú y el botón
        navMenu.classList.toggle('is-active');
        navToggle.classList.toggle('is-active');
    }
};