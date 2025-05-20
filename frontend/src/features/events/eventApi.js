import axiosInstance from "../../utils/axiosConfig";

export const createEvent = async (formData) => {
  const res = await axiosInstance.multipart("/events/create", formData);
  return res.data;
};
