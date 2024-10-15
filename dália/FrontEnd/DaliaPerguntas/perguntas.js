document.addEventListener("DOMContentLoaded", async () => {
    const formularios = document.querySelectorAll(".formulario");
    let currentForm = 0;

    // Inicializa as respostas
    const responses = {
        usuario_id: null, // O ID do usuário será preenchido depois
        idade: null,
        menstruacao_regular: null,
        usa_contraceptivo: null,
        tipo_contraceptivo: null,
        ultimo_dia_menstruacao: null,
        duracao_ciclo: null
    };

    // Função para pegar o ID do usuário baseado no e-mail
    const getUserIdByEmail = async (email) => {
        try {
            const response = await fetch(`http://localhost:3000/user?email=${encodeURIComponent(email)}`);
            if (!response.ok) {
                throw new Error("Erro ao buscar usuário");
            }
            const userData = await response.json();
            return userData[0] ? userData[0].id : null; // Pega o primeiro usuário encontrado
        } catch (error) {
            console.error("Erro ao buscar ID do usuário:", error);
            return null;
        }
    };

    // Chama a função para obter o ID do usuário
    const userEmail = localStorage.getItem("user_email"); // Supondo que o e-mail do usuário está no localStorage
    responses.usuario_id = await getUserIdByEmail(userEmail);

    const nextForm = () => {
        formularios[currentForm].style.display = "none";
        currentForm++;
        if (currentForm < formularios.length) {
            formularios[currentForm].style.display = "block";
        } else {
            // Se todas as perguntas foram respondidas, envie as respostas
            enviarRespostas();
        }
    };

    const previousForm = () => {
        formularios[currentForm].style.display = "none";
        currentForm--;
        formularios[currentForm].style.display = "block";
    };

    const enviarRespostas = async () => {
        try {
            const response = await fetch("http://localhost:3000/questions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(responses)
            });

            if (response.ok) {
                console.log("Respostas enviadas com sucesso!");
            } else {
                console.error("Erro ao enviar as respostas");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    // Inicializa o primeiro formulário
    formularios.forEach((formulario, index) => {
        if (index !== 0) {
            formulario.style.display = "none";
        }
    });

    // Eventos para as perguntas

    // Evento para as perguntas de idade
    document.querySelectorAll(".r1 .botao").forEach((button) => {
        button.addEventListener("click", () => {
            responses.idade = button.textContent;
            nextForm();
        });
    });

    // Evento para a pergunta sobre menstruação regular
    document.querySelectorAll(".r2 .botao").forEach((button) => {
        button.addEventListener("click", () => {
            responses.menstruacao_regular = button.textContent === "Sim";
            nextForm();
        });
    });

    // Evento para a pergunta sobre contraceptivos
    document.querySelectorAll(".r3 .botao").forEach((button) => {
        button.addEventListener("click", () => {
            responses.usa_contraceptivo = button.textContent === "Sim";
            nextForm();
        });
    });

    // Evento para o tipo de contraceptivo
    document.querySelectorAll(".r4 .botao").forEach((button) => {
        button.addEventListener("click", () => {
            responses.tipo_contraceptivo = button.textContent;
            nextForm();
        });
    });

    // Evento para o último formulário de data e ciclo
    document.getElementById("formulario-ciclo").addEventListener("submit", (e) => {
        e.preventDefault();
        responses.ultimo_dia_menstruacao = document.getElementById("ultimo-dia-menstruacao").value;
        responses.duracao_ciclo = document.getElementById("duracao-ciclo").value;
        enviarRespostas();
    });

    // Botões de voltar
    document.querySelectorAll(".volta").forEach((button) => {
        button.addEventListener("click", previousForm);
    });
});
