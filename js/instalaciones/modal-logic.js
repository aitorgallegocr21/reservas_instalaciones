
/**
 * SISTEMA DE GESTIÓN DEL MODAL DE RESERVAS
 * Este archivo se encargará de escuchar los clics en los botones de "Reservar", 
 * capturar los datos de la tarjeta (data-attributes) y gestionar la apertura/cierre del modal.
 */
export const initReservationModal = () => {
    // 1. Selección de elementos del DOM
    const modal = document.getElementById('reservation-modal');
    const closeBtn = document.getElementById('close-modal');
    const reserveButtons = document.querySelectorAll('.btn-reserve');
    
    // Elementos dinámicos dentro del modal
    const displayFacility = document.getElementById('display-facility-name');
    const displayPrice = document.getElementById('display-price');
    const reservationForm = document.getElementById('reservation-form');

    if (!modal || !reserveButtons.length) return;

    /**
     * FUNCIÓN: Abrir modal y cargar datos
     * @param {Event} e - Evento de clic
     */
    const openModal = (e) => {
        e.preventDefault(); // Evita que el enlace recargue la página o salte

        // Capturamos los datos desde los atributos personalisados 'data-' del botón pulsado
        const facilityName = e.currentTarget.getAttribute('data-facility');
        const price = e.currentTarget.getAttribute('data-price');

        // Inyectamos los datos en el modal
        displayFacility.textContent = facilityName;
        displayPrice.textContent = price;

        // Cambiamos el estado visual
        modal.classList.add('is-visible');
        modal.setAttribute('aria-hidden', 'false');
        
        // Bloqueamos el scroll de la página de fondo
        document.body.style.overflow = 'hidden';
    };

    /**
     * FUNCIÓN: Cerrar modal
     */
    const closeModal = () => {
        modal.classList.remove('is-visible');
        modal.setAttribute('aria-hidden', 'true');
        
        // Restauramos el scroll y reseteamos el formulario
        document.body.style.overflow = '';
        reservationForm.reset();
    };

    // --- EVENTOS ---

    // Asignamos el evento a todos los botones de "Reservar"
    reserveButtons.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Cierre mediante el botón (X)
    closeBtn.addEventListener('click', closeModal);

    // Cierre al hacer clic fuera del contenedor blanco (en el overlay)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Cierre con la tecla Escape por accesibilidad
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
            closeModal();
        }
    });

    // Envío del formulario (Prevención por defecto)
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert(`¡Reserva solicitada para ${displayFacility.textContent}!\n(Enlace con backend próximamente)`);
        closeModal();
    });
};