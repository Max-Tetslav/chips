import type { ReactElement } from 'react';

import DotsIcon from '@app/assets/dots-horizontal.svg?react';
import { Button } from '@shared/ui/Button';
import { ICON_SIZE } from '@shared/lib/constants';

type ExpandButtonProps = {
    className?: string;
    onClick?: VoidFunction;
};

export const ExpandButton = (props: ExpandButtonProps): ReactElement => {
    return (
        <Button {...props}>
            <DotsIcon fill="#eee" width={ICON_SIZE} height={ICON_SIZE} />
        </Button>
    );
};
