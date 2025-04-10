require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const driverRoutes = require("./routes/driverRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const assignRoutes = require('./routes/assign');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Veritabanına bağlan
connectDB();

// Rotalar
app.use("/api/drivers", driverRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use('/api', assignRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor...`));
