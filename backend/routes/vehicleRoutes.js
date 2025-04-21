const express = require("express");
const { getVehicles, addVehicle, updateVehicle, deleteVehicle } = require("../controllers/vehicleController");

const router = express.Router();

// Tüm araçları getir
router.get("/", getVehicles);

// Yeni araç ekle
router.post("/", addVehicle);

// Araç güncelle
router.put("/:id", updateVehicle);

// Araç sil
router.delete("/:id", deleteVehicle);

module.exports = router;
