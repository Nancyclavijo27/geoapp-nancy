// locationsApi.js
import api from "./axiosInstance";

const API_URL = "/api/locations";

export const getLocations = async () => {
  const res = await api.get(API_URL);
  return res.data;
};

export const createLocation = async (location) => {
  const res = await api.post(API_URL, location);
  return res.data;
};

export const updateLocation = async (id, updatedData) => {
  const res = await api.put(`${API_URL}/${id}`, updatedData);
  return res.data;
};

export const deleteLocation = async (id) => {
  const res = await api.delete(`${API_URL}/${id}`);
  return res.data;
};
