const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  coords: {
    lat: Number,
    lon: Number,
    timestamp: Number,
  },

  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    required: true,
  },

  isWifi: Boolean,

  isGeofencing: Boolean,

  createAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Data', DataSchema);
