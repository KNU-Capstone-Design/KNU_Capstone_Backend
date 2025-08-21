import {infoLogMonitorComponent} from "../components/components.js";


export const infoLogResource = {
    resource: [],
    options: {
        properties: {
            someText: {
                type: 'string',
                components: {
                    infoLogMonitorComponent
                },
            },
        },
    },
}