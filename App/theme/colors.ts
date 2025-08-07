/**
 * Color System
 * 
 * Defines all colors used throughout the application.
 * Supports both light and dark themes with semantic color naming.
 */

// Base color palette
export const baseColors = {
  // Primary colors
  primary: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3', // Main primary color
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  
  // Secondary colors
  secondary: {
    50: '#f3e5f5',
    100: '#e1bee7',
    200: '#ce93d8',
    300: '#ba68c8',
    400: '#ab47bc',
    500: '#9c27b0', // Main secondary color
    600: '#8e24aa',
    700: '#7b1fa2',
    800: '#6a1b9a',
    900: '#4a148c',
  },
  
  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Success colors
  success: {
    50: '#e8f5e8',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50', // Main success color
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
  },
  
  // Warning colors
  warning: {
    50: '#fff8e1',
    100: '#ffecb3',
    200: '#ffe082',
    300: '#ffd54f',
    400: '#ffca28',
    500: '#ffc107', // Main warning color
    600: '#ffb300',
    700: '#ffa000',
    800: '#ff8f00',
    900: '#ff6f00',
  },
  
  // Error colors
  error: {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336', // Main error color
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
  },
  
  // Info colors
  info: {
    50: '#e1f5fe',
    100: '#b3e5fc',
    200: '#81d4fa',
    300: '#4fc3f7',
    400: '#29b6f6',
    500: '#03a9f4', // Main info color
    600: '#039be5',
    700: '#0288d1',
    800: '#0277bd',
    900: '#01579b',
  },
} as const;

// Light theme colors
export const lightColors = {
  // Background colors
  background: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    tertiary: '#f1f3f4',
    card: '#ffffff',
    modal: '#ffffff',
  },
  
  // Surface colors
  surface: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    tertiary: '#f1f3f4',
    elevated: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Text colors
  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
    tertiary: '#999999',
    disabled: '#cccccc',
    inverse: '#ffffff',
    link: baseColors.primary[500],
  },
  
  // Border colors
  border: {
    primary: '#e0e0e0',
    secondary: '#f0f0f0',
    tertiary: '#f5f5f5',
    focus: baseColors.primary[500],
    error: baseColors.error[500],
    success: baseColors.success[500],
  },
  
  // Status colors
  status: {
    success: baseColors.success[500],
    warning: baseColors.warning[500],
    error: baseColors.error[500],
    info: baseColors.info[500],
  },
  
  // Interactive colors
  interactive: {
    primary: baseColors.primary[500],
    secondary: baseColors.secondary[500],
    disabled: '#cccccc',
    hover: baseColors.primary[600],
    active: baseColors.primary[700],
  },
  
  // Shadow colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.1)',
    medium: 'rgba(0, 0, 0, 0.15)',
    heavy: 'rgba(0, 0, 0, 0.2)',
  },
} as const;

// Dark theme colors
export const darkColors = {
  // Background colors
  background: {
    primary: '#121212',
    secondary: '#1e1e1e',
    tertiary: '#2d2d2d',
    card: '#1e1e1e',
    modal: '#1e1e1e',
  },
  
  // Surface colors
  surface: {
    primary: '#1e1e1e',
    secondary: '#2d2d2d',
    tertiary: '#3d3d3d',
    elevated: '#2d2d2d',
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  
  // Text colors
  text: {
    primary: '#ffffff',
    secondary: '#b3b3b3',
    tertiary: '#808080',
    disabled: '#666666',
    inverse: '#1a1a1a',
    link: baseColors.primary[300],
  },
  
  // Border colors
  border: {
    primary: '#3d3d3d',
    secondary: '#2d2d2d',
    tertiary: '#1e1e1e',
    focus: baseColors.primary[400],
    error: baseColors.error[400],
    success: baseColors.success[400],
  },
  
  // Status colors
  status: {
    success: baseColors.success[400],
    warning: baseColors.warning[400],
    error: baseColors.error[400],
    info: baseColors.info[400],
  },
  
  // Interactive colors
  interactive: {
    primary: baseColors.primary[400],
    secondary: baseColors.secondary[400],
    disabled: '#666666',
    hover: baseColors.primary[300],
    active: baseColors.primary[500],
  },
  
  // Shadow colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.3)',
    medium: 'rgba(0, 0, 0, 0.4)',
    heavy: 'rgba(0, 0, 0, 0.5)',
  },
} as const;

// Light theme semantic colors
export const lightSemanticColors = {
  // Button colors
  button: {
    primary: {
      background: baseColors.primary[500],
      text: '#ffffff',
      border: baseColors.primary[500],
      disabled: {
        background: '#cccccc',
        text: '#999999',
        border: '#cccccc',
      },
    },
    secondary: {
      background: 'transparent',
      text: baseColors.primary[500],
      border: baseColors.primary[500],
      disabled: {
        background: 'transparent',
        text: '#999999',
        border: '#cccccc',
      },
    },
    outline: {
      background: 'transparent',
      text: baseColors.primary[500],
      border: baseColors.primary[500],
      disabled: {
        background: 'transparent',
        text: '#999999',
        border: '#cccccc',
      },
    },
  },
  
  // Input colors
  input: {
    background: '#ffffff',
    text: '#1a1a1a',
    placeholder: '#999999',
    border: '#e0e0e0',
    focus: {
      border: baseColors.primary[500],
      background: '#ffffff',
    },
    error: {
      border: baseColors.error[500],
      background: '#ffffff',
      text: baseColors.error[700],
    },
    disabled: {
      background: '#f5f5f5',
      text: '#999999',
      border: '#e0e0e0',
    },
  },
  
  // Error colors
  error: {
    background: baseColors.error[50],
    text: baseColors.error[700],
    border: baseColors.error[200],
    icon: baseColors.error[500],
  },
  
  // Success colors
  success: {
    background: baseColors.success[50],
    text: baseColors.success[700],
    border: baseColors.success[200],
    icon: baseColors.success[500],
  },
  
  // Warning colors
  warning: {
    background: baseColors.warning[50],
    text: baseColors.warning[700],
    border: baseColors.warning[200],
    icon: baseColors.warning[500],
  },
  
  // Info colors
  info: {
    background: baseColors.info[50],
    text: baseColors.info[700],
    border: baseColors.info[200],
    icon: baseColors.info[500],
  },
} as const;

// Dark theme semantic colors
export const darkSemanticColors = {
  // Button colors
  button: {
    primary: {
      background: baseColors.primary[400],
      text: '#ffffff',
      border: baseColors.primary[400],
      disabled: {
        background: '#666666',
        text: '#999999',
        border: '#666666',
      },
    },
    secondary: {
      background: 'transparent',
      text: baseColors.primary[300],
      border: baseColors.primary[300],
      disabled: {
        background: 'transparent',
        text: '#666666',
        border: '#666666',
      },
    },
    outline: {
      background: 'transparent',
      text: baseColors.primary[300],
      border: baseColors.primary[300],
      disabled: {
        background: 'transparent',
        text: '#666666',
        border: '#666666',
      },
    },
  },
  
  // Input colors
  input: {
    background: '#2d2d2d',
    text: '#ffffff',
    placeholder: '#808080',
    border: '#3d3d3d',
    focus: {
      border: baseColors.primary[400],
      background: '#2d2d2d',
    },
    error: {
      border: baseColors.error[400],
      background: '#2d2d2d',
      text: baseColors.error[300],
    },
    disabled: {
      background: '#1e1e1e',
      text: '#666666',
      border: '#3d3d3d',
    },
  },
  
  // Error colors
  error: {
    background: '#2d1b1b',
    text: baseColors.error[300],
    border: baseColors.error[800],
    icon: baseColors.error[400],
  },
  
  // Success colors
  success: {
    background: '#1b2d1b',
    text: baseColors.success[300],
    border: baseColors.success[800],
    icon: baseColors.success[400],
  },
  
  // Warning colors
  warning: {
    background: '#2d2b1b',
    text: baseColors.warning[300],
    border: baseColors.warning[800],
    icon: baseColors.warning[400],
  },
  
  // Info colors
  info: {
    background: '#1b2d2d',
    text: baseColors.info[300],
    border: baseColors.info[800],
    icon: baseColors.info[400],
  },
} as const;

// Semantic color tokens (will be replaced by theme-specific ones)
export const semanticColors = lightSemanticColors;

// Export theme colors
export const themeColors = {
  light: lightColors,
  dark: darkColors,
  base: baseColors,
} as const;

// Type definitions
export type ColorTheme = 'light' | 'dark';
export type BaseColors = typeof baseColors;
export type LightColors = typeof lightColors;
export type DarkColors = typeof darkColors;
export type SemanticColors = typeof semanticColors; 