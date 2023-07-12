import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header, Player, SidebarLeft, SidebarRight } from "../../components";
import Scrollbars from "react-custom-scrollbars-2";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";

const Public = () => {
  const [isShowRightBar, setIsShowRightBar] = useState(true);
  const { currentSongId } = useSelector((state) => state.music);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCurrentSongId(null));
    console.log(currentSongId);
  }, []);
  // console.log(currentSongId);
  return (
    <div className="w-full relative flex flex-col bg-main-300 h-screen overflow-y-hidden ">
      <div className="flex w-full h-full flex-auto">
        <div className="w-[240px] h-full flex-none border  border-blue-500">
          <SidebarLeft />
        </div>
        <div className="flex-auto border border-red-500 ">
          <div className="h-[70px] px-[59px] flex items-center  ">
            <Header />
          </div>
          {/* <Scrollbars style={{ width: "100%", height: "100%" }}> */}
          <Outlet />
          <div className="w-full h-[100px]"></div>
          {/* </Scrollbars> */}
          {/* <div className="w-full h-[500px]"></div> */}
        </div>
        {isShowRightBar && (
          <div className="w-[329px] flex-none border border-green-500 hidden 1600:flex animate-slide-left">
            <SidebarRight />
          </div>
        )}
      </div>
      {currentSongId && (
        <div className="fixed bottom-0 left-0 right-0 h-[90px] ">
          <Player setIsShowRightBar={setIsShowRightBar} />
        </div>
      )}
    </div>
  );
};

export default Public;
