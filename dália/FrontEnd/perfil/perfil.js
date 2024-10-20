// Função para inicializar o Google Translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: 'en', includedLanguages: 'en,pt,es,fr,de', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
    'google_translate_element'
  );
}

// Função para obter o nome do usuário
async function fetchUserName() {
  const email = localStorage.getItem('userEmail');
  if (!email) return;

  try {
    const response = await fetch(`http://192.168.1.53:3333/user/email?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (data.nome) {
      document.getElementById('name').value = data.nome;
    } else {
      console.error('Nome não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao buscar o nome do usuário:', error);
  }
}

// Função para habilitar a edição do nome do usuário
document.getElementById('edit-name-button').addEventListener('click', function () {
  const nameInput = document.getElementById('name');
  if (nameInput.disabled) {
    nameInput.disabled = false; // Habilita o input para edição
    nameInput.focus(); // Foca no input
  } else {
    // Aqui você pode implementar a lógica para salvar o novo nome, se necessário
    const newName = nameInput.value.trim();
    if (newName) {
      // Lógica para atualizar o nome no banco de dados, se necessário
      updateUserName(newName);
    }
    nameInput.disabled = true; // Desabilita o input novamente
  }
});

// Função para atualizar o nome do usuário no banco de dados
async function updateUserName(newName) {
  const email = localStorage.getItem('userEmail');
  if (!email) return;

  try {
    const response = await fetch('http://192.168.1.53:3333/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, nome: newName }),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar o nome do usuário');
    }

    const data = await response.json();
    console.log('Nome atualizado com sucesso:', data);
  } catch (error) {
    console.error('Erro ao atualizar o nome do usuário:', error);
  }
}

// Eventos para o popup
document.getElementById('denuncia-button').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'none';
});

window.onclick = function (event) {
  if (event.target == document.getElementById('popup')) {
    document.getElementById('popup').style.display = 'none';
  }
};

// Carregar o nome do usuário ao carregar a página
window.onload = fetchUserName;
