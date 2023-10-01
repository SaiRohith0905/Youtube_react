import { createSlice, current } from "@reduxjs/toolkit";
import store from "./Store";

const watchHistorySlice = createSlice({
  name: "history",
  initialState: { storeHistory: [] },
  reducers: {
    addHistory: (state, action) => {
      let id = action.payload.id;

      let duplicateHistory = [];
      duplicateHistory = current(state.storeHistory).filter((item) => {
        if (item.id === id) return item;
      });
      console.log(duplicateHistory);
      if (duplicateHistory.length == 0) {
        state.storeHistory.unshift(action.payload);
      }

      // [1,2,3,4,2]
    },
    clearHistory: (state) => {
      state.storeHistory = [];
    },
  },
});

export const { addHistory, clearHistory } = watchHistorySlice.actions;

export default watchHistorySlice.reducer;
