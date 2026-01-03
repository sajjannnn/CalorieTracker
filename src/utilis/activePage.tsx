import { createSlice } from "@reduxjs/toolkit";

const activePage = createSlice({
  name: "activePage",
  initialState: { page: "/" },
  reducers: {
    setActivePage: (state, action: { payload: string }) => {
      state.page = action.payload;
    },
  },
});
export const { setActivePage } = activePage.actions;
export default activePage.reducer;
