import axios from "./axiosInstance";

export const getMyTrack = () => {
  return axios.get("/api");
};
