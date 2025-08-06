import type { ReactElement, ReactNode } from 'react';

import { Button } from '@shared/ui/Button';

type ChipProps = {
    selected?: boolean;
    className?: string;
    children: ReactNode;
    onSelect?: VoidFunction;
};

export const Chip = ({ selected = false, className, children, onSelect }: ChipProps): ReactElement => {
    return (
        <Button active={selected} className={className} onClick={onSelect}>
            {children}
        </Button>
    );
};
