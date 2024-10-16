async function sendData(userData) {
	try {
		const response = await fetch("http://192.168.1.53:3333/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		// Verifica se a requisição foi bem-sucedida
		const responseData = await response.json(); // Adiciona parsing do JSON da resposta
		console.log("Resposta do servidor:", responseData); // Log para ver detalhes da resposta

		if (response.status === 201) {
			alert("Dados salvos com sucesso!");
			window.location.href = "/dália/FrontEnd/DaliaLogin/login.html";
		} else {
			// Log para ver detalhes do erro
			console.error("Erro ao salvar os dados:", responseData);
			alert("Erro ao salvar os dados. Por favor, tente novamente.");
		}
	} catch (error) {
		console.error("Erro na requisição:", error);
		alert("Erro ao salvar os dados. Por favor, tente novamente.");
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const createAccountButton = document.querySelector("button");

	createAccountButton.addEventListener("click", (event) => {
		event.preventDefault();

		const name = document.getElementById("name").value;
		const lastname = document.getElementById("lastname").value;
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
		const passconfirmation = document.getElementById("passconfirmation").value;

		if (name && lastname && email && password && passconfirmation) {
			if (password === passconfirmation) {
				const userData = {
					nome: name,
					sobrenome: lastname,
					email: email,
					senha: password,
				};
				sendData(userData);
				localStorage.setItem("userData", JSON.stringify(userData));
			} else {
				alert("As senhas não coincidem. Por favor, verifique e tente novamente.");
			}
		} else {
			alert("Por favor, preencha todos os campos antes de prosseguir.");
		}
	});
});
