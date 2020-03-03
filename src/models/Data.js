const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    coords: {
        lat: Number,
        lon: Number,
        timestamp: Number,
    },

    device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
        required: true
    },

    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Data', DataSchema)