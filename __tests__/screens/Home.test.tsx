import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '../../App/theme/ThemeContext';
import { AuthProvider } from '../../App/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from '../../App/screens/authenticated/Home';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <NavigationContainer>
    <ThemeProvider followSystem={false}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  </NavigationContainer>
);

describe('Home Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders home screen correctly with user info', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    mockGetItem.mockImplementation((key: string) => {
      if (key === 'user') {
        return Promise.resolve(JSON.stringify({
          name: 'John Doe',
          email: 'test@example.com'
        }));
      }
      if (key === 'user_session_count') {
        return Promise.resolve('5');
      }
      return Promise.resolve(null);
    });

    const { getByText, waitForNextUpdate } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    await waitForNextUpdate();

    expect(getByText('Welcome, John Doe!')).toBeTruthy();
    expect(getByText('test@example.com')).toBeTruthy();
    expect(getByText('Total Sessions: 5')).toBeTruthy();
    expect(getByText('Logout')).toBeTruthy();
  });

  it('displays user initials correctly', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    mockGetItem.mockImplementation((key: string) => {
      if (key === 'user') {
        return Promise.resolve(JSON.stringify({
          name: 'John Doe',
          email: 'test@example.com'
        }));
      }
      if (key === 'user_session_count') {
        return Promise.resolve('3');
      }
      return Promise.resolve(null);
    });

    const { getByText, waitForNextUpdate } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    await waitForNextUpdate();

    // Should display initials "JD" for "John Doe"
    expect(getByText('JD')).toBeTruthy();
  });

  it('displays single initial for single name', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    mockGetItem.mockImplementation((key: string) => {
      if (key === 'user') {
        return Promise.resolve(JSON.stringify({
          name: 'John',
          email: 'test@example.com'
        }));
      }
      if (key === 'user_session_count') {
        return Promise.resolve('1');
      }
      return Promise.resolve(null);
    });

    const { getByText, waitForNextUpdate } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    await waitForNextUpdate();

    // Should display single initial "J" for "John"
    expect(getByText('J')).toBeTruthy();
  });

  it('handles logout correctly', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    const mockRemoveItem = AsyncStorage.removeItem as jest.MockedFunction<typeof AsyncStorage.removeItem>;
    
    mockGetItem.mockImplementation((key: string) => {
      if (key === 'user') {
        return Promise.resolve(JSON.stringify({
          name: 'John Doe',
          email: 'test@example.com'
        }));
      }
      if (key === 'user_session_count') {
        return Promise.resolve('5');
      }
      return Promise.resolve(null);
    });

    const { getByText, waitForNextUpdate } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    await waitForNextUpdate();

    const logoutButton = getByText('Logout');
    fireEvent.press(logoutButton);

    // Should call removeItem to clear user data
    expect(mockRemoveItem).toHaveBeenCalledWith('user');
  });

  it('displays session count correctly', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    mockGetItem.mockImplementation((key: string) => {
      if (key === 'user') {
        return Promise.resolve(JSON.stringify({
          name: 'John Doe',
          email: 'test@example.com'
        }));
      }
      if (key === 'user_session_count') {
        return Promise.resolve('10');
      }
      return Promise.resolve(null);
    });

    const { getByText, waitForNextUpdate } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    await waitForNextUpdate();

    expect(getByText('Total Sessions: 10')).toBeTruthy();
  });

  it('handles missing session count gracefully', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    mockGetItem.mockImplementation((key: string) => {
      if (key === 'user') {
        return Promise.resolve(JSON.stringify({
          name: 'John Doe',
          email: 'test@example.com'
        }));
      }
      return Promise.resolve(null);
    });

    const { getByText, waitForNextUpdate } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    await waitForNextUpdate();

    // Should default to 1 session
    expect(getByText('Total Sessions: 1')).toBeTruthy();
  });

  it('handles AsyncStorage errors gracefully', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    mockGetItem.mockRejectedValue(new Error('Storage error'));

    const { getByText, waitForNextUpdate } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    await waitForNextUpdate();

    // Should still render with default values
    expect(getByText('Welcome, User!')).toBeTruthy();
    expect(getByText('user@example.com')).toBeTruthy();
    expect(getByText('Total Sessions: 1')).toBeTruthy();
  });

  it('displays user stats correctly', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    mockGetItem.mockImplementation((key: string) => {
      if (key === 'user') {
        return Promise.resolve(JSON.stringify({
          name: 'Jane Smith',
          email: 'jane@example.com'
        }));
      }
      if (key === 'user_session_count') {
        return Promise.resolve('7');
      }
      return Promise.resolve(null);
    });

    const { getByText, waitForNextUpdate } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    await waitForNextUpdate();

    expect(getByText('Welcome, Jane Smith!')).toBeTruthy();
    expect(getByText('jane@example.com')).toBeTruthy();
    expect(getByText('Total Sessions: 7')).toBeTruthy();
    expect(getByText('JS')).toBeTruthy(); // Initials for "Jane Smith"
  });

  it('handles empty user data gracefully', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    mockGetItem.mockResolvedValue(null);

    const { getByText, waitForNextUpdate } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    await waitForNextUpdate();

    // Should display default values
    expect(getByText('Welcome, User!')).toBeTruthy();
    expect(getByText('user@example.com')).toBeTruthy();
    expect(getByText('Total Sessions: 1')).toBeTruthy();
  });

  it('handles invalid user data gracefully', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    mockGetItem.mockImplementation((key: string) => {
      if (key === 'user') {
        return Promise.resolve('invalid-json');
      }
      if (key === 'user_session_count') {
        return Promise.resolve('invalid-count');
      }
      return Promise.resolve(null);
    });

    const { getByText, waitForNextUpdate } = render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    await waitForNextUpdate();

    // Should display default values when data is invalid
    expect(getByText('Welcome, User!')).toBeTruthy();
    expect(getByText('user@example.com')).toBeTruthy();
    expect(getByText('Total Sessions: 1')).toBeTruthy();
  });
}); 