import { apiUsageComponent } from "../components/componets.js";


export const apiResource = {
    resource: [],
    options: {
        properties: {
            someText: {
                type: 'string',
                components: {
                    apiUsageComponent
                },
            },
        },
    },
}