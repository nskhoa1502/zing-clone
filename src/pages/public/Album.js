import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment/moment";
import { ListSongs, AudioLoading } from "../../components";
import Scrollbars from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import icons from "../../utils/icons";

const { BsFillPlayFill } = icons;

const Album = () => {
  const { title, pid } = useParams();
  const [playlistData, setPlaylistData] = useState(null);
  const dispatch = useDispatch();
  const { currentSongId, isPlaying, songs } = useSelector(
    (state) => state.music
  );
  const { isLoading } = useSelector((state) => state.app);
  // console.log(isPlaying);

  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      dispatch(actions.loading(true));
      const response = await apis.apiGetDetailPlaylist(pid);
      dispatch(actions.loading(false));
      console.log(isLoading);
      // console.log(response?.data.data);
      if (response?.data.err === 0) {
        setPlaylistData(response?.data?.data);
        dispatch(actions.setPlaylist(response?.data?.data?.song?.items));
      }
    };
    fetchDetailPlaylist(pid);
  }, [pid]);
  return (
    <div className="flex gap-8 w-full h-full px-[59px] animate-scale-up-center">
      <div className="flex-none w-1/3 border border-red-500 flex flex-col items-center gap-3">
        <div className="w-full relative overflow-hidden">
          <img
            src={playlistData?.thumbnailM}
            alt="thumbnail"
            className={`w-full object-contain shadow-md ${
              isPlaying
                ? "rounded-full animate-rotate-center"
                : "rounded-md animate-rotate-center-pause"
            }`}
          />
          <div
            className={`absolute top-0 left-0 right-0 bottom-0  hover:bg-overlay-30 flex items-center justify-center ${
              isPlaying && "rounded-full bg-overlay-30"
            }`}
          >
            <span className="p-3 border border-white rounded-full">
              {isPlaying ? (
                <AudioLoading />
              ) : (
                <BsFillPlayFill size={30} color="white" />
              )}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center ">
          <h3 className="text-[20px] font-bold text-gray-800">
            {playlistData?.title}
          </h3>
          <span className="flex gap-2 items-center text-gray-500 text-xs">
            <span>Cập nhật:</span>
            <span>
              {moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YYY")}
            </span>
          </span>
          <span className="flex justify-center text-gray-500 text-xs">
            {playlistData?.artistsNames}
          </span>
          <span className="flex justify-center text-gray-500 text-xs">{`${Math.round(
            playlistData?.like / 1000
          )}K người yêu thích`}</span>
        </div>
      </div>
      <Scrollbars style={{ width: "100%", height: "85%" }}>
        <div className="flex-auto  ">
          <span className="text-sm">
            <span className="text-gray-500">Lời tựa </span>
            <span>{playlistData?.sortDescription}</span>
          </span>
          <div>
            <ListSongs
              songs={playlistData?.song.items}
              totalDuration={playlistData?.song?.totalDuration}
            />
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};

export default Album;
