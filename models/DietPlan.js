const mongoose = require('mongoose');

const dietPlanSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    patientUid: { type: String, required: true },
    mealName: { type: String, required: true },
    quantity: { type: Number, required: true },
    time: { type: Date, required: true },
    dietType: { type: String, required: true },
    staffUid : { type: String },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('DietPlan', dietPlanSchema);

