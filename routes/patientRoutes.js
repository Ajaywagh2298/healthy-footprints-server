const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/', patientController.createPatient);
router.get('/', patientController.getPatients);
router.get('/:uid', patientController.getPatientById);
router.put('/:uid', patientController.updatePatient);
router.delete('/:uid', patientController.deletePatient);

module.exports = router;
