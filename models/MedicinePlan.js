const mongoose = require('mongoose');

const MedicinePlanSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    patientUid: { type: String, required: true },
    time: { type: String, required: true },
    medicines: { type: mongoose.Schema.Types.Mixed, required: true }, // JSON type
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    staffUid: { type: String },
    setReminder: { type: Boolean, default: false },
    reminderForAll: { type: Boolean, default: false }
});

module.exports = mongoose.model('MedicinePlan', MedicinePlanSchema);