import { createSlice } from "@reduxjs/toolkit";

const headerSlice = createSlice({
  name: "headerState",
  initialState: {
    title: "dashboard",
  },
  reducers: {
    changeTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { changeTitle } = headerSlice.actions;
export default headerSlice.reducer;
