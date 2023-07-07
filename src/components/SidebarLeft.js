import React from "react";
import logo from "../assets/logo.svg";
import { sidebarMenu } from "../utils/constant";
import { NavLink } from "react-router-dom";

const notActiveStyle =
  "py-2 px-[25px] font-bold flex gap-[12px] text-[13px] items-center text-[#32323d]";
const activeStyle =
  "py-2 px-[25px] font-bold flex gap-[12px] text-[13px] items-center text-[#0F7070]";

const SidebarLeft = () => {
  return (
    <div className="flex flex-col bg-[#dde4e4]">
      <div className="w-full h-[70px] py-[15px] px-[25px] flex justify-start items-center">
        <img src={logo} alt="logo" className="w-[120px] h-10" />
      </div>
      <div className="flex flex-col">
        {sidebarMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item?.end}
            className={({ isActive }) =>
              isActive ? activeStyle : notActiveStyle
            }
          >
            {item.icons}
            <span>{item.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;
