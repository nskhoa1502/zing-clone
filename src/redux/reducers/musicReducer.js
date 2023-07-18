import actionTypes from "../actions/actionTypes";

const initialState = {
  currentSongId: null,
  currentSongData: null,
  isPlaying: false,
  error: null,
  atAlbum: false,
  songs: null,
  currentAlbumId: null,
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
    case actionTypes.SET_CURRENT_SONG_DATA:
      return {
        ...state,
        currentSongData: action.data || null,
      };
    case actionTypes.SET_CURRENT_ALBUM_ID:
      return {
        ...state,
        currentAlbumId: action.pid || null,
      };
    default:
      return state;
  }
};

export default musicReducer;
