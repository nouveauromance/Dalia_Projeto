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
	return res.status(200).json({ user });
};

const getUserIdByEmailController = async (req, res) => {
	const { email } = req.params;
	const user = await userModel.findUserByEmail(email);
	return res.status(201).json(user);
	
};

const getNameUserIdByEmailController = async (req, res) => {
	const { id } = req.params;
	const name = await userModel.findNameUserByEmail(id);

	if (!name) {
		return res.status(404).json({ message: 'Usuário não encontrado' });
	}

	return res.status(200).json(name);
};


async function updateNameUserController(req, res) {
	const userId = req.params.id;
	const { nome } = req.body;
  
	try {
	  const result = await userModel.updateNameUser(userId, nome);
	  if (result.affectedRows > 0) {
		return res.status(200).json({ message: "Nome atualizado com sucesso." });
	  } else {
		return res.status(404).json({ message: "Usuário não encontrado." });
	  }
	} catch (error) {
	  console.error("Erro ao atualizar o nome do usuário:", error);
	  return res.status(500).json({ message: "Erro interno do servidor." });
	}
};

async function updateUserBirthdayController(req, res) {
    const { id } = req.params;
    const { data_nasc } = req.body;

    if (!data_nasc) {
        return res.status(400).json({ message: 'Data de nascimento é obrigatória' });
    }

    try {
        const updatedUser = await userModel.updateBirthday(id, data_nasc);
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erro ao atualizar a data de nascimento:', error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

module.exports = {
	getAllController,
	createUserController,
	deleteUserController,
	updateUserController,
	loginUserController,
	getUserIdByEmailController,
	getNameUserIdByEmailController,
	updateNameUserController,
	updateUserBirthdayController
};
