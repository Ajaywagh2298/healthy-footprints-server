const mongoose = require('mongoose');

const UserLoginSchema = new mongoose.Schema({
    uid: { 
        type: String, 
        required: true, 
        unique: true 
    },
    staffUid: { 
        type: String, 
        required: true 
    },
    token: { 
        type: String, 
        required: true 
    },
    logout: {
        type: Number, 
        default: 1 
    },
    loginTime: { 
        type: Date, 
        default: Date.now 
    },
    logoutTime: { 
        type: Date 
    }
});

// Exporting the model
module.exports = mongoose.model('UserLogin', UserLoginSchema);
