import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, useAuth } from '../../App/context/AuthContext';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Test component to access auth context
const TestComponent: React.FC = () => {
  const { user, login, signup, logout, isLoading } = useAuth();
  
  return (
    <>
      <div data-testid="user-info">
        {user ? `${user.name} - ${user.email}` : 'Not logged in'}
      </div>
      <div data-testid="loading">{isLoading ? 'Loading' : 'Not loading'}</div>
      <button data-testid="login-btn" onClick={() => login('test@example.com', 'password123')}>
        Login
      </button>
      <button data-testid="signup-btn" onClick={() => signup('John Doe', 'test@example.com', 'password123')}>
        Signup
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
    </>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides initial state correctly', () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByTestId('user-info')).toHaveTextContent('Not logged in');
    expect(getByTestId('loading')).toHaveTextContent('Not loading');
  });

  it('loads user from AsyncStorage on mount', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    mockGetItem.mockResolvedValue(JSON.stringify({
      name: 'John Doe',
      email: 'test@example.com'
    }));

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId('user-info')).toHaveTextContent('John Doe - test@example.com');
    });
  });

  it('handles successful signup', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    const mockSetItem = AsyncStorage.setItem as jest.MockedFunction<typeof AsyncStorage.setItem>;
    mockGetItem.mockResolvedValue(null);

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const signupBtn = getByTestId('signup-btn');
    fireEvent.press(signupBtn);

    await waitFor(() => {
      expect(getByTestId('user-info')).toHaveTextContent('John Doe - test@example.com');
    });

    expect(mockSetItem).toHaveBeenCalledWith('user', JSON.stringify({
      name: 'John Doe',
      email: 'test@example.com'
    }));
  });

  it('handles successful login with existing user', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    const mockSetItem = AsyncStorage.setItem as jest.MockedFunction<typeof AsyncStorage.setItem>;
    
    // Mock existing user data
    mockGetItem.mockImplementation((key: string) => {
      if (key === 'users') {
        return Promise.resolve(JSON.stringify([{
          name: 'John Doe',
          email: 'test@example.com',
          password: 'password123'
        }]));
      }
      return Promise.resolve(null);
    });

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = getByTestId('login-btn');
    fireEvent.press(loginBtn);

    await waitFor(() => {
      expect(getByTestId('user-info')).toHaveTextContent('John Doe - test@example.com');
    });

    expect(mockSetItem).toHaveBeenCalledWith('user', JSON.stringify({
      name: 'John Doe',
      email: 'test@example.com'
    }));
  });

  it('handles login failure with invalid credentials', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    mockGetItem.mockResolvedValue(null);

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = getByTestId('login-btn');
    fireEvent.press(loginBtn);

    await waitFor(() => {
      expect(getByTestId('user-info')).toHaveTextContent('Not logged in');
    });
  });

  it('handles logout correctly', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    const mockRemoveItem = AsyncStorage.removeItem as jest.MockedFunction<typeof AsyncStorage.removeItem>;
    mockGetItem.mockResolvedValue(JSON.stringify({
      name: 'John Doe',
      email: 'test@example.com'
    }));

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId('user-info')).toHaveTextContent('John Doe - test@example.com');
    });

    const logoutBtn = getByTestId('logout-btn');
    fireEvent.press(logoutBtn);

    await waitFor(() => {
      expect(getByTestId('user-info')).toHaveTextContent('Not logged in');
    });

    expect(mockRemoveItem).toHaveBeenCalledWith('user');
  });

  it('increments session count on successful login', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    const mockSetItem = AsyncStorage.setItem as jest.MockedFunction<typeof AsyncStorage.setItem>;
    
    mockGetItem.mockImplementation((key: string) => {
      if (key === 'users') {
        return Promise.resolve(JSON.stringify([{
          name: 'John Doe',
          email: 'test@example.com',
          password: 'password123'
        }]));
      }
      if (key === 'user_session_count') {
        return Promise.resolve('5');
      }
      return Promise.resolve(null);
    });

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = getByTestId('login-btn');
    fireEvent.press(loginBtn);

    await waitFor(() => {
      expect(mockSetItem).toHaveBeenCalledWith('user_session_count', '6');
    });
  });

  it('handles AsyncStorage errors gracefully', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    mockGetItem.mockRejectedValue(new Error('Storage error'));

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId('user-info')).toHaveTextContent('Not logged in');
    });
  });
}); 