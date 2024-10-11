document.addEventListener('DOMContentLoaded', function() {
    const storedLastPeriodDate = localStorage.getItem('lastPeriodDate');
    const storedCycleLength = localStorage.getItem('cycleLength');

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

    const moodOptions = document.querySelectorAll('.mood-options input[type="radio"]');
    moodOptions.forEach(option => {
        option.addEventListener('click', function() {
            moodOptions.forEach(opt => opt.parentElement.style.opacity = 0.5);
            this.parentElement.style.opacity = 1;
        });
    });

    const sintomasButtons = document.querySelectorAll('.sintomas .sintoma');
    sintomasButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });

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

        let recommendationsText = '';
        if (selectedMood || selectedSymptoms.length > 0) {
            let allRecommendations = [];

            if (selectedMood) {
                const mood = selectedMood.value;
                allRecommendations = allRecommendations.concat(recommendations[mood]);
            }

            selectedSymptoms.forEach(symptom => {
                const symptomValue = symptom.value;
                allRecommendations = allRecommendations.concat(recommendations[symptomValue]);
            });

            if (flowLevel === 'high') {
                allRecommendations.push('Beber mais água para reduzir o fluxo', 'Evitar cafeína');
            }

            const uniqueRecommendations = [...new Set(allRecommendations)];
            recommendationsText = uniqueRecommendations.map(recommendation => `<li>${recommendation}</li>`).join('');
        }

        document.getElementById('recommended-habits').innerHTML = `<ul>${recommendationsText}</ul>`;
    }

    document.getElementById('recommend-habits-btn').addEventListener('click', recommendHabits);

    function recommendHabits() {
        const selectedMood = document.querySelector('.mood-options input[type="radio"]:checked');
        const selectedSymptoms = document.querySelectorAll('.sintomas .sintoma.selected');
        const flowLevel = document.getElementById('flow-level').value;
    
        let allRecommendations = [];
    
        if (selectedMood) {
            const mood = selectedMood.value;
            allRecommendations = allRecommendations.concat(recommendations[mood]);
        }
    
        selectedSymptoms.forEach(symptom => {
            const symptomValue = symptom.value;
            allRecommendations = allRecommendations.concat(recommendations[symptomValue]);
        });
    
        if (flowLevel === 'high') {
            allRecommendations = allRecommendations.concat(['Descansar mais', 'Evitar atividades físicas intensas']);
        }
    
        const uniqueRecommendations = [...new Set(allRecommendations)];
    
        const recommendationsList = uniqueRecommendations.map(recommendation => `<li>${recommendation}</li>`).join('');
    
        const recommendedHabitsDiv = document.getElementById('recommended-habits');
        recommendedHabitsDiv.innerHTML = `<h3>Hábitos Recomendados</h3><ul>${recommendationsList}</ul>`;
    }
});

function calculateDaysLeft(lastPeriodDate, cycleLength) {
    const currentDate = new Date();
    const nextPeriodDate = new Date(lastPeriodDate);
    nextPeriodDate.setDate(lastPeriodDate.getDate() + cycleLength);

    const diffTime = Math.abs(nextPeriodDate - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const daysLeftElement = document.getElementById('days-left');
    daysLeftElement.textContent = diffDays;
}

function renderCalendar(lastPeriodDate, cycleLength) {
    const menstruationLength = 5;
    const ovulationDay = Math.floor(cycleLength / 2);
    const fertilePeriodStart = ovulationDay - 5;
    const fertilePeriodEnd = ovulationDay + 4;

    const calendarBody = document.getElementById('calendar-body');
    calendarBody.innerHTML = '';

    const daysInMonth = new Date(lastPeriodDate.getFullYear(), lastPeriodDate.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(lastPeriodDate.getFullYear(), lastPeriodDate.getMonth(), 1).getDay();

    const monthYearElement = document.getElementById('month-year');
    monthYearElement.textContent = `${lastPeriodDate.toLocaleString('pt-BR', { month: 'long' })} ${lastPeriodDate.getFullYear()}`;

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
                } else if (cycleDay >= ovulationDay && cycleDay <= ovulationDay + 1) {
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

document.addEventListener('DOMContentLoaded', function() {
    const lastPeriodDateStr = localStorage.getItem('lastPeriodDate');
    const cycleLengthStr = localStorage.getItem('cycleLength');
    
    if (lastPeriodDateStr && cycleLengthStr) {
        const lastPeriodDate = new Date(lastPeriodDateStr);
        const cycleLength = parseInt(cycleLengthStr);
        
        if (!isNaN(lastPeriodDate) && !isNaN(cycleLength)) {
            const today = new Date();
            const nextPeriodDate = new Date(lastPeriodDate);
            nextPeriodDate.setDate(lastPeriodDate.getDate() + cycleLength);
            
            const timeDiff = nextPeriodDate - today;
            const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            
            document.getElementById('days-left').textContent = daysLeft;
        } else {
            document.getElementById('days-left').textContent = '--';
        }
    } else {
        document.getElementById('days-left').textContent = '--';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var perfilDropdown = document.getElementById('perfilDropdown');
    perfilDropdown.addEventListener('click', function (event) {
        event.preventDefault();
        var dropdownMenu = this.nextElementSibling;
        dropdownMenu.classList.toggle('show');
    });

    window.addEventListener('click', function (event) {
        if (!perfilDropdown.contains(event.target)) {
            var dropdownMenu = perfilDropdown.nextElementSibling;
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        }
    });

    var ajudaButton = document.querySelector('.btn-primary');
    ajudaButton.addEventListener('click', function (event) {
        event.preventDefault();
        if (confirm("Irá lançar um alerta às autoridades competentes sobre a situação da vítima. Deseja continuar?")) {
            var email = "araujogui175@gmail.com";
            var subject = "Alerta de Situação de Vítima";
            var body = "Olá,\n\nPreciso de ajuda urgente.";
            var mailtoUrl = "mailto:" + email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
            window.location.href = mailtoUrl;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData && storedUserData.Name && storedUserData.Lastname) {
        document.getElementById('nome').textContent = storedUserData.Name;
        document.getElementById('sobrenome').textContent = storedUserData.Lastname;
    }

    var form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var name = document.getElementById('name').value;
        var lastname = document.getElementById('lastname').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var passconfirmation = document.getElementById('passconfirmation').value;

        if (name && lastname && email && password && passconfirmation) {
            if (password === passconfirmation) {
                var userData = {
                    Name: name,
                    Lastname: lastname,
                    Email: email,
                    Password: password
                };

                localStorage.setItem('userData', JSON.stringify(userData));
                alert('Dados salvos com sucesso!');
                window.location.href = '/Dália login/login.html';
            } else {
                alert('As senhas não coincidem. Por favor, verifique e tente novamente.');
            }
        } else {
            alert('Por favor, preencha todos os campos antes de prosseguir.');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    function recommendHabits() {
        const flowLevel = document.getElementById('flow-level').value;

        const recommendations = {
            low: ['Beber água', 'Descansar'],
            medium: ['Manter a rotina de alimentação saudável', 'Descansar o suficiente'],
            high: ['Evitar alimentos ricos em sódio', 'Praticar exercícios leves']
        };
        document.getElementById('recommended-habits').innerHTML = '';
        const recommendationsText = recommendations[flowLevel].map(habit => `<li>${habit}</li>`).join('');
        document.getElementById('recommended-habits').innerHTML = `<ul>${recommendationsText}</ul>`;
    }
    const sintomasButtons = document.querySelectorAll('.sintomas .sintoma');
    sintomasButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('selected');
            recommendHabits();
        });
    });

    document.getElementById('flow-level').addEventListener('change', recommendHabits);
});