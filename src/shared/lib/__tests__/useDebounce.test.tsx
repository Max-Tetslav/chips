import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { useDebounce } from '../useDebounce';

describe(useDebounce, () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it('calls callback after delay', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useDebounce(callback, 500));
        act(() => {
            result.current('test');
        });
        expect(callback).not.toHaveBeenCalled();
        vi.advanceTimersByTime(500);
        expect(callback).toHaveBeenCalledWith('test');
    });

    it('debounces multiple calls', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useDebounce(callback, 300));
        act(() => {
            result.current('first');
            result.current('second');
        });
        vi.advanceTimersByTime(299);
        expect(callback).not.toHaveBeenCalled();
        vi.advanceTimersByTime(1);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith('second');
    });
});
