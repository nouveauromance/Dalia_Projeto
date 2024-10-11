document.addEventListener('DOMContentLoaded', function() {
    const armazenadoDataUltimaMenstruacao = localStorage.getItem('lastPeriodDate');
    const armazenadoDuracaoCiclo = localStorage.getItem('cycleLength');

    if (armazenadoDataUltimaMenstruacao && armazenadoDuracaoCiclo) {
        const dataUltimaMenstruacao = new Date(armazenadoDataUltimaMenstruacao);
        const duracaoCiclo = parseInt(armazenadoDuracaoCiclo);

        if (!isNaN(dataUltimaMenstruacao.getTime()) && !isNaN(duracaoCiclo)) {
            renderizarCalendario(dataUltimaMenstruacao, duracaoCiclo);
        } else {
            alert('Dados inválidos. Por favor, insira os dados novamente.');
            window.location.href = '/formulario/formulario.html';
        }
    } else {
        alert('Por favor, insira a data da última menstruação e a duração do ciclo.');
        window.location.href = '/formulario/formulario.html';
    }
});

function renderizarCalendario(dataUltimaMenstruacao, duracaoCiclo) {
    const tamanhoMenstruacao = 5;
    const diaOvulacao = Math.floor(duracaoCiclo / 2);
    const comecoFertil = diaOvulacao - 5;
    const fimFertil = diaOvulacao + 4;

    const corpoCalendario = document.getElementById('calendar-body');
    corpoCalendario.innerHTML = '';


    const dataProximoPeriodo = new Date(dataUltimaMenstruacao);
    dataProximoPeriodo.setDate(dataUltimaMenstruacao.getDate() + duracaoCiclo);


    const mesAno = document.getElementById('month-year');
    mesAno.textContent = `${dataProximoPeriodo.toLocaleString('pt-BR', { month: 'long' })} ${dataProximoPeriodo.getFullYear()}`;


    const diasMes = new Date(dataProximoPeriodo.getFullYear(), dataProximoPeriodo.getMonth() + 1, 0).getDate();
    const primeiroIndiceDia = new Date(dataProximoPeriodo.getFullYear(), dataProximoPeriodo.getMonth(), 1).getDay();

    let dia = 1;
    for (let i = 0; i < 6; i++) {
        const linha = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const celula = document.createElement('td');

            if (i === 0 && j < primeiroIndiceDia) {
                celula.classList.add('empty');
                linha.appendChild(celula);
            } else if (dia > diasMes) {
                celula.classList.add('empty');
                linha.appendChild(celula);
            } else {
                celula.textContent = dia;

                const dataAtual = new Date(dataProximoPeriodo.getFullYear(), dataProximoPeriodo.getMonth(), dia);
                const diaCiclo = ((dataAtual - dataUltimaMenstruacao) / (1000 * 60 * 60 * 24)) % duracaoCiclo;

                if (diaCiclo >= 0 && diaCiclo < tamanhoMenstruacao) {
                    celula.classList.add('menstruation');
                } else if (diaCiclo === diaOvulacao) {
                    celula.classList.add('ovulation');
                } else if (diaCiclo >= comecoFertil && diaCiclo <= fimFertil) {
                    celula.classList.add('fertile');
                }

                linha.appendChild(celula);
                dia++;
            }
        }

        corpoCalendario.appendChild(linha);
    }
}
