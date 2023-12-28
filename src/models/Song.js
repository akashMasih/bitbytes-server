import mongoose from 'mongoose'

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artists: [{ type: String }],
    album: { type: String },
    genres: [{ type: String }],
    releaseYear: { type: Number },
    duration: { type: Number }, // in seconds
    audioUrl: { type: String },
    lyrics: { type: String },
    coverImageUrl: { type: String },
    composers: [{ type: String }],
    producers: [{ type: String }],
    languages: [{ type: String }],
    bpm: { type: Number },
    key: { type: String },
    label: { type: String },
    playCount: { type: Number, default: 0 },
    favoriteCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Song = mongoose.model('Song', songSchema);

export default Song;