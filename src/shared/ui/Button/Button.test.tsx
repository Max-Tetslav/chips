import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Button } from './Button';

describe(Button, () => {
    it('renders children', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('calls onClick when clicked', () => {
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        fireEvent.click(screen.getByText('Click'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies active class when active is true', () => {
        render(<Button active>Active</Button>);
        const button = screen.getByRole('button');
        expect(button.className).toMatch(/active/);
    });

    it('applies additional className', () => {
        render(<Button className="custom-class">Test</Button>);
        const button = screen.getByRole('button');
        expect(button.className).toMatch(/custom-class/);
    });
});
