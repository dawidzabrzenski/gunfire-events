import axiosInstance from "../../utils/axiosConfig";

export async function getAllEvents() {
  const res = await axiosInstance.get("/events/findAll");
  return res.data;
}

export const createEvent = async (formData) => {
  const res = await axiosInstance.multipart("/events/create", formData);
  return res.data;
};
