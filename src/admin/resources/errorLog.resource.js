import {errorLogMonitorComponent} from "../components/componets.js";


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