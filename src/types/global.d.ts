declare global {
  interface Window {
    Cal?: any;
  }
}

declare module '*.pdf?url' {
  const url: string;
  export default url;
}

export {};
