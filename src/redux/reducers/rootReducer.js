import appReducer from "./appReducer.js";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
