import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const RankNewSongs = () => {
  const { rankNewSongs } = useSelector((state) => state.app);
  console.log(rankNewSongs);
  return (
    <div className=" mt-8 mx-[-8px]">
      {rankNewSongs?.items?.length > 0 && (
        <Slider {...settings}>
          {rankNewSongs?.items?.map((item, index) => (
            <div className=" ">
              <div
                className="flex gap-3 mx-[8px] bg-main-200 p-4 "
                key={item?.encodeId}
              >
                <img
                  src={item?.thumbnail}
                  alt="thumbnail"
                  className="h-[120px] w-[120px] object-contain"
                />
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
