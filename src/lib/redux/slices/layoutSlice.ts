
import { createSlice } from "@reduxjs/toolkit";

export type LayoutState = {
  isCollapsed?: boolean;
}

const initialState: LayoutState = {
  isCollapsed: false,
};
const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    // just for demo, you can remove it
    toggleCollapsed: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});

export const { toggleCollapsed } = layoutSlice.actions;
export default layoutSlice.reducer;