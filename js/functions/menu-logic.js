/**
 * Lógica para abrir y cerrar el menú móvil.
 */
export const toggleMenu = () => {
    const navMenu = document.querySelector('.header-nav');
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const overlay = document.querySelector('.nav-overlay'); // Seleccionamos el overlay

    if (navMenu && navToggle && overlay) {
        navMenu.classList.toggle('is-active');
        navToggle.classList.toggle('is-active');
        overlay.classList.toggle('is-active'); // Activamos el efecto visual
        
        // Bloquea el scroll del cuerpo para que el usuario no se pierda
        document.body.style.overflow = navMenu.classList.contains('is-active') ? 'hidden' : '';
    
    } else {
        console.warn("Error: Faltan elementos del menú en el DOM.");
        return;
    }
};