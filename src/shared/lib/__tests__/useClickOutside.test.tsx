import { render } from '@testing-library/react';
import { useRef } from 'react';
import { describe, it, expect, vi } from 'vitest';

import { useClickOutside } from '../useClickOutside';

function TestComponent({ onOutsideClick }: { onOutsideClick: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside([ref], onOutsideClick);
    return (
        <div ref={ref} data-testid="inside">
            Inside
        </div>
    );
}

describe(useClickOutside, () => {
    it('calls callback when clicking outside', () => {
        const onOutsideClick = vi.fn();
        render(<TestComponent onOutsideClick={onOutsideClick} />);
        document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        expect(onOutsideClick).toHaveBeenCalled();
    });

    it('does not call callback when clicking inside', () => {
        const onOutsideClick = vi.fn();
        const { getByTestId } = render(<TestComponent onOutsideClick={onOutsideClick} />);
        getByTestId('inside').dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        expect(onOutsideClick).not.toHaveBeenCalled();
    });
});
