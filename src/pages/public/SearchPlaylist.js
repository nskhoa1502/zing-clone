import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiGetArtist } from "../../apis";
import { Section } from "../../components";

const SearchPlaylist = () => {
  const { searchData } = useSelector((state) => state.music);
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const fetchArtistPlaylists = async () => {
      try {
        const res = await apiGetArtist(searchData?.top?.alias);
        console.log(res?.data);
        if (res.data?.err === 0) {
          setPlaylists(res?.data?.data?.sections[1]);
        }
      } catch (error) {
        console.error(error?.response?.data);
      }
    };
    fetchArtistPlaylists();
  }, []);
  return (
    <div className="w-full flex-col flex gap-8  px-[60px]">
      <h3 className="w-[50%] flex-none font-bold text-lg ">Playlist/Album</h3>
      <Section isSearch editorTheme={playlists} number={100} hideTitle />
    </div>
  );
};

export default SearchPlaylist;
