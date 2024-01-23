const Lyrics = require("../../models/Lyrics.js");
const response = require("../services/ResponseService.js");

async function create(lyrics) {
    return await Lyrics.create(lyrics)
}

async function update(lyricsId, lyrics) {
    return await Lyrics.findOneAndUpdate({ _id: lyricsId }, lyrics)
}

async function getById(lyricsId) {
    return await Lyrics.findOne({ _id: lyricsId })
}


async function findLyricsByParams(params) {
    return await Lyrics.find(params)
}

const lyricsRepository = {
    create,
    update,
    getById,
    findLyricsByParams
}

module.exports = lyricsRepository