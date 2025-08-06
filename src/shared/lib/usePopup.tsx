import { useCallback, useRef, useState } from 'react';

export const usePopup = () => {
    const popupAnchor = useRef<HTMLDivElement>(null);
    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);

    const togglePopup = useCallback(() => {
        setIsPopupOpened((prevState) => !prevState);
    }, []);

    const closePopup = useCallback(() => {
        setIsPopupOpened(false);
    }, []);

    return {
        popupAnchor,
        isPopupOpened,
        togglePopup,
        closePopup
    };
};
