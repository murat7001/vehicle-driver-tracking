import React, { useEffect, useState } from "react";
import { fetchDrivers, fetchVehicles } from "../services/api";
import { Grid, Typography } from "@mui/material";
import StatsCard from "../components/StatsCard";

export const Dashboard = () => {
    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchDatas = async () => {
            const driversData = await fetchDrivers();
            const vehiclesData = await fetchVehicles();
            setDrivers(driversData);
            setVehicles(vehiclesData);
        };

        fetchDatas();
    }, []);

    const emptyDrivers = drivers.filter((d) => !d.assignedVehicle).length;
    const emptyVehicles = vehicles.filter((v) => !v.assignedDriver).length;

    const stats = [
        { label: "Empty Driver", count: emptyDrivers, color: "#f59e0b" },
        { label: "Empty Vehicles", count: emptyVehicles, color: "#ef4444" },
        { label: "Total Vehicles", count: vehicles.length, color: "#10b981" },
        { label: "Total Drivers", count: drivers.length, color: "#3b82f6" },
    ];

    return (
        <div className="p-6">
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                📊 Dashboard
            </Typography>

            <Grid container spacing={3}>
                {stats.map((item) => (
                    <Grid item xs={12} sm={6} md={3} key={item.label}>
                        <StatsCard {...item} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};
