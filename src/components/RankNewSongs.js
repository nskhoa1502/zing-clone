import moment from "moment";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import icons from "../utils/icons";
import * as actions from "../redux/actions";

const { BsFillPlayFill } = icons;

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const RankNewSongs = () => {
  const { rankNewSongs } = useSelector((state) => state.app);
  const [hoverIndex, setHoverIndex] = useState(null);
  const dispatch = useDispatch();
  const imageRef = useRef();
  return (
    <div className=" mt-8 mx-[-8px] flex flex-col gap-5">
      <h3 className="text-[20px] pl-2 font-bold">BXH NHẠC MỚI</h3>
      {rankNewSongs?.items?.length > 0 && (
        <Slider {...settings}>
          {rankNewSongs?.items?.map((item, index) => (
            <div key={item?.encodeId}>
              <div className="flex gap-3 mx-[8px] bg-main-200 p-4 ">
                <div
                  className="relative cursor-pointer overflow-hidden rounded-md"
                  onClick={() => {
                    dispatch(actions.setCurrentSongId(item?.encodeId));
                    dispatch(actions.play(true));
                  }}
                  onMouseOver={(e) => {
                    e.stopPropagation();
                    setHoverIndex(index);
                    imageRef.current.classList.add("animate-scale-up-center");
                    imageRef.current.classList.remove(
                      "animate-scale-down-center"
                    );
                  }}
                  onMouseLeave={(e) => {
                    e.stopPropagation();
                    setHoverIndex(null);
                    imageRef.current.classList.add("animate-scale-down-center");
                    imageRef.current.classList.remove(
                      "animate-scale-up-center"
                    );
                  }}
                >
                  {hoverIndex === index && (
                    <div
                      className={`absolute top-0 left-0 right-0 bottom-0 hover:bg-overlay-30 flex items-center justify-center rounded-md `}
                    >
                      <span className="p-3">
                        <BsFillPlayFill size={30} color="white" />
                      </span>
                    </div>
                  )}
                  <img
                    ref={imageRef}
                    src={item?.thumbnail}
                    alt="thumbnail"
                    className="h-[120px] w-[120px] object-contain "
                  />
                </div>
                <div className="flex flex-col flex-1 justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{item?.title}</span>
                    <span className="text-xs ">{item?.artistsNames}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span
                      className="text-5xl font-bold "
                      style={{
                        WebkitTextFillColor: "transparent",
                        WebkitTextStrokeColor: "gray",
                        WebkitTextStrokeWidth: "1px",
                      }}
                    >
                      #{index + 1}
                    </span>
                    <span>
                      {moment.unix(item?.releaseDate).format("DD/MM/YYYY")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default RankNewSongs;
