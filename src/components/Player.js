import React from "react";
import { useSelector } from "react-redux";

const Player = () => {
  const { currentSongId } = useSelector((state) => state.music);
  console.log(currentSongId);
  return (
    <div className="bg-main-400 px-5 h-full flex ">
      <div className="w-[30$] flex-auto border border-red-500">detail</div>
      <div className="w-[40$] flex-auto border border-red-500">main player</div>
      <div className="w-[30$] flex-auto border border-red-500">volume</div>
    </div>
  );
};

export default Player;
