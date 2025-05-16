import React, { useEffect, useState } from 'react';
import TableComp from '../components/TableComp';
import EditModal from '../components/EditModal';
import ConfirmModal from "../components/ConfirmModal";
import { fetchVehicles, updateVehicle, deleteVehicle, addVehicle } from '../services/api';
import * as Yup from 'yup';
import AddModal from '../components/AddModal';
import AssignDriverModal from '../components/AssignDriverModal';

const columns = [
    { id: 'plateNumber', label: 'Plate Number', minWidth: 100 },
    { id: 'brand', label: 'Brand', minWidth: 100, align: 'center' },
    { id: 'model', label: 'Model', minWidth: 100, align: 'center' },
    { id: 'year', label: 'Year', minWidth: 80, align: 'center' },
    { id: 'assignedDriver', label: 'Assigned Driver', minWidth: 150, align: 'center' },
    { id: 'actions', label: 'Actions', minWidth: 150, align: 'center' },
];

const vehicleFields = [
    { name: "plateNumber", label: "Plate Number", type: "text" },
    { name: "brand", label: "Brand", type: "text" },
    { name: "model", label: "Model", type: "text" },
    { name: "year", label: "Year", type: "number" },
];

const vehicleValidationSchema = Yup.object({
    plateNumber: Yup.string().required("Plate Number is required"),
    brand: Yup.string().required("Brand is required"),
    model: Yup.string().required("Model is required"),
    year: Yup.number().required("Year is required").min(1900, "Year must be after 1900"),
});

export const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedDeleteVehicle, setSelectedDeleteVehicle] = useState(null);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [assignOpen, setAssignOpen] = useState(false);


    const fetchData = async () => {
        try {
            const vehiclesData = await fetchVehicles();
            setVehicles(vehiclesData);
        } catch (error) {
            console.error("Araçlar getirilirken hata:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditClick = (vehicle) => {
        setSelectedVehicle({
            id: vehicle._id,
            plateNumber: vehicle.plateNumber,
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
        });
        setModalOpen(true);
    };

    const handleUpdateVehicle = async (updatedData) => {
        try {
            if (!selectedVehicle?.id) return;

            await updateVehicle(selectedVehicle.id, updatedData);
            setModalOpen(false);
            fetchData();
        } catch (error) {
            console.error("Araç güncellenirken hata:", error);
        }
    };

    const handleDeleteClick = (vehicle) => {
        setSelectedDeleteVehicle(vehicle);
        setConfirmOpen(true);
    };

    const confirmDeleteVehicle = async () => {
        try {
            if (!selectedDeleteVehicle?._id) return;

            await deleteVehicle(selectedDeleteVehicle._id);
            setConfirmOpen(false);
            fetchData();
        } catch (error) {
            console.error("Araç silinirken hata:", error);
        }
    };

    const handleAddVehicle = async (newVehicleData) => {
        try {
            await addVehicle(newVehicleData);
            fetchData(); // Yeni veriyi tekrar çek
        } catch (error) {
            console.error("Araç eklenirken hata:", error);
        }
    };

    const rows = vehicles.map((vehicle) => ({
        _id: vehicle._id,
        plateNumber: vehicle.plateNumber,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        assignedDriver: vehicle.assignedDriver ? vehicle.assignedDriver.name : "Empty",
    }));

    return (
        <>
            <TableComp
                tableName={"Vehicles"}
                columns={columns}
                rows={rows}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                onAdd={() => setAddModalOpen(true)}
                onAssign={()=>setAssignOpen(true)}
            />

            <EditModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                fields={vehicleFields}
                initialValues={selectedVehicle || {}}
                validationSchema={vehicleValidationSchema}
                onSubmit={handleUpdateVehicle}
            />

            <AddModal
                open={addModalOpen}
                handleClose={() => setAddModalOpen(false)}
                fields={vehicleFields}
                initialValues={{ plateNumber: "", brand: "", model: "", year: "" }}
                validationSchema={vehicleValidationSchema}
                onSubmit={handleAddVehicle}
            />

            <ConfirmModal
                open={confirmOpen}
                handleClose={() => setConfirmOpen(false)}
                handleConfirm={confirmDeleteVehicle}
                message={selectedDeleteVehicle ? `Do you want to delete the vehicle with plate number ${selectedDeleteVehicle.plateNumber}?` : ""}
            />

            <AssignDriverModal
                open={assignOpen}
                handleClose={() => setAssignOpen(false)}
                onAssigned={fetchData}
            />
        </>
    );
};
