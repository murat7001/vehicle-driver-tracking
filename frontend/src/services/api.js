import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

// Token varsa her isteğe otomatik ekle
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Driver işlemleri
export const fetchDrivers = async () => {
    const { data } = await API.get("/drivers");
    return data;
};

export const updateDriver = (id, updatedData) => API.put(`/drivers/${id}`, updatedData);
export const deleteDriver = (id) => API.delete(`/drivers/${id}`);
export const addDriver = (newDriverData) => API.post('/drivers', newDriverData);

// Vehicle işlemleri
export const fetchVehicles = async () => {
    const { data } = await API.get("/vehicles");
    return data;
};

export const updateVehicle = (id, updatedData) => API.put(`/vehicles/${id}`, updatedData);
export const deleteVehicle = (id) => API.delete(`/vehicles/${id}`);
export const addVehicle = (newVehicleData) => API.post('/vehicles', newVehicleData);

// Şoför atama
export const assignDriver = (driverId, vehicleId) =>
    API.put("/assign-driver", { driverId, vehicleId });

// Giriş işlemi
export const login = (credentials) => axios.post("http://localhost:5000/api/auth/login", credentials);
