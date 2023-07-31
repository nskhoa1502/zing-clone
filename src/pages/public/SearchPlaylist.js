import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { apiGetArtist } from "../../apis";

const SearchPlaylist = () => {
  const { searchData } = useSelector((state) => state.music);
  useEffect(() => {
    const fetchArtistPlaylists = async () => {
      try {
        const res = await apiGetArtist(searchData?.top?.alias);
        console.log(res?.data);
      } catch (error) {
        console.error(error?.response?.data);
      }
    };
    fetchArtistPlaylists();
  }, []);
  return <div>SearchPlaylist</div>;
};

export default SearchPlaylist;
