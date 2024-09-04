const express = require('express');
const router = express.Router();
const patientImageController = require('../controllers/patientImageController');

router.post('/', patientImageController.uploadImage, patientImageController.createPatientImage);

module.exports = router;
