import { createSlice } from "@reduxjs/toolkit";

const intialState = { song: "" };

export const SongsData = createSlice({
  name: "song",
  intialState,
  reducers: {
    songFunction: (state, action) => {
      console.log("song is received", action.payload);
      state.song = action.payload;
    },
  },
});
export const { songFunction } = SongsData.actions;
export default SongsData.reducer;
