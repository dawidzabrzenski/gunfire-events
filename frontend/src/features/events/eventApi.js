import axiosInstance from "../../utils/axiosConfig";

export const createEvent = async (formData) => {
  const response = await axiosInstance.post("/events/create", formData);
  return response.data;
};
