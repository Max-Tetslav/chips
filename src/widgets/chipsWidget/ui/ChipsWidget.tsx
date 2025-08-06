import type { ReactElement } from 'react';

import type { ChipDtoList } from '@entities/Chip';
import { usePopup } from '@shared/lib/usePopup';
import { ChipList } from '@shared/ui/ChipList';
import { ExpandButton } from '@shared/ui/ExpandButton';
import { Popup } from '@shared/ui/Popup';
import { useSelectedChips } from '@widgets/chipsWidget/model/useSelectedChips';
import { useVisibleChips } from '@widgets/chipsWidget/model/useVisibleChips';

import styles from './ChipsWidget.module.less';

type ChipsWidgetProps = {
    chips: ChipDtoList;
};

export const ChipsWidget = ({ chips }: ChipsWidgetProps): ReactElement => {
    const { popupAnchor, isPopupOpened, togglePopup, closePopup } = usePopup();

    const { selectableChips, handleSelectChip } = useSelectedChips(chips);

    const { widgetContainer, visibleChips, invisibleChips, hasInvisibleChips } = useVisibleChips(selectableChips);

    return (
        <div ref={widgetContainer} className={styles.container}>
            <ChipList chips={visibleChips} onChipSelect={handleSelectChip} />
            {hasInvisibleChips && (
                <div ref={popupAnchor} className={styles.popupContainer}>
                    <ExpandButton onClick={togglePopup} />
                    {isPopupOpened && (
                        <Popup anchorRef={popupAnchor} onClose={closePopup}>
                            <ChipList chips={invisibleChips} onChipSelect={handleSelectChip} />
                        </Popup>
                    )}
                </div>
            )}
        </div>
    );
};
