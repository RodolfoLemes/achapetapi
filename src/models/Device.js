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

    walkMode: {
        type: Boolean,
        default: false,
    },

    name: {
        type: String,
        required: true
    },

    battery: {
        type: String,
        default: 'Ruim'
    },

    geofencing: {
        coordCentralLat: Number,
        coordCentralLon: Number,
        radius: Number
    },

    cep: {
        type: String
    },

    emergencialPhone: {
        type: String
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

module.exports = mongoose.model('Device', DeviceSchema)