import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider, useTheme } from '../../App/theme/ThemeContext';

// Test component to access theme context
const TestComponent: React.FC = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  
  return (
    <>
      <div data-testid="theme-mode">{isDarkMode ? 'dark' : 'light'}</div>
      <div data-testid="background-color">{theme.colors.background.primary}</div>
      <div data-testid="text-color">{theme.colors.text.primary}</div>
      <button data-testid="toggle-btn" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </>
  );
};

describe('ThemeContext', () => {
  it('provides light theme by default', () => {
    const { getByTestId } = render(
      <ThemeProvider followSystem={false}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByTestId('theme-mode')).toHaveTextContent('light');
    expect(getByTestId('background-color')).toHaveTextContent('#ffffff');
    expect(getByTestId('text-color')).toHaveTextContent('#000000');
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
    expect(themeMode).toHaveTextContent('light');

    // Toggle to dark mode
    fireEvent.press(toggleButton);
    expect(themeMode).toHaveTextContent('dark');

    // Toggle back to light mode
    fireEvent.press(toggleButton);
    expect(themeMode).toHaveTextContent('light');
  });

  it('provides correct colors for light theme', () => {
    const { getByTestId } = render(
      <ThemeProvider followSystem={false}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByTestId('background-color')).toHaveTextContent('#ffffff');
    expect(getByTestId('text-color')).toHaveTextContent('#000000');
  });

  it('provides correct colors for dark theme', () => {
    const { getByTestId } = render(
      <ThemeProvider followSystem={false}>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = getByTestId('toggle-btn');
    fireEvent.press(toggleButton);

    expect(getByTestId('background-color')).toHaveTextContent('#121212');
    expect(getByTestId('text-color')).toHaveTextContent('#ffffff');
  });

  it('initializes with dark mode when followSystem is true and system is dark', () => {
    // Mock system color scheme
    const mockColorScheme = jest.fn(() => 'dark');
    jest.doMock('react-native', () => ({
      ...jest.requireActual('react-native'),
      Appearance: {
        getColorScheme: mockColorScheme,
      },
    }));

    const { getByTestId } = render(
      <ThemeProvider followSystem={true}>
        <TestComponent />
      </ThemeProvider>
    );

    expect(getByTestId('theme-mode')).toHaveTextContent('dark');
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

    expect(getByTestId('theme-mode')).toHaveTextContent('dark');

    // Re-render the component
    rerender(
      <ThemeProvider followSystem={false}>
        <TestComponent />
      </ThemeProvider>
    );

    // Theme state should be preserved
    expect(getByTestId('theme-mode')).toHaveTextContent('dark');
  });

  it('provides semantic colors for different themes', () => {
    const { getByTestId } = render(
      <ThemeProvider followSystem={false}>
        <TestComponent />
      </ThemeProvider>
    );

    // Light theme semantic colors
    expect(getByTestId('background-color')).toHaveTextContent('#ffffff');

    // Toggle to dark theme
    const toggleButton = getByTestId('toggle-btn');
    fireEvent.press(toggleButton);

    // Dark theme semantic colors
    expect(getByTestId('background-color')).toHaveTextContent('#121212');
  });

  it('handles theme toggle without errors', () => {
    const { getByTestId } = render(
      <ThemeProvider followSystem={false}>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = getByTestId('toggle-btn');

    // Multiple toggles should work without errors
    fireEvent.press(toggleButton);
    fireEvent.press(toggleButton);
    fireEvent.press(toggleButton);
    fireEvent.press(toggleButton);

    expect(getByTestId('theme-mode')).toHaveTextContent('light');
  });
}); 