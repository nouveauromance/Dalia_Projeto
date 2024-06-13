document.addEventListener('DOMContentLoaded', function() {
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
                window.location.href = '/Dália Perguntas/perguntas.html';
            } else {
                alert('As senhas não coincidem. Por favor, verifique e tente novamente.');
            }
        } else {
            alert('Por favor, preencha todos os campos antes de prosseguir.');
        }
    });
});