import axios from "axios";

const API_URL = "https://labid-backend.vercel.app/api";

export const getPhotos = async () => axios.get(`${API_URL}/photos`);
export const uploadPhoto = async (formData) =>
  axios.post(`${API_URL}/photos/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deletePhoto = async (id) => axios.delete(`${API_URL}/photos/${id}`);

export const getVideos = async () => axios.get(`${API_URL}/videos`);
export const uploadVideo = async (formData) =>
  axios.post(`${API_URL}/videos/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteVideo = async (id) => axios.delete(`${API_URL}/videos/${id}`);
