const connection = require("./connection")

const getAll = async () => {
  const [post] = await connection.execute("SELECT * FROM posts");
  return post;
};

const createPost = async (post) => {
  const { usuario_id, titulo, conteudo } = post;
  const likes = 0;
  const query =
    "INSERT INTO posts(usuario_id, titulo, conteudo, likes) values (?, ?, ?, ?)";
  const [createdPost] = await connection.execute(query, [
    usuario_id,
    titulo,
    conteudo,
    likes,
  ]);

  return { insertId: createdPost.insertId };
};

const likeIncrement = async (id) => {
  try {
    const [result] = await connection.execute(
      "UPDATE posts SET likes = likes + 1 WHERE id = ?",
      [id]
    );
    return result.affectedRows > 0; 
  } catch (error) {
    console.error('Erro ao incrementar likes:', error);
    throw error; 
  }
}
const removeLike = async (id) => {
  try {
      const [result] = await connection.execute(
          "UPDATE posts SET likes = likes - 1 WHERE id = ? AND likes > 0",
          [id]
      );
      return result.affectedRows > 0; 
  } catch (error) {
      console.error('Erro ao remover like:', error);
      throw error; 
  }
};

// const deletePost = async (id) => {
//   const removedUser = await connection.execute(
//     "DELETE FROM Post where id = ?",
//     [id],
//   );

//   return removedUser;
// };

// const updatePost = async (titulo, conteudo, id) => {
//   const query =
//     "UPDATE posts SET titulo = ?, conteudo = ? WHERE id = ?";
//   const [updatedPost] = await connection.execute(query, [
//     titulo,
//     conteudo,
//     id
//   ]);
//   return updatedPost;
// };

module.exports = {
  getAll,
  createPost,
  likeIncrement,
  removeLike
  //   deletePost,
  //   updatePost
};