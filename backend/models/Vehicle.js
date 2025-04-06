const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
    {
        plateNumber: { type: String, required: true, unique: true },
        model: { type: String, required: true },
        brand: { type: String, required: true },
        year: { type: Number, required: true },
        assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
