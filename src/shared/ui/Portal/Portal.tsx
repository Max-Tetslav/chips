import type { ReactNode, ReactPortal } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
    target?: Element;
    children?: ReactNode;
};

export const Portal = ({ target = document.body, children }: PortalProps): ReactPortal => {
    return createPortal(children, target);
};
