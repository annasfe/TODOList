const express = require('express');
const router = express.Router()
const taskController = require('../controllers/taskControllers')


router.route('/')
    .get(taskController.getAllTasks)
    .post(taskController.createTask)


router.route('/:id')
    .get(taskController.getTask) 
    .put(taskController.updateTask) 
    .delete(taskController.deleteTask);

router.route('/remove/')
    .post(taskController.deleteTask) 
  
module.exports = router;
