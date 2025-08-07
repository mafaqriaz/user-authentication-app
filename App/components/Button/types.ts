import { TouchableOpacityProps } from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
}

export interface ButtonStyles {
  button: any;
  small: any;
  medium: any;
  large: any;
  primary: any;
  secondary: any;
  outline: any;
  disabled: any;
  text: any;
  smallText: any;
  mediumText: any;
  largeText: any;
  primaryText: any;
  secondaryText: any;
  outlineText: any;
  disabledText: any;
} 