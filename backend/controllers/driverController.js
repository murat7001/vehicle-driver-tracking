const Driver = require("../models/Driver");
const Vehicle = require("../models/Vehicle");


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

// Şöför güncelle
const updateDriver = async (req, res) => {
    const { id } = req.params;

    try {
        const updated = await Driver.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Şoför bulunamadı." });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Güncellenirken hata oluştu." });
    }
};

// Şöför sil
const deleteDriver = async (req, res) => {
    const { id } = req.params;

    try {
        // Bu şoföre bağlı araçlardaki referansı temizle
        await Vehicle.updateMany({ assignedDriver: id }, { $set: { assignedDriver: null } });

        const deleted = await Driver.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Şoför bulunamadı." });

        res.json({ message: "Şoför silindi ve ilişkili araç güncellendi." });
    } catch (error) {
        console.error("Silme hatası:", error);
        res.status(500).json({ message: "Şoför silinirken hata oluştu." });
    }
};


module.exports = { getDrivers, addDriver, updateDriver, deleteDriver };
