import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Portal } from './Portal';

describe(Portal, () => {
    it('renders children into document.body by default', () => {
        render(
            <Portal>
                <div data-testid="portal-content">Portal Content</div>
            </Portal>
        );
        const el = document.querySelector('[data-testid="portal-content"]');
        expect(el).not.toBeNull();
        expect(el?.parentElement).toBe(document.body);
    });

    it('renders children into provided target', () => {
        const customTarget = document.createElement('div');
        document.body.appendChild(customTarget);

        render(
            <Portal target={customTarget}>
                <div data-testid="custom-portal">Custom Portal</div>
            </Portal>
        );
        const el = document.querySelector('[data-testid="custom-portal"]');
        expect(el).not.toBeNull();
        expect(el?.parentElement).toBe(customTarget);
    });
});
