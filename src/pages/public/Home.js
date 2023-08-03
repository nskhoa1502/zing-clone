import React from "react";
import {
  ChartSection,
  Header,
  NewReleases,
  RankNewSongs,
  Section,
  Slider,
} from "../../components";
import * as apis from "../../apis";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const {
    editorTheme,
    editorTheme2,
    editorTheme3,
    editorTheme4,
    artistTheme,
    h100,
    hAlbum,
    weekChart,
  } = useSelector((state) => state.app);
  // console.log(weekChart);

  return (
    <div className="overflow-y-auto w-full">
      <div className="w-full h-[70px]"></div>
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col px-[60px]">
          <p className="text-[32px] text-red-500">
            Trang web này được thực hiện để phục vụ cho mục đích học tập, không
            có mục đích thương mại.
          </p>
          <p className="text-[32px] text-blue-500">
            Do server cần thời gian khởi động, xin hãy khởi động lại sau ít
            giây.
          </p>
        </div>
      </div>
      <Slider />
      <NewReleases />
      <Section editorTheme={editorTheme} />
      <Section editorTheme={editorTheme2} />
      <Section editorTheme={editorTheme3} />
      <Section editorTheme={editorTheme4} />
      <Section editorTheme={artistTheme} />
      <div className="px-[59px] w-full">
        <RankNewSongs />
      </div>
      <ChartSection />
      <div className="flex items-center px-[59px] gap-5  w-full mt-12">
        {weekChart?.items?.map((item) => (
          <Link
            className="flex-1 "
            key={item?.link}
            to={item?.link?.split(".")[0]}
          >
            <img
              src={item?.cover}
              alt="cover"
              className="w-full object-cover rounded-md"
            />
          </Link>
        ))}
      </div>
      <Section editorTheme={h100} title />
      <Section editorTheme={hAlbum} title />
    </div>
  );
};

export default Home;
