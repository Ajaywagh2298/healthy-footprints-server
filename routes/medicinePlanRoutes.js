const express = require('express');
const router = express.Router();
const medicinePlanController = require('../controllers/medicinePlanController');

router.post('/', medicinePlanController.createMedicinePlan);
router.get('/', medicinePlanController.getMedicinePlans);
router.put('/:uid', medicinePlanController.updateMedicinePlan);
router.delete('/:uid', medicinePlanController.deleteMedicinePlan);

module.exports = router;
