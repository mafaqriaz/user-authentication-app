import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../../theme/ThemeContext';
import { createCardStyles } from '../../../theme/utils';
import Button from '../../../components/Button';
import useHome from './hooks/useHome';
import styles from './styles';
import { HomeScreenProps } from './types';

/**
 * Home Screen Component
 * 
 * Displays the authenticated user's dashboard with user information,
 * account statistics, and logout functionality.
 * 
 * Features:
 * - User profile display with avatar
 * - Account information (name, email, user ID)
 * - Account statistics cards with session tracking
 * - Logout functionality with confirmation
 * - Professional dashboard layout with dark mode support
 */
const Home: React.FC<HomeScreenProps> = () => {
  const { theme } = useTheme();
  const {
    user,
    sessionCount,
    sessionLoading,
    getUserInitials,
    handleLogout,
  } = useHome();

  // Get theme-aware styles
  const cardStyles = createCardStyles(theme, true);

  return (
    <SafeAreaView style={StyleSheet.flatten([
      styles.container,
      { backgroundColor: theme.colors.background.primary }
    ])}>
      <View style={StyleSheet.flatten([
        styles.content,
        { paddingHorizontal: theme.spacing.xxl, paddingVertical: theme.spacing.huge }
      ])}>
        {/* Header section with welcome message */}
        <View style={StyleSheet.flatten([
          styles.header,
          { marginBottom: theme.spacing.huge }
        ])}>
          <Text style={StyleSheet.flatten([
            styles.welcomeText,
            { color: theme.colors.text.secondary }
          ])}>
            Welcome!
          </Text>
          <Text style={StyleSheet.flatten([
            styles.title,
            { color: theme.colors.text.primary }
          ])}>
            Dashboard
          </Text>
        </View>

        {/* User profile card with avatar and information */}
        <View style={StyleSheet.flatten([
          styles.userCard,
          cardStyles,
          { marginBottom: theme.spacing.huge }
        ])}>
          {/* User avatar with initials */}
          <View style={StyleSheet.flatten([
            styles.avatar,
            { backgroundColor: theme.colors.interactive.primary }
          ])}>
            <Text style={StyleSheet.flatten([
              styles.avatarText,
              { color: theme.colors.text.inverse }
            ])}>
              {getUserInitials()}
            </Text>
          </View>
          
          {/* User information display */}
          <View style={StyleSheet.flatten([
            styles.userInfo,
            { marginBottom: theme.spacing.lg }
          ])}>
            <Text style={StyleSheet.flatten([
              styles.userInfoLabel,
              { color: theme.colors.text.secondary }
            ])}>
              Name
            </Text>
            <Text style={StyleSheet.flatten([
              styles.userInfoValue,
              { color: theme.colors.text.primary }
            ])}>
              {user?.name}
            </Text>
          </View>

          <View style={StyleSheet.flatten([
            styles.userInfo,
            { marginBottom: theme.spacing.lg }
          ])}>
            <Text style={StyleSheet.flatten([
              styles.userInfoLabel,
              { color: theme.colors.text.secondary }
            ])}>
              Email
            </Text>
            <Text style={StyleSheet.flatten([
              styles.userInfoValue,
              { color: theme.colors.text.primary }
            ])}>
              {user?.email}
            </Text>
          </View>

          <View style={StyleSheet.flatten([
            styles.userInfo,
            { marginBottom: theme.spacing.lg }
          ])}>
            <Text style={StyleSheet.flatten([
              styles.userInfoLabel,
              { color: theme.colors.text.secondary }
            ])}>
              User ID
            </Text>
            <Text style={StyleSheet.flatten([
              styles.userInfoValue,
              { color: theme.colors.text.primary }
            ])}>
              {user?.id}
            </Text>
          </View>
        </View>

        {/* Account statistics cards */}
        <View style={StyleSheet.flatten([
          styles.statsContainer,
          { marginBottom: theme.spacing.huge }
        ])}>
          <View style={StyleSheet.flatten([
            styles.statCard,
            cardStyles,
            { marginHorizontal: theme.spacing.sm }
          ])}>
            <Text style={StyleSheet.flatten([
              styles.statNumber,
              { color: theme.colors.interactive.primary }
            ])}>
              {sessionLoading ? '...' : sessionCount}
            </Text>
            <Text style={StyleSheet.flatten([
              styles.statLabel,
              { color: theme.colors.text.secondary }
            ])}>
              Total Sessions
            </Text>
          </View>
          
          <View style={StyleSheet.flatten([
            styles.statCard,
            cardStyles,
            { marginHorizontal: theme.spacing.sm }
          ])}>
            <Text style={StyleSheet.flatten([
              styles.statNumber,
              { color: theme.colors.status.success }
            ])}>
              ✓
            </Text>
            <Text style={StyleSheet.flatten([
              styles.statLabel,
              { color: theme.colors.text.secondary }
            ])}>
              Verified Account
            </Text>
          </View>
        </View>

        {/* Account actions section */}
        <View style={StyleSheet.flatten([
          styles.actionSection,
          { marginTop: theme.spacing.lg }
        ])}>
          <Text style={StyleSheet.flatten([
            styles.sectionTitle,
            { color: theme.colors.text.primary, marginBottom: theme.spacing.lg }
          ])}>
            Account Actions
          </Text>
          
          <Button
            title="Logout"
            variant="outline"
            onPress={handleLogout}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;