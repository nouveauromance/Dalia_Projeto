const postsModel = require("../models/postsModel");

const getAllController = async (_req, res) => {
	const post = await postsModel.getAll();
	return res.status(201).json(post);
};

const createPostsController = async (req, res) => {
	const createdPosts = await postsModel.createPost(req.body);

	return res.status(201).json(createdPosts);
};

const likesIncrementController = async (req, res) => {
	const { id } = req.body;

	console.log('ID recebido para incrementar likes:', id);
	try {
		const likesIncrement = await postsModel.likeIncrement(id);
		return res.status(201).json(likesIncrement);
	} catch (error) {
		console.error('Erro ao incrementar likes:', error); 
		return res.status(500).json({ error: 'Erro ao incrementar likes' });
	}
}
const removeLikeController = async (req, res) => {
	const { id } = req.body;
	try {
			const result = await postsModel.removeLike(id);
			if (result) {
					return res.status(200).json({ message: 'Like removido com sucesso.' });
			}
			return res.status(404).json({ message: 'Post não encontrado.' });
	} catch (error) {
			console.error('Erro ao remover like:', error);
			return res.status(500).json({ message: 'Erro interno do servidor.' });
	}
};

// /http://192.168.1.53:3333/like

module.exports = {
	getAllController,
	createPostsController,
	likesIncrementController,
	removeLikeController
};