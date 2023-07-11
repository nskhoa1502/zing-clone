import React, { memo } from "react";
import { ListSong } from "./";
import icons from "../utils/icons";
import moment from "moment";

const { BsDot } = icons;

const ListSongs = ({ songs, totalDuration }) => {
  // console.log(songs, totalDuration);
  return (
    <div className="w-full flex flex-col text-xs">
      <div className="flex justify-between items-center  p-[10px] font-semibold text-gray-600">
        <span className="w-[50%] flex-none">BÀI HÁT</span>
        <span className="flex-1 flex justify-center items-center">ALBUM</span>
        <span className="flex-1 flex justify-end items-center">THỜI GIAN</span>
      </div>
      <div className="flex flex-col mb-[50px]">
        {songs?.map((item) => (
          <ListSong key={item?.encodeId} songData={item} />
        ))}
        <span className="flex items-center gap-1 py-[10px] border-t border-[rgba(0,0,0,0.05)]">
          <span>{`${songs?.length} bài hát`}</span>
          <BsDot size={24} />
          <span>{moment.utc(totalDuration * 1000).format("HH:mm:ss")}</span>
        </span>
      </div>
    </div>
  );
};

export default memo(ListSongs);
