const mongoose = require('mongoose');

const DailyRecordSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    patientUid: { type: String, required: true },
    bp: { type: String },
    rp: { type: String },
    temperature: { type: String },
    oxygen: { type: String },
    urine: { type: Boolean },
    motion: { type: Boolean },
    meal: { type: String },
    medicine: { type: String },
    recordDate: { type: Date },
    staffUid: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

module.exports = mongoose.model('DailyRecord', DailyRecordSchema);
