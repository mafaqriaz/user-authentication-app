import React from 'react';
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
import useLogin from './hooks/useLogin';

/**
 * Login Screen Component
 * 
 * Displays the login form with email and password inputs.
 * Handles form validation, error display, and navigation to signup.
 * 
 * Features:
 * - Email and password input fields
 * - Form validation with error messages
 * - Loading states during authentication
 * - Navigation to signup screen
 * - Test credentials display for easy testing
 */
const Login: React.FC = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  
  // Get login form state and handlers from custom hook
  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isSubmitting,
    handleLogin,
  } = useLogin();

  /**
   * Navigate to the signup screen
   */
  const navigateToSignup = () => {
    navigation.navigate('Signup' as never);
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
              Welcome Back
            </Text>
            <Text style={StyleSheet.flatten([
              theme.typography.body.medium,
              { color: theme.colors.text.secondary, textAlign: 'center' as const }
            ])}>
              Sign in to your account to continue
            </Text>
          </View>

          {/* Display general authentication errors */}
          {errors.general && (
            <View style={createErrorStyles(theme, 'error').container}>
              <Text style={createErrorStyles(theme, 'error').text}>
                {errors.general}
              </Text>
            </View>
          )}

          {/* Login form with email and password inputs */}
          <View style={{ marginBottom: theme.spacing.xxl }}>
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
              placeholder="Enter your password"
              isPassword
              autoCapitalize="none"
              autoComplete="password"
              error={errors.password}
            />
          </View>

          {/* Login button with loading state */}
          <View style={{ marginBottom: theme.spacing.xxl }}>
            <Button
              title="Login"
              onPress={handleLogin}
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </View>

          {/* Footer with navigation to signup */}
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
              Don't have an account?
            </Text>
            <TouchableOpacity
              style={{ padding: theme.spacing.sm }}
              onPress={navigateToSignup}
              activeOpacity={0.7}
            >
              <Text style={StyleSheet.flatten([
                theme.typography.body.medium,
                { color: theme.colors.text.link, fontWeight: '600' }
              ])}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;