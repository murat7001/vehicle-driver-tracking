const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');
const Vehicle = require('../models/Vehicle');

// Şoför ve aracı birbirine bağla
router.put('/assign-driver', async (req, res) => {
    const { driverId, vehicleId } = req.body;

    try {
        const driver = await Driver.findById(driverId);
        const vehicle = await Vehicle.findById(vehicleId);

        if (!driver || !vehicle) {
            return res.status(404).json({ message: 'Şoför veya araç bulunamadı.' });
        }

        // Şoför ve araca referans ekle
        driver.assignedVehicle = vehicle._id;
        vehicle.assignedDriver = driver._id;

        await driver.save();
        await vehicle.save();

        res.status(200).json({ message: 'İlişkilendirme başarılı', driver, vehicle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Sunucu hatası' });
    }
});

module.exports = router;
