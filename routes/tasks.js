const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks");

router.get("/", tasksController.loadList);
router.get("/tasks", tasksController.getTasks);
router.get("/tasks/:id", tasksController.getTaskByID);
router.delete("/tasks/:id", tasksController.deleteTask);
router.put("/tasks/:id", tasksController.checkTask);
router.post("/tasks", tasksController.newTask);

module.exports = router;
