
import { renderHook, act } from '@testing-library/react';
import { useWindowSize } from './useWindowSize';

describe('useWindowSize', () => {
  it('should return the initial window size', () => {
    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toEqual({ width: 0, height: 0 });
  });

  it('should update the window size on resize', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      // @ts-ignore
      window.innerWidth = 1024;
      // @ts-ignore
      window.innerHeight = 768;
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({ width: 1024, height: 768 });
  });
});
