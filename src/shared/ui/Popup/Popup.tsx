import React, { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactElement } from 'react';

import { useClickOutside } from '@shared/lib/useClickOutside';
import { Portal } from '@shared/ui/Portal';

import styles from './Popup.module.less';

type PopupProps = {
    anchorRef: React.RefObject<HTMLElement | null>;
    children: React.ReactNode;
    onClose: VoidFunction;
};

export const Popup = ({ anchorRef, children, onClose }: PopupProps): ReactElement => {
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    const calculatePosition = useCallback(() => {
        const anchor = anchorRef.current;
        const popup = popupRef.current;
        if (!anchor || !popup) return;

        const anchorRect = anchor.getBoundingClientRect();
        const popupRect = popup.getBoundingClientRect();

        setPosition({
            top: anchorRect.bottom + window.scrollY + 4,
            left: anchorRect.right + window.scrollX - popupRect.width
        });
    }, [anchorRef, popupRef]);

    const recalculatePosition = useCallback(() => {
        calculatePosition();
        onClose();
    }, [calculatePosition]);

    useLayoutEffect(() => {
        calculatePosition();
    }, [anchorRef]);

    useEffect(() => {
        window.addEventListener('resize', recalculatePosition);
        return () => {
            window.removeEventListener('resize', recalculatePosition);
        };
    }, [popupRef, anchorRef]);

    useClickOutside([popupRef, anchorRef], onClose);

    return (
        <Portal>
            <div
                ref={popupRef}
                className={styles.popup}
                style={{ top: `${position.top}px`, left: `${position.left}px` }}
            >
                {children}
            </div>
        </Portal>
    );
};
