import { createSlice } from "@reduxjs/toolkit";
const tokenSlice = createSlice({
  name: "token",
  initialState: {
    tokenValue: "",
  },
  reducers: {
    setToken: (state, action) => {
      state.tokenValue = action.payload;
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
