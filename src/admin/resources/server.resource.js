import { serverMonitorComponent } from "../components/components.js";

export const serverResource = {
  resource: [],
  options: {
    properties: {
      someText: {
        type: 'string',
        components: {
          serverMonitorComponent
        },
      },
    },
  },
}

