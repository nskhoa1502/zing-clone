import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../utils/icons";

const {
  AiFillHeart,
  AiOutlineHeart,
  BsThreeDots,
  MdSkipNext,
  MdSkipPrevious,
  CiRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  CiShuffle,
} = icons;

const Player = () => {
  const { currentSongId, isPlaying } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const audioEl = new Audio(
  //   "https://mp3-s1-zmp3.zmdcdn.me/203896df849c6dc2348d/1563170591010578957?authen=exp=1689236261~acl=/203896df849c6dc2348d/*~hmac=c273db5dbbe1f2c88bc4e3cf1f43f121&fs=MTY4OTA2MzQ2MTMxMnx3ZWJWNnwwfDU5LjE1My4yMjAdUngNDE"
  // );
  // console.log(isPlaying);

  // console.log(audioEl);
  // console.log(currentSongId);

  useEffect(() => {
    const fetchDetailSong = async () => {
      const response = await apis.getDetailSong(currentSongId);
      // console.log(response.data);

      if (response.data.err === 0) {
        setSongInfo(response.data.data);
      }
    };

    const fetchSong = async () => {
      const response = await apis.getSong(currentSongId);
      console.log(response.data);
    };

    fetchDetailSong();
  }, [currentSongId]);

  useEffect(() => {}, [currentSongId]);

  const handleTogglePlayMusic = (e) => {
    e.preventDefault();
    // setIsPlaying((prev) => !prev);
  };
  return (
    <div className="bg-main-400 px-5 h-full flex ">
      <div className="w-[30%] flex-auto flex items-center gap-3 ">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-24 h-16 object-cover rounded-md"
        />

        <div className="flex flex-col ">
          <span className="font-semibold text-gray-700 text-[14px]">
            {songInfo?.title}
          </span>
          <span className="text-xs text-gray-500">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex gap-3 pl-2">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className="w-[40%] flex-auto flex flex-col items-center justify-center border border-red-500 gap-2">
        <div className="flex gap-8 justify-center items-center  ">
          <span className="cursor-pointer" title="Bật phát ngẫu nhiên">
            <CiShuffle size={24} />
          </span>
          <span className="cursor-pointer">
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="p-1 border cursor-pointer border-gray-700 hover:text-main-500 rounded-full"
            onClick={handleTogglePlayMusic}
          >
            {isPlaying ? (
              <BsFillPlayFill size={30} />
            ) : (
              <BsFillPauseFill size={30} />
            )}
          </span>
          <span className="cursor-pointer">
            <MdSkipNext size={24} />
          </span>
          <span className="cursor-pointer" title="Bật phát lại tất cả">
            <CiRepeat size={24} />
          </span>
        </div>
        <div>Progress bar</div>
      </div>
      <div className="w-[30%] flex-auto border border-red-500">volume</div>
    </div>
  );
};

export default Player;
