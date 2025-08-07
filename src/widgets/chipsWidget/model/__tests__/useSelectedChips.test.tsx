import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useSelectedChips } from '../useSelectedChips';

const chips = [
    { id: 1, label: 'Chip 1' },
    { id: 2, label: 'Chip 2' }
];

describe(useSelectedChips, () => {
    it('initializes selectableChips with selected=false', () => {
        const { result } = renderHook(() => useSelectedChips(chips));
        expect(result.current.selectableChips).toEqual([
            { id: 1, label: 'Chip 1', selected: false },
            { id: 2, label: 'Chip 2', selected: false }
        ]);
    });

    it('toggles selected state for a chip', () => {
        const { result } = renderHook(() => useSelectedChips(chips));
        act(() => {
            result.current.handleSelectChip(1)();
        });
        expect(result.current.selectableChips).toEqual([
            { id: 1, label: 'Chip 1', selected: true },
            { id: 2, label: 'Chip 2', selected: false }
        ]);
        act(() => {
            result.current.handleSelectChip(1)();
        });
        expect(result.current.selectableChips).toEqual([
            { id: 1, label: 'Chip 1', selected: false },
            { id: 2, label: 'Chip 2', selected: false }
        ]);
    });

    it('toggles selected state for multiple chips independently', () => {
        const { result } = renderHook(() => useSelectedChips(chips));
        act(() => {
            result.current.handleSelectChip(1)();
            result.current.handleSelectChip(2)();
        });
        expect(result.current.selectableChips).toEqual([
            { id: 1, label: 'Chip 1', selected: true },
            { id: 2, label: 'Chip 2', selected: true }
        ]);
    });
});
