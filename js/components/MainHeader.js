class MainHeader extends HTMLElement {
    connectedCallback() {

        // Se obtiene la ruta actual
        const currentPath = window.location.pathname;

        // Definimos si es la página de inicio
        const isIndex = currentPath.endsWith("index.html") || currentPath.endsWith("/");

        // Establecemos el prefijo de las rutas según la ubicación
        const prefix = isIndex ? "./" : "../";
        

        this.innerHTML = `
            <header class="main-header">
                <div class="header-container">
                    <div class="header-brand">
                        <a href="${prefix}index.html" aria-label="Volver al inicio">
                            <img src="${prefix}assets/img/EscudoArgamasilla.webp" alt="Escudo oficial de Argamasilla de Alba" width="50" height="50" class="brand-logo">
                            <h1 class="brand-name">Argamasilla de Alba</h1>
                        </a>
                    </div>
            
                    <nav class="header-nav" id="header-nav" aria-label="Navegación principal">
                        <ul class="nav-list">
                            <li><a href="${prefix}index.html" class="nav-link">Inicio</a></li>
                            <li><a href="${prefix}html/instalaciones.html" class="nav-link">Instalaciones</a></li>
                            <li><a href="${prefix}html/matchmaking.html" class="nav-link">Buscar compañero</a></li>
                            <li><a href="${prefix}html/mis_reservas.html" class="nav-link">Mis reservas</a></li>
                            <li><a href="${prefix}html/contacto.html" class="nav-link">Contacto</a></li>
                        </ul>
                        <div class="auth-buttons">
                            <a href="#" class="btn btn-secondary">Iniciar sesión</a>
                            <a href="#" class="btn btn-primary">Registrarse</a>
                        </div>
                    </nav>
            
                    <div class="header-user-actions">
                        <button class="theme-toggle" id="theme-toggle" aria-label="Cambiar modo de color">
                            <svg class="sun-icon"><use xlink:href="${prefix}assets/svg/index_svg/index_sunmoon.svg#icon-sun"></use></svg>
                            <svg class="moon-icon"><use xlink:href="${prefix}assets/svg/index_svg/index_sunmoon.svg#icon-moon"></use></svg>
                        </button>
                        <div class="user-profile" style="display: none;">
                            <button class="profile-trigger" aria-haspopup="true" aria-expanded="false">
                                <img src="${prefix}assets/img/avatar_generico.png" alt="Foto de perfil" class="user-avatar">
                            </button>
                        </div>
                    </div>
            
                    <button class="mobile-nav-toggle" aria-controls="header-nav" aria-expanded="false" aria-label="Abrir menú de navegación">
                        <span class="hamburger"></span>
                    </button>
                </div>
            </header>
            <div class="nav-overlay" id="nav-overlay"></div>
        `;

        // Lógica para marcar la página activa
        this.setActiveLink();

        // Pequeño retraso para colocar el evento al final de la cola de ejecución,
        // para asegurar que no se lance antes de que el main esté escuchando
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent("header-ready"));
        }, 0);
    }

    setActiveLink() {
        // Obtenemos la URL actual
        const currentUrl = window.location.href.split('#')[0].split('?')[0];
        const navLinks = this.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            // El navegador resuelve automáticamente link.href a una ruta absoluta
            // Comparamos la URL actual con el href del enlace
            if (link.href === currentUrl || (currentUrl.endsWith('/') && link.href.endsWith('index.html'))) {
                link.classList.add('is-active-page');
            }
        });
    }

}

// Cuando cargue la etiqueta <main-header> ejecuta la clase
customElements.define("main-header", MainHeader);
