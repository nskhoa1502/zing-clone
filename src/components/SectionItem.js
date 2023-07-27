import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import icons from "../utils/icons";

const { AiOutlineHeart, BsFillPlayFill, BsThreeDots } = icons;

const SectionItem = ({ item, handleThemeClick }) => {
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();
  const imageRef = useRef();
  //   console.log(imageRef);

  return (
    <>
      <div
        key={item?.encodeId}
        className="flex flex-col gap-3 w-[19%] text-sm h-full cursor-pointer justify-start "
        onClick={() => handleThemeClick(item, false)}
      >
        <div
          className="w-full flex items-center overflow-hidden relative rounded-md"
          onMouseOver={(e) => {
            e.stopPropagation();
            setIsHover(true);
            imageRef.current.classList.add("animate-scale-up-center");
            imageRef.current.classList.remove("animate-scale-down-center");
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setIsHover(false);
            imageRef.current.classList.add("animate-scale-down-center");
            imageRef.current.classList.remove("animate-scale-up-center");
          }}
        >
          <img
            ref={imageRef}
            src={item?.thumbnailM}
            alt="avatar"
            className="w-full object-contain "
          />
          {isHover && (
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-overlay-30 rounded-md flex items-center justify-center gap-4 text-white">
              <span>
                <AiOutlineHeart size={25} />
              </span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleThemeClick(item, true);
                }}
                className="p-1 border border-white rounded-full"
              >
                <BsFillPlayFill size={35} />
              </span>
              <span>
                <BsThreeDots size={25} />
              </span>
            </div>
          )}
        </div>
        <span className="flex flex-col">
          {!item?.title && (
            <span className="font-semibold text-gray-600">
              {item?.sortDescription?.length < 50
                ? item?.sortDescription
                : `${item?.sortDescription?.slice(0, 50)}...`}
            </span>
          )}

          {item?.title && (
            <>
              <span className="font-semibold">
                {item?.title?.length < 30
                  ? item?.title
                  : `${item?.title?.slice(0, 38)}...`}
              </span>
              <span>
                {item?.artists?.map((i) => i.name)?.join(", ").length < 40
                  ? item?.artists?.map((i) => i.name)?.join(", ")
                  : `${item?.artists
                      ?.map((i) => i.name)
                      ?.join(", ")
                      .slice(0, 40)}...`}
              </span>
            </>
          )}
        </span>
      </div>
    </>
  );
};

export default SectionItem;
