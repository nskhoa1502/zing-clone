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
      <div className="flex items-center px-[59px] w-full mt-12">
        {weekChart?.items?.map((item) => (
          <Link
            className="flex-1 px-4"
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
