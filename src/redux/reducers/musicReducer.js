import actionTypes from "../actions/actionTypes";

const initialState = {
  currentSongId: null,
  isPlaying: false,
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
    default:
      return state;
  }
};

export default musicReducer;
