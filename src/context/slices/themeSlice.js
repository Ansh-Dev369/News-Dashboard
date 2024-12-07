import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // reducer to toggle the theme
    toggleTheme: (state) => {
      // updating the state to toggle the theme
      state.isDarkMode = !state.isDarkMode;

      // Updating class on html element that handles dark mode`
      if (state.isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      // Saving to localStorage for persistence
      localStorage.setItem("darkMode", state.isDarkMode);
    },
    // reducer to initialize the theme based on localStorage
    initializeTheme: (state) => {
      // Checking localStorage
      const darkMode = localStorage.getItem("darkMode") === "true";

      state.isDarkMode = darkMode;
      if (darkMode) {
        document.documentElement.classList.add("dark");
      }
    },
  },
});

export const { toggleTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;
