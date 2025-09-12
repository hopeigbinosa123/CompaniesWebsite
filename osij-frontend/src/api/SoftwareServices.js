import api from "./axiosConfig";

// Get all software services
export const getSoftwareServices = () => api.get("/api/software_services/services/");

// Get one software service
export const getSoftwareService = (id) => api.get(`/api/software_services/services/${id}/`);

// Create a new service request
export const createServiceRequest = (data) => api.post("/api/software_services/requests/", data);