import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../../../context/AuthContext';
import useSessionCount from './useSessionCount';

/**
 * Custom Hook for Home Screen Management
 * 
 * Handles Home screen logic including logout functionality,
 * session tracking, and user data management.
 * 
 * @returns Object containing Home screen state and handlers
 */
const useHome = () => {
  // Get current user data and logout function from auth context
  const { user, logout } = useAuth();
  
  // Get session count data
  const { sessionCount, isLoading: sessionLoading } = useSessionCount();

  /**
   * Handle logout with confirmation dialog
   * Shows a confirmation alert before logging out the user
   */
  const handleLogout = useCallback(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: logout,
        },
      ],
    );
  }, [logout]);

  /**
   * Get user avatar initials
   * Returns the first letter of the user's name in uppercase
   */
  const getUserInitials = useCallback(() => {
    return user?.name.charAt(0).toUpperCase() || '?';
  }, [user?.name]);

  /**
   * Check if user data is available
   */
  const isUserDataAvailable = !!user;

  return {
    // User data
    user,
    isUserDataAvailable,
    getUserInitials,
    
    // Session data
    sessionCount,
    sessionLoading,
    
    // Handlers
    handleLogout,
  };
};

export default useHome; 