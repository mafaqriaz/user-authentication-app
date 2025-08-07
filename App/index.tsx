/**
 * User Authentication App
 * 
 * Main application component that sets up the authentication context
 * and navigation structure for the entire app.
 * 
 * Features:
 * - Authentication context provider
 * - Navigation setup with authentication flow
 * - Status bar configuration
 * - Dark/light mode support
 *
 * @format
 */

import React from 'react';
import 'react-native-gesture-handler';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './theme/ThemeContext';
import { RootNavigator } from './navigation';

/**
 * Main App Component
 *
 * Wraps the entire application with authentication and theme contexts,
 * and sets up the navigation structure based on authentication state.
 *
 * @returns JSX.Element - The main app component
 */
function App(): React.JSX.Element {
  return (
    <ThemeProvider followSystem={true}>
      <AuthProvider>
        {/* Root navigation component that handles auth flow */}
        <RootNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
