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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Clear all errors when user starts typing
   */
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  /**
   * Handle email change with error clearing
   */
  const handleEmailChange = useCallback((newEmail: string) => {
    setEmail(newEmail);
    
    // Clear general error when user changes email
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }));
    }
    
    // Validate and clear email error if valid
    if (errors.email) {
      const emailError = validateEmail(newEmail);
      if (!emailError) {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
    }
  }, [errors.general, errors.email]);

  /**
   * Handle password change with error clearing
   */
  const handlePasswordChange = useCallback((newPassword: string) => {
    setPassword(newPassword);
    
    // Clear general error when user changes password
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }));
    }
    
    // Validate and clear password error if valid
    if (errors.password) {
      const passwordError = validatePassword(newPassword);
      if (!passwordError) {
        setErrors(prev => ({ ...prev, password: undefined }));
      }
    }
  }, [errors.general, errors.password]);

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
    // Clear all errors before attempting login
    setErrors({});

    try {
      // Attempt to authenticate user
      const result = await login(email.trim(), password);
      
      if (!result.success) {
        setErrors({ general: result.error || 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    email,
    setEmail: handleEmailChange,
    password,
    setPassword: handlePasswordChange,
    errors,
    setErrors,
    isSubmitting,
    handleLogin,
    clearErrors,
  };
};

export default useLogin;