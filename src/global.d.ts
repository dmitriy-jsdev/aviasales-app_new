declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.scss';

declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.gif' {
  const src: string;
  export default src;
}
declare module '*.svg' {
  import type { SVGProps, ReactElement } from 'react';

  export const ReactComponent: (props: SVGProps<SVGSVGElement>) => ReactElement;
  const src: string;
  export default src;
}
