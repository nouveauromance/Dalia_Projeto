const express = require("express");
const router = express.Router();
const questionsController = require("./controllers/questionsController");
const userController = require("./controllers/userController");
const postsController = require("./controllers/postsController");
const commentController = require("./controllers/commentController");
const userMiddleware = require("./middlewares/userMiddleware");

// Rotas para questions
router.get("/questions", questionsController.getAllQuestionsController);
router.post("/questions", questionsController.createQuestionController);
router.put("/questions/:id", questionsController.updateQuestionController);
router.delete("/questions/:id", questionsController.deleteQuestionController);

// Rotas para users
router.get("/user", userController.getAllController);
router.post("/user", userMiddleware.validateBody, userController.createUserController);
router.post("/user/login", userController.loginUserController);
router.put("/user/:id", userController.updateUserController);
router.delete("/user/:id", userController.deleteUserController);
router.get("/user/:email", userController.getUserIdByEmailController);

// Rotas para Posts
router.get("/posts", postsController.getAllController);
router.post("/post", postsController.createPostsController);
router.put("/like", postsController.likesIncrementController);
router.put("/removeLike", postsController.removeLikeController);

// Rotas para comentarios
router.post("/comment", commentController.createComment);
router.get("/comment/:post_id", commentController.getCommentsByPostId);

module.exports = router;