import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { InputProps } from './types';
import { useTheme } from '../../theme/ThemeContext';
import { createInputStyles } from '../../theme/utils';

/**
 * Custom Input Component
 * 
 * A reusable input component with label, error handling, and password toggle.
 * Supports custom styling, right icons, and password visibility toggle.
 * 
 * @param label - The label text to display above the input
 * @param error - Error message to display below the input
 * @param isPassword - Whether this is a password input with toggle
 * @param rightIcon - Optional icon to display on the right side
 * @param style - Additional custom styles for the input
 * @param props - Additional TextInput props
 */
const Input: React.FC<InputProps> = ({
  label,
  error,
  isPassword = false,
  rightIcon,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  
  // State to track password visibility for password inputs
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  /**
   * Toggle password visibility between hidden and visible
   */
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Get theme-aware input styles with consistent sizing
  const inputStyles = createInputStyles(theme, error ? 'error' : 'default', 'large');

  return (
    <View style={{ marginBottom: theme.spacing.lg }}>
      {/* Input label */}
      <Text style={StyleSheet.flatten([
        theme.typography.label.medium,
        { color: theme.colors.text.primary }
      ])}>
        {label}
      </Text>
      
      {/* Input container with error state styling */}
      <View style={StyleSheet.flatten([
        inputStyles.container,
        { flexDirection: 'row', alignItems: 'center' }
      ])}>
        {/* Main text input */}
        <TextInput
          style={StyleSheet.flatten([
            inputStyles.text,
            { flex: 1 },
            style
          ])}
          placeholderTextColor={theme.semantic.input.placeholder}
          secureTextEntry={isPassword && !isPasswordVisible}
          {...props}
        />
        
        {/* Password visibility toggle (only for password inputs) */}
        {isPassword && (
          <TouchableOpacity
            style={{ 
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 40
            }}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 20 }}>
              {isPasswordVisible ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}
        
        {/* Right icon container (only when not password input) */}
        {rightIcon && !isPassword && (
          <View style={{ padding: theme.spacing.sm }}>{rightIcon}</View>
        )}
      </View>
      
      {/* Error message display */}
      {error && (
        <Text style={StyleSheet.flatten([
          theme.typography.body.small,
          { color: theme.semantic.error.text, marginTop: theme.spacing.xs }
        ])}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default Input; 