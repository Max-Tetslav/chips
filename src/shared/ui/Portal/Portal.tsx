import { type ReactNode, type ReactPortal } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
    target?: Element;
    children?: ReactNode;
};

export const Portal = (props: PortalProps): ReactPortal => {
    const { target = document.body, children } = props;

    return createPortal(children, target);
};
