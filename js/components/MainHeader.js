class MainHeader extends HTMLElement {
    connectedCallback() {
        const isRoot = this.getAttribute("data-path") === "root";
        const prefix = isRoot ? "./" : "../";
        const currentPath = window.location.pathname;

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
                                <li><a href="${prefix}index.html" class="nav-link ${currentPath.endsWith("index.html") || currentPath === "/" ? "is-active-page" : ""}">Inicio</a></li>
                                <li><a href="${prefix}html/instalaciones.html" class="nav-link ${currentPath.includes("instalaciones.html") ? "is-active-page" : ""}">Instalaciones</a></li>
                                <li><a href="${prefix}html/matchmaking.html" class="nav-link ${currentPath.includes("matchmaking.html") ? "is-active-page" : ""}">Buscar compañero</a></li>
                                <li><a href="${prefix}html/mis_reservas.html" class="nav-link ${currentPath.includes("mis_reservas.html") ? "is-active-page" : ""}">Mis reservas</a></li>
                                <li><a href="${prefix}html/contacto.html" class="nav-link ${currentPath.includes("contacto.html") ? "is-active-page" : ""}">Contacto</a></li>
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
                                    <span class="sr-only">Ver perfil de usuario</span>
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

        // USAMOS UN PEQUEÑO RETRASO (setTimeout 0)
        // Esto coloca el evento al final de la cola de ejecución,
        // asegurando que main.js ya esté escuchando.
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent("header-ready"));
        }, 0);
    }
}
customElements.define("main-header", MainHeader);
