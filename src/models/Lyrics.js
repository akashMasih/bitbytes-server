const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artists: [{ artType: String, name: String }],
    album: { type: String },
    genres: [{ type: String }],
    releaseYear: { type: Number },
    duration: { type: Number }, // in seconds
    audioUrl: { type: String },
    videoUrl: { type: String },
    lyrics: { type: String, require: true },
    coverImageUrl: { type: String },
    composers: [{ type: String }],
    producers: [{ type: String }],
    languages: [{ type: String }],
    bpm: { type: Number },
    key: { type: String },
    label: { type: String },
    postedBy: { userId: mongoose.Types.ObjectId, name: String, role: Number, role_name: String },
    status: { type: String, default: "draft" },
    statusHistory: [{ status: String, timeStamp: Date, userId: mongoose.Types.ObjectId, name: String, remarks: String }],
    readCount: { type: Number, default: 0 },
    favoriteCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    metaDescription: {
        type: String,
    },
    tags: [
        {
            type: String,
        },
    ],
    canonicalUrl: {
        type: String,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },

});

const Lyrics = mongoose.model('Lyrics', songSchema);

module.exports = Lyrics;


// "draft"
// "send to verify"
// "publish"