import { createSlice } from "@reduxjs/toolkit";
import { initialNutriData, type NutriTrackData } from "./localStorage.tsx/types";
import { getNutriData } from "./localStorage.tsx/localStorageFunctions";

const mealSlice = createSlice({
  name: "meal",
  initialState: {
    data: getNutriData() as NutriTrackData,
  },
  reducers: {
    clearMeal(state) {
      localStorage.clear();
      state.data = initialNutriData;
    },
    setMeal(state, action) {
      state.data = action.payload;
    },
  },
});
export const { clearMeal, setMeal } = mealSlice.actions;
export default mealSlice.reducer;
