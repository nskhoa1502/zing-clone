import React, { useEffect } from "react";
import { ListSongs, ListSong } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import Scrollbars from "react-custom-scrollbars-2";

const SearchSongs = () => {
  const { searchData, songs } = useSelector((state) => state.music);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getSearchSongs(searchData?.top?.id));
  }, [searchData]);
  return (
    <div className="w-full px-[60px]">
      <ListSongs isHideTime={true} songs={songs} />
    </div>
  );
};

export default SearchSongs;
