import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});



export const fetchDrivers = async () => {
    const { data } = await API.get("/drivers")

    return data
}

export const fetchVehicles  = async () => {
    const { data } = await API.get("/vehicles")

    return data
}


export const updateDriver = (id, updatedData) => API.put(`/drivers/${id}`, updatedData);


export const deleteDriver = (id) => API.delete(`/drivers/${id}`);
