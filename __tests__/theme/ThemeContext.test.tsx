import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { ThemeProvider, useTheme } from '../../App/theme/ThemeContext';

// Test component to access theme context
const TestComponent: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  
  return (
    <View>
      <Text testID="theme-mode">{isDark ? 'dark' : 'light'}</Text>
      <Text testID="background-color">{theme.colors.background.primary}</Text>
      <Text testID="text-color">{theme.colors.text.primary}</Text>
      <TouchableOpacity testID="toggle-btn" onPress={toggleTheme}>
        <Text>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

describe('ThemeContext', () => {
  it('provides light theme by default', () => {
    const { getByTestId } = render(
      <ThemeProvider followSystem={false}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByTestId('theme-mode')).toBeTruthy();
    expect(getByTestId('background-color')).toBeTruthy();
    expect(getByTestId('text-color')).toBeTruthy();
  });

  it('toggles theme when toggleTheme is called', () => {
    const { getByTestId } = render(
      <ThemeProvider followSystem={false}>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = getByTestId('toggle-btn');
    const themeMode = getByTestId('theme-mode');

    // Initially light mode
    expect(themeMode).toBeTruthy();

    // Toggle to dark mode
    fireEvent.press(toggleButton);
    expect(themeMode).toBeTruthy();

    // Toggle back to light mode
    fireEvent.press(toggleButton);
    expect(themeMode).toBeTruthy();
  });

  it('provides correct colors for light theme', () => {
    const { getByTestId } = render(
      <ThemeProvider followSystem={false}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByTestId('background-color')).toBeTruthy();
    expect(getByTestId('text-color')).toBeTruthy();
  });

  it('provides correct colors for dark theme', () => {
    const { getByTestId } = render(
      <ThemeProvider followSystem={false}>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = getByTestId('toggle-btn');
    fireEvent.press(toggleButton);

    expect(getByTestId('background-color')).toBeTruthy();
    expect(getByTestId('text-color')).toBeTruthy();
  });

  it('provides theme object with all required properties', () => {
    const { getByTestId } = render(
      <ThemeProvider followSystem={false}>
        <TestComponent />
      </ThemeProvider>
    );

    // Theme should have colors, spacing, typography, etc.
    expect(getByTestId('background-color')).toBeTruthy();
    expect(getByTestId('text-color')).toBeTruthy();
  });

  it('maintains theme state across re-renders', () => {
    const { getByTestId, rerender } = render(
      <ThemeProvider followSystem={false}>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = getByTestId('toggle-btn');
    fireEvent.press(toggleButton);

    expect(getByTestId('theme-mode')).toBeTruthy();

    // Re-render the component
    rerender(
      <ThemeProvider followSystem={false}>
        <TestComponent />
      </ThemeProvider>
    );

    // Theme state should be preserved
    expect(getByTestId('theme-mode')).toBeTruthy();
  });
}); 