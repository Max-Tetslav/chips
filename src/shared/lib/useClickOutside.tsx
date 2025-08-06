import { useEffect, type RefObject } from 'react';

export function useClickOutside(ref: RefObject<HTMLElement | null>, onClick: (event: Event) => void): void {
    useEffect(() => {
        const handler = (event: Event) => {
            if (!ref.current || ref.current.contains(event.target as Node)) return;
            onClick(event);
        };

        document.addEventListener('click', handler);
        return () => document.removeEventListener('click', handler);
    }, [ref, onClick]);
}
