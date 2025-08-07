import { TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
  rightIcon?: React.ReactNode;
}

export interface InputStyles {
  container: any;
  label: any;
  inputContainer: any;
  input: any;
  inputError: any;
  eyeIcon: any;
  eyeText: any;
  rightIconContainer: any;
  errorText: any;
} 