// 
// 
const express = require('express')
// 
//  import necessary model-controllers
const ElasticController = require('../controllers/ElasticController')
const router = express.Router()
router.get('/fetchInspections', ElasticController.fetchInspections)
//
// LET IT GOOOOOOOOOO! LET IT GOOOOOOOOOOOOOOOO! Can't hold it back anymore!
module.exports = router