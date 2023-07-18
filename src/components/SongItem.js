import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";
import * as actions from "../redux/actions";
import { useDispatch } from "react-redux";

const SongItem = ({
  thumbnail,
  title,
  artists,
  sid,
  releaseDate,
  order,
  percent,
  style,
  sm,
}) => {
  const dispatch = useDispatch();
  // console.log(style);
  return (
    <div
      onClick={() => {
        dispatch(actions.setCurrentSongId(sid));
        dispatch(actions.play(true));
      }}
      className={`w-full flex gap-[10px] flex-none justify-between items-center  p-[10px] rounded-md cursor-pointer ${
        style || "text-black hover:bg-main-200"
      }`}
    >
      <div className="flex gap-4 ">
        {order && (
          <span
            className={`flex items-center text-[32px] text-lg   text-[rgba(77,34,104,0.9)] dr  ${
              order === 1
                ? " text-shadow-no1"
                : order === 2
                ? "text-shadow-no2"
                : "text-shadow-no3"
            } `}
          >
            {order}
          </span>
        )}
        <img
          src={thumbnail}
          alt="thumbnail"
          className={`${
            sm ? "w-[40px] h-[40px]" : "w-[60px] h-[60px]"
          } object-cover rounded-md`}
        />
        <div className="flex flex-col justify-center">
          <span className="text-sm font-semibold">
            {title?.length < 30 ? title : `${title?.slice(0, 30)}...`}
          </span>
          <span className="text-xs opacity-70">
            {artists?.length < 30 ? artists : `${artists?.slice(0, 30)}...`}
          </span>
          {releaseDate && (
            <span className={`text-xs text-gray-600`}>
              {moment(releaseDate * 1000).fromNow()}
            </span>
          )}
        </div>
      </div>
      {percent && <span className="font-bold">{`${percent}%`}</span>}
    </div>
  );
};

export default memo(SongItem);
