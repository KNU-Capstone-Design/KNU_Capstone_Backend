import mongoose from 'mongoose';
import { getKSTDateString } from '../utils/date.js';
const { Schema } = mongoose;

// SMTP 사용량 스키마
const smtpUsageSchema = new Schema({
    welcomeEmailCount: {
        type: Number,
        default: 0
    },
    questionEmailCount: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        default: getKSTDateString
    }
});

const SmtpUsage = mongoose.model('SmtpUsage', smtpUsageSchema);
export { SmtpUsage };