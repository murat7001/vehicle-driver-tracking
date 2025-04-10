const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: String,
    licenseNumber: String,
    phone: String,
    assignedVehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        default: null
    }
});

module.exports = mongoose.model('Driver', driverSchema);
