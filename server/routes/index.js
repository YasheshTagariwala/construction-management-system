// 
// 
const express = require('express')
// 
//  import necessary model-controllers
const ElasticControl = require('../controllers/ElasticController')
const router = express.Router()
router.post('/createInspection', ElasticControl.createInspection)
router.post('/createInspectionSession', ElasticControl.createInspectionSession)
router.post('/viewContractorsInspection', ElasticControl.viewContractorsInspection)
router.post('/viewInspectorsInspection', ElasticControl.viewInspectorsInspection)
router.post('/updateInspection', ElasticControl.updateInspection)
//
// LET IT GOOOOOOOOOO! LET IT GOOOOOOOOOOOOOOOO! Can't hold it back anymore!
module.exports = router