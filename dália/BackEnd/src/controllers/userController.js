const userModel = require("../models/userModel");

const getAllController = async (_req, res) => {
	const user = await userModel.getAll();
	return res.status(201).json(user);
};

const createUserController = async (req, res) => {
	const createdUser = await userModel.createUser(req.body);

	return res.status(201).json(createdUser);
};

const deleteUserController = async (req, res) => {
	const { id } = req.params;

	await userModel.deleteUser(id);
	return res.status(204).json();
};

const updateUserController = async (req, res) => {
	const { id } = req.params;
	const { nome, sobrenome, email, senha } = req.body;
	await userModel.updateUser(nome, sobrenome, email, senha, id);
	return res.status(204).json();
};

const loginUserController = async (req, res) => {
	const { email, senha } = req.body;
	const user = await userModel.loginUser(email, senha);
	return res.status(200).json({user});
};

const getUserIdByEmail = async (req, res) => {
    const email = req.body.email; 
    const user = await userModel.findUserByEmail(email);
    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }
    return res.status(200).json({ usuario_id: user.id });
};


module.exports = {
	getAllController,
	createUserController,
	deleteUserController,
	updateUserController,
	loginUserController,
	getUserIdByEmail
};
