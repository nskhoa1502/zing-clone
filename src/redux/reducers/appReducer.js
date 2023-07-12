import actionTypes from "../actions/actionTypes";

const initialState = {
  banner: [],
  editorTheme: {},
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
      };

    default:
      return state;
  }
};

export default appReducer;
