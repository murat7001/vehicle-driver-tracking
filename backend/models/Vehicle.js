const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    plateNumber: String,
    model: String,
    brand: String,
    year: Number,
    assignedDriver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        default: null
    },
    assignedAt: { type: Date, default: null }
},{ timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
