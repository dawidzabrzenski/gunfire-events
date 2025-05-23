import axiosInstance from "../../utils/axiosConfig";

export async function getAllEvents() {
  const res = await axiosInstance.get("/events/findAll");
  return res.data;
}

export async function getEventById(id) {
  const res = await axiosInstance.get(`/events/findById/${id}`);
  return res.data;
}

export async function getEventsByParams(params) {
  const res = await axiosInstance.get("/events/findByParams", { params });
  return res.data;
}

export const createEvent = async (formData) => {
  const res = await axiosInstance.multipart("/events/create", formData);
  return res.data;
};
