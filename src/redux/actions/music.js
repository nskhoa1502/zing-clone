import actionTypes from "./actionTypes";
import * as apis from "../../apis";

export const setCurrentSongId = (sid) => ({
  type: actionTypes.GET_CURRENT_SONG_ID,
  sid,
});
export const play = (flag) => ({
  type: actionTypes.PLAY,
  flag,
});
