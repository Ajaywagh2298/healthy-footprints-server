const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    _id: { type: String },
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    bloodGroup: { type: String, required: true },
    address: { type: String, required: true },
    healthStatus: { type: String, required: true },
    staffUid : { type: String }
});

module.exports = mongoose.model('Patient', PatientSchema);
