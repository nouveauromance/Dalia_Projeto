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
		[id],
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
	const query = "select count(*) from usuarios where email = ? and senha = ?";
	const [rows] = await connection.execute(query, [email, senha]);
	return { loginUser: rows[0]["count(*)"] };
};

module.exports = {
	getAll,
	createUser,
	deleteUser,
	updateUser,
	loginUser,
};
