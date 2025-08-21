import {errorLogMonitorComponent} from "../components/components.js";


export const errorLogResource = {
    resource: [],
    options: {
        properties: {
            someText: {
                type: 'string',
                components: {
                    errorLogMonitorComponent
                },
            },
        },
    },
}