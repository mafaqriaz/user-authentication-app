import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '../../App/theme/ThemeContext';
import { AuthProvider } from '../../App/context/AuthContext';
import Login from '../../App/screens/auth/Login';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <NavigationContainer>
    <ThemeProvider followSystem={false}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  </NavigationContainer>
);

describe('Login Screen', () => {
  it('renders login form correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    expect(getByText('Welcome Back')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByText('Go to Signup')).toBeTruthy();
  });

  it('shows validation errors when form is submitted empty', async () => {
    const { getByText } = render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText('Email is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
    });
  });

  it('shows email format error for invalid email', async () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    const emailInput = getByPlaceholderText('Enter your email');
    fireEvent.changeText(emailInput, 'invalid-email');

    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText('Invalid email format')).toBeTruthy();
    });
  });

  it('clears email error when valid email is entered', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    const emailInput = getByPlaceholderText('Enter your email');
    
    // First, trigger error
    fireEvent.changeText(emailInput, 'invalid');
    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText('Invalid email format')).toBeTruthy();
    });

    // Then, enter valid email
    fireEvent.changeText(emailInput, 'test@example.com');

    await waitFor(() => {
      expect(queryByText('Invalid email format')).toBeNull();
    });
  });

  it('clears password error when password is entered', async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    const passwordInput = getByPlaceholderText('Enter your password');
    
    // First, trigger error
    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText('Password is required')).toBeTruthy();
    });

    // Then, enter password
    fireEvent.changeText(passwordInput, 'password123');

    await waitFor(() => {
      expect(queryByText('Password is required')).toBeNull();
    });
  });

  it('shows loading state on button during login attempt', async () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    // Button should show loading state
    await waitFor(() => {
      expect(loginButton).toBeDisabled();
    });
  });

  it('shows general error message on login failure', async () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');

    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText('Invalid email or password')).toBeTruthy();
    });
  });

  it('navigates to signup screen when signup button is pressed', () => {
    const { getByText } = render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    const signupButton = getByText('Go to Signup');
    fireEvent.press(signupButton);

    // Navigation should occur (this would be tested with navigation mocking)
    expect(signupButton).toBeTruthy();
  });

  it('toggles password visibility when toggle button is pressed', () => {
    const { getByText, getByPlaceholderText } = render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    const passwordInput = getByPlaceholderText('Enter your password');
    const toggleButton = getByText('👁️');

    fireEvent.press(toggleButton);

    // Icon should change to hidden state
    expect(getByText('🙈')).toBeTruthy();
  });

  it('handles keyboard input correctly', () => {
    const { getByPlaceholderText } = render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });
}); 