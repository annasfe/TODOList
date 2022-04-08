const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');


router.get('/', tasksController.getAllTheTasks);
router.post('/', tasksController.createNewTask);

router.get('/:id', tasksController.getTaskById);
router.put('/:id', tasksController.modifyTask);
router.delete('/:id', tasksController.deleteTask);
module.exports = router;