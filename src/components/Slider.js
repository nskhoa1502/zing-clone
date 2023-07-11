import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArrSlider } from "../utils/helpers";
import * as actions from "../redux/actions";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const { banner } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(banner);

  useEffect(() => {
    const sliderEls = document.getElementsByClassName("slider-item");

    let min = 0;
    let max = 2;
    const intervalId = setInterval(() => {
      const list = getArrSlider(min, max, sliderEls.length - 1);
      for (let i = 0; i < sliderEls.length; i++) {
        // Delete classname (css)
        sliderEls[i]?.classList?.remove(
          "animate-slide-right",
          "order-last",
          "z-20"
        );
        sliderEls[i]?.classList?.remove(
          "animate-slide-left",
          "order-first",
          "z-10"
        );
        sliderEls[i]?.classList?.remove(
          "animate-slide-left2",
          "order-2",
          "z-10"
        );

        if (list.some((item) => item === i)) {
          sliderEls[i].style.cssText = `display: block`;
        } else {
          sliderEls[i].style.cssText = `display: none`;
        }
      }

      list.forEach((item) => {
        if (item === max) {
          sliderEls[item]?.classList?.add(
            "animate-slide-right",
            "order-last",
            "z-20"
          );
        } else if (item === min) {
          sliderEls[item]?.classList?.add(
            "animate-slide-left",
            "order-first",
            "z-10"
          );
        } else {
          sliderEls[item]?.classList?.add(
            "animate-slide-left2",
            "order-2",
            "z-10"
          );
        }
      });
      // sliderEls[max].classList.add("animate-slide-right");
      min = min === sliderEls?.length - 1 ? 0 : min + 1;
      max = max === sliderEls?.length - 1 ? 0 : max + 1;
    }, 3000);

    return () => {
      intervalId && clearInterval(intervalId);
    };
  }, []);

  const handleClickBanner = (item) => {
    // console.log(item.encodeId);
    if (item?.type === 1) {
      dispatch(actions.setCurrentSongId(item?.encodeId));
      dispatch(actions.play(true));
    } else if (item?.type === 4) {
      console.log(item);
      const albumPath = item?.link.split(".")[0];
      console.log(albumPath);
      navigate(albumPath);
    }
  };

  return (
    <div className="  w-full overflow-hidden  px-[59px]">
      <div className="flex gap-6">
        {banner?.map((item, index) => (
          <img
            key={item?.encodeId}
            src={item?.banner}
            onClick={() => handleClickBanner(item)}
            className={`flex-1 object-contain w-[30%] cursor-pointer rounded-lg slider-item ${
              index <= 2 ? "block" : "hidden"
            }`}
            alt="banner"
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
