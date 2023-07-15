import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import * as actions from "../redux/actions";
import { useDispatch } from "react-redux";

const SongItem = ({ thumbnail, title, artists, sid, releaseDate }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch(actions.setCurrentSongId(sid));
        dispatch(actions.play(true));
      }}
      className="w-1/2 lg:w-1/3 flex gap-[10px] flex-none justify-start border border-red-500 p-[10px] items-center hover:bg-main-200 rounded-md cursor-pointer"
    >
      <img
        src={thumbnail}
        alt="thumbnail"
        className="w-[60px] h-[60px] object-cover rounded-md"
      />
      <div className="flex flex-col">
        <span className="textsm font-semibold">{title}</span>
        <span className="text-sx text-gray-600">{artists}</span>
        <span className="text-sx text-gray-600">
          {moment(releaseDate * 1000).fromNow()}
        </span>
      </div>
    </div>
  );
};

export default memo(SongItem);
