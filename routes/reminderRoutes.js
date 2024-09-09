const express = require('express');
const router = express.Router();
const reminderController = require('../controllers/reminderController');

router.post('/', reminderController.createReminder);
router.get('/', reminderController.getReminders);
router.put('/:uid', reminderController.updateReminder);
router.delete('/:uid', reminderController.deleteReminder);

module.exports = router;
