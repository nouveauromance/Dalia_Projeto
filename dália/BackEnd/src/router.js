const express = require("express");
const searchsController = require("./controllers/searchsController")


const router = express.Router();

router.get("/search", searchsController.getAll);

module.exports = router;