function P0() {
    const valor = 0;
    window.scrollTo({
        top: valor,
        behavior: 'auto'
    });
}

function P1() {
    const valor = 1005;
    window.scrollTo({
        top: valor,
        behavior: 'auto'
    });
}

function P2() {
    const valor = 2005;
    window.scrollTo({
        top: valor,
        behavior: 'auto'
    });
}

function P3() {
    const valor = 3010;
    window.scrollTo({
        top: valor,
        behavior: 'auto'
    });
}

function P4() {
    const valor = 4010;
    window.scrollTo({
        top: valor,
        behavior: 'auto'
    });
}

function P5() {
    const valor = 5005;
    window.scrollTo({
        top: valor,
        behavior: 'auto'
    });
}

document.querySelectorAll('.B0').for(button => {
    button.addEventListener('click', P0);
});

document.querySelectorAll('.B1').for(button => {
    button.addEventListener('click', P1);
});

document.querySelectorAll('.B2').for(button => {
    button.addEventListener('click', P2);
});

document.querySelectorAll('.B3').for(button => {
    button.addEventListener('click', P3);
});

document.querySelectorAll('.B4').for(button => {
    button.addEventListener('click', P4);
});

document.querySelectorAll('.B5').for(button => {
    button.addEventListener('click', P5);
});

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario-ciclo');
    const cycleLengthContainer = document.getElementById('duracao-ciclo-container');
    let isCycleRegular = true;

    document.querySelectorAll('.irregular').for(button => {
        button.addEventListener('click', () => {
            cycleLengthContainer.style.display = 'none';
            document.getElementById('duracao-ciclo').required = false;
            isCycleRegular = false;
        });
    });

    document.querySelector('.regular').addEventListener('click', () => {
        cycleLengthContainer.style.display = 'block';
        document.getElementById('duracao-ciclo').required = true;
        isCycleRegular = true;
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const lastPeriodDate = new Date(document.getElementById('ultimo-dia-menstruacao').value);
        const cycleLength = Number.parseInt(document.getElementById('duracao-ciclo').value);

        if (!lastPeriodDate || (isCycleRegular && Number.isNaN(cycleLength))) {
            alert('Por favor, insira dados válidos.');
            return;
        }

        localStorage.setItem('lastPeriodDate', lastPeriodDate.toISOString());

        if (isCycleRegular) {
            localStorage.setItem('cycleLength', cycleLength);
        } else {
            localStorage.setItem('cycleLength', 28);
        }

        P5();
    });

    document.querySelector('.b6').addEventListener('click', () => {
        window.location.href = '/Dália login/login.html';
    });
});
