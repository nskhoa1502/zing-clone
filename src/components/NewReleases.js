import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SongItem } from "./";

const NewReleases = () => {
  const { newReleases } = useSelector((state) => state.app);
  const [isActive, setIsActive] = useState(0);
  const [songs, setSongs] = useState([]);
  //   console.log(songs);

  useEffect(() => {
    if (isActive === 0) {
      setSongs(newReleases?.items?.all);
    } else if (isActive === 1) {
      setSongs(newReleases?.items?.vPop);
    } else {
      setSongs(newReleases?.items?.others);
    }
  }, [isActive, JSON.stringify(newReleases)]);
  return (
    <div className="mt-[48px] px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-bold">{newReleases?.title}</h3>
        <span className="text-xs">TẤT CẢ</span>
      </div>
      <div className="flex items-center gap-5 text-xs">
        <button
          onClick={() => setIsActive(0)}
          type="button"
          className={`py-1 px-4 rounded-l-full rounded-r-full border-gray-400 border  ${
            isActive === 0 && "bg-main-500 text-white"
          }`}
        >
          TẤT CẢ
        </button>
        <button
          onClick={() => setIsActive(1)}
          type="button"
          className={`py-1 px-4 rounded-l-full rounded-r-full border-gray-400 border  ${
            isActive === 1 && "bg-main-500 text-white"
          }`}
        >
          VIỆT NAM
        </button>
        <button
          onClick={() => setIsActive(2)}
          type="button"
          className={`py-1 px-4 rounded-l-full rounded-r-full border-gray-400 border  ${
            isActive === 2 && "bg-main-500 text-white"
          }`}
        >
          QUỐC TẾ
        </button>
      </div>
      <div className="flex flex-wrap w-full ">
        {songs?.length > 0 &&
          songs?.map((item) => (
            <div key={item?.encodeId} className="w-1/2 lg:w-1/3">
              <SongItem
                thumbnail={item?.thumbnail}
                title={item?.title}
                artists={item?.artistsNames}
                releaseDate={item?.releaseDate}
                sid={item?.encodeId}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewReleases;
