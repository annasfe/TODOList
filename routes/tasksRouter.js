const tasksController = require('../controllers/tasksController')
const router = require("express").Router();


router.post('/tasks',tasksController.createTask);
router.post('/tasks/remove', tasksController.removeTask);
//router.post('/tasks/remove/:id', tasksController.removeTask);     //we could also use this endpoint and retrieve id from req.params
router.post('/tasks/deleteall', tasksController.deleteAll);
router.get('/', tasksController.getTasks);

module.exports = router;