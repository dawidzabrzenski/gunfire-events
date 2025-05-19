import axiosInstance from "../../utils/axiosConfig";

export const createEvent = async (event) => {
  const response = await axiosInstance.post("/events/create", event, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
