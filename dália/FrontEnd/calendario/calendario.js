document.addEventListener('DOMContentLoaded', async function() {
    const calendarEl = document.getElementById('calendar');

    const idUser = localStorage.getItem('idUser');
    
    if (!idUser) {
        console.error('ID do usuário não encontrado na localStorage.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3333/menstruation/${idUser}`);
        const menstruationData = await response.json();

        if (menstruationData.length > 0) {
            const { ultimo_dia_menstruacao, duracao_ciclo } = menstruationData[0];
            const dataUltimaMenstruacao = new Date(ultimo_dia_menstruacao);
            const duracaoCiclo = duracao_ciclo || 28;

            const eventosCiclo = calcularPeriodos(dataUltimaMenstruacao, duracaoCiclo);

            const calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                locale: 'pt-br',
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth'
                },
                events: eventosCiclo,
                eventDidMount: function(info) {
                    info.el.style.fontWeight = 'bold';
                }
            });

            calendar.render();
        } else {
            console.log("Nenhum dado de menstruação encontrado para o usuário.");
        }
    } catch (error) {
        console.error('Erro ao buscar os dados de menstruação:', error);
    }

    function calcularPeriodos(dataUltimaMenstruacao, duracaoCiclo) {
        const eventos = [];
        let cicloAtual = new Date(dataUltimaMenstruacao);

        for (let i = 0; i < 12; i++) {
            const dataProximaMenstruacao = new Date(cicloAtual);

            const fimMenstruacao = new Date(dataProximaMenstruacao);
            fimMenstruacao.setDate(fimMenstruacao.getDate() + 4); 

            eventos.push({
                title: 'Menstruação',
                start: dataProximaMenstruacao.toISOString().split('T')[0],
                end: fimMenstruacao.toISOString().split('T')[0],
                color: '#e57373', 
                rendering: 'background',
                allDay: true
            });

            const ovulacao = new Date(dataProximaMenstruacao);
            ovulacao.setDate(ovulacao.getDate() + Math.floor(duracaoCiclo / 2));
            const inicioFertil = new Date(ovulacao);
            inicioFertil.setDate(inicioFertil.getDate() - 5);
            const fimFertil = new Date(ovulacao);
            fimFertil.setDate(fimFertil.getDate() + 4);

            eventos.push({
                title: 'Ovulação',
                start: ovulacao.toISOString().split('T')[0],
                color: '#83ce8f', 
                allDay: true
            });

            eventos.push({
                title: 'Fase Fértil',
                start: inicioFertil.toISOString().split('T')[0],
                end: fimFertil.toISOString().split('T')[0],
                color: '#74c7eb', 
                allDay: true
            });

            cicloAtual.setDate(cicloAtual.getDate() + duracaoCiclo);
        }

        return eventos;
    }
});
