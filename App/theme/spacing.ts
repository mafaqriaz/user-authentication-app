/**
 * Spacing System
 * 
 * Defines all spacing values used throughout the application.
 * Provides consistent spacing for margins, padding, and layout.
 */

// Base spacing unit (4px)
export const baseSpacing = 4;

// Spacing scale (multiples of base spacing)
export const spacing = {
  // Micro spacing (0-8px)
  none: 0,
  xs: baseSpacing, // 4px
  sm: baseSpacing * 2, // 8px
  md: baseSpacing * 3, // 12px
  lg: baseSpacing * 4, // 16px
  
  // Standard spacing (16-32px)
  xl: baseSpacing * 5, // 20px
  xxl: baseSpacing * 6, // 24px
  xxxl: baseSpacing * 8, // 32px
  
  // Large spacing (40-80px)
  huge: baseSpacing * 10, // 40px
  massive: baseSpacing * 15, // 60px
  enormous: baseSpacing * 20, // 80px
} as const;

// Layout spacing (for containers, sections)
export const layout = {
  // Screen margins
  screen: {
    horizontal: spacing.xl, // 20px
    vertical: spacing.xxl, // 24px
  },
  
  // Container spacing
  container: {
    padding: spacing.lg, // 16px
    margin: spacing.md, // 12px
  },
  
  // Section spacing
  section: {
    padding: spacing.xxl, // 24px
    margin: spacing.lg, // 16px
  },
  
  // Card spacing
  card: {
    padding: spacing.lg, // 16px
    margin: spacing.md, // 12px
    borderRadius: spacing.sm, // 8px
  },
  
  // Form spacing
  form: {
    fieldSpacing: spacing.lg, // 16px
    groupSpacing: spacing.xl, // 20px
    sectionSpacing: spacing.xxl, // 24px
  },
  
  // Button spacing
  button: {
    padding: {
      horizontal: spacing.xl, // 20px
      vertical: spacing.md, // 12px
    },
    margin: spacing.sm, // 8px
  },
  
  // Input spacing
  input: {
    padding: {
      horizontal: spacing.lg, // 16px
      vertical: spacing.md, // 12px
    },
    margin: spacing.sm, // 8px
  },
  
  // Navigation spacing
  navigation: {
    header: {
      padding: spacing.lg, // 16px
      height: 56,
    },
    tab: {
      padding: spacing.md, // 12px
      height: 48,
    },
  },
  
  // Modal spacing
  modal: {
    padding: spacing.xxl, // 24px
    margin: spacing.lg, // 16px
    borderRadius: spacing.lg, // 16px
  },
  
  // List spacing
  list: {
    itemSpacing: spacing.md, // 12px
    sectionSpacing: spacing.lg, // 16px
    padding: spacing.lg, // 16px
  },
} as const;

// Border radius values
export const borderRadius = {
  none: 0,
  xs: spacing.xs, // 4px
  sm: spacing.sm, // 8px
  md: spacing.md, // 12px
  lg: spacing.lg, // 16px
  xl: spacing.xl, // 20px
  xxl: spacing.xxl, // 24px
  round: 50, // 50% for circular elements
} as const;

// Shadow values
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
} as const;

// Z-index values
export const zIndex = {
  base: 0,
  card: 1,
  modal: 100,
  overlay: 99,
  tooltip: 200,
  toast: 300,
  dropdown: 400,
} as const;

// Type definitions
export type Spacing = typeof spacing;
export type Layout = typeof layout;
export type BorderRadius = typeof borderRadius;
export type Shadows = typeof shadows;
export type ZIndex = typeof zIndex; 