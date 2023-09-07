import { createSlice } from "@reduxjs/toolkit";
const playListItemsSlice = createSlice({
  name: "playlistitems",
  initialState: {
    playList: [],
  },
  reducers: {
    addPlayListItems: (state, action) => {
      state.playList = action.payload;
    },
  },
});

export const { addPlayListItems } = playListItemsSlice.actions;
export default playListItemsSlice.reducer;
