import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  small: {
    height: 36,
    paddingHorizontal: 16,
  },
  medium: {
    height: 48,
    paddingHorizontal: 24,
  },
  large: {
    height: 56,
    paddingHorizontal: 32,
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#f8f9fa',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabled: {
    opacity: 0.6,
    elevation: 0,
    shadowOpacity: 0,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#333',
  },
  outlineText: {
    color: '#007AFF',
  },
  disabledText: {
    opacity: 0.7,
  },
});

export default styles; 