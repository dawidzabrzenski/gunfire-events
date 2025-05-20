import axiosInstance from "../../utils/axiosConfig";

export const findAllCatgories = async () => {
  const res = await axiosInstance.get("/category/findAll");

  return res.data.categories;
};
