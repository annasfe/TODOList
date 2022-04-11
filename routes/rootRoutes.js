
const express = require('express');
const router = express.Router()
const rootController = require('../controllers/rootControllers')



router.get('/', rootController.toDefine) //create function 

module.exports = router;
