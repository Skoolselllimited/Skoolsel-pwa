import { useContext } from "react";
import { ThemeContext } from "./providers/ThemeProvider";

export function useThemeProvider() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(`useThemeProvider must be used within a ThemeProvider`);
  }
  return context;
}

