
export {};

declare global {
  interface Window {
    hcaptcha: {
      render: (container: string, options: any) => string;
      reset: (widgetId?: string) => void;
      getResponse: (widgetId?: string) => string;
    };
  }
}
