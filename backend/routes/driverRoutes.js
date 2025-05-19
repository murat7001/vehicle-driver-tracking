const express = require("express");
const {
    getDrivers,
    addDriver,
    updateDriver,
    deleteDriver,
    updateDriverLocation
} = require("../controllers/driverController");

const router = express.Router();

router.get("/", getDrivers);
router.post("/", addDriver);
router.put("/:id", updateDriver);
router.delete("/:id", deleteDriver);
router.put("/:id/location", updateDriverLocation);

module.exports = router;