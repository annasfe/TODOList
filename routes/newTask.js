const express = require("express");
const router = express.Router();
const newTaskController = require("../controllers/newTask");

router.post("/", newTaskController.newTask);

module.exports = router;
