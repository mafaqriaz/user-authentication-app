/**
 * Typography System
 * 
 * Defines all typography styles used throughout the application.
 * Includes font families, sizes, weights, and line heights.
 */

// Font families
export const fontFamilies = {
  // Primary font family (system default)
  primary: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  
  // Secondary font family (for special cases)
  secondary: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  
  // Monospace font family (for code, numbers)
  monospace: {
    regular: 'Courier',
    medium: 'Courier',
    semibold: 'Courier',
    bold: 'Courier',
  },
} as const;

// Font weights
export const fontWeights = {
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
} as const;

// Font sizes
export const fontSizes = {
  // Display sizes (for hero text, headlines)
  display: {
    large: 48,
    medium: 40,
    small: 32,
  },
  
  // Heading sizes
  heading: {
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18,
    h6: 16,
  },
  
  // Body text sizes
  body: {
    large: 18,
    medium: 16,
    small: 14,
    xsmall: 12,
  },
  
  // Caption sizes
  caption: {
    large: 14,
    medium: 12,
    small: 10,
  },
  
  // Button text sizes
  button: {
    large: 18,
    medium: 16,
    small: 14,
  },
  
  // Input text sizes
  input: {
    large: 18,
    medium: 16,
    small: 14,
  },
} as const;

// Line heights
export const lineHeights = {
  // Display line heights
  display: {
    large: 56,
    medium: 48,
    small: 40,
  },
  
  // Heading line heights
  heading: {
    h1: 40,
    h2: 36,
    h3: 32,
    h4: 28,
    h5: 24,
    h6: 20,
  },
  
  // Body line heights
  body: {
    large: 28,
    medium: 24,
    small: 20,
    xsmall: 16,
  },
  
  // Caption line heights
  caption: {
    large: 20,
    medium: 16,
    small: 14,
  },
  
  // Button line heights
  button: {
    large: 24,
    medium: 20,
    small: 18,
  },
  
  // Input line heights
  input: {
    large: 24,
    medium: 20,
    small: 18,
  },
} as const;

// Typography styles
export const typography = {
  // Display styles
  display: {
    large: {
      fontFamily: fontFamilies.primary.bold,
      fontSize: fontSizes.display.large,
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.display.large,
    },
    medium: {
      fontFamily: fontFamilies.primary.bold,
      fontSize: fontSizes.display.medium,
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.display.medium,
    },
    small: {
      fontFamily: fontFamilies.primary.bold,
      fontSize: fontSizes.display.small,
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.display.small,
    },
  },
  
  // Heading styles
  heading: {
    h1: {
      fontFamily: fontFamilies.primary.bold,
      fontSize: fontSizes.heading.h1,
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.heading.h1,
    },
    h2: {
      fontFamily: fontFamilies.primary.bold,
      fontSize: fontSizes.heading.h2,
      fontWeight: fontWeights.bold,
      lineHeight: lineHeights.heading.h2,
    },
    h3: {
      fontFamily: fontFamilies.primary.semibold,
      fontSize: fontSizes.heading.h3,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.heading.h3,
    },
    h4: {
      fontFamily: fontFamilies.primary.semibold,
      fontSize: fontSizes.heading.h4,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.heading.h4,
    },
    h5: {
      fontFamily: fontFamilies.primary.medium,
      fontSize: fontSizes.heading.h5,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.heading.h5,
    },
    h6: {
      fontFamily: fontFamilies.primary.medium,
      fontSize: fontSizes.heading.h6,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.heading.h6,
    },
  },
  
  // Body styles
  body: {
    large: {
      fontFamily: fontFamilies.primary.regular,
      fontSize: fontSizes.body.large,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.body.large,
    },
    medium: {
      fontFamily: fontFamilies.primary.regular,
      fontSize: fontSizes.body.medium,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.body.medium,
    },
    small: {
      fontFamily: fontFamilies.primary.regular,
      fontSize: fontSizes.body.small,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.body.small,
    },
    xsmall: {
      fontFamily: fontFamilies.primary.regular,
      fontSize: fontSizes.body.xsmall,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.body.xsmall,
    },
  },
  
  // Caption styles
  caption: {
    large: {
      fontFamily: fontFamilies.primary.regular,
      fontSize: fontSizes.caption.large,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.caption.large,
    },
    medium: {
      fontFamily: fontFamilies.primary.regular,
      fontSize: fontSizes.caption.medium,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.caption.medium,
    },
    small: {
      fontFamily: fontFamilies.primary.regular,
      fontSize: fontSizes.caption.small,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.caption.small,
    },
  },
  
  // Button styles
  button: {
    large: {
      fontFamily: fontFamilies.primary.semibold,
      fontSize: fontSizes.button.large,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.button.large,
    },
    medium: {
      fontFamily: fontFamilies.primary.semibold,
      fontSize: fontSizes.button.medium,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.button.medium,
    },
    small: {
      fontFamily: fontFamilies.primary.semibold,
      fontSize: fontSizes.button.small,
      fontWeight: fontWeights.semibold,
      lineHeight: lineHeights.button.small,
    },
  },
  
  // Input styles
  input: {
    large: {
      fontFamily: fontFamilies.primary.regular,
      fontSize: fontSizes.input.large,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.input.large,
    },
    medium: {
      fontFamily: fontFamilies.primary.regular,
      fontSize: fontSizes.input.medium,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.input.medium,
    },
    small: {
      fontFamily: fontFamilies.primary.regular,
      fontSize: fontSizes.input.small,
      fontWeight: fontWeights.regular,
      lineHeight: lineHeights.input.small,
    },
  },
  
  // Label styles
  label: {
    large: {
      fontFamily: fontFamilies.primary.medium,
      fontSize: fontSizes.body.large,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.body.large,
    },
    medium: {
      fontFamily: fontFamilies.primary.medium,
      fontSize: fontSizes.body.medium,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.body.medium,
    },
    small: {
      fontFamily: fontFamilies.primary.medium,
      fontSize: fontSizes.body.small,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.body.small,
    },
  },
  
  // Link styles
  link: {
    large: {
      fontFamily: fontFamilies.primary.medium,
      fontSize: fontSizes.body.large,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.body.large,
      textDecorationLine: 'underline',
    },
    medium: {
      fontFamily: fontFamilies.primary.medium,
      fontSize: fontSizes.body.medium,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.body.medium,
      textDecorationLine: 'underline',
    },
    small: {
      fontFamily: fontFamilies.primary.medium,
      fontSize: fontSizes.body.small,
      fontWeight: fontWeights.medium,
      lineHeight: lineHeights.body.small,
      textDecorationLine: 'underline',
    },
  },
} as const;

// Type definitions
export type FontFamily = typeof fontFamilies;
export type FontWeight = typeof fontWeights;
export type FontSize = typeof fontSizes;
export type LineHeight = typeof lineHeights;
export type Typography = typeof typography; 