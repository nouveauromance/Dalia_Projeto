document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var emailInput = document.getElementById('exampleInputEmail1');
        var passwordInput = document.getElementById('exampleInputPassword1');

        var email = emailInput.value;
        var password = passwordInput.value;

        var storedData = JSON.parse(localStorage.getItem('userData'));

        if (storedData) {
            if (email === storedData.Email && password === storedData.Password) {
                alert('Login bem-sucedido!');
                window.location.href = '/home/index.html';
            } else {
                alert('Email ou senha incorretos.');
            }
        } else {
            alert('Nenhum usuário registrado encontrado. Por favor, registre-se primeiro.');
        }
    });
});