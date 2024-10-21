const questionsModel = require("../models/questionsModel");

const getAllQuestionsController = async (_req, res) => {
    const questions = await questionsModel.getAllQuestions();
    return res.status(200).json(questions);
};

const createQuestionController = async (req, res) => {
    const createdQuestion = await questionsModel.createQuestion(req.body);
    return res.status(201).json(createdQuestion);
};

const deleteQuestionController = async (req, res) => {
    const { id } = req.params;
    await questionsModel.deleteQuestion(id);
    return res.status(204).json();
};

const updateQuestionController = async (req, res) => {
    const { id } = req.params;
    await questionsModel.updateQuestion(req.body, id);
    return res.status(204).json();
};

const getMenstruationDayPeriod = async (req, res) => {
    const { id } = req.params;
    const menstruation = await questionsModel.menstruationDayPeriod( id );
    return res.status(200).json(menstruation);
};

module.exports = {
    getAllQuestionsController,
    createQuestionController,
    deleteQuestionController,
    updateQuestionController,
    getMenstruationDayPeriod
};
