const Vehicle = require("../models/Vehicle");

// Tüm araçları getir
const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate("assignedDriver");
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: "Araçlar alınırken hata oluştu" });
    }
};

// Yeni araç ekle
const addVehicle = async (req, res) => {
    try {
        const { plateNumber, model, brand, year, assignedDriver } = req.body;
        const newVehicle = new Vehicle({ plateNumber, model, brand, year, assignedDriver });
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({ message: "Araç eklenirken hata oluştu" });
    }
};

module.exports = { getVehicles, addVehicle };
