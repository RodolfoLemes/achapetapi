const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    devices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
    }],

    createAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('User', UserSchema)