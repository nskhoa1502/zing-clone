import actionTypes from "../actions/actionTypes";

const initialState = {
  banner: [],
  editorTheme: {},
  edithorTheme2: {},
  edithorTheme3: {},
  edithorTheme4: {},
  artistTheme: {},
  h100: {},
  hAlbum: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      // console.log(action);
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionId === "hSlider")
            ?.items || null,
        editorTheme:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme") ||
          {},
        editorTheme2:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme2") ||
          {},
        editorTheme3:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme3") ||
          {},
        editorTheme4:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme4") ||
          {},
        artistTheme:
          action.homeData?.find((item) => item.sectionId === "hArtistTheme") ||
          {},
        h100: action.homeData?.find((item) => item.sectionId === "h100") || {},
        hAlbum:
          action.homeData?.find((item) => item.sectionId === "hAlbum") || {},
      };

    default:
      return state;
  }
};

export default appReducer;
