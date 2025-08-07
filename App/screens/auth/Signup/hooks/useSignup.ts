import { useState, useCallback } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { SignupErrors } from '../types';

/**
 * Custom Hook for Signup Form Management
 * 
 * Handles signup form state, validation, and submission logic.
 * Provides form data, error handling, and loading states.
 * 
 * @returns Object containing form state and handlers
 */
const useSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<SignupErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signup } = useAuth();

  /**
   * Validate individual name field
   */
  const validateName = (nameValue: string): string | undefined => {
    if (!nameValue.trim()) {
      return 'Name is required';
    } else if (nameValue.trim().length < 2) {
      return 'Name must be at least 2 characters long';
    }
    return undefined;
  };

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
    } else if (passwordValue.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return undefined;
  };

  /**
   * Validate password confirmation
   */
  const validateConfirmPassword = (confirmPasswordValue: string): string | undefined => {
    if (!confirmPasswordValue.trim()) {
      return 'Please confirm your password';
    } else if (password !== confirmPasswordValue) {
      return 'Passwords do not match';
    }
    return undefined;
  };

  /**
   * Validate signup form inputs
   * 
   * @returns boolean - True if form is valid, false otherwise
   */
  const validateForm = (): boolean => {
    const newErrors: SignupErrors = {};

    // Validate name field
    const nameError = validateName(name);
    if (nameError) {
      newErrors.name = nameError;
    }

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

    // Validate password confirmation
    const confirmPasswordError = validateConfirmPassword(confirmPassword);
    if (confirmPasswordError) {
      newErrors.confirmPassword = confirmPasswordError;
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
      name: undefined,
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
    }));
  }, []);

  /**
   * Handle signup form submission
   * Validates form, calls registration API, and handles errors
   */
  const handleSignup = async () => {
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
      // Attempt to register new user
      const result = await signup(name.trim(), email.trim(), password);
      
      if (!result.success) {
        setErrors({ general: result.error || 'Signup failed' });
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
    clearErrors,
  };
};

export default useSignup;