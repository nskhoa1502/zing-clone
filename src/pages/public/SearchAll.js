import React from "react";
import { useSelector } from "react-redux";

const SearchAll = () => {
  const { searchData } = useSelector((state) => state.music);

  console.log(searchData);
  return <div className="w-full flex flex-col"></div>;
};

export default SearchAll;
