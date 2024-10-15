const express = require("express");
const router = express.Router();
const searchsController = require("./controllers/searchsController") 
const userController = require("./controllers/userController")
const userMiddleware = require("./middlewares/userMiddleware") 


router.get("/search", searchsController.getAllSearch); 
router.get("/user", userController.getAllController); 
router.post("/user", userMiddleware.validateBody, userController.createUserController);
router.post("/user/login", userController.loginUserController);
router.put("/user/:id", userController.updateUserController);
router.delete("/user/:id", userController.deleteUserController);

module.exports =router;
