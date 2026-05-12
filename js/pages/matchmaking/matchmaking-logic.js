export const initMatchmakingPage = () => {
    const matchmakingForm = document.getElementById('matchmaking-form');
    if (!matchmakingForm) return;

    const sportSelect = document.getElementById('sport-select');
    const titleInput = document.getElementById('reservation-title');
    const dateInput = document.getElementById('match-date');
    const totalSpotsInput = document.getElementById('total-spots');
    const availableSpotsInput = document.getElementById('available-spots');
    const myLevelSelect = document.getElementById('main-level');
    const memberNameInput = document.getElementById('member-name');
    const memberLevelSelect = document.getElementById('member-level');
    const addMemberButton = document.getElementById('add-member-btn');
    const resetMatchButton = document.getElementById('reset-match-btn');
    const membersList = document.getElementById('members-list');
    const summarySport = document.getElementById('summary-sport');
    const summaryTotal = document.getElementById('summary-total');
    const summaryAvailable = document.getElementById('summary-available');
    const summaryMembers = document.getElementById('summary-members');
    const summaryMainLevel = document.getElementById('summary-main-level');
    const summaryDate = document.getElementById('summary-date');
    const summaryTitle = document.getElementById('summary-title');
    const tabCreate = document.getElementById('tab-create');
    const tabOpen = document.getElementById('tab-open');
    const viewCreate = document.getElementById('view-create');
    const viewOpen = document.getElementById('view-open');
    const summaryModeTitle = document.getElementById('summary-mode-title');
    const summaryModeDescription = document.getElementById('summary-mode-description');
    const summaryMembersTitle = document.getElementById('summary-members-title');
    const openMatchesContainer = document.querySelector('.open-matches');
    const filterSport = document.getElementById('filter-sport');
    const filterLevel = document.getElementById('filter-level');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    const noMatchesMessage = document.getElementById('no-matches-message');
    const filterPanel = document.querySelector('.matchmaking-filters');

    const matchCards = Array.from(document.querySelectorAll('.match-card'));
    let members = [];
    let currentView = 'open';
    let selectedMatchCard = null;

    const getRemainingSpots = () => {
        const total = Math.max(Number(totalSpotsInput.value) || 0, 2);
        return Math.max(total - 1 - members.length, 0);
    };

    const updateAvailableSpots = () => {
        availableSpotsInput.textContent = getRemainingSpots();
        addMemberButton.disabled = getRemainingSpots() === 0;
        memberNameInput.disabled = getRemainingSpots() === 0;
        memberLevelSelect.disabled = getRemainingSpots() === 0;
    };

    const renderMembers = () => {
        if (members.length === 0) {
            membersList.innerHTML = '<li class="empty">No hay miembros añadidos.</li>';
        } else {
            membersList.innerHTML = members
                .map((member, index) => {
                    return `
                        <li class="member-item">
                            <div>
                                <strong>${member.name}</strong>
                                <span>${member.level}</span>
                            </div>
                            <button type="button" class="remove-member" data-index="${index}">Eliminar</button>
                        </li>
                    `;
                })
                .join('');
        }

        updateAvailableSpots();
        renderSummary();
    };

    const renderSummary = () => {
        summarySport.textContent = sportSelect.value;
        summaryTitle.textContent = titleInput.value.trim() || 'Sin título';
        summaryDate.textContent = dateInput.value ? new Date(dateInput.value).toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) : 'Pendiente';
        summaryTotal.textContent = totalSpotsInput.value;
        summaryAvailable.textContent = getRemainingSpots();
        summaryMainLevel.textContent = myLevelSelect.value;

        if (members.length === 0) {
            summaryMembers.innerHTML = '<li class="empty">Aún no hay jugadores agregados.</li>';
        } else {
            summaryMembers.innerHTML = members
                .map(member => `<li>${member.name} — ${member.level}</li>`)
                .join('');
        }
    };

    const addMember = () => {
        const name = memberNameInput.value.trim();
        const level = memberLevelSelect.value;
        const remaining = getRemainingSpots();

        if (!name) {
            memberNameInput.focus();
            return;
        }

        if (remaining === 0) {
            return;
        }

        members.push({ name, level });
        memberNameInput.value = '';
        memberLevelSelect.value = 'Intermedio';
        renderMembers();
    };

    const removeMember = (index) => {
        if (index < 0 || index >= members.length) return;
        members.splice(index, 1);
        renderMembers();
    };

    const resetMatchmaking = () => {
        matchmakingForm.reset();
        members = [];
        updateAvailableSpots();
        renderMembers();
    };

    const renderOpenSummary = (card) => {
        if (!card) {
            summarySport.textContent = '--';
            summaryTitle.textContent = '--';
            summaryDate.textContent = '--';
            summaryMainLevel.textContent = '--';
            summaryTotal.textContent = '--';
            summaryAvailable.textContent = '--';
            summaryMembersTitle.textContent = 'Participantes';
            summaryMembers.innerHTML = '<li class="empty">Selecciona un partido para ver los participantes.</li>';
            return;
        }

        summaryModeTitle.textContent = 'Partido abierto seleccionado';
        summaryModeDescription.textContent = 'Detalles y participantes del partido seleccionado.';
        summarySport.textContent = card.dataset.matchSport;
        summaryTitle.textContent = card.dataset.matchTitle;
        summaryDate.textContent = card.dataset.matchDate;
        summaryMainLevel.textContent = card.dataset.matchLevel;
        summaryTotal.textContent = card.dataset.matchTotal;
        summaryAvailable.textContent = card.dataset.matchAvailable;
        summaryMembersTitle.textContent = 'Participantes';

        const participants = card.dataset.matchParticipants?.split(';').map(item => item.trim()).filter(Boolean);
        if (!participants || participants.length === 0) {
            summaryMembers.innerHTML = '<li class="empty">No hay participantes registrados aún.</li>';
        } else {
            summaryMembers.innerHTML = participants
                .map((item, index) => {
                    const [name, level] = item.split('|').map(part => part.trim());
                    const label = index === 0 ? `${name} (Creador)` : name;
                    return `<li>${label} — ${level || 'Nivel no disponible'}</li>`;
                })
                .join('');
        }
    };

    const selectMatch = (card) => {
        if (!card) return;
        selectedMatchCard = card;
        matchCards.forEach(item => item.classList.toggle('selected', item === card));
        renderOpenSummary(card);
    };

    const filterMatches = () => {
        const selectedSport = filterSport.value;
        const selectedLevel = filterLevel.value;

        let visibleCount = 0;
        matchCards.forEach(card => {
            const sport = card.dataset.matchSport;
            const level = card.dataset.matchLevel;
            const matchSport = selectedSport === 'all' || sport === selectedSport;
            const matchLevel = selectedLevel === 'all' || level.includes(selectedLevel);
            const visible = matchSport && matchLevel;
            card.style.display = visible ? 'block' : 'none';
            if (visible) visibleCount += 1;
        });

        noMatchesMessage.classList.toggle('hidden', visibleCount > 0);

        if (!selectedMatchCard || selectedMatchCard.style.display === 'none') {
            const firstVisible = matchCards.find(card => card.style.display !== 'none');
            if (firstVisible) {
                selectMatch(firstVisible);
            } else {
                selectedMatchCard = null;
                renderOpenSummary(null);
            }
        }
    };

    const switchMatchmakingView = (view) => {
        currentView = view;
        const isCreate = view === 'create';
        viewCreate.classList.toggle('matchmaking-view-hidden', !isCreate);
        viewOpen.classList.toggle('matchmaking-view-hidden', isCreate);
        tabCreate.classList.toggle('btn-tab-active', isCreate);
        tabOpen.classList.toggle('btn-tab-active', !isCreate);
        tabCreate.setAttribute('aria-selected', isCreate.toString());
        tabOpen.setAttribute('aria-selected', (!isCreate).toString());

        if (isCreate) {
            summaryModeTitle.textContent = 'Resumen del partido';
            summaryModeDescription.textContent = 'Revisa la configuración de tu reserva antes de crearla.';
            summaryMembersTitle.textContent = 'Jugadores registrados';
            renderSummary();
        } else {
            summaryMembersTitle.textContent = 'Participantes';
            renderOpenSummary(selectedMatchCard);
        }
    };

    const joinMatch = (matchName) => {
        alert(`Te has unido al partido: ${matchName}`);
    };

    addMemberButton.addEventListener('click', addMember);

    tabCreate.addEventListener('click', () => switchMatchmakingView('create'));
    tabOpen.addEventListener('click', () => switchMatchmakingView('open'));

    if (openMatchesContainer) {
        openMatchesContainer.addEventListener('click', (event) => {
            const card = event.target.closest('.match-card');
            if (!card) return;

            if (event.target.closest('.btn-join-match')) {
                const title = card.querySelector('strong')?.textContent || 'este partido';
                joinMatch(title);
                return;
            }

            selectMatch(card);
        });
    }

    filterSport.addEventListener('change', filterMatches);
    filterLevel.addEventListener('change', filterMatches);

    clearFiltersBtn.addEventListener('click', () => {
        filterSport.value = 'all';
        filterLevel.value = 'all';
        filterMatches();
    });

    membersList.addEventListener('click', (event) => {
        const button = event.target.closest('.remove-member');
        if (!button) return;
        const index = Number(button.dataset.index);
        removeMember(index);
    });

    totalSpotsInput.addEventListener('input', () => {
        if (Number(totalSpotsInput.value) < 2) {
            totalSpotsInput.value = 2;
        }
        updateAvailableSpots();
        renderSummary();
    });

    sportSelect.addEventListener('change', renderSummary);
    myLevelSelect.addEventListener('change', renderSummary);
    titleInput.addEventListener('input', renderSummary);
    dateInput.addEventListener('change', renderSummary);

    resetMatchButton.addEventListener('click', resetMatchmaking);

    resetMatchmaking();
    
    filterMatches();
    selectedMatchCard = null;
    matchCards.forEach(card => card.classList.remove('selected'));
    
    switchMatchmakingView('open');

    matchmakingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const total = Number(totalSpotsInput.value);
        const remaining = getRemainingSpots();
        const sport = sportSelect.value;
        const title = titleInput.value.trim();
        const date = dateInput.value;

        if (!title) {
            alert('Por favor escribe un nombre de partido.');
            titleInput.focus();
            return;
        }

        if (!date) {
            alert('Por favor selecciona fecha y hora para el partido.');
            dateInput.focus();
            return;
        }

        if (members.length > total - 1) {
            alert('Has añadido más miembros de los permitidos. Ajusta las plazas totales o elimina jugadores.');
            return;
        }

        alert(`Reserva creada.\nDeporte: ${sport}\nPartido: ${title}\nFecha: ${summaryDate.textContent}\nTu nivel: ${myLevelSelect.value}\nMiembros añadidos: ${members.length}\nPlazas totales: ${total}`);
        resetMatchmaking();
    });
};
