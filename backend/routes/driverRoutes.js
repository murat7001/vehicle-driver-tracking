const express = require("express");
const { getDrivers, addDriver, updateDriver, deleteDriver } = require("../controllers/driverController");

const router = express.Router();

// Tüm şoförleri getir
router.get("/", getDrivers);

// Yeni şoför ekle
router.post("/", addDriver);

// Şöför güncelle
router.put("/:id", updateDriver);

// Şöför sil
router.delete("/:id", deleteDriver);

module.exports = router;
