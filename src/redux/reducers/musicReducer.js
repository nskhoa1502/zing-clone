import actionTypes from "../actions/actionTypes";

const initialState = {
  currentSongId: null,
  isPlaying: false,
  error: null,
  atAlbum: false,
  songs: null,
};

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_SONG_ID:
      return {
        ...state,
        currentSongId: action.sid || null,
      };
    case actionTypes.PLAY:
      return {
        ...state,
        isPlaying: action.flag,
      };
    case actionTypes.ERROR:
      return {
        ...state,
        error: action.errData,
      };
    case actionTypes.SET_ALBUM:
      return {
        ...state,
        atAlbum: action.flag,
      };
    case actionTypes.PLAYLIST:
      return {
        ...state,
        songs: action.songs || null,
      };
    default:
      return state;
  }
};

export default musicReducer;
