document.addEventListener('DOMContentLoaded', async function () {
    const calendarEl = document.getElementById('calendar');
    const idUser = localStorage.getItem('idUser');
    const registrarBtn = document.getElementById('registrar-menstruacao');
    const fimMenstruacaoBtn = document.getElementById('fim-menstruacao');

    if (!idUser) {
        console.error('ID do usuário não encontrado na localStorage.');
        return;
    }

    let menstruacaoAtiva = false; // Controle para saber se a menstruação está ativa
    let eventos = []; // Armazena todos os eventos do calendário

    try {
        const response = await fetch(`http://localhost:3333/menstruation/${idUser}`);
        const menstruationData = await response.json();

        if (menstruationData.length > 0) {
            const { ultimo_dia_menstruacao, duracao_ciclo } = menstruationData[0];
            const dataUltimaMenstruacao = new Date(ultimo_dia_menstruacao);
            const duracaoCiclo = duracao_ciclo || 28;

            eventos = calcularPeriodos(dataUltimaMenstruacao, duracaoCiclo);
            renderizarCalendario(eventos);

            registrarBtn.addEventListener('click', function () {
                if (!menstruacaoAtiva) {
                    const hoje = new Date();
                    const fimMenstruacao = new Date(hoje);
                    fimMenstruacao.setDate(hoje.getDate() + 4); // Adiciona 4 dias

                    // Adiciona o evento de menstruação
                    eventos.push({
                        title: 'Menstruação',
                        start: hoje.toISOString().split('T')[0],
                        end: hoje.toISOString().split('T')[0], // Apenas um dia
                        color: '#e57373',
                        rendering: 'background',
                        allDay: true
                    });

                    menstruacaoAtiva = true; // Atualiza o status
                    fimMenstruacaoBtn.style.display = 'block'; // Mostra o botão de fim da menstruação
                }

                // Recalcula todas as previsões após registrar a menstruação
                atualizarPrevisoes();
                renderizarCalendario(eventos); // Re-renderiza o calendário
            });

            fimMenstruacaoBtn.addEventListener('click', function () {
                if (menstruacaoAtiva) {
                    // Remove o evento de menstruação atual
                    eventos = eventos.filter(event => event.title !== 'Menstruação'); // Remove o evento de menstruação
                    menstruacaoAtiva = false; // Atualiza o status
                    fimMenstruacaoBtn.style.display = 'none'; // Esconde o botão de fim da menstruação

                    // Define a nova data para a próxima menstruação
                    const hoje = new Date();
                    const duracaoCiclo = 28; // Pode ser alterado se necessário
                    const novaMenstruacao = new Date(hoje);
                    const fimMenstruacao = new Date(novaMenstruacao);
                    fimMenstruacao.setDate(novaMenstruacao.getDate() + 4); // Define a duração da menstruação

                    // Adiciona um novo evento de menstruação para o próximo ciclo (1 dia)
                    eventos.push({
                        title: 'Menstruação',
                        start: novaMenstruacao.toISOString().split('T')[0],
                        end: novaMenstruacao.toISOString().split('T')[0], // Apenas um dia
                        color: '#e57373',
                        rendering: 'background',
                        allDay: true
                    });

                    // Recalcula todas as previsões após finalizar a menstruação
                    atualizarPrevisoes(novaMenstruacao, duracaoCiclo);
                }

                renderizarCalendario(eventos); // Re-renderiza o calendário
            });

        } else {
            console.log("Nenhum dado de menstruação encontrado para o usuário.");
        }
    } catch (error) {
        console.error('Erro ao buscar os dados de menstruação:', error);
    }

    function renderizarCalendario(eventos) {
        // Limpa o calendário existente
        calendarEl.innerHTML = '';

        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'pt-br',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth'
            },
            events: eventos,
            eventDidMount: function (info) {
                info.el.style.fontWeight = 'bold';
            }
        });

        calendar.render(); // Renderiza o calendário atualizado
    }

    function calcularPeriodos(dataUltimaMenstruacao, duracaoCiclo) {
        const eventos = [];
        let cicloAtual = new Date(dataUltimaMenstruacao);

        for (let i = 0; i < 12; i++) {
            const dataProximaMenstruacao = new Date(cicloAtual);
            const fimMenstruacao = new Date(dataProximaMenstruacao);
            fimMenstruacao.setDate(fimMenstruacao.getDate() + 4); // Define a duração da menstruação

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

            eventos.push({
                title: 'Ovulação',
                start: ovulacao.toISOString().split('T')[0],
                color: '#83ce8f',
                allDay: true
            });

            const inicioFertil = new Date(ovulacao);
            inicioFertil.setDate(inicioFertil.getDate() - 5);
            const fimFertil = new Date(ovulacao);
            fimFertil.setDate(fimFertil.getDate() + 2); // Define a fase fértil para durar 3 dias

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

    function atualizarPrevisoes(dataInicio, duracaoCiclo) {
        eventos = calcularPeriodos(dataInicio || new Date(), duracaoCiclo || 28);
    }
});
