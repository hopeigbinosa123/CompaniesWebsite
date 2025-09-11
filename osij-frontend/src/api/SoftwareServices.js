import api from './axiosConfig';


export const getSoftwareServices = () => {
  return api.get('/software-services/services/');
};

export const submitServiceRequest = (requestData) => {
  return api.post('/software-services/requests/create/', requestData);
};

export const getMyServiceRequests = () => {
  return api.get('/software-services/requests/me/');
};

export const getMyProjects = () => {
  return api.get('/software-services/projects/');
};

export const getProjectDetails = (projectId) => {
  return api.get(`/software-services/projects/${projectId}/`);
};