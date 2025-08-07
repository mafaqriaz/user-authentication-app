/**
 * Design System Theme
 * 
 * Main theme file that exports all design system components.
 * Provides theme utilities and type definitions.
 */

// Import all theme components
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './utils';

// Re-export for convenience
import { themeColors, ColorTheme, LightColors, DarkColors, lightSemanticColors, darkSemanticColors } from './colors';
import { typography, Typography, FontFamily, FontWeight, FontSize, LineHeight } from './typography';
import { spacing, layout, borderRadius, shadows, zIndex, Spacing, Layout, BorderRadius, Shadows, ZIndex } from './spacing';

// Theme interface
export interface Theme {
  colors: LightColors | DarkColors;
  typography: Typography;
  spacing: Spacing;
  layout: Layout;
  borderRadius: BorderRadius;
  shadows: Shadows;
  zIndex: ZIndex;
  semantic: typeof lightSemanticColors | typeof darkSemanticColors;
}

// Light theme
export const lightTheme: Theme = {
  colors: themeColors.light,
  typography,
  spacing,
  layout,
  borderRadius,
  shadows,
  zIndex,
  semantic: lightSemanticColors,
};

// Dark theme
export const darkTheme: Theme = {
  colors: themeColors.dark,
  typography,
  spacing,
  layout,
  borderRadius,
  shadows,
  zIndex,
  semantic: darkSemanticColors,
};

// Theme utilities
export const getTheme = (theme: ColorTheme): Theme => {
  return theme === 'light' ? lightTheme : darkTheme;
};

// Export theme types
export type { ColorTheme, LightColors, DarkColors };
export type { Typography, FontFamily, FontWeight, FontSize, LineHeight };
export type { Spacing, Layout, BorderRadius, Shadows, ZIndex };
export type { Theme };

// Default export for convenience
export default {
  light: lightTheme,
  dark: darkTheme,
  getTheme,
}; 