import { StyleSheet } from 'react-native';

/**
 * Home Screen Styles
 * 
 * Component-specific styles for the Home screen.
 * Uses base styles that will be enhanced with theme colors.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 16,
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  userCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  userInfo: {
    marginBottom: 16,
  },
  userInfoLabel: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
  userInfoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  actionSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
});

export default styles; 