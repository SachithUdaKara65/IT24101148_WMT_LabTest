import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://it24101148-wmt-labtest.onrender.com/api",
});

export const getItems = () => API.get("/items");
export const getItemById = (id) => API.get(`/items/${id}`);
export const createItem = (itemData) => API.post("/items", itemData);
export const updateItem = (id, itemData) => API.put(`/items/${id}`, itemData);
export const deleteItem = (id) => API.delete(`/items/${id}`);

export default API;
