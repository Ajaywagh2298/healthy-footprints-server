const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    _id: { type: String },
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dateOfBirth: { type: String },
    weight: { type: String },
    height: { type: String },
    bloodGroup: { type: String },
    address: { type: String  },
    healthStatus: { type: String },
    staffUid : { type: String }
});

module.exports = mongoose.model('Patient', PatientSchema);
