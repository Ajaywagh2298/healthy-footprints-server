const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    stockName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    valuePerUnit: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    expiredDate: {
        type: Date
    },
    stockEndDate: {
        type: Date
    },
    staffUid : { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
})

module.exports = mongoose.model('Stock', StockSchema);
