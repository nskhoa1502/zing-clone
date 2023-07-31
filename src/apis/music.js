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
export const apiSearch = async (keyword) => {
  try {
    const response = await axiosConfig({
      url: `/search`,
      method: "get",
      params: { keyword },
    });

    return response;
  } catch (error) {
    console.error(error.response.data);
  }
};
export const apiGetArtistSongs = async (singerId) => {
  try {
    const response = await axiosConfig({
      url: `/artistsong`,
      method: "get",
      params: {
        id: singerId,
        page: 1,
        count: 50,
      },
    });

    return response;
  } catch (error) {
    console.error(error.response.data);
  }
};
export const apiGetArtist = async (alias) => {
  try {
    const response = await axiosConfig({
      url: `/artist`,
      method: "get",
      params: {
        name: alias,
      },
    });

    return response;
  } catch (error) {
    console.error(error.response.data);
  }
};
