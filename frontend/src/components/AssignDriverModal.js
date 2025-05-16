import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    MenuItem,
    TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { fetchDrivers, fetchVehicles, assignDriver } from "../services/api";

const AssignDriverModal = ({ open, handleClose, onAssigned }) => {
    const [drivers, setDrivers] = useState([]);
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const driversData = await fetchDrivers();
            const vehiclesData = await fetchVehicles();
            setDrivers(driversData.filter(d => !d.assignedVehicle));
            setVehicles(vehiclesData.filter(v => !v.assignedDriver));
        };
        if (open) fetchData();
    }, [open]);

    const handleSubmit = async (values) => {
        try {
            await assignDriver(values.driverId, values.vehicleId);
            handleClose();
            onAssigned();
        } catch (error) {
            console.error("Eşleştirme hatası:", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Assign Driver to Vehicle</DialogTitle>
            <Formik
                initialValues={{ driverId: "", vehicleId: "" }}
                onSubmit={handleSubmit}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <DialogContent dividers>
                            <Field as={TextField} select fullWidth name="driverId" label="Select Driver" value={values.driverId} onChange={handleChange} margin="normal" >
                                {drivers.map((driver) => (
                                    <MenuItem key={driver._id} value={driver._id}>
                                        {driver.name} - {driver.licenseNumber}
                                    </MenuItem>
                                ))}
                            </Field>
                            <Field
                                as={TextField}
                                select
                                fullWidth
                                name="vehicleId"
                                label="Select Vehicle"
                                value={values.vehicleId}
                                onChange={handleChange}
                                margin="normal"
                            >
                                {vehicles.map((vehicle) => (
                                    <MenuItem key={vehicle._id} value={vehicle._id}>
                                        {vehicle.plateNumber} - {vehicle.brand}
                                    </MenuItem>
                                ))}
                            </Field>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClose} color="error">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained">
                                Assign
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};

export default AssignDriverModal;