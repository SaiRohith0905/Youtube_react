import { createSlice } from "@reduxjs/toolkit";

const WatchLaterSlice = createSlice({
  name: "watchlater",
  initialState: { watchlater: [] },
  reducers: {
    addToWatchLater: (state, action) => {
      let videopushedId = action?.payload?.id;
      let videoIds = state?.watchlater?.map((eachvideo) => {
        return eachvideo?.id;
      });
      if (!videoIds?.includes(videopushedId)) {
        state?.watchlater?.push(action.payload);
      }
    },
    clearWatchLater: (state, action) => {
      state.watchlater = [];
    },
  },
});
export default WatchLaterSlice.reducer;

export const { addToWatchLater, clearWatchLater } = WatchLaterSlice.actions;
