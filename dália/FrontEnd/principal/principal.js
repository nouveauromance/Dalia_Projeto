document.addEventListener('DOMContentLoaded', function() {
    const storedLastPeriodDate = localStorage.getItem('lastPeriodDate');
    const storedCycleLength = localStorage.getItem('cycleLength');

    // Verificação e carregamento de ciclo e última menstruação
    if (storedLastPeriodDate && storedCycleLength) {
        const lastPeriodDate = new Date(storedLastPeriodDate);
        const cycleLength = parseInt(storedCycleLength);

        if (!isNaN(lastPeriodDate) && !isNaN(cycleLength)) {
            renderCalendar(lastPeriodDate, cycleLength);
            calculateDaysLeft(lastPeriodDate, cycleLength);
        } else {
            alert('Dados inválidos. Por favor, insira os dados novamente.');
            window.location.href = '/formulario/formulario.html';
        }
    } else {
        alert('Por favor, insira a data da última menstruação e a duração do ciclo.');
        window.location.href = '/formulario/formulario.html';
    }

    // Animação e seleção de humor
    const moodOptions = document.querySelectorAll('.mood-options input[type="radio"]');
    moodOptions.forEach(option => {
        option.addEventListener('click', function() {
            moodOptions.forEach(opt => opt.parentElement.style.opacity = 0.5);
            this.parentElement.style.opacity = 1;
        });
    });

    // Seleção de sintomas
    const sintomasButtons = document.querySelectorAll('.sintomas .sintoma');
    sintomasButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('selected');
            recommendHabits();  // Atualiza as recomendações ao selecionar sintomas
        });
    });

    // Funções de recomendação baseadas no humor e sintomas
    const recommendations = {
        happy: ['Praticar exercícios físicos', 'Meditar', 'Passar tempo ao ar livre'],
        neutro: ['Manter a rotina de alimentação saudável', 'Descansar o suficiente'],
        triste: ['Procurar apoio emocional', 'Praticar atividades que tragam conforto'],
        bravo: ['Praticar técnicas de respiração', 'Expressar sentimentos de forma construtiva'],
        colicas: ['Beber água', 'Descansar', 'Aplicar calor na região'],
        dorCabeca: ['Descansar em ambiente tranquilo', 'Beber chá de camomila'],
        cansaco: ['Fazer pausas durante atividades', 'Dormir o suficiente'],
        inchaço: ['Evitar alimentos ricos em sódio', 'Praticar exercícios leves']
    };

    function recommendHabits() {
        const selectedMood = document.querySelector('.mood-options input[type="radio"]:checked');
        const selectedSymptoms = document.querySelectorAll('.sintomas .sintoma.selected');
        const flowLevel = document.getElementById('flow-level').value;

        let allRecommendations = [];

        // Recomendações baseadas no humor
        document.addEventListener('DOMContentLoaded', function() {
            const emojis = document.querySelectorAll('.emoji');
            emojis.forEach(emoji => {
                emoji.addEventListener('click', function() {
                    const info = this.getAttribute('data-info');
                    document.getElementById('emoji-info').textContent = info;
                    console.log(info); // Para depuração
                });
            });
        });

        // Recomendações baseadas nos sintomas selecionados
        selectedSymptoms.forEach(symptom => {
            const symptomValue = symptom.value;
            allRecommendations = allRecommendations.concat(recommendations[symptomValue] || []);
        });

        // Recomendações baseadas no fluxo menstrual
        if (flowLevel === 'high') {
            allRecommendations = allRecommendations.concat(['Descansar mais', 'Evitar atividades físicas intensas']);
        } else if (flowLevel === 'medium') {
            allRecommendations = allRecommendations.concat(['Manter a rotina de alimentação saudável', 'Descansar o suficiente']);
        } else if (flowLevel === 'low') {
            allRecommendations = allRecommendations.concat(['Beber mais água', 'Descansar']);
        }

        // Remover recomendações duplicadas e atualizar a interface
        const uniqueRecommendations = [...new Set(allRecommendations)];
        const recommendationsList = uniqueRecommendations.map(recommendation => `<li>${recommendation}</li>`).join('');

        document.getElementById('recommended-habits').innerHTML = `<ul>${recommendationsList}</ul>`;
    }


    // Listener para o nível de fluxo menstrual
    document.getElementById('flow-level').addEventListener('change', recommendHabits);
});


// Função para renderizar o calendário
function renderCalendar(lastPeriodDate, cycleLength) {
    const menstruationLength = 5;
    const ovulationDay = Math.floor(cycleLength / 2);
    const fertilePeriodStart = ovulationDay - 5;
    const fertilePeriodEnd = ovulationDay + 4;

    const calendarBody = document.getElementById('calendar-body');
    calendarBody.innerHTML = '';

    const daysInMonth = new Date(lastPeriodDate.getFullYear(), lastPeriodDate.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(lastPeriodDate.getFullYear(), lastPeriodDate.getMonth(), 1).getDay();

    document.getElementById('month-year').textContent = `${lastPeriodDate.toLocaleString('pt-BR', { month: 'long' })} ${lastPeriodDate.getFullYear()}`;

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if (i === 0 && j < firstDayIndex) {
                cell.classList.add('empty');
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                cell.classList.add('empty');
                row.appendChild(cell);
            } else {
                cell.textContent = date;

                const currentDate = new Date(lastPeriodDate.getFullYear(), lastPeriodDate.getMonth(), date);
                const cycleDay = ((date - 1) + (lastPeriodDate.getDate() - 1)) % cycleLength + 1;

                if (cycleDay <= menstruationLength) {
                    cell.classList.add('menstruation');
                } else if (cycleDay === ovulationDay) {
                    cell.classList.add('ovulation');
                } else if (cycleDay >= fertilePeriodStart && cycleDay <= fertilePeriodEnd) {
                    cell.classList.add('fertile');
                }

                row.appendChild(cell);
                date++;
            }
        }

        calendarBody.appendChild(row);
    }
}

