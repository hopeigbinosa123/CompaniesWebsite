import api from "./axiosConfig";

<<<<<<< HEAD
// Get all software services
export const getSoftwareServices = () => api.get("/api/software_services/services/");

// Get one software service
export const getSoftwareService = (id) => api.get(`/api/software_services/services/${id}/`);
=======

export const getSoftwareServices = () => {
  return api.get('/software-services/services/');
};

export const submitServiceRequest = (requestData) => {
  return api.post('/software-services/requests/create/', requestData);
};
>>>>>>> 85c70677a912d112ee4c8ddeb8cbb9bba28816a4

// Create a new service request
export const createServiceRequest = (data) => api.post("/api/software_services/requests/", data);