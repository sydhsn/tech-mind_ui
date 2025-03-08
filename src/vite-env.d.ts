/// <reference types="vite/client" />
declare module "@shadcn/ui";
declare module "*.worker.ts" {
  class WebWorker extends Worker {
    constructor();
  }

  export default WebWorker;
}
