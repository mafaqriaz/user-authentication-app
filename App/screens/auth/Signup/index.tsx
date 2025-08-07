import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/ThemeContext';
import { createErrorStyles } from '../../../theme/utils';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import useSignup from './hooks/useSignup';

/**
 * Signup Screen Component
 * 
 * Displays the registration form with name, email, password, and confirm password inputs.
 * Handles form validation, error display, and navigation to login.
 * 
 * Features:
 * - Full name, email, password, and confirm password inputs
 * - Comprehensive form validation with error messages
 * - Password strength requirements
 * - Loading states during registration
 * - Navigation to login screen
 */
const Signup: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  
  // Get signup form state and handlers from custom hook
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    setErrors,
    isSubmitting,
    handleSignup,
  } = useSignup();

  // Clear name error when user enters correct name length
  useEffect(() => {
    if (errors.name && name && name.trim().length >= 2) {
      setErrors(prev => ({ 
        ...prev, 
        name: undefined 
      }));
    }
  }, [name, errors.name, setErrors]);

  // Clear email error when user enters correct email format
  useEffect(() => {
    if (errors.email && email && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        setErrors(prev => ({ 
          ...prev, 
          email: undefined 
        }));
      }
    }
  }, [email, errors.email, setErrors]);

  // Clear password error when user enters correct password length
  useEffect(() => {
    if (errors.password && password && password.length >= 6) {
      setErrors(prev => ({ 
        ...prev, 
        password: undefined 
      }));
    }
  }, [password, errors.password, setErrors]);

  // Clear confirm password error when passwords match
  useEffect(() => {
    if (errors.confirmPassword && confirmPassword && password === confirmPassword) {
      setErrors(prev => ({ 
        ...prev, 
        confirmPassword: undefined 
      }));
    }
  }, [confirmPassword, password, errors.confirmPassword, setErrors]);


  /**
   * Navigate to the login screen
   */
  const navigateToLogin = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <KeyboardAvoidingView
      style={{ 
        flex: 1, 
        backgroundColor: theme.colors.background.primary 
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          paddingHorizontal: theme.spacing.xxl,
          paddingVertical: theme.spacing.huge 
        }}>
          {/* Header section with title and subtitle */}
          <View style={{ alignItems: 'center', marginBottom: theme.spacing.huge }}>
            <Text style={StyleSheet.flatten([
              theme.typography.heading.h1,
              { color: theme.colors.text.primary }
            ])}>
              Create Account
            </Text>
            <Text style={StyleSheet.flatten([
              theme.typography.body.medium,
              { color: theme.colors.text.secondary, textAlign: 'center' as const }
            ])}>
              Sign up to get started with your new account
            </Text>
          </View>

          {/* Display general registration errors */}
          {errors.general && (
            <View style={createErrorStyles(theme, 'error').container}>
              <Text style={createErrorStyles(theme, 'error').text}>
                {errors.general}
              </Text>
            </View>
          )}

          {/* Registration form with all required fields */}
          <View style={{ marginBottom: theme.spacing.xxl }}>
            <Input
              label="Full Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
              autoCapitalize="words"
              autoComplete="name"
              error={errors.name}
            />

            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={errors.email}
            />

            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              isPassword
              autoCapitalize="none"
              autoComplete="password-new"
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              isPassword
              autoCapitalize="none"
              autoComplete="password-new"
              error={errors.confirmPassword}
            />
          </View>

          {/* Signup button with loading state */}
          <View style={{ marginBottom: theme.spacing.xxl }}>
            <Button
              title="Sign Up"
              onPress={handleSignup}
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </View>

          {/* Footer with navigation to login */}
          <View style={{ 
            alignItems: 'center', 
            paddingTop: theme.spacing.xxl,
            borderTopWidth: 1,
            borderTopColor: theme.colors.border.primary
          }}>
            <Text style={StyleSheet.flatten([
              theme.typography.body.medium,
              { color: theme.colors.text.secondary, marginBottom: theme.spacing.md }
            ])}>
              Already have an account?
            </Text>
            <TouchableOpacity
              style={{ padding: theme.spacing.sm }}
              onPress={navigateToLogin}
              activeOpacity={0.7}
            >
              <Text style={StyleSheet.flatten([
                theme.typography.body.medium,
                { color: theme.colors.text.link, fontWeight: '600' as const }
              ])}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;