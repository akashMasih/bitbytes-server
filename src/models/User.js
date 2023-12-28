// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

const UserSchema = new Schema({
    mobileNumber: { type: String, required: true, unique: true },
    OTP: { type: String, },
    fullName: { type: String },
    token: { type: String },
    createdAt: { type: Date, default: new Date() }
});

export default mongoose.model('User', UserSchema);
