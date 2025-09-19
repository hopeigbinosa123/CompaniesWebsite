import api from "./axiosConfig";

// Get all software services
export const getSoftwareServices = () => api.get("/software-services/services/");

// Get one software service
export const getSoftwareService = (id) => api.get(`/software-services/services/${id}/`);

// Create a new service request
export const createServiceRequest = (data) => api.post("/software-services/requests/", data);

// Submit a service request (alternate endpoint)
export const submitServiceRequest = (requestData) => {
  return api.post("/software-services/requests/create/", requestData);
};

// Fix: Add missing export for dashboard projects
export const getMyProjects = () => {
  return api.get("/software-services/my-projects/");
};
