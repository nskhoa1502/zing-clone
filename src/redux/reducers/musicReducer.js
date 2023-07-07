import actionTypes from "../actions/actionTypes";

const initialState = {
  currentSongId: null,
};

const musicReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CURRENT_SONG_ID:
      return {
        ...state,
        currentSongId: action.sid || null,
      };

    default:
      return state;
  }
};

export default musicReducer;
