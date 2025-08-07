import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../theme/ThemeContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * Loading Screen Component
 * 
 * Displays a loading spinner while authentication state is being determined
 */
const LoadingScreen: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background.primary }]}>
      <ActivityIndicator size="large" color={theme.colors.interactive.primary} />
    </View>
  );
};

/**
 * Root Navigator Component
 * 
 * Manages the main navigation flow based on authentication state.
 * Shows loading screen while determining auth state,
 * then routes to either auth screens or app screens.
 */
const RootNavigator: React.FC = () => {
  // Get authentication state from context
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();

  // Show loading screen while determining authentication state
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer
      theme={{
        dark: theme.colors.background.primary === '#121212',
        colors: {
          primary: theme.colors.interactive.primary,
          background: theme.colors.background.primary,
          card: theme.colors.surface.primary,
          text: theme.colors.text.primary,
          border: theme.colors.border.primary,
          notification: theme.colors.status.error,
        },
        fonts: {
          regular: { fontFamily: 'System', fontWeight: '400' },
          medium: { fontFamily: 'System', fontWeight: '500' },
          bold: { fontFamily: 'System', fontWeight: '700' },
          heavy: { fontFamily: 'System', fontWeight: '900' },
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          // Use different animation based on auth state for better UX
          animationTypeForReplace: isAuthenticated ? 'push' : 'pop',
        }}
      >
        {isAuthenticated ? (
          // Show authenticated app screens when user is logged in
          <Stack.Screen name="App" component={AppStack} />
        ) : (
          // Show authentication screens when user is not logged in
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootNavigator;