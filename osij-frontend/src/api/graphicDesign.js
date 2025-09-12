import api from "./axiosConfig";

// Get all designers
export const getDesigners = () => api.get("/api/graphic_design/designers/");

// Get one designer
export const getDesigner = (id) => api.get(`/api/graphic_design/designers/${id}/`);

// Create a new design order
export const createDesignOrder = (data) => api.post("/api/graphic_design/orders/", data);