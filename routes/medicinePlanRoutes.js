const express = require('express');
const router = express.Router();
const medicinePlanController = require('../controllers/medicinePlanController');

router.post('/', medicinePlanController.createMedicinePlan);
router.get('/', medicinePlanController.getMedicinePlans);
router.put('/:id', medicinePlanController.updateMedicinePlan);
router.delete('/:id', medicinePlanController.deleteMedicinePlan);

module.exports = router;
