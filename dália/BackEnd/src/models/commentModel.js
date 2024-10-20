const connection = require("./connection");

const getAll = async () => {
<<<<<<< HEAD
	const [comments] = await connection.execute("SELECT * FROM comentarios");
	return comments;
=======
const [comments] = await connection.execute("SELECT * FROM comentarios");
return comments;
>>>>>>> fcb7f8c742156e0491883f7705114b80bc058269
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
<<<<<<< HEAD
        "SELECT * FROM comentarios WHERE post_id = ?",
=======
        "SELECT usuarios.nome,comentarios.comentario FROM comentarios join usuarios on usuarios.id = comentarios.usuario_id WHERE post_id = ?",
>>>>>>> fcb7f8c742156e0491883f7705114b80bc058269
        [post_id]
    );
    return comments;
};

module.exports = {
    getAll,
    createComment,
    getCommentByPostId,
<<<<<<< HEAD
};
=======
};
>>>>>>> fcb7f8c742156e0491883f7705114b80bc058269
