import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetArtist } from "../../apis";
import icons from "../../utils/icons";

const { AiOutlineUserAdd, BsFillPlayFill } = icons;

const Singer = () => {
  const { singer } = useParams();
  const [artistData, setArtistData] = useState(null);
  const [isHoverPlay, setIsHoverPlay] = useState(false);

  // console.log(singer);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const res = await apiGetArtist(singer);
        if (res.data.err === 0) {
          setArtistData(res?.data?.data);
        }
        console.log(res?.data?.data);
      } catch (error) {
        console.error(error?.response?.data);
      }
    };

    singer && fetchArtistData(singer);
  }, [singer]);
  return (
    <div className="flex flex-col w-full ">
      <div className="w-full h-full relative ">
        <div className="artist-cover-top"></div>
        <img
          src={artistData?.cover}
          alt="cover"
          className="w-full object-cover h-[400px]"
        />
        <div className="artist-cover-bottom"></div>
        <div className="text-white absolute  left-0 right-0 bottom-[50px] px-[60px]">
          <div className="flex gap-8 items-center">
            <h1 className="text-[60px] font-bold ">{artistData?.name}</h1>
            <span
              onMouseLeave={() => setIsHoverPlay(false)}
              onMouseEnter={() => setIsHoverPlay(true)}
              className="relative p-2 rounded-full bg-white mt-3 text-main-500 hover:bg-white hover:text-gray-100 cursor-pointer "
            >
              <div className="w-8 h-8 "></div>
              {isHoverPlay && (
                <span className="absolute top-0 right-0 left-0 bottom-0 bg-main-500 rounded-full animate-scale-up-center-full "></span>
              )}{" "}
              <span className="absolute p-2 left-0 right-0 top-0 bottom-0">
                {" "}
                <BsFillPlayFill size={32} />
              </span>
            </span>
          </div>
          <div className="flex gap-3 items-center mt-4">
            <span className="text-sm text-gray-100">{`${Number(
              artistData?.totalFollow.toFixed(1)
            ).toLocaleString()} người quan tâm`}</span>
            <button
              type="button"
              className="px-4 py-1 rounded-l-full rounded-r-full text-sm flex items-center justify-center gap-1 bg-main-500 text-white"
            >
              <span>
                <AiOutlineUserAdd />
              </span>
              <span className="text-sm opacity-90">QUAN TÂM</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singer;
