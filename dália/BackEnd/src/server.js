const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3333;


app.listen({ port: 3333, host: "0.0.0.0" }, (err, address) => {
	if (err) {
		console.error("Erro ao iniciar o servidor:", err);
		process.exit(1);
	}
	console.log(`Servidor HTTP rodando em ${address}`);
});
