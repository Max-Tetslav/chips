import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { ChipsWidget } from './ChipsWidget';

// Мокаем Popup, чтобы не было проблем с порталом
vi.mock('@shared/ui/Popup', () => ({
    Popup: ({ children }: { children: React.ReactNode }) => <div data-testid="popup">{children}</div>
}));

// Мокаем ExpandButton, чтобы можно было кликать
vi.mock('@shared/ui/ExpandButton', () => ({
    ExpandButton: (props: unknown[]) => (
        <button data-testid="expand-btn" {...props}>
            ...
        </button>
    )
}));

// Мокаем usePopup, чтобы управлять состоянием попапа
const popupState = {
    isPopupOpened: false,
    togglePopup: vi.fn(),
    closePopup: vi.fn(),
    popupAnchor: { current: document.createElement('div') }
};
vi.mock('@shared/lib/usePopup', () => ({
    usePopup: () => popupState
}));

// Мокаем useSelectedChips и useVisibleChips
const chipsMock = [
    { id: 1, label: 'Chip 1', selected: false },
    { id: 2, label: 'Chip 2', selected: true },
    { id: 3, label: 'Chip 3', selected: false }
];

vi.mock('@widgets/chipsWidget/model/useSelectedChips', () => ({
    useSelectedChips: () => ({
        selectableChips: chipsMock,
        handleSelectChip: vi.fn()
    })
}));

vi.mock('@widgets/chipsWidget/model/useVisibleChips', () => ({
    useVisibleChips: () => ({
        widgetContainer: { current: document.createElement('div') },
        visibleChips: chipsMock.slice(0, 2),
        invisibleChips: chipsMock.slice(2),
        hasInvisibleChips: true
    })
}));

describe('ChipsWidget', () => {
    beforeEach(() => {
        popupState.isPopupOpened = false;
        popupState.togglePopup.mockClear();
        popupState.closePopup.mockClear();
    });

    it('renders visible chips', () => {
        render(<ChipsWidget chips={chipsMock} />);
        expect(screen.getByText('Chip 1')).toBeInTheDocument();
        expect(screen.getByText('Chip 2')).toBeInTheDocument();
        expect(screen.queryByText('Chip 3')).not.toBeInTheDocument();
    });

    it('shows popup with invisible chips after clicking expand', () => {
        popupState.isPopupOpened = true;
        render(<ChipsWidget chips={chipsMock} />);
        expect(screen.getByTestId('popup')).toBeInTheDocument();
        expect(screen.getByText('Chip 3')).toBeInTheDocument();
    });

    it('calls togglePopup when expand button is clicked', () => {
        render(<ChipsWidget chips={chipsMock} />);
        fireEvent.click(screen.getByTestId('expand-btn'));
        expect(popupState.togglePopup).toHaveBeenCalled();
    });
});
