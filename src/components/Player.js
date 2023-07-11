import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../utils/icons";
import * as actions from "../redux/actions";

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
  const audioEl = useRef(new Audio());
  const { currentSongId, isPlaying, error } = useSelector(
    (state) => state.music
  );
  // console.log(currentSongId);
  const [songInfo, setSongInfo] = useState(null);
  const [source, setSource] = useState(null);
  const dispatch = useDispatch();
  // const [isPlaying, setIsPlaying] = useState(false);
  // const audioEl = new Audio();
  // console.log(isPlaying);

  // console.log(audioEl);
  // console.log(currentSongId);
  // console.log(error);

  useEffect(() => {
    const fetchDetailSong = async () => {
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(currentSongId),
        apis.apiGetSong(currentSongId),
      ]);

      try {
        if (res1?.data.err === 0) {
          setSongInfo(res1?.data?.data);
        }

        if (res2?.data.err === 0) {
          setSource(`${res2?.data?.data["128"]}`);
          dispatch(actions.error(null));

          // console.log(res2?.data?.data);
        }
        if (res2?.data.err !== 0) {
          setSource(``);
          // console.log(res2?.data);
          dispatch(actions.play(false));
          dispatch(actions.error(res2?.data));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetailSong();
  }, [currentSongId]);

  useEffect(() => {
    audioEl.current.src = source;
    if (isPlaying && source) {
      // Add a check for source
      audioEl.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        dispatch(actions.play(false));
      });
    } else {
      audioEl.current.pause();
    }
  }, [currentSongId, source, isPlaying]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audioEl.current.pause();
      dispatch(actions.play(false));
    } else if (source) {
      // Add a check for source
      audioEl.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        dispatch(actions.play(false));
      });
      dispatch(actions.play(true));
    }
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
              <BsFillPauseFill size={30} />
            ) : (
              <BsFillPlayFill size={30} />
            )}
          </span>
          <span className="cursor-pointer">
            <MdSkipNext size={24} />
          </span>
          <span className="cursor-pointer" title="Bật phát lại tất cả">
            <CiRepeat size={24} />
          </span>
        </div>
        <div className="flex flex-col">
          {error && <span className="text-red-500 text-xs">{error?.msg}</span>}
          {!error && "Progress bar"}
        </div>
      </div>
      <div className="w-[30%] flex-auto border border-red-500">volume</div>
    </div>
  );
};

export default Player;
