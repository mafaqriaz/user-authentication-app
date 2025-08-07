import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '../../App/theme/ThemeContext';
import Button from '../../App/components/Button';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider followSystem={false}>
    {children}
  </ThemeProvider>
);

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(
      <TestWrapper>
        <Button title="Test Button" />
      </TestWrapper>
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('renders with custom variant', () => {
    const { getByText } = render(
      <TestWrapper>
        <Button title="Secondary Button" variant="secondary" />
      </TestWrapper>
    );

    expect(getByText('Secondary Button')).toBeTruthy();
  });

  it('renders with custom size', () => {
    const { getByText } = render(
      <TestWrapper>
        <Button title="Large Button" size="large" />
      </TestWrapper>
    );

    expect(getByText('Large Button')).toBeTruthy();
  });

  it('shows loading state when loading prop is true', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <Button title="Loading Button" loading={true} />
      </TestWrapper>
    );

    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper>
        <Button title="Clickable Button" onPress={onPress} />
      </TestWrapper>
    );

    const button = getByText('Clickable Button');
    fireEvent.press(button);

    expect(onPress).toHaveBeenCalledTimes(1);
  });
}); 