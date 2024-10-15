async function sendData(userData) {
	try{
		fetch("http://192.168.1.53:3333/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		}).then((response) => {
			try {
				if (response.status === 201) {
					alert("Dados salvos com sucesso!");
					window.location.href = "/Dália Perguntas/perguntas.html";
				} else {
					alert("Erro ao salvar os dados. Por favor, tente novamente.");
				}
			} catch (error) {
				console.log("Erro ao salvar os dados. Por favor, tente novamente.", error);
			} 
		}).catch((error) => {
			console.error("Erro na requisição:", error);
			alert("Erro ao salvar os dados. Por favor, tente novamente.");
    });
	}
	catch(error){
		console.error("Erro na requisição:", error);
		alert("Erro ao salvar os dados. Por favor, tente novamente.");
	}

document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector("form");

	form.addEventListener("submit", (event) => {
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
				alert("Dados salvos com sucesso!");
			} else {
				alert(
					"As senhas não coincidem. Por favor, verifique e tente novamente.",
				);
			}
		} else {
			alert("Por favor, preencha todos os campos antes de prosseguir.");
		}
	});
});
}