export type ChipData = {
    label: string;
    id: number;
};

export type SelectableChipData = ChipData & {
    selected: boolean;
};

export type SelectableChipDataList = SelectableChipData[];

export type ChipDataList = ChipData[];

export const MOCK_CHIPS: ChipDataList = [
    { id: 1, label: 'Чипс 1' },
    { id: 2, label: 'Чипс 2' },
    { id: 3, label: 'Чипс 3' },
    { id: 4, label: 'Чипс 4' },
    { id: 5, label: 'Чипс 5' },
    { id: 6, label: 'Чипс 6' },
    { id: 7, label: 'Чипс 7' },
    { id: 8, label: 'Очень длинный чипс 8' },
    { id: 9, label: 'Чипс 9' },
    { id: 10, label: 'Чипс 10' },
    { id: 11, label: 'Чипс 11' },
    { id: 12, label: 'Чипс 12' },
    { id: 13, label: 'Чипс 13' }
];
