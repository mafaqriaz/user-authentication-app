/**
 * Theme Context
 * 
 * Provides theme state management and utilities throughout the application.
 * Supports dynamic theme switching and system theme detection.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { Theme, ColorTheme, getTheme } from './index';

// Theme context interface
interface ThemeContextType {
  theme: Theme;
  colorTheme: ColorTheme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ColorTheme) => void;
}

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ColorTheme;
  followSystem?: boolean;
}

/**
 * Theme Provider Component
 * 
 * Wraps the app with theme context and provides theme management.
 * 
 * @param children - React children components
 * @param initialTheme - Initial theme to use (defaults to system theme)
 * @param followSystem - Whether to follow system theme changes
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme,
  followSystem = true,
}) => {
  const systemColorScheme = useColorScheme();
  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    // Use initial theme if provided, otherwise use system theme
    if (initialTheme) {
      return initialTheme;
    }
    return followSystem ? (systemColorScheme as ColorTheme) || 'light' : 'light';
  });

  // Update theme when system theme changes (if following system)
  useEffect(() => {
    if (followSystem && systemColorScheme) {
      setColorTheme(systemColorScheme as ColorTheme);
    }
  }, [systemColorScheme, followSystem]);

  // Get current theme object
  const theme = getTheme(colorTheme);
  const isDark = colorTheme === 'dark';

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setColorTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  /**
   * Set specific theme
   * 
   * @param newTheme - Theme to set
   */
  const setTheme = (newTheme: ColorTheme) => {
    setColorTheme(newTheme);
  };

  // Context value
  const contextValue: ThemeContextType = {
    theme,
    colorTheme,
    isDark,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use theme context
 * 
 * @returns Theme context value
 * @throws Error if used outside ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Hook to get current theme object
 * 
 * @returns Current theme object
 */
export const useThemeObject = (): Theme => {
  const { theme } = useTheme();
  return theme;
};

/**
 * Hook to check if current theme is dark
 * 
 * @returns True if dark theme is active
 */
export const useIsDark = (): boolean => {
  const { isDark } = useTheme();
  return isDark;
};

export default ThemeProvider; 