// src/models/User.ts
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const Document = require('mongoose').Document;

const UserSchema = new Schema({
    mobileNumber: { type: String, required: true, unique: true },
    OTP: { type: String, },
    fullName: { type: String },
    token: { type: String },
    createdAt: { type: Date, default: new Date() }
});

module.exports = mongoose.model('User', UserSchema);
