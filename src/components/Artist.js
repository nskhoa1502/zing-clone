import React, { useState } from "react";
import { handleFollowerNumber } from "../utils/helpers";
import icons from "../utils/icons";
import { Link } from "react-router-dom";

const { AiOutlineUserAdd } = icons;
const Artist = ({ image, title, follower, link }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div className="w-1/5 flex flex-col gap-[15px]">
      <Link
        className="relative overflow-hidden rounded-full cursor-pointer"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        to={link}
      >
        <img
          src={image}
          alt="singer"
          className={`w-full  object-contain rounded-full ${
            isHover ? "animate-scale-up-center" : "animate-scale-down-center"
          }`}
        />
        {isHover && (
          <div
            className={`absolute top-0 bottom-0 right-0 left-0 bg-overlay-30 rounded-full ${
              isHover ? "animate-scale-up-center" : "animate-scale-down-center"
            }`}
          ></div>
        )}{" "}
        {/* <div className="absolute top-0 bottom-0 right-0 left-0 bg-overlay-30 rounded-full"></div> */}
      </Link>
      <div className="flex flex-col items-center gap-1">
        <Link
          to={link}
          className="text-sm font-medium hover:underline hover:text-main-500 cursor-pointer"
        >
          {title}
        </Link>
        <span className="text-xs opacity-70">{`${handleFollowerNumber(
          follower
        )} quan tâm`}</span>
        <button
          type="button"
          className="px-4 py-1 rounded-l-full rounded-r-full text-sm flex items-center justify-center gap-1 bg-main-500 text-white"
        >
          <span>
            <AiOutlineUserAdd />
          </span>
          <span className="text-sm opacity-70">QUAN TÂM</span>
        </button>
      </div>
    </div>
  );
};

export default Artist;
