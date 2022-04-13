const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');


router.get('/', tasksController.getAllTheTasks);
router.post('/', tasksController.createNewTask);

router.post('/clearall', tasksController.emptyList);

//router.post('/clearcompleted', tasksController.deleteCompleted);
router.get('/pending', tasksController.getTaskByStatus);

router.get('/:category', tasksController.getTaskByCategory);


//TODO*******************************//
//router.put('/', tasksController.setCompleted);

//router.put('/:id', tasksController.modifyTask);
//router.delete('/:id', tasksController.emptyList);
//***************************************** */




module.exports = router;