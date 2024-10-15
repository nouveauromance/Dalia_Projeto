document.addEventListener('DOMContentLoaded', () => {
    const storedLastPeriodDate = localStorage.getItem('lastPeriodDate');
    const storedCycleLength = localStorage.getItem('cycleLength');


    const renderCalendar = (lastPeriodDate, cycleLength) => {
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
    };
    const calculateDaysLeft = (lastPeriodDate, cycleLength) => {
        const currentDate = new Date();
        const nextPeriodDate = new Date(lastPeriodDate);
        nextPeriodDate.setDate(lastPeriodDate.getDate() + cycleLength);

        const diffTime = Math.abs(nextPeriodDate - currentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const daysLeftElement = document.getElementById('days-left');
        daysLeftElement.textContent = diffDays;
    };
    if (storedLastPeriodDate && storedCycleLength) {
        const lastPeriodDate = new Date(storedLastPeriodDate);
        const cycleLength = Number.parseInt(storedCycleLength);

        if (!Number.isNaN(lastPeriodDate) && !Number.isNaN(cycleLength)) {
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
    moodOptions.for(option => {
        option.addEventListener('click', () => {
            moodOptions.for(opt => opt.parentElement.style.opacity = 0.5);
            option.parentElement.style.opacity = 1;
        });
    });

    const sintomasButtons = document.querySelectorAll('.sintomas .sintoma');
    sintomasButtons.for(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('selected');
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

    const recommendHabits = () => {
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

            selectedSymptoms.for(symptom => {
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
    };

    document.getElementById('recommend-habits-btn').addEventListener('click', recommendHabits);



    const lastPeriodDateStr = localStorage.getItem('lastPeriodDate');
    const cycleLengthStr = localStorage.getItem('cycleLength');
    
    if (lastPeriodDateStr && cycleLengthStr) {
        const lastPeriodDate = new Date(lastPeriodDateStr);
        const cycleLength = Number.parseInt(cycleLengthStr);
        
        if (!Number.isNaN(lastPeriodDate) && !Number.isNaN(cycleLength)) {
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

    const perfilDropdown = document.getElementById('perfilDropdown');
    perfilDropdown.addEventListener('click', (event) => {
        event.preventDefault();
        const dropdownMenu = perfilDropdown.nextElementSibling;
        dropdownMenu.classList.toggle('show');
    });

    window.addEventListener('click', (event) => {
        if (!perfilDropdown.contains(event.target)) {
            const dropdownMenu = perfilDropdown.nextElementSibling;
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        }
    });

    const ajudaButton = document.querySelector('.btn-primary');
    ajudaButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (confirm("Irá lançar um alerta às autoridades competentes sobre a situação da vítima. Deseja continuar?")) {
            const email = "araujogui175@gmail.com";
            const subject = "Alerta de Situação de Vítima";
            const body = "Olá,\n\nPreciso de ajuda urgente.";
            const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoUrl;
        }
    });

    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData?.Name && storedUserData?.Lastname) {
        document.getElementById('nome').textContent = storedUserData.Name;
        document.getElementById('sobrenome').textContent = storedUserData.Lastname;
    }
    

    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passconfirmation = document.getElementById('passconfirmation').value;

        if (name && lastname && email && password && passconfirmation) {
            const userData = {
                Name: name,
                Lastname: lastname,
                Email: email,
                Password: password,
            };

            localStorage.setItem('userData', JSON.stringify(userData));
            alert('Cadastro realizado com sucesso!');
            window.location.href = '/home/home.html';
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});
