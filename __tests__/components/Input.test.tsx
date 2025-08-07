import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../App/theme/ThemeContext';
import Input from '../../App/components/Input';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider followSystem={false}>
    {children}
  </ThemeProvider>
);

describe('Input Component', () => {
  it('renders correctly with label', () => {
    const { getByText } = render(
      <TestWrapper>
        <Input label="Email" />
      </TestWrapper>
    );

    expect(getByText('Email')).toBeTruthy();
  });

  it('renders with placeholder text', () => {
    const { getByPlaceholderText } = render(
      <TestWrapper>
        <Input label="Email" placeholder="Enter your email" />
      </TestWrapper>
    );

    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
  });

  it('shows error message when error prop is provided', () => {
    const { getByText } = render(
      <TestWrapper>
        <Input label="Email" error="Invalid email format" />
      </TestWrapper>
    );

    expect(getByText('Invalid email format')).toBeTruthy();
  });

  it('handles text input correctly', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <TestWrapper>
        <Input 
          label="Email" 
          placeholder="Enter your email"
          onChangeText={onChangeText}
        />
      </TestWrapper>
    );

    const input = getByPlaceholderText('Enter your email');
    fireEvent.changeText(input, 'test@example.com');

    expect(onChangeText).toHaveBeenCalledWith('test@example.com');
  });

  it('shows password toggle for password input', () => {
    const { getByText } = render(
      <TestWrapper>
        <Input label="Password" isPassword={true} />
      </TestWrapper>
    );

    expect(getByText('👁️')).toBeTruthy();
  });

  it('toggles password visibility when toggle is pressed', () => {
    const { getByText } = render(
      <TestWrapper>
        <Input label="Password" isPassword={true} />
      </TestWrapper>
    );

    const toggleButton = getByText('👁️');
    fireEvent.press(toggleButton);

    expect(getByText('🙈')).toBeTruthy();
  });
}); 