import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface ScrollState {
  homeRef: React.RefObject<HTMLElement> | null;
  aboutRef: React.RefObject<HTMLElement> | null;
  coursesRef: React.RefObject<HTMLElement> | null;
}

const initialState: ScrollState = {
  homeRef: null,
  aboutRef: null,
  coursesRef: null,
};

const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    setRefs: (state, action) => {
      state.homeRef = action.payload.homeRef;
      state.aboutRef = action.payload.aboutRef;
      state.coursesRef = action.payload.coursesRef;
    },
    clearRefs: (state) => {
      state.homeRef = null;
      state.aboutRef = null;
      state.coursesRef = null;
    },
  },
});

export const { setRefs, clearRefs } = scrollSlice.actions;
export const selectScrollRefs = (state: RootState) => state.scroll;
export default scrollSlice.reducer;
