// 
// 
const express = require('express')
// 
//  import necessary model-controllers
const ElasticControl = require('../controllers/ElasticController')
const router = express.Router()
router.get('/searchArticle/:text', ElasticControl.searchArticle)
//
// LET IT GOOOOOOOOOO! LET IT GOOOOOOOOOOOOOOOO! Can't hold it back anymore!
module.exports = router