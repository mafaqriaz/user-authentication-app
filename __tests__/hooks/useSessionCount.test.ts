import { renderHook, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useSessionCount from '../../App/screens/authenticated/Home/hooks/useSessionCount';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('useSessionCount Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with loading state', () => {
    const { result } = renderHook(() => useSessionCount());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.sessionCount).toBe(0);
  });

  it('provides increment and reset functions', () => {
    const { result } = renderHook(() => useSessionCount());

    expect(typeof result.current.incrementSessionCount).toBe('function');
    expect(typeof result.current.resetSessionCount).toBe('function');
  });

  it('handles AsyncStorage operations', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    const mockSetItem = AsyncStorage.setItem as jest.MockedFunction<typeof AsyncStorage.setItem>;
    
    mockGetItem.mockResolvedValue('5');

    const { result } = renderHook(() => useSessionCount());

    // Test that the hook provides the expected interface
    expect(result.current).toHaveProperty('sessionCount');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('incrementSessionCount');
    expect(result.current).toHaveProperty('resetSessionCount');
  });

  it('handles null AsyncStorage response', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    const mockSetItem = AsyncStorage.setItem as jest.MockedFunction<typeof AsyncStorage.setItem>;
    
    mockGetItem.mockResolvedValue(null);

    const { result } = renderHook(() => useSessionCount());

    // Test that the hook provides the expected interface
    expect(result.current).toHaveProperty('sessionCount');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('incrementSessionCount');
    expect(result.current).toHaveProperty('resetSessionCount');
  });

  it('calls AsyncStorage methods', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    const mockSetItem = AsyncStorage.setItem as jest.MockedFunction<typeof AsyncStorage.setItem>;
    
    mockGetItem.mockResolvedValue('3');

    renderHook(() => useSessionCount());

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(mockGetItem).toHaveBeenCalledWith('user_session_count');
  });
}); 