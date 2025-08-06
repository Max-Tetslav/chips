import { type ReactElement } from 'react';
import { Button } from '../Button';
import DotsIcon from '@app/assets/dots-horizontal.svg?react';
import cl from 'clsx';
import styles from './ExpandButton.module.less';

type ExpandButtonProps = {
    className?: string;
    onClick?: VoidFunction;
};

export const ExpandButton = ({ className, ...props }: ExpandButtonProps): ReactElement => {
    return (
        <Button className={cl(styles.button, className)} {...props}>
            <DotsIcon fill="#eee" width={16} height={16} />
        </Button>
    );
};
