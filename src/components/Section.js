import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SectionItem from "./SectionItem";

const Section = ({ editorTheme, title }) => {
  const navigate = useNavigate();

  // console.log(editorTheme);

  const handleThemeClick = (item, flag) => {
    const albumPath = item?.link.split(".")[0];
    navigate(albumPath);
    // console.log(albumPath);
  };
  return (
    <div className="mt-[48px] px-[59px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-bold">{editorTheme?.title}</h3>
        <span className="text-xs">TẤT CẢ</span>
      </div>
      <div className="flex items-start justify-between flex-wrap">
        {editorTheme &&
          editorTheme?.items?.length > 0 &&
          editorTheme?.items
            ?.slice(0, 5)
            .map((item, index) => (
              <SectionItem
                key={index}
                item={item}
                handleThemeClick={handleThemeClick}
              />
            ))}
      </div>
    </div>
  );
};

export default memo(Section);
