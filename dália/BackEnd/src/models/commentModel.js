const connection = require("./connection");

const getAll = async () => {
const [comments] = await connection.execute("SELECT * FROM comentarios");
return comments;
};

const createComment = async (comment) => {
    const { post_id, usuario_id, comentario } = comment; 
    const query = 
      "INSERT INTO comentarios(post_id, usuario_id, comentario) VALUES(?, ?, ?)";
    const [newComment] = await connection.execute(query, [
        post_id,
        usuario_id,
        comentario,
    ]);
    return newComment.insertId;
};

const getCommentByPostId = async (post_id) => {
    const [comments] = await connection.execute(
        "SELECT usuarios.nome,comentarios.comentario FROM comentarios join usuarios on usuarios.id = comentarios.usuario_id WHERE post_id = ?",
        [post_id]
    );
    return comments;
};

module.exports = {
    getAll,
    createComment,
    getCommentByPostId,
};