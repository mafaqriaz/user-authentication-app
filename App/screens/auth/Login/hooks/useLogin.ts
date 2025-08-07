import { useState, useCallback } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { LoginErrors } from '../types';

/**
 * Custom Hook for Login Form Management
 * 
 * Handles login form state, validation, and submission logic.
 * Provides form data, error handling, and loading states.
 * 
 * @returns Object containing form state and handlers
 */
const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();

  /**
   * Validate individual email field
   */
  const validateEmail = (emailValue: string): string | undefined => {
    if (!emailValue.trim()) {
      return 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      return 'Invalid email format';
    }
    return undefined;
  };

  /**
   * Validate individual password field
   */
  const validatePassword = (passwordValue: string): string | undefined => {
    if (!passwordValue.trim()) {
      return 'Password is required';
    }
    return undefined;
  };

  /**
   * Validate login form inputs
   * 
   * @returns boolean - True if form is valid, false otherwise
   */
  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    // Validate email field
    const emailError = validateEmail(email);
    if (emailError) {
      newErrors.email = emailError;
    }

    // Validate password field
    const passwordError = validatePassword(password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Preserve general errors during validation
    if (errors.general) {
      newErrors.general = errors.general;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Clear only field-specific errors while preserving general errors
   */
  const clearFieldErrors = useCallback(() => {
    setErrors(prev => ({
      general: prev.general, // Preserve general errors
      email: undefined,
      password: undefined,
    }));
  }, []);

  /**
   * Handle login form submission
   * Validates form, calls authentication API, and handles errors
   */
  const handleLogin = async () => {
    // Always validate form first, even if fields are empty
    const isValid = validateForm();
    
    if (!isValid) {
      // Small delay to prevent glitch and show errors properly
      await new Promise(resolve => setTimeout(resolve, 100));
      return;
    }

    setIsSubmitting(true);
    // Clear only field errors, preserve general errors
    clearFieldErrors();

    try {
      // Attempt to authenticate user
      const result = await login(email.trim(), password);
      
      if (!result.success) {
        setErrors({ general: result.error || 'Login failed' });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    setErrors,
    isSubmitting,
    handleLogin,
    clearErrors,
  };
};

export default useLogin;