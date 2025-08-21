import { apiUsageComponent } from "../components/components.js";


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