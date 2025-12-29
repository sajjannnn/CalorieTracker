import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    gptSearch: false,
    gptResult : []
  },
  reducers: {
    gptSearchToggle(state) {
      state.gptSearch = !state.gptSearch;
    },
    addGptResult(state, action) {
      state.gptResult = action.payload;
    },
  },
});

export const { gptSearchToggle,addGptResult } = gptSlice.actions;
export default gptSlice.reducer;
