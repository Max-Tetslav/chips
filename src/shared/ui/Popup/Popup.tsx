import React, { useRef, type ReactElement } from 'react';

import { useClickOutside } from '@shared/lib/useClickOutside';
import { Portal } from '../Portal';

import styles from './Popup.module.less';

type PopupProps = {
    children: React.ReactNode;
    onClose: () => void;
};

export const Popup = ({ children, onClose }: PopupProps): ReactElement => {
    const popupRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(popupRef, onClose);

    return (
        <Portal>
            <div ref={popupRef} className={styles.popup}>
                {children}
            </div>
        </Portal>
    );
};
