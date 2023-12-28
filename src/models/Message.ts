// src/models/Message.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IMessage } from '../interfaces/IMessage';

const MessageSchema: Schema = new Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage & Document>('Message', MessageSchema);
