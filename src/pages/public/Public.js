import React from "react";
import { Outlet } from "react-router-dom";
import { Player, SidebarLeft, SidebarRight } from "../../components";

const Public = () => {
  return (
    <div className="w-full flex flex-col bg-main-300 min-h-screen">
      <div className="flex w-full h-full flex-auto">
        <div className="w-[240px] flex-none border  border-blue-500">
          <SidebarLeft />
        </div>
        <div className="flex-auto border border-red-500">
          <Outlet />
        </div>
        <div className="w-[329px] flex-none border border-green-500 hidden 1600:flex animate-slide-left">
          <SidebarRight />
        </div>
      </div>
      <div className="flex-none h-[90px] ">
        <Player />
      </div>
    </div>
  );
};

export default Public;
