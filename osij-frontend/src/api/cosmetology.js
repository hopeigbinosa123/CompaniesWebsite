
import api from "./axiosConfig";

// Get all stylists
export const getStylists = () => api.get("/api/cosmetology/stylists/");

// Get one stylist
export const getStylist = (id) => api.get(`/api/cosmetology/stylists/${id}/`);

// Create a new appointment
export const createAppointment = (data) => api.post("/api/cosmetology/appointments/", data);