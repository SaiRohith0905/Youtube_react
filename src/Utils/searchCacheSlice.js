import { createSlice } from "@reduxjs/toolkit";

const seachCacheSlice = createSlice({
  name: "searchCache",
  initialState: {},
  reducers: {
    insertSearchCache: (state, action) => {
      // action :{
      //     payload : {
      //         sai : ['sai,saibaba']
      //     }
      // }

      let keys = Object.keys(action.payload)[0];
      let values = Object.values(action.payload)[0];
      state = state[keys] = values;
    },
  },
});

export const { insertSearchCache } = seachCacheSlice.actions;

export default seachCacheSlice.reducer;
