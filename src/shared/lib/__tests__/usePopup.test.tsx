import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { usePopup } from '../usePopup';

describe(usePopup, () => {
    it('returns initial state', () => {
        const { result } = renderHook(() => usePopup());
        expect(result.current.isPopupOpened).toBe(false);
        expect(result.current.popupAnchor.current).toBeNull();
    });

    it('togglePopup toggles isPopupOpened', () => {
        const { result } = renderHook(() => usePopup());
        act(() => {
            result.current.togglePopup();
        });
        expect(result.current.isPopupOpened).toBe(true);
        act(() => {
            result.current.togglePopup();
        });
        expect(result.current.isPopupOpened).toBe(false);
    });

    it('closePopup sets isPopupOpened to false', () => {
        const { result } = renderHook(() => usePopup());
        act(() => {
            result.current.togglePopup();
        });
        expect(result.current.isPopupOpened).toBe(true);
        act(() => {
            result.current.closePopup();
        });
        expect(result.current.isPopupOpened).toBe(false);
    });
});
