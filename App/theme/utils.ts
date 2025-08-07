/**
 * Theme Utilities
 * 
 * Provides utility functions for common styling patterns and theme-aware components.
 */

import { StyleSheet } from 'react-native';
import { Theme, ColorTheme } from './index';

/**
 * Create theme-aware styles
 * 
 * @param theme - Current theme object
 * @param styleFactory - Function that creates styles using theme
 * @returns StyleSheet object
 */
export const createThemedStyles = <T>(
  theme: Theme,
  styleFactory: (theme: Theme) => T
): T => {
  return styleFactory(theme);
};

/**
 * Get color from theme based on color theme
 * 
 * @param theme - Current theme object
 * @param colorTheme - Color theme to use
 * @param colorPath - Path to color in theme (e.g., 'colors.text.primary')
 * @returns Color value
 */
export const getThemeColor = (
  theme: Theme,
  colorTheme: ColorTheme,
  colorPath: string
): string => {
  const path = colorPath.split('.');
  let value: any = theme;
  
  for (const key of path) {
    value = value?.[key];
  }
  
  return value || '#000000';
};

/**
 * Create button styles based on variant and theme
 * 
 * @param theme - Current theme object
 * @param variant - Button variant
 * @param size - Button size
 * @param disabled - Whether button is disabled
 * @returns Button styles object
 */
export const createButtonStyles = (
  theme: Theme,
  variant: 'primary' | 'secondary' | 'outline' = 'primary',
  size: 'small' | 'medium' | 'large' = 'medium',
  disabled: boolean = false
) => {
  const { spacing, borderRadius, typography, semantic } = theme;
  const { button } = semantic;
  
  const baseStyles = {
    borderRadius: borderRadius.md,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexDirection: 'row' as const,
  };

  const sizeStyles = {
    small: {
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.sm,
      minHeight: 36,
    },
    medium: {
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.md,
      minHeight: 44,
    },
    large: {
      paddingHorizontal: spacing.xxl,
      paddingVertical: spacing.lg,
      minHeight: 52,
    },
  };

  const variantStyles = {
    primary: {
      backgroundColor: disabled ? button.primary.disabled.background : button.primary.background,
      borderWidth: 1,
      borderColor: disabled ? button.primary.disabled.border : button.primary.border,
    },
    secondary: {
      backgroundColor: button.secondary.background,
      borderWidth: 1,
      borderColor: disabled ? button.secondary.disabled.border : button.secondary.border,
    },
    outline: {
      backgroundColor: button.outline.background,
      borderWidth: 1,
      borderColor: disabled ? button.outline.disabled.border : button.outline.border,
    },
  };

  const textStyles = {
    small: typography.button.small,
    medium: typography.button.medium,
    large: typography.button.large,
  };

  return {
    container: StyleSheet.flatten([
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
    ]),
    text: StyleSheet.flatten([
      textStyles[size],
      {
        color: disabled 
          ? button[variant].disabled.text 
          : button[variant].text,
      },
    ]),
  };
};

/**
 * Create input styles based on state and theme
 * 
 * @param theme - Current theme object
 * @param state - Input state
 * @param size - Input size
 * @returns Input styles object
 */
export const createInputStyles = (
  theme: Theme,
  state: 'default' | 'focus' | 'error' | 'disabled' = 'default',
  size: 'small' | 'medium' | 'large' = 'medium'
) => {
  const { spacing, borderRadius, typography, semantic } = theme;
  const { input } = semantic;

  const baseStyles = {
    borderWidth: 1,
    borderRadius: borderRadius.sm,
    backgroundColor: input.background,
  };

  const sizeStyles = {
    small: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      height: 40,
    },
    medium: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      height: 48,
    },
    large: {
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.lg,
      height: 56,
    },
  };

  const stateStyles = {
    default: {
      borderColor: input.border,
      backgroundColor: input.background,
    },
    focus: {
      borderColor: input.focus.border,
      backgroundColor: input.focus.background,
    },
    error: {
      borderColor: input.error.border,
      backgroundColor: input.error.background,
    },
    disabled: {
      borderColor: input.disabled.border,
      backgroundColor: input.disabled.background,
    },
  };

  const textStyles = {
    small: typography.input.small,
    medium: typography.input.medium,
    large: typography.input.large,
  };

  return {
    container: StyleSheet.flatten([
      baseStyles,
      sizeStyles[size],
      stateStyles[state],
    ]),
    text: StyleSheet.flatten([
      textStyles[size],
      {
        color: state === 'error' 
          ? input.error.text 
          : state === 'disabled' 
            ? input.disabled.text 
            : input.text,
        textAlignVertical: 'center' as const,
      },
    ]),
    placeholder: StyleSheet.flatten([
      textStyles[size],
      {
        color: input.placeholder,
      },
    ]),
  };
};

/**
 * Create card styles based on theme
 * 
 * @param theme - Current theme object
 * @param elevated - Whether card is elevated
 * @returns Card styles object
 */
export const createCardStyles = (
  theme: Theme,
  elevated: boolean = false
) => {
  const { colors, spacing, borderRadius, shadows } = theme;
  const { card } = colors.background;

  return StyleSheet.flatten([
    {
      backgroundColor: card,
      borderRadius: borderRadius.md,
      padding: spacing.lg,
      margin: spacing.md,
    },
    elevated && shadows.md,
  ]);
};

/**
 * Create error message styles based on theme
 * 
 * @param theme - Current theme object
 * @param type - Error type
 * @returns Error styles object
 */
export const createErrorStyles = (
  theme: Theme,
  type: 'error' | 'warning' | 'info' | 'success' = 'error'
) => {
  const { spacing, borderRadius, typography, semantic } = theme;
  const semanticColors = semantic[type];

  return {
    container: StyleSheet.flatten([
      {
        backgroundColor: semanticColors.background,
        borderLeftWidth: 4,
        borderLeftColor: semanticColors.border,
        borderRadius: borderRadius.sm,
        padding: spacing.lg,
        marginBottom: spacing.lg,
      },
    ]),
    text: StyleSheet.flatten([
      typography.body.small,
      {
        color: semanticColors.text,
        fontWeight: '600' as const,
      },
    ]),
  };
};

/**
 * Create spacing utilities
 * 
 * @param theme - Current theme object
 * @returns Spacing utility functions
 */
export const createSpacingUtils = (theme: Theme) => {
  const { spacing } = theme;

  return {
    margin: (size: keyof typeof spacing) => ({ margin: spacing[size] }),
    marginHorizontal: (size: keyof typeof spacing) => ({ marginHorizontal: spacing[size] }),
    marginVertical: (size: keyof typeof spacing) => ({ marginVertical: spacing[size] }),
    marginTop: (size: keyof typeof spacing) => ({ marginTop: spacing[size] }),
    marginBottom: (size: keyof typeof spacing) => ({ marginBottom: spacing[size] }),
    marginLeft: (size: keyof typeof spacing) => ({ marginLeft: spacing[size] }),
    marginRight: (size: keyof typeof spacing) => ({ marginRight: spacing[size] }),
    
    padding: (size: keyof typeof spacing) => ({ padding: spacing[size] }),
    paddingHorizontal: (size: keyof typeof spacing) => ({ paddingHorizontal: spacing[size] }),
    paddingVertical: (size: keyof typeof spacing) => ({ paddingVertical: spacing[size] }),
    paddingTop: (size: keyof typeof spacing) => ({ paddingTop: spacing[size] }),
    paddingBottom: (size: keyof typeof spacing) => ({ paddingBottom: spacing[size] }),
    paddingLeft: (size: keyof typeof spacing) => ({ paddingLeft: spacing[size] }),
    paddingRight: (size: keyof typeof spacing) => ({ paddingRight: spacing[size] }),
  };
};

/**
 * Create typography utilities
 * 
 * @param theme - Current theme object
 * @returns Typography utility functions
 */
export const createTypographyUtils = (theme: Theme) => {
  const { typography } = theme;

  return {
    display: (size: keyof typeof typography.display) => typography.display[size],
    heading: (size: keyof typeof typography.heading) => typography.heading[size],
    body: (size: keyof typeof typography.body) => typography.body[size],
    caption: (size: keyof typeof typography.caption) => typography.caption[size],
    button: (size: keyof typeof typography.button) => typography.button[size],
    input: (size: keyof typeof typography.input) => typography.input[size],
    label: (size: keyof typeof typography.label) => typography.label[size],
    link: (size: keyof typeof typography.link) => typography.link[size],
  };
}; 