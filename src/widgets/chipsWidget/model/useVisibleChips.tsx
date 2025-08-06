import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import type { SelectableChipList } from '@entities/Chip';
import { useDebounce } from '@shared/lib/useDebounce';

export const useVisibleChips = (selectableChips: SelectableChipList) => {
    const widgetContainer = useRef<HTMLDivElement>(null);
    const [visibleCount, setVisibleCount] = useState<number>(selectableChips.length);

    const calculateVisibleChips = useCallback(() => {
        const container = widgetContainer.current;
        if (!container) return;

        const containerWidth = container.offsetWidth;

        let totalWidth = 0;
        let count = 0;
        for (let i = 0; i < selectableChips.length; i++) {
            const tempElement = document.createElement('button');
            tempElement.style.visibility = 'hidden';
            tempElement.style.position = 'absolute';
            tempElement.style.padding = '4px 12px';
            tempElement.style.border = 'none';
            tempElement.style.whiteSpace = 'nowrap';
            tempElement.textContent = selectableChips[i].label;
            container.appendChild(tempElement);
            const width = tempElement.offsetWidth;
            container.removeChild(tempElement);

            if (totalWidth + width > containerWidth - 40) break;
            totalWidth += width;
            count++;
        }

        setVisibleCount(count);
    }, [widgetContainer.current]);

    const debouncedCalculate = useDebounce(calculateVisibleChips, 200);

    useLayoutEffect(() => {
        calculateVisibleChips();
    }, []);

    useEffect(() => {
        window.addEventListener('resize', debouncedCalculate);
        return () => {
            window.removeEventListener('resize', debouncedCalculate);
        };
    }, []);

    const visibleChips = useMemo(() => selectableChips.slice(0, visibleCount), [selectableChips, visibleCount]);
    const invisibleChips = useMemo(() => selectableChips.slice(visibleCount), [selectableChips, visibleCount]);

    const hasInvisibleChips = useMemo(() => invisibleChips.length > 0, [invisibleChips.length]);

    return {
        widgetContainer,
        visibleChips,
        invisibleChips,
        hasInvisibleChips
    };
};
