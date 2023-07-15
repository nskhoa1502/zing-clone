import React from "react";
import { Header, Section, Slider } from "../../components";
import * as apis from "../../apis";
import { useSelector } from "react-redux";

const Home = () => {
  const { editorTheme, editorTheme2, editorTheme3, editorTheme4 } = useSelector(
    (state) => state.app
  );

  return (
    <div className="overflow-y-auto w-full">
      <Slider />
      <Section editorTheme={editorTheme} />
      <Section editorTheme={editorTheme2} />
      <Section editorTheme={editorTheme3} />
      <Section editorTheme={editorTheme4} />
    </div>
  );
};

export default Home;
