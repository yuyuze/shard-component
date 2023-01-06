// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="custom-typings.d.ts" />
declare module 'vue' {
  interface CSSProperties {
    [key: `--${string}`]: any;
  }
}
