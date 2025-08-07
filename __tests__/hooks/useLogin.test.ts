import { renderHook, act } from '@testing-library/react-native';
import { AuthProvider } from '../../App/context/AuthContext';
import useLogin from '../../App/screens/auth/Login/hooks/useLogin';

const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);

describe('useLogin Hook', () => {
  it('initializes with empty form state', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper,
    });

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });

  it('updates email state correctly', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.setEmail('test@example.com');
    });

    expect(result.current.email).toBe('test@example.com');
  });

  it('updates password state correctly', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.setPassword('password123');
    });

    expect(result.current.password).toBe('password123');
  });

  it('validates email format correctly', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.setEmail('invalid-email');
    });

    act(() => {
      result.current.handleLogin();
    });

    expect(result.current.errors.email).toBe('Invalid email format');
  });

  it('validates required fields correctly', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.handleLogin();
    });

    expect(result.current.errors.email).toBe('Email is required');
    expect(result.current.errors.password).toBe('Password is required');
  });

  it('clears email error when valid email is entered', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper,
    });

    // Set invalid email first
    act(() => {
      result.current.setEmail('invalid');
    });

    act(() => {
      result.current.handleLogin();
    });

    expect(result.current.errors.email).toBe('Invalid email format');

    // Set valid email
    act(() => {
      result.current.setEmail('test@example.com');
    });

    // Error should be cleared
    expect(result.current.errors.email).toBeUndefined();
  });

  it('clears password error when password is entered', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper,
    });

    // Set empty password first
    act(() => {
      result.current.setPassword('');
    });

    act(() => {
      result.current.handleLogin();
    });

    expect(result.current.errors.password).toBe('Password is required');

    // Set password
    act(() => {
      result.current.setPassword('password123');
    });

    // Error should be cleared
    expect(result.current.errors.password).toBeUndefined();
  });

  it('sets loading state during login attempt', async () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.setEmail('test@example.com');
      result.current.setPassword('password123');
    });

    act(() => {
      result.current.handleLogin();
    });

    expect(result.current.isSubmitting).toBe(true);
  });

  it('clears all errors when clearErrors is called', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: TestWrapper,
    });

    act(() => {
      result.current.setErrors({
        email: 'Invalid email',
        password: 'Password required',
        general: 'Login failed',
      });
    });

    expect(result.current.errors.email).toBe('Invalid email');
    expect(result.current.errors.password).toBe('Password required');
    expect(result.current.errors.general).toBe('Login failed');

    act(() => {
      result.current.clearErrors();
    });

    expect(result.current.errors).toEqual({});
  });
}); 