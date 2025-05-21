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
import { fetchDrivers, assignDriver } from "../services/api";

const AssignDriverModal = ({ open, handleClose, onAssigned, vehicleData }) => {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const driversData = await fetchDrivers();
            setDrivers(driversData.filter((d) => !d.assignedVehicle));
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
                initialValues={{
                    driverId: "",
                    vehicleId: vehicleData?._id || "",
                }}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ values, handleChange }) => (
                    <Form>
                        <DialogContent dividers>
                            {/* Araç bilgisi gösteriliyor ama değiştirilemiyor */}
                            <TextField
                                fullWidth
                                label="Selected Vehicle"
                                value={`${vehicleData?.plateNumber} - ${vehicleData?.brand}`}
                                margin="normal"
                                disabled
                            />

                            {/* Vehicle ID hidden input */}
                            <Field type="hidden" name="vehicleId" value={vehicleData?._id} />

                            {/* Şoför seçimi */}
                            <Field
                                as={TextField}
                                select
                                fullWidth
                                name="driverId"
                                label="Select Driver"
                                value={values.driverId}
                                onChange={handleChange}
                                margin="normal"
                            >
                                {drivers.map((driver) => (
                                    <MenuItem key={driver._id} value={driver._id}>
                                        {driver.name} - {driver.licenseNumber}
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