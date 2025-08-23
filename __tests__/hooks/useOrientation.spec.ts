import { renderHook, act } from '@testing-library/react-hooks';
import { Dimensions } from 'react-native';
import { useOrientation } from '../../src/presentation/hooks/useOrientation';

describe('useOrientation', () => {
  const addEventListenerSpy = jest.spyOn(Dimensions, 'addEventListener');
  const removeEventListenerSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // @ts-ignore
    addEventListenerSpy.mockImplementation((event, handler) => {
      return { remove: removeEventListenerSpy };
    });
  });

  it('should return "portrait" by default', () => {
    const { result } = renderHook(() => useOrientation());
    expect(result.current).toBe('portrait');
  });

  it('should update orientation to landscape when width > height', () => {
    let handlerFn: any;

    // @ts-ignore
    addEventListenerSpy.mockImplementation((event, handler) => {
      handlerFn = handler;
      return { remove: removeEventListenerSpy };
    });

    const { result } = renderHook(() => useOrientation());

    act(() => {
      handlerFn({ window: { width: 1024, height: 768 } });
    });

    expect(result.current).toBe('landscape');
  });

  it('should update orientation to portrait when height > width', () => {
    let handlerFn: any;

    // @ts-ignore
    addEventListenerSpy.mockImplementation((event, handler) => {
      handlerFn = handler;
      return { remove: removeEventListenerSpy };
    });

    const { result } = renderHook(() => useOrientation());

    act(() => {
      handlerFn({ window: { width: 600, height: 800 } });
    });

    expect(result.current).toBe('portrait');
  });

  it('should remove listener on unmount', () => {
    const { unmount } = renderHook(() => useOrientation());
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
  });
});
