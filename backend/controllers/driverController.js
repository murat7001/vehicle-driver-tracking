const Driver = require("../models/Driver");

// Tüm şoförleri getir
const getDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find().populate("assignedVehicle");
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ message: "Şoförler alınırken hata oluştu" });
    }
};

// Yeni şoför ekle
const addDriver = async (req, res) => {
    try {
        const { name, licenseNumber, phone, assignedVehicle } = req.body;
        const newDriver = new Driver({ name, licenseNumber, phone, assignedVehicle });
        await newDriver.save();
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(400).json({ message: "Şoför eklenirken hata oluştu" });
    }
};

module.exports = { getDrivers, addDriver };
