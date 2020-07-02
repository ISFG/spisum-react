/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string;
  }
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "@ckeditor/ckeditor5-build-classic" {
  const ckeditor: (props: unknown) => JSX.Element;
  export default ckeditor;
}
declare module "@ckeditor/ckeditor5-react" {
  export interface CKEditorType {
    getData: () => string;
  }

  export type CKEditorOnChangeEventType = {};

  const ckeditor: (props: {
    config: { [key: string]: string | string[] | object };
    editor: ClassicEditor;
    data: string;
    onChange: (event: CKEditorOnChangeEventType, editor: CKEditorType) => void;
    disabled: boolean;
  }) => JSX.Element;

  export default ckeditor;
}
