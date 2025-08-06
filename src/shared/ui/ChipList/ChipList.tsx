import type { ReactElement } from 'react';

import type { SelectableChipList } from '@entities/Chip';
import { Chip } from '@shared/ui/Chip';

type ChipListProps = {
    onChipSelect: (id: number) => VoidFunction;
    chips: SelectableChipList;
};

export const ChipList = ({ chips, onChipSelect }: ChipListProps): ReactElement => {
    return (
        <>
            {chips.map(({ label, id, selected }) => (
                <Chip key={id} selected={selected} onSelect={onChipSelect(id)}>
                    {label}
                </Chip>
            ))}
        </>
    );
};
