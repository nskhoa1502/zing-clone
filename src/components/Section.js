import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Section = ({ editorTheme, title }) => {
  const navigate = useNavigate();
  // console.log(editorTheme);

  const handleThemeClick = (item) => {
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
          editorTheme?.items?.slice(0, 5).map((item) => (
            <div
              key={item?.encodeId}
              className="flex flex-col gap-3 w-[19%] text-sm h-full cursor-pointer justify-start"
              onClick={() => handleThemeClick(item)}
            >
              <div className="w-full flex items-center ">
                <img
                  src={item?.thumbnailM}
                  alt="avatar"
                  className="w-full object-contain "
                />
              </div>
              <span className="flex flex-col">
                {!title && (
                  <span className="font-semibold text-gray-600">
                    {item?.sortDescription?.length < 50
                      ? item?.sortDescription
                      : `${item?.sortDescription?.slice(0, 50)}...`}
                  </span>
                )}

                {title && (
                  <>
                    <span className="font-semibold">
                      {item?.title?.length < 20
                        ? item?.title
                        : `${item?.title?.slice(0, 28)}...`}
                    </span>
                    <span>
                      {item?.artists?.map((i) => i.name)?.join(", ").length < 40
                        ? item?.artists?.map((i) => i.name)?.join(", ")
                        : `${item?.artists
                            ?.map((i) => i.name)
                            ?.join(", ")
                            .slice(0, 40)}...`}
                    </span>
                  </>
                )}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(Section);
