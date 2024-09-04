const mongoose = require('mongoose');

const PatientImageSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    patientUid: { type: String, required: true },
    imageUrl: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
    type: { type: String, required: true },
    reason: { type: String, required: true },
    dateAndTime: { type: Date, required: true },
    staffUid : { type: String, required: true }
});

module.exports = mongoose.model('PatientImage', PatientImageSchema);
