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
  isLoading: false,
  newReleases: {},
  weekChart: {},
  rankNewSongs: {},
  chart: {},
  rank: [],
  scrollTop: true,
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
        newReleases:
          action.homeData?.find((item) => item.sectionType === "new-release") ||
          {},
        weekChart:
          action.homeData?.find((item) => item.sectionType === "weekChart") ||
          {},
        rankNewSongs:
          action.homeData?.find((item) => item.sectionId === "hNewrelease") ||
          {},
        chart:
          action.homeData?.find((item) => item.sectionId === "hZC")?.chart ||
          {},
        rank:
          action.homeData?.find((item) => item.sectionId === "hZC")?.items ||
          [],
      };

    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };
    case actionTypes.ZERO_SCROLLTOP:
      return {
        ...state,
        scrollTop: action.flag,
      };
    default:
      return state;
  }
};

export default appReducer;
