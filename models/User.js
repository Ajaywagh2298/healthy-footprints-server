const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    dateOfBirth: { type: Date, required: true }
});

module.exports = mongoose.model('User', UserSchema);
