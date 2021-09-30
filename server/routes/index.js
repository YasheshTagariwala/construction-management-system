//
//
const express = require('express')
const {authorize} = require('../middlewares/auth');
//
//  import necessary model-controllers
const ElasticControl = require('../controllers/ElasticController')
const router = express.Router()
router.route('/createInspection').post(authorize, ElasticControl.createInspection)
router.route('/createInspectionSession').post(authorize, ElasticControl.createInspectionSession)
router.route('/viewContractorsInspection').post(authorize, ElasticControl.viewContractorsInspections)
router.route('/viewInspectorsInspection').post(authorize, ElasticControl.viewInspectorsInspections)
router.route('/viewInspectionById').post(authorize, ElasticControl.viewInspectionById)
router.route('/updateInspection').post(authorize, ElasticControl.updateInspection)
router.route('/auth/login').post(ElasticControl.loginUser)
//
// LET IT GOOOOOOOOOO! LET IT GOOOOOOOOOOOOOOOO! Can't hold it back anymore!
module.exports = router
