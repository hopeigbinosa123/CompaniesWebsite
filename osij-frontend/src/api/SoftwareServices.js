import api from './axiosConfig';

// Add this function to fetch services from database
export const getSoftwareServices = () => {
  return api.get('/software-services/services/');
};

// Keep your existing functions
export const submitServiceRequest = (requestData) => {
  return api.post('/software-services/enquiries/', requestData);
};

export const getMyServiceRequests = () => {
  return api.get('/software-services/enquiries/');
};

export const getMyProjects = () => {
  return api.get('/software-services/projects/');
};

export const getProjectDetails = (projectId) => {
  return api.get(`/software-services/projects/${projectId}/`);
};