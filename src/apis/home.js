import axiosConfig from "../axios";

export const getHome = async () => {
  try {
    const response = await axiosConfig({
      url: `/home`,
      method: "get",
    });

    return response;
  } catch (error) {
    console.error(error.response.data);
  }
};
