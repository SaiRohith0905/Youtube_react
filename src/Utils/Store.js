import { configureStore } from "@reduxjs/toolkit";
import searchCacheSlice from "./searchCacheSlice";
import watchHistorySlice from "./watchHistorySlice";
import isAuthorizedSlice from "./isAuthorizedSlice";
import tokenSlice from "./tokenSlice";
import playListItemsSlice from "./PlayListItemsSlice";
import WatchLaterSlice from "./WatchLaterSlice";
const store = configureStore({
  reducer: {
    searchCache: searchCacheSlice,
    history: watchHistorySlice,
    isAuthorized: isAuthorizedSlice,
    token: tokenSlice,
    playlistitems: playListItemsSlice,
    watchlater: WatchLaterSlice,
  },
});

export default store;
