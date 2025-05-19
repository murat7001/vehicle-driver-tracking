const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: String,
    licenseNumber: String,
    phone: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'driver'], default: 'driver' },
    assignedVehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        default: null
    }
});

module.exports = mongoose.model('Driver', driverSchema);
