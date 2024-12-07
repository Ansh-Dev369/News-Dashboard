"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/context/slices/themeSlice";

export function ThemeToggle() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {isDarkMode ? "☀️" : "🌙"}
    </button>
  );
}
