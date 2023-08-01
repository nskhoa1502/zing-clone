import React, { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";
import { NavLink } from "react-router-dom";
import { searchMenu } from "../../utils/constant";
import { useSelector } from "react-redux";

const notActieStyle =
  "px-4 hover:text-main-500 font-semibold cursor-pointer  flex items-center justify-center";
const activeStyle =
  "px-4 hover:text-main-500 font-semibold cursor-pointer border-b-4 border-green-500 h-[58px] flex items-center justify-center  text-main-500";

const Search = () => {
  const [searchParams] = useSearchParams();
  const { keyword } = useSelector((state) => state.music);
  console.log(keyword);
  // console.log(searchParams.entries());

  return (
    <div className="w-full">
      <div className="w-full h-[70px]"></div>
      <div className="flex h-[50px] mb-7 items-center text-sm border-b border-gray-400 pb-1 pl-[60px]">
        <span className="text-[24px] font-bold pr-6 border-r border-gray-400">
          Kết quả tìm kiếm
        </span>
        <div className="flex items-center">
          {searchMenu.map((item) => (
            <NavLink
              key={item.path}
              to={`${item.path}?q=${keyword?.replace(" ", "+")}`}
              className={({ isActive }) =>
                isActive ? activeStyle : notActieStyle
              }
            >
              {item?.text}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
      <div className="w-full h-[200px]"></div>
    </div>
  );
};

export default Search;
