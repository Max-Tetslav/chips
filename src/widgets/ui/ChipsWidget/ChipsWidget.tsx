import { useLayoutEffect, useMemo, type ReactElement } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import type { ChipDataList, SelectedChipDataList } from '@entities/Chip';
import { useDebounce } from '@shared/lib/useDebounce';
import { ChipList } from '@shared/ui/ChipList';
import { ExpandButton } from '@shared/ui/ExpandButton';

import styles from './ChipsWidget.module.less';
import { Popup } from '@shared/ui/Popup';
import { useSelectedChips } from '@widgets/lib/useSelectedChips';

type ChipsWidgetProps = {
    chips: ChipDataList;
};

export const ChipsWidget = ({ chips }: ChipsWidgetProps): ReactElement => {
    const widgetContainer = useRef<HTMLDivElement>(null);
    const [visibleCount, setVisibleCount] = useState<number>(chips.length);
    const [isPopupOpened, setIsPopupOpened] = useState<boolean>(false);

    const { selectedChips, handleSelectChip } = useSelectedChips(chips);

    const calculateVisibleChips = useCallback(() => {
        const container = widgetContainer.current;
        if (!container) return;

        const containerWidth = container.offsetWidth;
        console.log('resize', containerWidth);
        let totalWidth = 0;
        let count = 0;
        for (let i = 0; i < selectedChips.length; i++) {
            const temp = document.createElement('button');
            temp.style.visibility = 'hidden';
            temp.style.position = 'absolute';
            temp.style.padding = '4px 12px';
            temp.style.marginRight = '8px';
            temp.style.border = 'none';
            temp.style.whiteSpace = 'nowrap';
            temp.textContent = selectedChips[i].label;
            container.appendChild(temp);
            const width = temp.offsetWidth;
            container.removeChild(temp);

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

    const visibleChips = useMemo(() => selectedChips.slice(0, visibleCount), [selectedChips, visibleCount]);
    const invisibleChips = useMemo(() => selectedChips.slice(visibleCount), [selectedChips, visibleCount]);

    const hasMoreChips = useMemo(() => invisibleChips.length > 0, [invisibleChips.length]);

    const handleClickMoreChips = useCallback(() => {
        setIsPopupOpened((prevState) => !prevState);
    }, []);

    return (
        <div ref={widgetContainer} className={styles.container}>
            <ChipList chips={visibleChips} onChipSelect={handleSelectChip} />
            {hasMoreChips && (
                <div className={styles.popupContainer}>
                    <ExpandButton onClick={handleClickMoreChips} />
                    {isPopupOpened && (
                        <Popup onClose={() => setIsPopupOpened(false)}>
                            <ChipList chips={invisibleChips} onChipSelect={handleSelectChip} />
                        </Popup>
                    )}
                </div>
            )}
        </div>
    );
};
