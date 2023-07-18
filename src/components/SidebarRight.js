import React, { useEffect, useState } from "react";
import icons from "../utils/icons";
import { useSelector } from "react-redux";
import { SongItem } from "./";
import { apiGetDetailPlaylist } from "../apis";
import Scrollbars from "react-custom-scrollbars-2";

const { RiDeleteBin6Line } = icons;

const SidebarRight = () => {
  const [isRecent, setIsRecent] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const { currentSongData, currentSongId, currentAlbumId, isPlaying } =
    useSelector((state) => state.music);
  console.log(currentAlbumId);
  console.log(playlist);

  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apiGetDetailPlaylist(currentAlbumId);
      console.log(response.data);
      if (response?.data?.err === 0) {
        setPlaylist(response?.data?.data?.song?.items);
      }
    };

    if (currentAlbumId && isPlaying) fetchDetailPlaylist();
  }, [currentAlbumId, isPlaying]);

  return (
    <div className="flex flex-col text-xs w-full ">
      <div className="h-[70px] flex-none py-[14px] px-2 flex items-center  w-full justify-between gap-8">
        <div className="flex flex-auto justify-center bg-main-200 rounded-l-full rounded-r-full py-[6px] px-[6px] cursor-pointer">
          <span
            onClick={() => setIsRecent(false)}
            className={`py-[5px] flex-1 ${
              !isRecent && "bg-main-100"
            }  flex justify-center rounded-l-full rounded-r-full items-center`}
          >
            Danh sách phát
          </span>
          <span
            onClick={() => setIsRecent(true)}
            className={`py-[5px] flex-1 ${
              isRecent && "bg-main-100"
            }  flex justify-center rounded-l-full rounded-r-full items-center`}
          >
            Nghe gần đây
          </span>
        </div>
        <span className="p-2 cursor-pointer rounded-full hover:bg-main-100">
          <RiDeleteBin6Line size={16} />
        </span>
      </div>
      <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
        <div className="w-full flex-col flex px-2 gap-2">
          {currentSongId && (
            <SongItem
              thumbnail={currentSongData?.thumbnail}
              title={currentSongData?.title}
              artists={currentSongData?.artistsNames}
              sid={currentSongData?.encodeId}
              sm
              style={`bg-main-500 text-white`}
            />
          )}
          {!currentSongId && (
            <span className="text-sm opacity-70 text-center">
              Chưa có bài hát nào được chọn
            </span>
          )}

          {playlist && (
            <>
              <div className="flex flex-col flex-auto text-black pt-[15px] px-2 pb-[5px]">
                <span className="text-black text-sm font-bold">Tiếp theo</span>
                <span className="opacity-70 text-xs flex gap-1">
                  <span>Từ playlist</span>
                  <span className="font-semibold text-main-500">
                    {currentSongData?.album?.title?.length < 30
                      ? currentSongData?.album?.title
                      : `${currentSongData?.album?.title?.slice(0, 30)}...`}
                  </span>
                </span>
              </div>
            </>
          )}
          {!playlist && (
            <span className="font-semibold text-main-500 ">ALBUM</span>
          )}
          <div className="flex flex-col justify-start">
            {/* <div className="h- bg-main-500">a</div> */}
            {playlist &&
              playlist?.map((item) => (
                <SongItem
                  thumbnail={item?.thumbnail}
                  title={item?.title}
                  artists={item?.artistsNames}
                  sid={item?.encodeId}
                  key={item?.encodeId}
                  sm
                  // style={`bg-main-500 text-white`}
                />
              ))}
            {!playlist && (
              <span className="text-sm  opacity-70 text-center">
                Chưa có album nào được chọn
              </span>
            )}
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default SidebarRight;
