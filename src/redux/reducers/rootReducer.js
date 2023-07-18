import appReducer from "./appReducer.js";
import musicReducer from "./musicReducer.js";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const musicConfig = {
  ...commonConfig,
  key: "music",
  whitelist: [
    "currentSongId",
    "currentSongData",
    "currentAlbumId",
    "recentSongs",
  ],
};

const rootReducer = combineReducers({
  app: appReducer,
  music: persistReducer(musicConfig, musicReducer),
});

export default rootReducer;
