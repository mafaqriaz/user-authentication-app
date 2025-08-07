import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, AuthState, AuthContextType, AuthAction } from './types';

/**
 * Authentication Context
 * 
 * Provides global authentication state management using React Context API.
 * Handles user login, signup, logout, and session persistence.
 * 
 * Features:
 * - User authentication state management
 * - Session persistence with AsyncStorage
 * - Form validation and error handling
 * - Local user credential storage using AsyncStorage
 * - Email uniqueness validation
 */

// Initial authentication state
const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
};

/**
 * Authentication reducer for state management
 * 
 * Handles all authentication-related state changes:
 * - SET_LOADING: Updates loading state
 * - LOGIN_SUCCESS: Sets user data and authentication status
 * - LOGOUT: Clears user data and authentication status
 * - RESTORE_USER: Restores user from persistent storage
 */
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'RESTORE_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Storage keys for AsyncStorage
 */
const STORAGE_KEYS = {
  USER: 'user',
  USERS: 'users',
  PASSWORDS: 'passwords',
} as const;

/**
 * Authentication Provider Component
 * 
 * Wraps the app with authentication context and provides
 * all authentication-related functionality.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from AsyncStorage on app start
  useEffect(() => {
    loadStoredUser();
  }, []);

  /**
   * Load user data from AsyncStorage on app initialization
   * Restores user session if previously logged in
   */
  const loadStoredUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'RESTORE_USER', payload: user });
      } else {
        dispatch({ type: 'RESTORE_USER', payload: null });
      }
    } catch (error) {
      console.error('Error loading stored user:', error);
      dispatch({ type: 'RESTORE_USER', payload: null });
    }
  };

  /**
   * Get all registered users from AsyncStorage
   * 
   * @returns Promise<User[]> - Array of registered users
   */
  const getStoredUsers = async (): Promise<User[]> => {
    try {
      const storedUsers = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
      return storedUsers ? JSON.parse(storedUsers) : [];
    } catch (error) {
      console.error('Error loading stored users:', error);
      return [];
    }
  };

  /**
   * Get stored passwords from AsyncStorage
   * 
   * @returns Promise<Record<string, string>> - Object with email-password pairs
   */
  const getStoredPasswords = async (): Promise<Record<string, string>> => {
    try {
      const storedPasswords = await AsyncStorage.getItem(STORAGE_KEYS.PASSWORDS);
      return storedPasswords ? JSON.parse(storedPasswords) : {};
    } catch (error) {
      console.error('Error loading stored passwords:', error);
      return {};
    }
  };

  /**
   * Validate email format using regex
   * 
   * @param email - Email string to validate
   * @returns boolean - True if email format is valid
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Authenticate user with email and password
   * 
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise with success status and optional error message
   */
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate required fields
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }

      // Validate email format
      if (!validateEmail(email)) {
        return { success: false, error: 'Invalid email format' };
      }

      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get stored users and passwords from AsyncStorage
      const storedUsers = await getStoredUsers();
      const storedPasswords = await getStoredPasswords();

      // Check credentials against stored data
      const user = storedUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      const storedPassword = storedPasswords[email.toLowerCase()];

      if (!user || storedPassword !== password) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Store user session in AsyncStorage for persistence
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

      // Increment session count
      try {
        const sessionCountKey = 'user_session_count';
        const currentCount = await AsyncStorage.getItem(sessionCountKey);
        const newCount = currentCount ? parseInt(currentCount, 10) + 1 : 1;
        await AsyncStorage.setItem(sessionCountKey, newCount.toString());
      } catch (error) {
        console.error('Error updating session count:', error);
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An error occurred during login' };
    }
  };

  /**
   * Register a new user account
   * 
   * @param name - User's full name
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise with success status and optional error message
   */
  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Validate required fields
      if (!name || !email || !password) {
        return { success: false, error: 'All fields are required' };
      }

      // Validate email format
      if (!validateEmail(email)) {
        return { success: false, error: 'Invalid email format' };
      }

      // Validate password strength
      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long' };
      }

      // Get stored users to check for existing email
      const storedUsers = await getStoredUsers();
      const existingUser = storedUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        return { success: false, error: 'User with this email already exists' };
      }

      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create new user object
      const newUser: User = {
        id: Date.now().toString(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
      };

      // Add new user to stored users
      const updatedUsers = [...storedUsers, newUser];
      await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(updatedUsers));

      // Store password in AsyncStorage
      const storedPasswords = await getStoredPasswords();
      const updatedPasswords = { ...storedPasswords, [newUser.email]: password };
      await AsyncStorage.setItem(STORAGE_KEYS.PASSWORDS, JSON.stringify(updatedPasswords));

      // Store user session in AsyncStorage for persistence
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));

      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'An error occurred during signup' };
    }
  };

  /**
   * Logout current user and clear session
   * 
   * @returns Promise that resolves when logout is complete
   */
  const logout = async (): Promise<void> => {
    try {
      // Remove user data from AsyncStorage
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
      // Update authentication state
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};