import axiosConfig from "../axios";

export const getSong = async (sid) => {
  try {
    const response = await axiosConfig({
      url: `/song`,
      method: "get",
      params: { id: sid },
    });

    return response;
  } catch (error) {
    console.error(error.response.data);
  }
};
export const getDetailSong = async (sid) => {
  try {
    const response = await axiosConfig({
      url: `/infosong`,
      method: "get",
      params: { id: sid },
    });

    return response;
  } catch (error) {
    console.error(error.response.data);
  }
};
