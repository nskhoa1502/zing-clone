import React, { useEffect, useState } from "react";
import icons from "../utils/icons";
import { apiSearch } from "../apis";
import * as actions from "../redux/actions";
import { createSearchParams, useNavigate } from "react-router-dom";
import path from "../utils/path";
import { useDispatch } from "react-redux";

const { AiOutlineSearch } = icons;
const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    if (e.keyCode === 13) {
      dispatch(actions.search(keyword));
      navigate({
        pathname: `/${path.SEARCH}/${path.ALL}`,
        search: createSearchParams({
          q: keyword,
        }).toString(),
      });
    }
  };

  return (
    <div className="w-full flex ">
      <span className="h-10 pl-4 flex items-center justify-center rounded-l-[20px] bg-[#dde4e4] text-gray-500 ">
        <AiOutlineSearch size={24} />
      </span>
      <input
        type="text"
        className="outline-none bg-[#dde4e4] py-2 px-4 rounded-r-[20px] h-10 w-full text-gray-500 placeholder:italic"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
        onChange={(e) => setKeyword(e.target.value)}
        onKeyUp={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default Search;
