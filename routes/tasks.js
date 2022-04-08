const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks");

router.post("/tasks", tasksController.getTasks);

module.exports = router;
