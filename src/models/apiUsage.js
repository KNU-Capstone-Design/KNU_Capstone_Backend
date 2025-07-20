import mongoose from 'mongoose';
import { getKSTDateString } from '../utils/date.js';
const { Schema } = mongoose;

// AI API 사용량
const apiUsageSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        default: getKSTDateString
    }
});

const ApiUsage = mongoose.model('ApiUsage', apiUsageSchema);
export { ApiUsage };