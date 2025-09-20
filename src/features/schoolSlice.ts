import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DrivingSchool } from "../interfaces/models";

interface SchoolState {
  school: DrivingSchool | null;
}

const initialState: SchoolState = {
  school: null,
};

export const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    setSchool: (state, action: PayloadAction<DrivingSchool | null>) => {
      state.school = action.payload;
    },
    clearSchool: (state) => {
      state.school = null;
    },
  },
});

export const { setSchool, clearSchool } = schoolSlice.actions;
export default schoolSlice.reducer;
