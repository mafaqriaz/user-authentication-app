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
   * Handle name change with error clearing
   */
  const handleNameChange = useCallback((newName: string) => {
    setName(newName);
    
    // Clear general error when user changes name
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }));
    }
    
    // Validate and clear name error if valid
    if (errors.name) {
      const nameError = validateName(newName);
      if (!nameError) {
        setErrors(prev => ({ ...prev, name: undefined }));
      }
    }
  }, [errors.general, errors.name]);

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
    
    // Re-validate confirm password if it exists
    if (confirmPassword && errors.confirmPassword) {
      const confirmPasswordError = validateConfirmPassword(confirmPassword);
      if (!confirmPasswordError) {
        setErrors(prev => ({ ...prev, confirmPassword: undefined }));
      }
    }
  }, [errors.general, errors.password, errors.confirmPassword, confirmPassword]);

  /**
   * Handle confirm password change with error clearing
   */
  const handleConfirmPasswordChange = useCallback((newConfirmPassword: string) => {
    setConfirmPassword(newConfirmPassword);
    
    // Clear general error when user changes confirm password
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }));
    }
    
    // Validate and clear confirm password error if valid
    if (errors.confirmPassword) {
      const confirmPasswordError = validateConfirmPassword(newConfirmPassword);
      if (!confirmPasswordError) {
        setErrors(prev => ({ ...prev, confirmPassword: undefined }));
      }
    }
  }, [errors.general, errors.confirmPassword]);

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
    // Clear all errors before attempting signup
    setErrors({});

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

  return {
    name,
    setName: handleNameChange,
    email,
    setEmail: handleEmailChange,
    password,
    setPassword: handlePasswordChange,
    confirmPassword,
    setConfirmPassword: handleConfirmPasswordChange,
    errors,
    setErrors,
    isSubmitting,
    handleSignup,
    clearErrors,
  };
};

export default useSignup;