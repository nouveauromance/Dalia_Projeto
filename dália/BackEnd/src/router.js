const express = require("express");
const router = express.Router();
const questionsController = require("./controllers/questionsController");
const userController = require("./controllers/userController");
const postsController = require("./controllers/postsController");
const commentController = require("./controllers/commentController");
const userMiddleware = require("./middlewares/userMiddleware");

// Rotas para questions
router.get("/questions", questionsController.getAllQuestionsController);
router.get("/menstruation/:id", questionsController.getMenstruationDayPeriod);
router.post("/questions", questionsController.createQuestionController);
router.put("/questions/:id", questionsController.updateQuestionController);
router.delete("/questions/:id", questionsController.deleteQuestionController);

// Rotas para users
router.get("/user", userController.getAllController);
router.post("/user", userMiddleware.validateBody, userController.createUserController);
router.post("/user/login", userController.loginUserController);
// router.put("/user/:id", userController.updateUserController);
router.put("/user/:id", userController.updateNameUserController);
router.put('/birthday/:id', userController.updateUserBirthdayController);
router.delete("/user/:id", userController.deleteUserController);
router.get("/user/email/:id", userController.getNameUserIdByEmailController);

// Rotas para Posts
router.get("/posts", postsController.getAllController);
router.post("/post", postsController.createPostsController);
router.put("/like", postsController.likesIncrementController);
router.put("/removeLike", postsController.removeLikeController);

// Rotas para comentarios
router.post("/comment", commentController.createComment);
router.get("/comment/:post_id", commentController.getCommentsByPostId);

module.exports = router;
