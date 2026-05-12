/**
 * Objeto de estado global para el módulo de Matchmaking.
 * Centraliza los datos para que todos los sub-módulos lean de aquí.
 */
export const state = {
    // Vista actual: 'open' (Partidos abiertos) o 'create' (Crear reserva)
    // El valor por defecto coincide con el atributo aria-selected="true" del HTML
    currentView: 'open', 

    // Datos del partido que el usuario está intentando crear
    newMatch: {
        sport: 'Pádel',
        title: '',
        date: '',
        level: 'Intermedio',
        totalSpots: 4,
        members: [] // Array de objetos { name, level }
    },

    // Datos del partido seleccionado en la lista de "Partidos abiertos"
    selectedMatch: null 
};