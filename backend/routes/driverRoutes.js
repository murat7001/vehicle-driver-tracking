const express = require("express");
const { getDrivers, addDriver } = require("../controllers/driverController");

const router = express.Router();

// Tüm şoförleri getir
router.get("/", getDrivers);

// Yeni şoför ekle
router.post("/", addDriver);

module.exports = router;
