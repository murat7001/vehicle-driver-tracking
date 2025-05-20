import React, { useEffect, useState } from 'react';
import TableComp from '../components/TableComp';
import EditModal from '../components/EditModal';
import ConfirmModal from "../components/ConfirmModal";
import AddModal from '../components/AddModal';
import { deleteDriver, fetchDrivers, updateDriver, addDriver } from '../services/api';
import * as Yup from 'yup';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'licenseNumber', label: 'License Number', minWidth: 100 },
    { id: 'phone', label: 'Phone', minWidth: 170, align: 'center' },
    { id: 'email', label: 'Email', minWidth: 200, align: 'center' }, // ✅ Yeni eklendi
    { id: 'assignedVehicle', label: 'Assigned Vehicle', minWidth: 170, align: 'center' },
    { id: 'actions', label: 'Actions', minWidth: 150, align: 'center' },
];

const addDriverFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "licenseNumber", label: "License Number", type: "text" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" }
];

const editDriverFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "licenseNumber", label: "License Number", type: "text" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "email", label: "Email", type: "email" },
];

const addDriverValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    licenseNumber: Yup.string().required("License Number is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
});

const editDriverValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    licenseNumber: Yup.string().required("License Number is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
});

export const Drivers = () => {
    const [drivers, setDrivers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedDeleteDriver, setSelectedDeleteDriver] = useState(null);
    const [addModalOpen, setAddModalOpen] = useState(false);

    const fetchData = async () => {
        const driversData = await fetchDrivers();
        setDrivers(driversData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEditClick = (driver) => {
        setSelectedDriver({
            id: driver._id,
            name: driver.name,
            licenseNumber: driver.licenseNumber,
            phone: driver.phone,
            email: driver.email,
        });
        setModalOpen(true);
    };

    const handleUpdateDriver = async (updatedData) => {
        try {
            if (!selectedDriver?.id) return;

            await updateDriver(selectedDriver.id, updatedData);
            setModalOpen(false);
            fetchData(); // Güncellenmiş veriyi tekrar çek
        } catch (error) {
            console.error("Şoför güncellenirken hata:", error);
        }
    };

    const handleDeleteClick = (driver) => {
        setSelectedDeleteDriver(driver);
        setConfirmOpen(true);
    };

    const confirmDeleteDriver = async () => {
        try {
            if (!selectedDeleteDriver?._id) return;

            await deleteDriver(selectedDeleteDriver._id);
            setConfirmOpen(false);
            fetchData();
        } catch (error) {
            console.error("Şoför silinirken hata:", error);
        }
    };

    const handleAddDriver = async (newDriverData) => {
        try {
            await addDriver(newDriverData);
            fetchData(); // Yeni veriyi tekrar çek
        } catch (error) {
            console.error("Şoför eklenirken hata:", error);
        }
    };

    const rows = drivers.map((driver) => ({
        _id: driver._id,
        name: driver.name,
        licenseNumber: driver.licenseNumber,
        phone: driver.phone,
        email: driver.email || "N/A", // ✅ Yeni
        assignedVehicle: driver.assignedVehicle ? driver.assignedVehicle.plateNumber : "Empty",
    }));

    return (
        <>
            <TableComp
                tableName={"Drivers"}
                columns={columns}
                rows={rows}
                onEdit={(driver) => handleEditClick(driver)}
                onDelete={(driver) => handleDeleteClick(driver)}
                onAdd={() => setAddModalOpen(true)} // Yeni eklenen onAdd özelliği
            />

            <EditModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                fields={editDriverFields}
                initialValues={selectedDriver || {}}
                validationSchema={editDriverValidationSchema}
                onSubmit={handleUpdateDriver}
            />

            <AddModal
                open={addModalOpen}
                handleClose={() => setAddModalOpen(false)}
                fields={addDriverFields}
                initialValues={{
                    name: "",
                    licenseNumber: "",
                    phone: "",
                    email: "",
                    password: ""
                }}
                validationSchema={addDriverValidationSchema}
                onSubmit={handleAddDriver}
            />

            <ConfirmModal
                open={confirmOpen}
                handleClose={() => setConfirmOpen(false)}
                handleConfirm={confirmDeleteDriver}
                message={selectedDeleteDriver ? `Do you want to delete the driver named ${selectedDeleteDriver.name}?` : ""}
            />

            {drivers.some(d => d.location) && (
                <div className="my-8 h-[500px] rounded shadow overflow-hidden">
                    <MapContainer
                        center={[38.9637, 35.2433]} // Türkiye merkez
                        zoom={6}
                        scrollWheelZoom={true}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />

                        {drivers
                            .filter(d => d.location)
                            .map(driver => (
                                <Marker
                                    key={driver._id}
                                    position={[driver.location.latitude, driver.location.longitude]}
                                >
                                    <Popup>
                                        <strong>{driver.name}</strong><br />
                                        License: {driver.licenseNumber}<br />
                                        Vehicle: {driver.assignedVehicle?.plateNumber || 'None'}
                                    </Popup>
                                </Marker>
                            ))}
                    </MapContainer>
                </div>
            )}
        </>
    );
};
