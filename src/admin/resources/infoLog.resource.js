import {infoLogMonitorComponent} from "../components/componets.js";


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