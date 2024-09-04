const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    patientUid: { type: String, required: true },
    reminderType: { type: String, required: true },
    reminderFrequency: { type: String, required: true },
    reminderTimeStart: { type: String, required: true },
    reminderTimeDate : { type: String  },
    reminderTimeDay : { type: String  },
    reminderTimeEnd: { type: String},
    createDate: { type: Date, default: Date.now },
    reminderMessage: { type: String, required: true },
    note: { type: String },
    notificationPushType: { type: String, required: true },
    userUid: { type: String }
});

module.exports = mongoose.model('Reminder', ReminderSchema);
