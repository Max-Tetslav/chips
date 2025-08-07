import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Chip } from './Chip';

describe(Chip, () => {
    it('renders children', () => {
        render(<Chip>Test Chip</Chip>);
        expect(screen.getByText('Test Chip')).toBeInTheDocument();
    });

    it('calls onSelect when clicked', () => {
        const onSelect = vi.fn();
        render(<Chip onSelect={onSelect}>Clickable</Chip>);
        fireEvent.click(screen.getByText('Clickable'));
        expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it('applies className prop', () => {
        render(<Chip className="custom-class">Styled</Chip>);
        const button = screen.getByRole('button');
        expect(button.className).toMatch(/custom-class/);
    });

    it('passes selected as active to Button', () => {
        render(<Chip selected>Selected</Chip>);
        const button = screen.getByRole('button');
        expect(button.className).toMatch(/active/);
    });
});
