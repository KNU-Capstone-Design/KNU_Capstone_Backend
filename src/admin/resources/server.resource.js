import { serverMonitorComponent } from "../components/componets.js";

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

