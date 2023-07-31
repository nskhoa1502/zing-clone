import React from "react";
import { useSelector } from "react-redux";
import { handleFollowerNumber } from "../../utils/helpers";
import {
  ListSong,
  SongItem,
  Section,
  SectionItem,
  Artist,
} from "../../components";
import { useNavigate } from "react-router-dom";
const SearchAll = () => {
  const { searchData } = useSelector((state) => state.music);
  const navigate = useNavigate();

  console.log(searchData);

  const handleThemeClick = (item, flag) => {
    const albumPath = item?.link.split(".")[0];
    navigate(albumPath);
    // console.log(albumPath);
  };
  return (
    <div className="w-full flex flex-col px-[60px] gap-[60px]">
      <div className="flex flex-col ">
        <h3 className="text-lg font-bold mb-5 ">Nổi bật</h3>
        <div className="flex gap-8">
          {searchData?.top && (
            <div className="flex  flex-1 gap-8 p-[10px] bg-main-200 rounded-md  items-center  cursor-pointer">
              <img
                src={searchData?.top?.thumbnail}
                alt="avatar"
                className={`w-[84px] h-[84px] object-cover ${
                  searchData?.top?.objectType === "artist" && "rounded-full"
                }`}
              />
              <div className="flex flex-col text-xs ">
                <span className="mb-[6px]">
                  {searchData?.top?.objectType === "artist" ? "Nghệ sĩ" : ""}
                </span>
                <span className="text-sm font-semibold">
                  {searchData?.top?.title || searchData?.top?.name}
                </span>
                {searchData?.top.objectType === "artist" && (
                  <span>
                    {handleFollowerNumber(searchData?.artists[0]?.totalFollow) +
                      " quan tâm"}
                  </span>
                )}
              </div>
            </div>
          )}
          {searchData?.songs
            ?.filter((item, index) =>
              [...Array(2).keys()].some((i) => i === index)
            )
            ?.map((item) => (
              <div key={item?.encodeId} className="flex-1">
                <SongItem
                  thumbnail={item?.thumbnail}
                  sid={item?.encodeId}
                  title={item?.title}
                  artists={item?.artistsNames}
                  size={`w-[84px] h-[84px]`}
                  style={`bg-main-200`}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold mb-5">Bài hát</h3>
        <div className="flex ">
          <div className="flex justify-between flex-wrap w-full ">
            {searchData?.songs?.map((item, index) => (
              <div
                className={` ${
                  index % 2 === 0 ? "pr-5" : "pl-5"
                } w-[45%] flex-auto`}
                key={item?.encodeId}
              >
                <ListSong songData={item} isHideAlbum />
              </div>
            ))}
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold mb-5 ">PLAYLIST/ALBUM</h3>
        <div className="flex items-start justify-between flex-wrap">
          {searchData?.playlists?.slice(0, 5)?.map((item) => (
            <SectionItem
              key={item?.encodeId}
              item={item}
              handleThemeClick={handleThemeClick}
            />
          ))}
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-bold mb-5 ">NGHỆ SĨ/OA</h3>
        <div className="flex items-start  gap-[20px]">
          {searchData?.artists?.slice(0, 5)?.map((item) => (
            <Artist
              key={item?.id}
              title={item?.name}
              image={item?.thumbnailM}
              follower={item?.totalFollow}
              link={item?.link}
            />
          ))}
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default SearchAll;
