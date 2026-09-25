import 'react';

declare global {
  interface Window {
    Cal?: any;
    modelContext?: any;
  }

  interface Document {
    modelContext?: any;
  }

  interface Navigator {
    modelContext?: any;
  }
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    toolname?: string;
    tooldescription?: string;
    toolparamdescription?: string;
  }
}

declare module '*.pdf?url' {
  const url: string;
  export default url;
}

export {};
