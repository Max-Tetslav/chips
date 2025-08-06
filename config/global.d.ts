declare module '*.module.less' {
    const styles: { readonly [key: string]: string };
    export default styles;
}

declare module '*.svg?react' {
    import * as React from 'react';
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}
