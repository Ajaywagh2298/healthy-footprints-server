const mongoose = require('mongoose');

const ItemsSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    itemName: {
        type: String,
        required: true
    },
    itemCode: {
        type: String,
        required: true
    },
    descript: {
        type: String,
    },
    itemType: {
        type: String,
    },
    cost: {
        type: Number,
        required: true,
        default: 0
    },
    stockLimit : {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    totalQuantity : {
        type: Number,
        default: 0
    },
    totalCost: {
        type: Number,
        default: 0
    },
    staffUid: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
})

module.exports = mongoose.model('Items', ItemsSchema);