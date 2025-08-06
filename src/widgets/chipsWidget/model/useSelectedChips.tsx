import { useCallback, useState } from 'react';

import type { ChipDtoList, SelectableChipList } from '@entities/Chip';

export const useSelectedChips = (chips: ChipDtoList) => {
    const [selectableChips, setSelectedChips] = useState<SelectableChipList>(
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
        selectableChips,
        handleSelectChip
    };
};
