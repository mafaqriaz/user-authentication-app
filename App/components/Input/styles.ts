import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  eyeIcon: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeText: {
    fontSize: 18,
  },
  rightIconContainer: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 6,
    marginLeft: 4,
    lineHeight: 18,
  },
});

export default styles; 