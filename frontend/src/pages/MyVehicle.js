import { useEffect, useState } from 'react';
import { fetchDrivers, updateDriverLocation } from '../services/api';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import {
    Card,
    CardContent,
    Typography,
    Button,
    Divider,
    Avatar,
    Box,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DriveEtaIcon from '@mui/icons-material/DriveEta';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MyVehicle = () => {
    const [vehicle, setVehicle] = useState(null);
    const [driver, setDriver] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const userId = decoded.userId;

        const fetchMyVehicle = async () => {
            const drivers = await fetchDrivers();
            const me = drivers.find((d) => d._id === userId);
            if (me && me.assignedVehicle) {
                setVehicle(me.assignedVehicle);
                setDriver(me);
            }
        };

        fetchMyVehicle();
    }, []);

    const handleUpdateLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const token = localStorage.getItem('token');
                const decoded = JSON.parse(atob(token.split('.')[1]));
                const driverId = decoded.userId;

                try {
                    await updateDriverLocation(driverId, { latitude, longitude });
                    const drivers = await fetchDrivers();
                    const me = drivers.find((d) => d._id === driverId);
                    if (me) setDriver(me);
                    alert('Location updated successfully.');
                } catch (err) {
                    console.error(err);
                    alert('Location update failed.');
                }
            },
            (error) => {
                console.error('Location fetch error:', error);
                alert('Failed to get your location.');
            }
        );
    };

    if (!vehicle) {
        return <p className="text-center mt-10 text-gray-600">No assigned vehicle.</p>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <Card className="shadow-md">
                <CardContent>
                    {driver && (
                        <Box className="flex items-center space-x-4 mb-4">
                            <Avatar>
                                <DriveEtaIcon />
                            </Avatar>
                            <div>
                                <Typography variant="h6">Welcome, {driver.name}</Typography>
                                <Typography variant="body2" className="text-gray-500">
                                    License Number: {driver.licenseNumber}
                                </Typography>
                            </div>
                        </Box>
                    )}

                    <Divider className="" />

                    <Box className="mt-2">
                        <Typography variant="subtitle1" className="font-medium">
                            Vehicle Information
                        </Typography>

                        <Box className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-3 mt-1">
                            <div><strong>Plate:</strong> {vehicle.plateNumber}</div>
                            <div><strong>Brand:</strong> {vehicle.brand}</div>
                            <div><strong>Model:</strong> {vehicle.model}</div>
                            <div><strong>Year:</strong> {vehicle.year}</div>
                        </Box>

                        <Button
                            variant="contained"
                            startIcon={<LocationOnIcon />}
                            onClick={handleUpdateLocation}
                            color="primary"
                        >
                            Update My Location
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Box>
                {driver?.location && (
                    <Card className="shadow-md">
                        <CardContent>
                            <Typography variant="h6" className="mb-4">
                                Location on Map
                            </Typography>
                            <div className="h-80 w-full">
                                <MapContainer
                                    center={[driver.location.latitude, driver.location.longitude]}
                                    zoom={13}
                                    scrollWheelZoom={false}
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution="&copy; OpenStreetMap contributors"
                                    />
                                    <Marker position={[driver.location.latitude, driver.location.longitude]}>
                                        <Popup>
                                            {driver.name}'s Current Location
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </div>
    );
};

export default MyVehicle;
