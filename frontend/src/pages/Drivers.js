import React, { useEffect, useState } from 'react'
import TableComp from '../components/TableComp'
import { fetchDrivers } from '../services/api';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'licenseNumber', label: 'License Number', minWidth: 100 },
    {
        id: 'phone',
        label: 'Phone',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'assignedVehicle',
        label: 'Vehicle',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'actions',
        label: 'Actions',
        minWidth: 150,
        align: 'center',
    },
];


export const Drivers = () => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const driversData = await fetchDrivers();
            setDrivers(driversData);
        }

        fetchData();
    }, [])

    const rows = drivers.map((driver) => ({
        name: driver.name,
        licenseNumber: driver.licenseNumber,
        phone: driver.phone,
        assignedVehicle: driver.assignedVehicle ? driver.assignedVehicle.plateNumber : "Empty",
    }))

    return (
        <TableComp columns={columns} rows={rows}></TableComp>
    )
}
