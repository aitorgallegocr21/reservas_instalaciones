
/**
 * SISTEMA DE FILTRADO DINÁMICO DE INSTALACIONES
 * Este módulo se encarga de comparar los botones de filtro con las tarjetas
 * de instalaciones usando atributos de datos (data-attributes).
 */
export const initFilters = () => {
    // Seleccionamos todos los botones y todas las tarjetas de la página
    const filters = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.facility-card');

    /**
     * CLÁUSULA DE GUARDA: 
     * Si no hay botones o no hay tarjetas (por ejemplo, en otra página), 
     * salimos de la función para evitar errores en la consola.
     */
    if (!filters.length || !cards.length) return;

    // Escuchamos el clic en cada uno de los botones
    filters.forEach(button => {
        button.addEventListener('click', () => {

            // --- PASO 1: Gestión de estados visuales del Menú ---
            // Primero quitamos el estado 'active' a todos los botones...
            filters.forEach(btn => btn.classList.remove('active'));
            // ...y se lo ponemos únicamente al botón que acabamos de pulsar
            button.classList.add('active');

            // Obtenemos el valor del filtro (ej: "futbol", "raqueta", "all")
            const filterValue = button.getAttribute('data-filter');

            // --- PASO 2: Lógica de filtrado de tarjetas ---
            cards.forEach(card => {
                // Obtenemos la categoría de la tarjeta actual en el bucle
                const category = card.getAttribute('data-category');
                
                /**
                 * Condición de visibilidad:
                 * Se muestra si el filtro es "all" (mostrar todo) 
                 * O si el filtro coincide exactamente con la categoría de la tarjeta.
                 */
                if (filterValue === 'all' || filterValue === category) {
                    // Mostramos la tarjeta y activamos la animación CSS 'show'
                    card.style.display = 'flex'; 
                    card.classList.add('show');
                } else {
                    // Ocultamos la tarjeta y quitamos la clase de animación
                    card.style.display = 'none';
                    card.classList.remove('show');
                }
            });
        });
    });
};