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
export const error = (errData) => ({
  type: actionTypes.ERROR,
  errData,
});

export const playAlbum = (flag) => ({
  type: actionTypes.SET_ALBUM,
  flag,
});
export const setPlaylist = (songs) => ({
  type: actionTypes.PLAYLIST,
  songs,
});

export const loading = (flag) => ({
  type: actionTypes.LOADING,
  flag,
});

// export const fetchDetailPlaylist = (pid) => async (dispatch) => {
//   try {
//     const response = await apis.apiGetDetailPlaylist(pid);
//     if (response?.data.err === 0) {
//       dispatch({
//         type: actionTypes.PLAYLIST,
//         songs: response?.data?.data?.song?.items,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: actionTypes.PLAYLIST,
//       songs: null,
//     });
//   }
// };
