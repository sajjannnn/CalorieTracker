import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {
    image_Url: "https://imgs.search.brave.com/3QwJrgLTqpAXigTIapOq1z-piCQGIDgL9SuOMix2m7s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ni8wMS8xOC80Ni9j/b29rLTIzNjQyMjFf/NjQwLmpwZw",
  },
  reducers: {
    setImage(state, action) {
      state.image_Url = action.payload;
    },
  },
});
export const { setImage } = imageSlice.actions;
export default imageSlice.reducer;
