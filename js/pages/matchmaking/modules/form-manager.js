import { state } from './state.js';
import { updateSummary } from './summary-manager.js';

/**
 * Inicializa toda la lógica del formulario de creación.
 */
export const initFormManager = () => {
    const form = document.getElementById('matchmaking-form');
    if (!form) return;

    // 1. Vincular inputs básicos al estado
    setupInputSync();

    // 2. Lógica de miembros (Añadir/Eliminar)
    setupMembersLogic();

    // 3. Envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit();
    });

    // 4. Botón Limpiar
    document.getElementById('reset-match-btn')?.addEventListener('click', resetForm);
    
    // Calculamos plazas iniciales
    updateAvailableSpots();
};

/**
 * Sincroniza los cambios de los inputs con el objeto 'state'
 */
const setupInputSync = () => {
    const inputs = {
        sport: document.getElementById('sport-select'),
        title: document.getElementById('reservation-title'),
        date: document.getElementById('match-date'),
        level: document.getElementById('main-level'),
        totalSpots: document.getElementById('total-spots')
    };

    // Escuchamos cambios en cada input
    Object.entries(inputs).forEach(([key, el]) => {
        if (!el) return;
        el.addEventListener('input', (e) => {
            state.newMatch[key] = e.target.value;
            
            if (key === 'totalSpots') updateAvailableSpots();
            
            updateSummary(); // Reflejamos el cambio en el sidebar inmediatamente
        });
    });
};

/**
 * Gestiona la suma de compañeros a la reserva
 */
const setupMembersLogic = () => {
    const addBtn = document.getElementById('add-member-btn');
    const nameInput = document.getElementById('member-name');
    const levelSelect = document.getElementById('member-level');

    addBtn?.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const level = levelSelect.value;

        // Validación básica
        if (!name) return nameInput.focus();

        const remaining = state.newMatch.totalSpots - 1 - state.newMatch.members.length;
        if (remaining <= 0) return alert("No quedan plazas disponibles.");

        // Añadimos al array del estado
        state.newMatch.members.push({ name, level });
        
        // Limpiamos inputs y refrescamos
        nameInput.value = '';
        renderMembersList();
        updateAvailableSpots();
        updateSummary();
    });

    // Delegación de eventos para eliminar miembros
    document.getElementById('members-list')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-member')) {
            const index = e.target.dataset.index;
            state.newMatch.members.splice(index, 1); // Eliminamos del array
            renderMembersList();
            updateAvailableSpots();
            updateSummary();
        }
    });
};

/**
 * Calcula y muestra las plazas libres
 */
const updateAvailableSpots = () => {
    const display = document.getElementById('available-spots');
    const total = parseInt(state.newMatch.totalSpots) || 0;
    const occupied = 1 + state.newMatch.members.length; // El creador + compañeros
    const remaining = Math.max(0, total - occupied);
    
    if (display) display.textContent = remaining;
    
    // Deshabilitar botón de añadir si no hay sitio
    const addBtn = document.getElementById('add-member-btn');
    if (addBtn) addBtn.disabled = (remaining <= 0);
};

/**
 * Pinta la lista de nombres bajo el formulario
 */
const renderMembersList = () => {
    const list = document.getElementById('members-list');
    if (!list) return;

    if (state.newMatch.members.length === 0) {
        list.innerHTML = '<li class="empty">No hay miembros añadidos.</li>';
        return;
    }

    list.innerHTML = state.newMatch.members.map((m, index) => `
        <li class="member-item">
            <div>
                <strong>${m.name}</strong>
                <span>${m.level}</span>
            </div>
            <button type="button" class="remove-member" data-index="${index}">Eliminar</button>
        </li>
    `).join('');
};

const resetForm = () => {
    state.newMatch = { sport: 'Pádel', title: '', date: '', level: 'Intermedio', totalSpots: 4, members: [] };
    renderMembersList();
    updateAvailableSpots();
    updateSummary();
};

const handleFormSubmit = () => {
    if (!state.newMatch.title || !state.newMatch.date) {
        return alert("Por favor, completa el título y la fecha.");
    }
    alert(`¡Reserva creada con éxito para ${state.newMatch.sport}!`);
    resetForm();
    document.getElementById('matchmaking-form').reset();
};