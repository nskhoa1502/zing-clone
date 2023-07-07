import React from "react";
import icons from "../utils/icons";

const { AiOutlineSearch } = icons;
const Search = () => {
  return (
    <div className="w-full flex ">
      <span className="h-10 pl-4 flex items-center justify-center rounded-l-[20px] bg-[#dde4e4] text-gray-500 ">
        <AiOutlineSearch size={24} />
      </span>
      <input
        type="text"
        className="outline-none bg-[#dde4e4] py-2 px-4 rounded-r-[20px] h-10 w-full text-gray-500 placeholder:italic"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
      />
    </div>
  );
};

export default Search;
