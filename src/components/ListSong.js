import React, { memo } from "react";
import icons from "../utils/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../redux/actions";

const { BsMusicNoteBeamed } = icons;

const ListSong = ({ songData }) => {
  const { songs } = useSelector((state) => state.music);
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(actions.setCurrentSongId(songData?.encodeId));
        dispatch(actions.play(true));
        dispatch(actions.playAlbum(true));
      }}
      className="flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-main-200 cursor-pointer"
    >
      <div className="flex items-center gap-3 w-[50%] flex-none">
        <span>
          <BsMusicNoteBeamed />
        </span>
        <img
          src={songData?.thumbnail}
          className="w-10 h-10 object-cover"
          alt="thumbnail"
        />
        <span className="flex flex-col">
          <span className="text-sm font-semibold">
            {songData?.title.length > 30
              ? `${songData?.title?.slice(0, 30)}...`
              : songData?.title}
          </span>
          <span className="text-[12px]">{songData?.artistsNames}</span>
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        {songData?.album?.title.length > 30
          ? `${songData?.album?.title?.slice(0, 30)}...`
          : songData?.album?.title}
      </div>
      <div className="flex-1 flex justify-end">
        {moment.utc(songData?.duration * 1000).format("mm:ss")}
      </div>
    </div>
  );
};

export default memo(ListSong);
