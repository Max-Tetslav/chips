import { useRef } from 'react';

export const useDebounce = <T extends (...args: never[]) => unknown>(
    callback: T,
    delay: number = 1000
): ((...args: Parameters<T>) => void) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debauncedCallback = (...params: Parameters<T>): void => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            callback(...params);
        }, delay);
    };

    return debauncedCallback;
};
