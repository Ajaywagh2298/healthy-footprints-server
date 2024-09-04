const express = require('express');
const router = express.Router();
const dailyRecordController = require('../controllers/dailyRecordController');

router.post('/', dailyRecordController.createDailyRecord);
router.get('/:patientUid', dailyRecordController.getDailyRecords);
router.put('/:patientUid', dailyRecordController.updateDailyRecord);
router.delete('/:patientUid', dailyRecordController.deleteDailyRecord);

module.exports = router;
