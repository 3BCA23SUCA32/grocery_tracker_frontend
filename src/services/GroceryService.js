import axios from "axios";

// 🔥 DIRECT BACKEND URL (Render)
const API_URL = "https://grocery-tracker-backend-5nga.onrender.com/api/groceries";

export const getItems = () => axios.get(API_URL);

export const addItem = (item) => axios.post(API_URL, item);

export const updateItem = (id, item) =>
  axios.put(`${API_URL}/${id}`, item);

export const deleteItem = (id) =>
  axios.delete(`${API_URL}/${id}`);
