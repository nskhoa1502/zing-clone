import axiosConfig from "../axios";

export const apiGetHome = async () => {
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
