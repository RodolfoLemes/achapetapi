const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    devices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
    }],

    phone: {
        type: String
    },

    createAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('User', UserSchema)