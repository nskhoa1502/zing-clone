import axios from "axios";
import axiosConfig from "../axios";

export const apiGetSong = async (sid) => {
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
export const apiGetRestrictedSong = async (url) => {
  try {
    const response = await axios({
      url: url,
      method: "get",
    });

    return response;
  } catch (error) {
    console.error(error.response.data);
  }
};
export const apiGetDetailSong = async (sid) => {
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
export const apiGetDetailPlaylist = async (pid) => {
  try {
    const response = await axiosConfig({
      url: `/detailplaylist`,
      method: "get",
      params: { id: pid },
    });

    return response;
  } catch (error) {
    console.error(error.response.data);
  }
};
