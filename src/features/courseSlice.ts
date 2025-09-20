import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../interfaces/models";

interface CourseState {
  courses: Course[];
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  error: null,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    updateCourseProperty: (
      state,
      action: PayloadAction<{
        vehicle: string;
        property: keyof Course;
        value: any;
      }>,
    ) => {
      const { vehicle, property, value } = action.payload;
      const course = state.courses.find((course) => course.vehicle === vehicle);

      if (course) {
        (course[property] as typeof value) = value;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setCourses,
  addCourse,
  setError,
  updateCourseProperty,
  clearError,
} = courseSlice.actions;
export default courseSlice.reducer;
