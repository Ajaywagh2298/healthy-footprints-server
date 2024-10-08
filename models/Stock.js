const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    batchName: {
        type: String,
        require: true
    },
    batchDate: {
        type: Date,
        require: true
    },
    itemUid: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    costPerUnit: {
        type: Number,
        default: 0
    },
    totalCost: {
        type: Number,
        default: 0
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
    staffUid: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
})

module.exports = mongoose.model('stocks', StockSchema);
