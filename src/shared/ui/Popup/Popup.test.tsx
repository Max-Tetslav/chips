import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { Popup } from './Popup';

// Мокаем Portal, чтобы не было проблем с порталом в тестах
vi.mock('@shared/ui/Portal', () => ({
    Portal: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

// Мокаем useClickOutside, чтобы не было побочных эффектов
vi.mock('@shared/lib/useClickOutside', () => ({
    useClickOutside: () => {}
}));

const createAnchor = () => {
    const anchor = document.createElement('button');
    anchor.textContent = 'anchor';
    document.body.appendChild(anchor);
    // Мокаем getBoundingClientRect для стабильных координат
    anchor.getBoundingClientRect = () =>
        ({ top: 10, left: 20, bottom: 30, right: 40, width: 20, height: 20 }) as DOMRect;
    return anchor;
};

describe(Popup, () => {
    let anchor: HTMLElement;
    let anchorRef: React.RefObject<HTMLElement>;
    let onClose: ReturnType<typeof vi.fn>;

    beforeEach(() => {
        anchor = createAnchor();
        anchorRef = { current: anchor };
        onClose = vi.fn();
    });

    it('renders children', () => {
        render(
            <Popup anchorRef={anchorRef} onClose={onClose}>
                <div>Popup content</div>
            </Popup>
        );
        expect(screen.getByText('Popup content')).toBeInTheDocument();
    });

    it('positions popup relative to anchor', () => {
        render(
            <Popup anchorRef={anchorRef} onClose={onClose}>
                <div>Popup content</div>
            </Popup>
        );
        const popup = screen.getByText('Popup content').parentElement as HTMLDivElement;
        // Проверяем, что стили top/left выставлены (значения зависят от POPUP_TOP_MARGIN)
        expect(popup.style.top).toMatch(/px/);
        expect(popup.style.left).toMatch(/px/);
    });

    it('calls onClose on window resize', () => {
        render(
            <Popup anchorRef={anchorRef} onClose={onClose}>
                <div>Popup content</div>
            </Popup>
        );
        fireEvent(window, new Event('resize'));
        expect(onClose).toHaveBeenCalled();
    });
});
