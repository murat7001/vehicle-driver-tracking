const bcrypt = require("bcryptjs");
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

// Yeni şoför ekle (admin eklerken veya kullanıcı oluştururken)
const addDriver = async (req, res) => {
    try {
        const {
            name,
            licenseNumber,
            phone,
            assignedVehicle,
            email,
            password,
            role
        } = req.body;

        const existing = await Driver.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Bu email zaten kayıtlı." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newDriver = new Driver({
            name,
            licenseNumber,
            phone,
            assignedVehicle,
            email,
            password: hashedPassword,
            role: role || "driver"
        });

        await newDriver.save();
        res.status(201).json(newDriver);
    } catch (error) {
        console.error("Şoför eklenirken hata:", error);
        res.status(400).json({ message: "Şoför eklenirken hata oluştu" });
    }
};

// Şöför güncelle
const updateDriver = async (req, res) => {
    const { id } = req.params;
    const updateData = { ...req.body };

    try {
        // Eğer yeni bir şifre geldiyse hashle
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const updated = await Driver.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) return res.status(404).json({ message: "Şoför bulunamadı." });

        res.json(updated);
    } catch (error) {
        console.error("Güncelleme hatası:", error);
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

const updateDriverLocation = async (req, res) => {
    const { id } = req.params;
    const { latitude, longitude } = req.body;
    try {
        const updated = await Driver.findByIdAndUpdate(
            id,
            { location: { latitude, longitude } },
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Location update failed.' });
    }
};

module.exports = { getDrivers, addDriver, updateDriver, deleteDriver, updateDriverLocation };
