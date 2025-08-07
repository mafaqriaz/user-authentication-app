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

  it('loads session count from AsyncStorage on mount', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    mockGetItem.mockResolvedValue('5');

    const { result } = renderHook(() => useSessionCount());

    // Wait for async operations to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(mockGetItem).toHaveBeenCalledWith('user_session_count');
    expect(result.current.sessionCount).toBe(5);
    expect(result.current.isLoading).toBe(false);
  });

  it('initializes with count 1 when no stored count exists', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    const mockSetItem = AsyncStorage.setItem as jest.MockedFunction<typeof AsyncStorage.setItem>;
    mockGetItem.mockResolvedValue(null);

    const { result } = renderHook(() => useSessionCount());

    // Wait for async operations to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(result.current.sessionCount).toBe(1);
    expect(mockSetItem).toHaveBeenCalledWith('user_session_count', '1');
    expect(result.current.isLoading).toBe(false);
  });

  it('increments session count correctly', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    const mockSetItem = AsyncStorage.setItem as jest.MockedFunction<typeof AsyncStorage.setItem>;
    mockGetItem.mockResolvedValue('3');

    const { result } = renderHook(() => useSessionCount());

    // Wait for async operations to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(result.current.sessionCount).toBe(3);

    act(() => {
      result.current.incrementSessionCount();
    });

    expect(result.current.sessionCount).toBe(4);
    expect(mockSetItem).toHaveBeenCalledWith('user_session_count', '4');
  });

  it('resets session count correctly', async () => {
    const mockGetItem = AsyncStorage.getItem as jest.MockedFunction<typeof AsyncStorage.getItem>;
    const mockSetItem = AsyncStorage.setItem as jest.MockedFunction<typeof AsyncStorage.setItem>;
    mockGetItem.mockResolvedValue('10');

    const { result } = renderHook(() => useSessionCount());

    // Wait for async operations to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    expect(result.current.sessionCount).toBe(10);

    act(() => {
      result.current.resetSessionCount();
    });

    expect(result.current.sessionCount).toBe(1);
    expect(mockSetItem).toHaveBeenCalledWith('user_session_count', '1');
  });
}); 