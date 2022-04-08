const express = require('express'); 
const router = express.Router();
const tasksController = require('../controllers/index'); 

router.get('/', tasksController.showHomepage); 

module.exports = router;