import cl from 'clsx';
import type { ReactElement, ReactNode } from 'react';

import styles from './Button.module.less';

type ButtonProps = {
    className?: string;
    children: ReactNode;
    active?: boolean;
    onClick?: VoidFunction;
};

export const Button = ({ onClick, className, children, active }: ButtonProps): ReactElement => {
    return (
        <button className={cl(styles.button, className, { [styles.active]: active })} onClick={onClick}>
            {children}
        </button>
    );
};
