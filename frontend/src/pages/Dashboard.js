import React, { useEffect, useState } from "react";
import { fetchDrivers, fetchVehicles } from "../services/api";
import { Grid } from "@mui/material";
import StatsCard from "../components/StatsCard";
import ChartComp from "../components/ChartComp";
import { groupCumulativeByDay } from "../utils/groupCumulativeByDay";
import RecentList from "../components/RecentList";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import CarCrashIcon from '@mui/icons-material/CarCrash';

export const Dashboard = () => {
    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    const recentAssignedVehicles = [...vehicles]
        .filter(v => v.assignedAt)
        .sort((a, b) => new Date(b.assignedAt) - new Date(a.assignedAt))
        .slice(0, 5);


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
        { label: "Empty Driver", count: emptyDrivers, color: "#f59e0b", icon: PersonOffIcon },
        { label: "Empty Vehicles", count: emptyVehicles, color: "#ef4444", icon: CarCrashIcon },
        { label: "Total Vehicles", count: vehicles.length, color: "#10b981", icon: DirectionsCarIcon },
        { label: "Total Drivers", count: drivers.length, color: "#3b82f6", icon: PeopleAltIcon },
    ];

    const driversData = groupCumulativeByDay(drivers);
    const vehiclesData = groupCumulativeByDay(vehicles);

    return (
        <div className="p-8">
            <div className="mt-10">


                <Grid className="flex justify-between" container spacing={3}>
                    {stats.map((item) => (
                        <Grid item xs={12} sm={6} md={3} key={item.label}>
                            <StatsCard {...item} Icon={item.icon} />
                        </Grid>
                    ))}
                </Grid>

                <div className="flex justify-between mt-40 space-x-10">
                    <ChartComp
                        type="pie"
                        title="Araç Durumu"
                        data={[
                            { id: 0, value: emptyVehicles, label: "Boşta", color: "blue" },
                            { id: 1, value: vehicles.length - emptyVehicles, label: "Atanmış", color: "orange" },
                        ]}
                    />

                    <ChartComp
                        type="line"
                        title="Our Drivers"
                        data={driversData}
                    />

                    <ChartComp
                        type="line"
                        title="Our Vehicles"
                        data={vehiclesData}
                    />
                </div>

                <div className="flex mt-40 justify-evenly">
                    <RecentList
                        title="Son Eklenen Şoförler"
                        items={[...drivers].reverse()}
                        primaryKey="name"
                        secondaryKey="licenseNumber"
                    />
                    <div className="m-4">

                    </div>
                    <RecentList
                        title="Son Atanan Araçlar"
                        items={recentAssignedVehicles}
                        primaryKey="plateNumber"
                        secondaryKey={(item) =>
                            item.assignedDriver
                                ? `${item.assignedDriver.name} • ${new Date(item.assignedAt).toLocaleDateString('tr-TR')}`
                                : new Date(item.assignedAt).toLocaleDateString('tr-TR')
                        }
                    />

                    <div className="m-4">

                    </div>
                    <RecentList
                        title="Son Eklenen Araçlar"
                        items={[...vehicles].reverse()}
                        primaryKey="brand"
                        secondaryKey="plateNumber"
                    />
                </div>
            </div>


        </div>
    );
};
