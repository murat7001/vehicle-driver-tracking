const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');
const Vehicle = require('../models/Vehicle');

// Şoför ve aracı birbirine bağla
router.put('/assign-driver', async (req, res) => {
    const { driverId, vehicleId } = req.body;

    try {
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ message: 'Araç bulunamadı.' });
        }

        // Eğer driverId null ise eşleştirmeyi kaldır
        if (!driverId) {
            // Eski şoför varsa, onun da bağlantısını kaldır
            if (vehicle.assignedDriver) {
                const oldDriver = await Driver.findById(vehicle.assignedDriver);
                if (oldDriver) {
                    oldDriver.assignedVehicle = null;
                    await oldDriver.save();
                }
            }

            vehicle.assignedDriver = null;
            vehicle.assignedAt = null; // 🔴 atama tarihi temizleniyor
            await vehicle.save();

            return res.status(200).json({ message: 'Eşleştirme kaldırıldı', vehicle });
        }

        // Aksi takdirde, yeni eşleştirme yap
        const driver = await Driver.findById(driverId);
        if (!driver) {
            return res.status(404).json({ message: 'Şoför bulunamadı.' });
        }

        driver.assignedVehicle = vehicle._id;
        vehicle.assignedDriver = driver._id;
        vehicle.assignedAt = new Date(); // 🟢 atama tarihi kaydediliyor

        await driver.save();
        await vehicle.save();

        res.status(200).json({ message: 'İlişkilendirme başarılı', driver, vehicle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

module.exports = router;
