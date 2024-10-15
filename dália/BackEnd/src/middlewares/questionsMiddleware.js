const validateQuestionBody = (req, res, next) => {
    const { usuario_id, idade } = req.body;

    if (usuario_id === undefined || idade === undefined) {
        return res.status(400).json({ message: "Campos obrigatórios ausentes" });
    }

    if (idade === "") {
        return res.status(400).json({ message: "A idade não pode estar vazia" });
    }

    next();
};

module.exports = {
    validateQuestionBody
};
