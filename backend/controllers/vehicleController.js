const Vehicle = require("../models/Vehicle");
const Driver = require("../models/Driver");

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

// Araç güncelle
const updateVehicle = async (req, res) => {
    const { id } = req.params;

    try {
        const updated = await Vehicle.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Araç bulunamadı." });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Araç güncellenirken hata oluştu." });
    }
};

// Araç silme
const deleteVehicle = async (req, res) => {
    const { id } = req.params;

    try {
        // Bu aracı kullanan şoförlerdeki referansı temizle
        await Driver.updateMany({ assignedVehicle: id }, { $set: { assignedVehicle: null } });

        const deleted = await Vehicle.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Araç bulunamadı." });

        res.json({ message: "Araç silindi ve ilişkili şoför güncellendi." });
    } catch (error) {
        res.status(500).json({ message: "Araç silinirken hata oluştu." });
    }
};


module.exports = { getVehicles, addVehicle, updateVehicle, deleteVehicle };
