import { useEffect, useState } from 'react';
import { fetchDrivers, updateDriverLocation } from '../services/api';

const MyVehicle = () => {
    const [vehicle, setVehicle] = useState(null);
    const [driver, setDriver] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const userId = decoded.userId;

        const fetchMyVehicle = async () => {
            const drivers = await fetchDrivers();
            const me = drivers.find(d => d._id === userId);
            if (me && me.assignedVehicle) {
                setVehicle(me.assignedVehicle);
                setDriver(me);
            }
        };

        fetchMyVehicle();
    }, []);

    const handleUpdateLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const token = localStorage.getItem("token");
                const decoded = JSON.parse(atob(token.split('.')[1]));
                const driverId = decoded.userId;

                try {
                    console.log("Konum gönderiliyor:", { latitude, longitude });
                    await updateDriverLocation(driverId, { latitude, longitude });

                    // 🔁 Veriyi yeniden çek, UI'yi güncelle
                    const drivers = await fetchDrivers();
                    const me = drivers.find(d => d._id === driverId);
                    if (me) setDriver(me);

                    alert("Konum başarıyla güncellendi.");
                } catch (err) {
                    console.error(err);
                    alert("Konum güncellenemedi.");
                }
            },
            (error) => {
                console.error("Konum alınamadı:", error);
                alert("Konum bilgisi alınamadı.");
            }
        );
    };



    if (!vehicle) return <p className="text-center mt-10">No assigned vehicle.</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Assigned Vehicle</h2>
            <div className="bg-white p-4 rounded shadow">
                <p><strong>Plate:</strong> {vehicle.plateNumber}</p>
                <p><strong>Brand:</strong> {vehicle.brand}</p>
                <p><strong>Model:</strong> {vehicle.model}</p>
                <p><strong>Year:</strong> {vehicle.year}</p>
            </div>
            <button
                onClick={handleUpdateLocation}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Update My Location
            </button>

            <p className="mt-2 text-sm text-gray-600">
                {driver.location
                    ? `Last Location: Lat ${driver.location.latitude}, Lng ${driver.location.longitude}`
                    : "Location not set"}
            </p>
        </div>
    );
};

export default MyVehicle;
