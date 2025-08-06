import { useRef } from 'react';

export const useDebounce = (callback: (...args: any) => any, delay: number = 1000): ((...args: any) => any) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debauncedCallback = (...params: Parameters<typeof callback>): ReturnType<typeof callback> => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            callback(params);
        }, delay);
    };

    return debauncedCallback;
};
