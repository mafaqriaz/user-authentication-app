import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Custom Hook for Session Count Management
 * 
 * Manages the total number of user sessions with AsyncStorage persistence.
 * Increments session count on each login and persists the data locally.
 * 
 * @returns Object containing session count and increment function
 */
const useSessionCount = () => {
  const [sessionCount, setSessionCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const SESSION_COUNT_KEY = 'user_session_count';

  /**
   * Load session count from AsyncStorage on component mount
   */
  useEffect(() => {
    loadSessionCount();
  }, []);

  /**
   * Load session count from AsyncStorage
   */
  const loadSessionCount = async () => {
    try {
      const storedCount = await AsyncStorage.getItem(SESSION_COUNT_KEY);
      if (storedCount) {
        setSessionCount(parseInt(storedCount, 10));
      } else {
        // Initialize with 1 for first session
        setSessionCount(1);
        await AsyncStorage.setItem(SESSION_COUNT_KEY, '1');
      }
    } catch (error) {
      console.error('Error loading session count:', error);
      setSessionCount(1);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Increment session count and save to AsyncStorage
   */
  const incrementSessionCount = async () => {
    try {
      const newCount = sessionCount + 1;
      setSessionCount(newCount);
      await AsyncStorage.setItem(SESSION_COUNT_KEY, newCount.toString());
    } catch (error) {
      console.error('Error saving session count:', error);
    }
  };

  /**
   * Reset session count (for testing purposes)
   */
  const resetSessionCount = async () => {
    try {
      setSessionCount(1);
      await AsyncStorage.setItem(SESSION_COUNT_KEY, '1');
    } catch (error) {
      console.error('Error resetting session count:', error);
    }
  };

  return {
    sessionCount,
    isLoading,
    incrementSessionCount,
    resetSessionCount,
  };
};

export default useSessionCount; 