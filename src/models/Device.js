const mongoose = require('mongoose')

const DeviceSchema = new mongoose.Schema({
    data: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Data',
    }],

    imei: {
        type: String,
        required: true
    }, 

    name: {
        type: String
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

module.exports = mongoose.model('Device', DeviceSchema)