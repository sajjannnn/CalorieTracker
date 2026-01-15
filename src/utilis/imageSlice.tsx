import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
  name: "image",
  initialState: {
    image_Url: "",
    image_Base64: null as string | null,
  },
  reducers: {
    setImage(state, action) {
      state.image_Url = action.payload.previewUrl;
      state.image_Base64 = action.payload.base64;
    },
    clearImage(state) {
      state.image_Url = "https://imgs.search.brave.com/3QwJrgLTqpAXigTIapOq1z-piCQGIDgL9SuOMix2m7s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ni8wMS8xOC80Ni9j/b29rLTIzNjQyMjFf/NjQwLmpwZw";
      state.image_Base64 = null;
    },
  },
});
export const { setImage, clearImage } = imageSlice.actions;
export default imageSlice.reducer;
