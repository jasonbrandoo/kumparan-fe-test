import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menuSlice",
  initialState: {
    active: "posts",
  },
  reducers: {
    setActice: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { setActice } = menuSlice.actions;

export const menuSelector = (state) => state.menu.active;

export default menuSlice.reducer;
