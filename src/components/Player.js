import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../utils/icons";
import * as actions from "../redux/actions";
import moment from "moment";
import { toast } from "react-toastify";

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
  BsRepeat1,
} = icons;

const Player = () => {
  const [audio, setAudio] = useState(new Audio());
  const { currentSongId, isPlaying, error, songs } = useSelector(
    (state) => state.music
  );

  // console.log(isPlaying);
  const [songInfo, setSongInfo] = useState(null);
  const thumbRef = useRef();
  const trackRef = useRef();
  const dispatch = useDispatch();
  const [currentSecond, setCurrentSecond] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);

  useEffect(() => {
    const fetchDetailSong = async () => {
      // setCurrentSecond(0); // Reset currentSecond
      // thumbRef.current.style.cssText = `right: 100%`; // Reset thumbRef position

      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(currentSongId),
        apis.apiGetSong(currentSongId),
      ]);

      try {
        if (res1?.data.err === 0) {
          setSongInfo(res1?.data?.data);
          // console.log(res1?.data?.data);
        }

        if (res2?.data.err === 0) {
          // audio.pause();

          setAudio(new Audio(`${res2?.data?.data["128"]}`));

          dispatch(actions.error(null));
          // dispatch(actions.play(true));
        }
        if (res2?.data.err !== 0) {
          audio.pause();
          setAudio(new Audio());
          dispatch(actions.play(false));
          dispatch(actions.error(res2?.data));
          if (thumbRef.current) {
            thumbRef.current.style.cssText = `right: 100%`;
          }

          toast.warn(res2?.data.msg);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetailSong();
  }, [currentSongId]);

  useEffect(() => {
    let intervalId;
    // audio.pause();

    if (isPlaying) {
      audio.load();
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
        // dispatch(actions.play(false));
      });
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
        if (thumbRef.current) {
          thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        }
        setCurrentSecond(Math.round(audio.currentTime));
        // console.log(percent);
      }, 200);
    } else {
      audio.pause();
    }

    return () => {
      clearInterval(intervalId);
      if (audio) {
        audio.pause();
        // audio.currentTime = 0;
      }
    };
  }, [audio, isPlaying]);

  useEffect(() => {
    audio.onended = () => {
      // console.log("ended");
      audio.currentTime = 0;
      setCurrentSecond(0);
      thumbRef.current.style.cssText = `right: 100%`;

      if (isShuffle) {
        handleShuffle();
      } else if (repeatMode) {
        repeatMode === 1 ? handleNextSong() : handleRepeatOne();
      } else {
        handleNextSong();
      }
    };
  }, [audio, dispatch, isShuffle, repeatMode]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(actions.play(false));
    } else {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
        dispatch(actions.play(true));
      });
      dispatch(actions.play(true));
      let percent =
        Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
      if (thumbRef.current) {
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
      }
      setCurrentSecond(Math.round(audio.currentTime));
    }
  };

  const handleClickProgress = (e) => {
    // console.log(trackRef.current.getBoundingClientRect());
    const trackRect = trackRef.current.getBoundingClientRect();
    let percent =
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) /
      100;
    // console.log(percent);
    thumbRef.current.style.cssText = `right: ${100 - percent}%`;
    audio.currentTime = (percent * songInfo.duration) / 100;
    setCurrentSecond(
      Math.round(((e.clientX - trackRect.left) * 10000) / trackRect.width) / 100
    );
  };

  const handleNextSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === currentSongId) currentSongIndex = index;
      });
      // console.log(currentSongIndex);
      if (repeatMode && currentSongIndex === +songs?.length - 1) {
        // console.log("here");
        dispatch(actions.setCurrentSongId(songs[0].encodeId));
        dispatch(actions.play(true));
      } else {
        dispatch(
          actions.setCurrentSongId(songs[currentSongIndex + 1].encodeId)
        );
        dispatch(actions.play(true));
      }
    }
  };
  const handlePrevSong = () => {
    if (songs) {
      let currentSongIndex;
      songs?.forEach((item, index) => {
        if (item.encodeId === currentSongId) currentSongIndex = index;
      });
      // console.log(currentSongIndex);
      dispatch(actions.setCurrentSongId(songs[currentSongIndex - 1].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleShuffle = () => {
    if (songs) {
      const randomIndex = Math.round(Math.random() * songs?.length) - 1;
      dispatch(actions.setCurrentSongId(songs[randomIndex].encodeId));
      dispatch(actions.play(true));
    }
  };

  const handleRepeatOne = () => {
    audio.currentTime = 0;
    setCurrentSecond(0);
    thumbRef.current.style.cssText = `right: 100%`;
    audio.play();
  };

  return (
    <div className="bg-main-400 px-5 h-full flex">
      <div className="w-[30%] flex-auto flex items-center gap-3">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-24 h-16 object-cover rounded-md"
        />

        <div className="flex flex-col">
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
        {error && <span className="text-red-500 text-md">{error?.msg}</span>}
        <div className="flex gap-8 justify-center items-center">
          <span
            className={`cursor-pointer hover:text-purple-600 ${
              isShuffle && "text-purple-600"
            }`}
            title="Bật phát ngẫu nhiên"
            onClick={() => {
              setIsShuffle((prev) => !prev);
            }}
          >
            <CiShuffle size={24} />
          </span>
          <span
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
            onClick={handlePrevSong}
          >
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
          <span
            className={`${!songs ? "text-gray-500" : "cursor-pointer"}`}
            onClick={handleNextSong}
          >
            <MdSkipNext size={24} />
          </span>
          <span
            className={`cursor-pointer ${
              repeatMode && "text-purple-600"
            } hover:text-purple-600`}
            title={
              repeatMode === 0
                ? "Bật phát lại tất cả"
                : repeatMode === 1
                ? "Bật phát lại 1 bài"
                : "Tắt bật phát lại"
            }
            onClick={() => setRepeatMode((prev) => (prev === 2 ? 0 : prev + 1))}
          >
            {repeatMode === 2 ? (
              <BsRepeat1 size={24} />
            ) : (
              <CiRepeat size={24} />
            )}
          </span>
        </div>
        {!error && (
          <>
            <div className="w-full text-sm text-center">
              <div className="w-full flex justify-center gap-2 items-center ">
                <span className="">
                  {moment.utc(currentSecond * 1000).format("mm:ss")}
                </span>
                <div
                  ref={trackRef}
                  onClick={(e) => handleClickProgress(e)}
                  className="w-3/5 h-[3px] hover:h-[8px] cursor-pointer rounded-l-full rounded-r-full relative bg-[rgba(0,0,0,0.1)]"
                >
                  <div
                    ref={thumbRef}
                    className="absolute top-0 left-0 bottom-0   rounded-l-full rounded-r-full  bg-[#0e8080]"
                  ></div>
                </div>
                <span>
                  {moment.utc(songInfo?.duration * 1000).format("mm:ss")}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-[30%] flex-auto border border-red-500">volume</div>
    </div>
  );
};

export default Player;
