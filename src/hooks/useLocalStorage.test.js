import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value when no data in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should read from localStorage if value exists', () => {
    localStorage.setItem('testKey', JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));
    expect(result.current[0]).toBe('stored');
  });

  it('should update localStorage when setter is called', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));
    act(() => {
      result.current[1]('updated');
    });
    expect(result.current[0]).toBe('updated');
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('updated'));
  });

  it('should remove item when setter is called with null', () => {
    localStorage.setItem('testKey', JSON.stringify('stored'));
    const { result } = renderHook(() => useLocalStorage('testKey', 'initial'));
    act(() => {
      result.current[1](null);
    });
    expect(result.current[0]).toBeNull();
    expect(localStorage.getItem('testKey')).toBeNull();
  });
});
