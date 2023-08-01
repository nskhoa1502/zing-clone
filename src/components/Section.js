import React, { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SectionItem from "./SectionItem";

const Section = ({ editorTheme, number, isSearch }) => {
  const navigate = useNavigate();
  const { singer } = useParams();

  // console.log(editorTheme);

  const handleThemeClick = (item, flag) => {
    const albumPath = item?.link.split(".")[0];
    navigate(albumPath);
    // console.log(albumPath);
  };
  return (
    <div
      className={`${!isSearch && "mt-[48px] px-[59px]"}  flex flex-col gap-5`}
    >
      <div className="flex items-center justify-between">
        {(!isSearch || singer) && (
          <>
            <h3 className="text-[20px] font-bold">{editorTheme?.title}</h3>
            <span className="text-xs">TẤT CẢ</span>
          </>
        )}
      </div>
      <div
        className={`flex items-start ${
          isSearch || singer ? "justify-start gap-4" : "justify-between"
        }  flex-wrap`}
      >
        {editorTheme &&
          editorTheme?.items?.length > 0 &&
          editorTheme?.items
            ?.slice(0, number ? number : 5)
            .map((item, index) => (
              <SectionItem
                key={index}
                item={item}
                handleThemeClick={handleThemeClick}
                isSearch
              />
            ))}
      </div>
    </div>
  );
};

export default memo(Section);
