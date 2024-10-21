const connection = require("./connection");

const getAllQuestions = async () => {
    const [questions] = await connection.execute("SELECT * FROM pesquisas");
    return questions;
};

const createQuestion = async (question) => {
    const { usuario_id, idade, menstruacao_regular, usa_contraceptivo, tipo_contraceptivo, ultimo_dia_menstruacao, duracao_ciclo } = question;
    const query = `INSERT INTO pesquisas (usuario_id, idade, menstruacao_regular, usa_contraceptivo, tipo_contraceptivo, ultimo_dia_menstruacao, duracao_ciclo) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [createdQuestion] = await connection.execute(query, [
        usuario_id, idade, menstruacao_regular, usa_contraceptivo, tipo_contraceptivo, ultimo_dia_menstruacao, duracao_ciclo
    ]);
    return { insertId: createdQuestion.insertId };
};

const deleteQuestion = async (id) => {
    const removedQuestion = await connection.execute("DELETE FROM pesquisas WHERE id = ?", [id]);
    return removedQuestion;
};

const updateQuestion = async (question, id) => {
    const { idade, menstruacao_regular, usa_contraceptivo, tipo_contraceptivo, ultimo_dia_menstruacao, duracao_ciclo } = question;
    const query = `UPDATE pesquisas 
                   SET idade = ?, menstruacao_regular = ?, usa_contraceptivo = ?, tipo_contraceptivo = ?, ultimo_dia_menstruacao = ?, duracao_ciclo = ? 
                   WHERE id = ?`;
    const [updatedQuestion] = await connection.execute(query, [
        idade, menstruacao_regular, usa_contraceptivo, tipo_contraceptivo, ultimo_dia_menstruacao, duracao_ciclo, id
    ]);
    return updatedQuestion;
};

const menstruationDayPeriod = async ( id ) => {
    const [questions] = await connection.execute("SELECT ultimo_dia_menstruacao, duracao_ciclo FROM pesquisas WHERE id = ?", [id]);
    return questions;
};

module.exports = {
    getAllQuestions,
    createQuestion,
    deleteQuestion,
    updateQuestion,
    menstruationDayPeriod
};
