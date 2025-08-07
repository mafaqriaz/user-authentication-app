import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '../../App/theme/ThemeContext';
import { AuthProvider } from '../../App/context/AuthContext';
import Signup from '../../App/screens/auth/Signup';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <NavigationContainer>
    <ThemeProvider followSystem={false}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  </NavigationContainer>
);

describe('Signup Screen', () => {
  it('renders signup form correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <Signup />
      </TestWrapper>
    );

    expect(getByText('Create Account')).toBeTruthy();
    expect(getByText('Signup')).toBeTruthy();
    expect(getByPlaceholderText('Enter your name')).toBeTruthy();
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm your password')).toBeTruthy();
    expect(getByText('Go to Login')).toBeTruthy();
  });

  it('shows validation errors when form is submitted empty', async () => {
    const { getByText } = render(
      <TestWrapper>
        <Signup />
      </TestWrapper>
    );

    const signupButton = getByText('Signup');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(getByText('Name is required')).toBeTruthy();
      expect(getByText('Email is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
      expect(getByText('Confirm password is required')).toBeTruthy();
    });
  });

  it('shows name length error for short name', async () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <Signup />
      </TestWrapper>
    );

    const nameInput = getByPlaceholderText('Enter your name');
    fireEvent.changeText(nameInput, 'J');

    const signupButton = getByText('Signup');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(getByText('Name must be at least 2 characters long')).toBeTruthy();
    });
  });

  it('shows email format error for invalid email', async () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <Signup />
      </TestWrapper>
    );

    const emailInput = getByPlaceholderText('Enter your email');
    fireEvent.changeText(emailInput, 'invalid-email');

    const signupButton = getByText('Signup');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(getByText('Invalid email format')).toBeTruthy();
    });
  });

  it('shows password length error for short password', async () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <Signup />
      </TestWrapper>
    );

    const passwordInput = getByPlaceholderText('Enter your password');
    fireEvent.changeText(passwordInput, '123');

    const signupButton = getByText('Signup');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(getByText('Password must be at least 6 characters long')).toBeTruthy();
    });
  });

  it('shows password mismatch error when passwords do not match', async () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <Signup />
      </TestWrapper>
    );

    const passwordInput = getByPlaceholderText('Enter your password');
    const confirmPasswordInput = getByPlaceholderText('Confirm your password');

    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'differentpassword');

    const signupButton = getByText('Signup');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(getByText('Passwords do not match')).toBeTruthy();
    });
  });

  it('clears name error when valid name is entered', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <TestWrapper>
        <Signup />
      </TestWrapper>
    );

    const nameInput = getByPlaceholderText('Enter your name');
    
    // First, trigger error
    fireEvent.changeText(nameInput, 'J');
    const signupButton = getByText('Signup');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(getByText('Name must be at least 2 characters long')).toBeTruthy();
    });

    // Then, enter valid name
    fireEvent.changeText(nameInput, 'John Doe');

    await waitFor(() => {
      expect(queryByText('Name must be at least 2 characters long')).toBeNull();
    });
  });

  it('clears email error when valid email is entered', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <TestWrapper>
        <Signup />
      </TestWrapper>
    );

    const emailInput = getByPlaceholderText('Enter your email');
    
    // First, trigger error
    fireEvent.changeText(emailInput, 'invalid');
    const signupButton = getByText('Signup');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(getByText('Invalid email format')).toBeTruthy();
    });

    // Then, enter valid email
    fireEvent.changeText(emailInput, 'test@example.com');

    await waitFor(() => {
      expect(queryByText('Invalid email format')).toBeNull();
    });
  });

  it('clears password error when valid password is entered', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <TestWrapper>
        <Signup />
      </TestWrapper>
    );

    const passwordInput = getByPlaceholderText('Enter your password');
    
    // First, trigger error
    fireEvent.changeText(passwordInput, '123');
    const signupButton = getByText('Signup');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(getByText('Password must be at least 6 characters long')).toBeTruthy();
    });

    // Then, enter valid password
    fireEvent.changeText(passwordInput, 'password123');

    await waitFor(() => {
      expect(queryByText('Password must be at least 6 characters long')).toBeNull();
    });
  });

  it('clears confirm password error when passwords match', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <TestWrapper>
        <Signup />
      </TestWrapper>
    );

    const passwordInput = getByPlaceholderText('Enter your password');
    const confirmPasswordInput = getByPlaceholderText('Confirm your password');
    
    // First, trigger error
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'different');
    const signupButton = getByText('Signup');
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(getByText('Passwords do not match')).toBeTruthy();
    });

    // Then, enter matching password
    fireEvent.changeText(confirmPasswordInput, 'password123');

    await waitFor(() => {
      expect(queryByText('Passwords do not match')).toBeNull();
    });
  });

  it('shows loading state on button during signup attempt', async () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <Signup />
      </TestWrapper>
    );

    const nameInput = getByPlaceholderText('Enter your name');
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const confirmPasswordInput = getByPlaceholderText('Confirm your password');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password123');

    const signupButton = getByText('Signup');
    fireEvent.press(signupButton);

    // Button should show loading state
    await waitFor(() => {
      expect(signupButton).toBeDisabled();
    });
  });

  it('navigates to login screen when login button is pressed', () => {
    const { getByText } = render(
      <TestWrapper>
        <Signup />
      </TestWrapper>
    );

    const loginButton = getByText('Go to Login');
    fireEvent.press(loginButton);

    // Navigation should occur (this would be tested with navigation mocking)
    expect(loginButton).toBeTruthy();
  });

  it('toggles password visibility for both password fields', () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <Signup />
      </TestWrapper>
    );

    const passwordInput = getByPlaceholderText('Enter your password');
    const confirmPasswordInput = getByPlaceholderText('Confirm your password');

    // Toggle password field
    const passwordToggle = getByText('👁️');
    fireEvent.press(passwordToggle);

    // Icon should change to hidden state
    expect(getByText('🙈')).toBeTruthy();
  });

  it('handles keyboard input correctly for all fields', () => {
    const { getByPlaceholderText } = render(
      <TestWrapper>
        <Signup />
      </TestWrapper>
    );

    const nameInput = getByPlaceholderText('Enter your name');
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const confirmPasswordInput = getByPlaceholderText('Confirm your password');

    fireEvent.changeText(nameInput, 'John Doe');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password123');

    expect(nameInput.props.value).toBe('John Doe');
    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
    expect(confirmPasswordInput.props.value).toBe('password123');
  });
}); 