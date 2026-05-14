import { state } from './state.js';



/**
 * Actualiza todos los campos del panel lateral (Resumen).
 */
export const updateSummary = () => {
    // 1. Selección de elementos del resumen
    const elements = {
        modeTitle: document.getElementById('summary-mode-title'),
        modeDesc: document.getElementById('summary-mode-description'),
        sport: document.getElementById('summary-sport'),
        title: document.getElementById('summary-title'),
        date: document.getElementById('summary-date'),
        level: document.getElementById('summary-main-level'),
        total: document.getElementById('summary-total'),
        available: document.getElementById('summary-available'),
        membersTitle: document.getElementById('summary-members-title'),
        membersList: document.getElementById('summary-members')
    };

    // Verificación de seguridad
    if (!elements.modeTitle) return;

    if (state.currentView === 'create') {
        renderCreateSummary(elements);
    } else {
        renderOpenSummary(elements);
    }
};



/**
 * Lógica visual para cuando estamos CREANDO un partido
 */
const renderCreateSummary = (el) => {
    const data = state.newMatch;
    
    el.modeTitle.textContent = 'Resumen del partido';
    el.modeDesc.textContent = 'Revisa la configuración de tu reserva antes de crearla.';
    el.membersTitle.textContent = 'Jugadores registrados';

    el.sport.textContent = data.sport;
    el.title.textContent = data.title || 'Sin título';
    el.date.textContent = formatFriendlyDate(data.date) || 'Pendiente';
    el.level.textContent = data.level;
    el.total.textContent = data.totalSpots;
    el.available.textContent = data.totalSpots - 1 - data.members.length;

    // Renderizado de lista de miembros
    if (data.members.length === 0) {
        el.membersList.innerHTML = '<li class="empty">Aún no hay jugadores añadidos.</li>';
    } else {
        el.membersList.innerHTML = data.members
            .map(m => `<li>${m.name} — ${m.level}</li>`)
            .join('');
    }
};



/**
 * Lógica visual para cuando estamos viendo PARTIDOS ABIERTOS
 */
const renderOpenSummary = (el) => {
    const match = state.selectedMatch;

    el.modeTitle.textContent = 'Partido seleccionado';
    el.modeDesc.textContent = 'Detalles y participantes del encuentro.';
    el.membersTitle.textContent = 'Participantes';

    if (!match) {
        // ... (el código de reset que ya tenías)
        return;
    }

    el.sport.textContent = match.sport;
    el.title.textContent = match.title;
    el.date.textContent = match.date;
    el.level.textContent = match.level;
    el.total.textContent = match.total;
    el.available.textContent = match.available;

    // Procesar la lista de participantes
    if (!match.participants) {
        el.membersList.innerHTML = '<li class="empty">No hay participantes registrados.</li>';
    } else {
        const participantsArray = match.participants.split(';').filter(p => p.trim());
        el.membersList.innerHTML = participantsArray.map((p, index) => {
            const [name, level] = p.split('|');
            const label = (index === 0) ? `${name} (Creador)` : name;
            return `<li>${label} — ${level || 'Nivel N/A'}</li>`;
        }).join('');
    }
};



/**
 * Función interna para formatear la fecha de ISO a formato local español
 * @param {string} dateString - El valor del input datetime-local
 */
const formatFriendlyDate = (dateString) => {
    if (!dateString) return 'Pendiente';

    // Creamos un objeto fecha a partir del string
    const date = new Date(dateString);

    // Usamos el método toLocaleString para un formato profesional
    return date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};