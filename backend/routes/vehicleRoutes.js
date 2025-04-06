const express = require("express");
const { getVehicles, addVehicle } = require("../controllers/vehicleController");

const router = express.Router();

// Tüm araçları getir
router.get("/", getVehicles);

// Yeni araç ekle
router.post("/", addVehicle);

module.exports = router;
