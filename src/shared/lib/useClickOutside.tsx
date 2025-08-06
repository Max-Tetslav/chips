import { useEffect, type RefObject } from 'react';

export function useClickOutside(refs: RefObject<HTMLElement | null>[], callback: (event: Event) => void): void {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const isClickedInside = refs.some((ref) => {
                return ref.current?.contains(event.target as Node);
            });

            if (!isClickedInside) {
                callback(event);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [refs]);
}
