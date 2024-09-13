const mongoose = require('mongoose');

const InventoryUseLogsSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    itemUid: {
        type: String,
        required: true
    },
    useDate : {
        type: Date,
    },
    useTime : {
        type: String,
    },
    Note: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    availableQuantity : {
        type: Number,
        default: 0
    },
    totalQuantity : {
        type: Number,
        default: 0
    },
    staffUid: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
})

module.exports = mongoose.model('InventoryUseLogs', InventoryUseLogsSchema);