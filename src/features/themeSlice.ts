import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  isDark: boolean;
}

const getInitialTheme = (): boolean => {
  const stored = localStorage.getItem("isDark");
  if (stored && JSON.parse(stored) === true) {
    document.documentElement.classList.add("dark");
  }
  return stored ? JSON.parse(stored) : false;
};

const initialState: ThemeState = {
  isDark: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem("isDark", JSON.stringify(state.isDark));
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
      localStorage.setItem("isDark", JSON.stringify(state.isDark));
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
