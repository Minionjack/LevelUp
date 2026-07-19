/**
 * Theme Context
 * Provides theme state and methods throughout the app
 *
 * @module contexts/ThemeContext
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { ThemeMode, Theme } from "@/types";
import { lightTheme, darkTheme } from "@/constants/Colors";
import * as SecureStore from "expo-secure-store";

const THEME_STORAGE_KEY = "theme_mode";

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  toggleTheme: () => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider component
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>("auto");

  /**
   * Load saved theme preference on mount
   */
  useEffect(() => {
    loadThemeMode();
  }, []);

  /**
   * Load theme mode from storage
   */
  const loadThemeMode = async () => {
    try {
      const savedMode = await SecureStore.getItemAsync(THEME_STORAGE_KEY);
      if (savedMode && ["light", "dark", "auto"].includes(savedMode)) {
        setThemeModeState(savedMode as ThemeMode);
      }
    } catch (error) {
      console.error("Error loading theme mode:", error);
    }
  };

  /**
   * Get effective theme based on mode
   */
  const getEffectiveTheme = (): Theme => {
    if (themeMode === "auto") {
      return systemColorScheme === "dark" ? darkTheme : lightTheme;
    }
    return themeMode === "dark" ? darkTheme : lightTheme;
  };

  /**
   * Set theme mode
   */
  const setThemeMode = async (mode: ThemeMode): Promise<void> => {
    try {
      setThemeModeState(mode);
      await SecureStore.setItemAsync(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error("Error saving theme mode:", error);
    }
  };

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = async (): Promise<void> => {
    const newMode: ThemeMode = themeMode === "light" ? "dark" : "light";
    await setThemeMode(newMode);
  };

  const value: ThemeContextType = {
    theme: getEffectiveTheme(),
    themeMode,
    setThemeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/**
 * Hook to use theme context
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
