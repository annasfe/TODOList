const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task");

router.post("/:id", taskController.getTaskByID);
router.post("/:id", taskController.deleteTask);
router.post("/:id", taskController.checkTask);

module.exports = router;
