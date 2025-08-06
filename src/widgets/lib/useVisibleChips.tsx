import { useCallback, useState } from 'react';
import type { ChipDataList, SelectedChipDataList } from '@entities/Chip';

export const useSelectedChips = (chips: ChipDataList) => {
    const [selectedChips, setSelectedChips] = useState<SelectedChipDataList>(
        chips.map(({ label, id }) => ({
            id,
            label,
            selected: false
        }))
    );

    const handleSelectChip = useCallback(
        (id: number) => () => {
            setSelectedChips((prevChips) =>
                prevChips.map((chip) => {
                    if (chip.id === id) {
                        return { ...chip, selected: !chip.selected };
                    }

                    return chip;
                })
            );
        },
        []
    );

    return {
        selectedChips,
        handleSelectChip
    };
};
