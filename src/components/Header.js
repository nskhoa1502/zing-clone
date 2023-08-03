import React from "react";
import icons from "../utils/icons";
import Search from "./Search";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const { HiArrowLeft, HiArrowRight } = icons;

const Header = () => {
  const { singer } = useParams();
  const { scrollTop } = useSelector((state) => state.app);
  const navigate = useNavigate();
  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex gap-6 w-full items-center">
        <div
          className={`flex gap-4 ${
            scrollTop && singer ? "text-gray-200" : "text-gray-400"
          } `}
        >
          <span className="cursor-pointer" onClick={() => navigate(-1)}>
            <HiArrowLeft size={24} />
          </span>
          <span className="cursor-pointer" onClick={() => navigate(+1)}>
            <HiArrowRight size={24} />
          </span>
        </div>
        <div className="w-1/2">
          <Search />
        </div>
      </div>
      <div
        className={`${scrollTop && singer ? "text-gray-200" : "text-gray-400"}`}
      >
        Login
      </div>
    </div>
  );
};

export default Header;
