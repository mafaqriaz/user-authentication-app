import { renderHook, act } from '@testing-library/react-native';
import { AuthProvider } from '../../App/context/AuthContext';
import useSignup from '../../App/screens/auth/Signup/hooks/useSignup';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);

describe('useSignup Hook', () => {
  it('initializes with empty form state', () => {
    const { result } = renderHook(() => useSignup(), {
      wrapper: TestWrapper,
    });

    expect(result.current.name).toBe('');
    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.confirmPassword).toBe('');
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it('updates name state correctly', () => {
    const { result } = renderHook(() => useSignup(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.setName('John Doe');
    });

    expect(result.current.name).toBe('John Doe');
  });

  it('updates email state correctly', () => {
    const { result } = renderHook(() => useSignup(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.setEmail('test@example.com');
    });

    expect(result.current.email).toBe('test@example.com');
  });

  it('updates password state correctly', () => {
    const { result } = renderHook(() => useSignup(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.setPassword('password123');
    });

    expect(result.current.password).toBe('password123');
  });

  it('updates confirm password state correctly', () => {
    const { result } = renderHook(() => useSignup(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.setConfirmPassword('password123');
    });

    expect(result.current.confirmPassword).toBe('password123');
  });

  it('validates required fields correctly', () => {
    const { result } = renderHook(() => useSignup(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.handleSignup();
    });

    expect(result.current.errors.name).toBe('Name is required');
    expect(result.current.errors.email).toBe('Email is required');
    expect(result.current.errors.password).toBe('Password is required');
    expect(result.current.errors.confirmPassword).toBe('Confirm password is required');
  });

  it('validates name length correctly', () => {
    const { result } = renderHook(() => useSignup(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.setName('J');
    });

    act(() => {
      result.current.handleSignup();
    });

    expect(result.current.errors.name).toBe('Name must be at least 2 characters long');
  });

  it('validates email format correctly', () => {
    const { result } = renderHook(() => useSignup(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.setEmail('invalid-email');
    });

    act(() => {
      result.current.handleSignup();
    });

    expect(result.current.errors.email).toBe('Invalid email format');
  });

  it('validates password length correctly', () => {
    const { result } = renderHook(() => useSignup(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.setPassword('123');
    });

    act(() => {
      result.current.handleSignup();
    });

    expect(result.current.errors.password).toBe('Password must be at least 6 characters long');
  });

  it('validates password confirmation correctly', () => {
    const { result } = renderHook(() => useSignup(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.setPassword('password123');
      result.current.setConfirmPassword('differentpassword');
    });

    act(() => {
      result.current.handleSignup();
    });

    expect(result.current.errors.confirmPassword).toBe('Passwords do not match');
  });

  it('clears name error when valid name is entered', () => {
    const { result } = renderHook(() => useSignup(), {
      wrapper: TestWrapper,
    });

    // Set invalid name first
    act(() => {
      result.current.setName('J');
    });

    act(() => {
      result.current.handleSignup();
    });

    expect(result.current.errors.name).toBe('Name must be at least 2 characters long');

    // Set valid name
    act(() => {
      result.current.setName('John Doe');
    });

    // Error should be cleared
    expect(result.current.errors.name).toBeUndefined();
  });

  it('clears email error when valid email is entered', () => {
    const { result } = renderHook(() => useSignup(), {
      wrapper: TestWrapper,
    });

    // Set invalid email first
    act(() => {
      result.current.setEmail('invalid');
    });

    act(() => {
      result.current.handleSignup();
    });

    expect(result.current.errors.email).toBe('Invalid email format');

    // Set valid email
    act(() => {
      result.current.setEmail('test@example.com');
    });

    // Error should be cleared
    expect(result.current.errors.email).toBeUndefined();
  });

  it('clears password error when valid password is entered', () => {
    const { result } = renderHook(() => useSignup(), {
      wrapper: TestWrapper,
    });

    // Set invalid password first
    act(() => {
      result.current.setPassword('123');
    });

    act(() => {
      result.current.handleSignup();
    });

    expect(result.current.errors.password).toBe('Password must be at least 6 characters long');

    // Set valid password
    act(() => {
      result.current.setPassword('password123');
    });

    // Error should be cleared
    expect(result.current.errors.password).toBeUndefined();
  });

  it('clears confirm password error when passwords match', () => {
    const { result } = renderHook(() => useSignup(), {
      wrapper: TestWrapper,
    });

    // Set mismatched passwords first
    act(() => {
      result.current.setPassword('password123');
      result.current.setConfirmPassword('different');
    });

    act(() => {
      result.current.handleSignup();
    });

    expect(result.current.errors.confirmPassword).toBe('Passwords do not match');

    // Set matching passwords
    act(() => {
      result.current.setConfirmPassword('password123');
    });

    // Error should be cleared
    expect(result.current.errors.confirmPassword).toBeUndefined();
  });

  it('sets loading state during signup attempt', async () => {
    const { result } = renderHook(() => useSignup(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.setName('John Doe');
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
      result.current.setConfirmPassword('password123');
    });

    act(() => {
      result.current.handleSignup();
    });

    expect(result.current.isSubmitting).toBe(true);
  });

  it('clears all errors when clearErrors is called', () => {
    const { result } = renderHook(() => useSignup(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.setErrors({
        name: 'Invalid name',
        email: 'Invalid email',
        password: 'Password required',
        confirmPassword: 'Passwords do not match',
        general: 'Signup failed',
      });
    });

    expect(result.current.errors.name).toBe('Invalid name');
    expect(result.current.errors.email).toBe('Invalid email');
    expect(result.current.errors.password).toBe('Password required');
    expect(result.current.errors.confirmPassword).toBe('Passwords do not match');
    expect(result.current.errors.general).toBe('Signup failed');

    act(() => {
      result.current.clearErrors();
    });

    expect(result.current.errors).toEqual({});
  });
}); 