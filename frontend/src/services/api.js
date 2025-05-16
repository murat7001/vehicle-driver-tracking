import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});



export const fetchDrivers = async () => {
    const { data } = await API.get("/drivers")

    return data
}

export const updateDriver = (id, updatedData) => API.put(`/drivers/${id}`, updatedData);


export const deleteDriver = (id) => API.delete(`/drivers/${id}`);

export const addDriver = (newDriverData) => API.post('/drivers', newDriverData);

export const fetchVehicles  = async () => {
    const { data } = await API.get("/vehicles")

    return data
}

export const updateVehicle = (id, updatedData) => API.put(`/vehicles/${id}`, updatedData);

export const deleteVehicle = (id) => API.delete(`/vehicles/${id}`);

export const addVehicle = (newVehicleData) => API.post('/vehicles', newVehicleData);


export const assignDriver = (driverId, vehicleId) =>
API.put("/assign-driver", { driverId, vehicleId });