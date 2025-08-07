import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { ExpandButton } from './ExpandButton';

describe(ExpandButton, () => {
    it('renders button with icon', () => {
        render(<ExpandButton />);
        // Проверяем, что svg-иконка есть в документе
        expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
    });

    it('applies className prop', () => {
        render(<ExpandButton className="expand-class" />);
        expect(screen.getByRole('button').className).toMatch(/expand-class/);
    });

    it('calls onClick when clicked', () => {
        const onClick = vi.fn();
        render(<ExpandButton onClick={onClick} />);
        fireEvent.click(screen.getByRole('button'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
