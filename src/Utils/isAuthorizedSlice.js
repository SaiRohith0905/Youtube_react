import { createSlice } from "@reduxjs/toolkit";

const isAuthorizedSlice = createSlice({
  name: "isAuthorized",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLogin } = isAuthorizedSlice.actions;

export default isAuthorizedSlice.reducer;
