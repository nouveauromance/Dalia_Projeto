const connection = require("./connection");

const getAll = async () => {
	const [user] = await connection.execute("SELECT * FROM usuarios");
	return user;
};

const createUser = async (user) => {
	const { nome, sobrenome, email, senha } = user;
	const query =
		"INSERT INTO usuarios(nome, sobrenome, email, senha) values (?, ?, ?, ?)";
	const [createdUser] = await connection.execute(query, [
		nome,
		sobrenome,
		email,
		senha,
	]);

	return { insertId: createdUser.insertId };
};

const deleteUser = async (id) => {
	const removedUser = await connection.execute(
		"DELETE FROM usuarios where id = ?",
		[id]
	);

	return removedUser;
};

const updateUser = async (nome, sobrenome, email, senha, id) => {
	const query =
		"UPDATE usuarios SET nome = ?, sobrenome = ? ,email = ?, senha = ? WHERE id = ?";
	const [updatedUser] = await connection.execute(query, [
		nome,
		sobrenome,
		email,
		senha,
		id,
	]);
	return updatedUser;
};

const loginUser = async (email, senha) => {
	const query = "SELECT id FROM usuarios WHERE email = ? AND senha = ?";
	const [rows] = await connection.execute(query, [email, senha]);

	if (rows.length > 0) {
		return rows[0].id;
	}
	return null;
};

const findUserByEmail = async (email) => {
	const query = "SELECT id FROM usuarios WHERE email = ?";
	const [idEmail] = await connection.execute(query, [email]);
	return idEmail[0];
};

const findNameUserByEmail = async (email) => {
	const query = "SELECT nome FROM usuarios WHERE email = ?";
	const [idEmail] = await connection.execute(query, [email]);
	return idEmail[0];
};

module.exports = {
	getAll,
	createUser,
	deleteUser,
	updateUser,
	loginUser,
	findUserByEmail,
	findNameUserByEmail
};
