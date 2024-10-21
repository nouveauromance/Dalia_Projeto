const nameInput = document.getElementById('name');
const birthdayInput = document.getElementById('date');
const idUser = localStorage.getItem('idUser');

async function fetchUserDetails(id) {
    try {
        const response = await fetch(`http://localhost:3333/user/email/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na resposta: ${response.status}`);
        }

        const data = await response.json();
        nameInput.value = data.nome || "Nome Indefinido";
        birthdayInput.value = data.data_nasc || "";
    } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
    }
}

async function updateUserBirthday(id, birthday) {
    try {
        const response = await fetch(`http://localhost:3333/birthday/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data_nasc: birthday }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar a data de nascimento: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data de nascimento atualizada com sucesso:', data);
        alert('Data de nascimento atualizada com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar a data de nascimento do usuário:', error);
    }
}

async function updateUserName(id, name) {
    try {
        const response = await fetch(`http://localhost:3333/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome: name }),
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar o nome: ${response.status}`);
        }

        const data = await response.json();
        console.log('Nome atualizado com sucesso:', data);
        alert('Nome atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar o nome do usuário:', error);
    }
}

document.getElementById('salvar').addEventListener('click', function () {
    const newBirthday = birthdayInput.value.trim();
    const newName = nameInput.value.trim();
    const id = localStorage.getItem('idUser');

    if (newBirthday) {
        updateUserBirthday(id, newBirthday);
    } else {
        console.warn('A data de nascimento não pode ser vazia.');
    }

    if (newName) {
        updateUserName(id, newName);
    } else {
        console.warn('O nome não pode ser vazio.');
    }
});

document.getElementById('denuncia-button').addEventListener('click', function () {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    const closeBtn = document.querySelector('.close');
    closeBtn.onclick = function () {
        popup.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (idUser) {
        fetchUserDetails(idUser);
    }
});
