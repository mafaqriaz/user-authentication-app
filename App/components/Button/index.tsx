import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { ButtonProps } from './types';
import { useTheme } from '../../theme/ThemeContext';
import { createButtonStyles } from '../../theme/utils';

/**
 * Custom Button Component
 * 
 * A reusable button component with multiple variants, sizes, and states.
 * Supports loading states, disabled states, and custom styling.
 * 
 * @param title - The text to display on the button
 * @param variant - Button style variant (primary, secondary, outline)
 * @param size - Button size (small, medium, large)
 * @param loading - Whether to show loading spinner
 * @param disabled - Whether the button is disabled
 * @param style - Additional custom styles
 * @param props - Additional TouchableOpacity props
 */
const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  
  // Determine if button should be disabled (either explicitly disabled or loading)
  const isDisabled = disabled || loading;

  // Get theme-aware button styles
  const buttonStyles = createButtonStyles(theme, variant, size, isDisabled);

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        buttonStyles.container,
        style // Custom styles passed as prop
      ])}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        // Show loading spinner when loading state is true
        <ActivityIndicator
          testID="activity-indicator"
          color={disabled 
            ? theme.semantic.button[variant].disabled.text 
            : theme.semantic.button[variant].text}
          size="small"
        />
      ) : (
        // Show button text when not loading
        <Text style={buttonStyles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button; 