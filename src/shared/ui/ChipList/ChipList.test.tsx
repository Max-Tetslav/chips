import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { ChipList } from './ChipList';

const chips = [
    { id: 1, label: 'Chip 1', selected: false },
    { id: 2, label: 'Chip 2', selected: true }
];

describe(ChipList, () => {
    it('renders all chips', () => {
        render(<ChipList chips={chips} onChipSelect={() => vi.fn()} />);
        expect(screen.getByText('Chip 1')).toBeInTheDocument();
        expect(screen.getByText('Chip 2')).toBeInTheDocument();
    });

    it('calls onChipSelect with correct id when chip is clicked', () => {
        const calls: number[] = [];
        const onChipSelect = vi.fn((id) => () => calls.push(id));
        render(<ChipList chips={chips} onChipSelect={onChipSelect} />);
        fireEvent.click(screen.getByText('Chip 1'));
        fireEvent.click(screen.getByText('Chip 2'));
        expect(calls).toEqual([1, 2]);
    });

    it('passes selected prop to Chip', () => {
        render(<ChipList chips={chips} onChipSelect={() => vi.fn()} />);
        const chip2 = screen.getByText('Chip 2').closest('button');
        expect(chip2?.className).toMatch(/active/);
    });
});
