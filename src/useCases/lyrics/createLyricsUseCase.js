const lyricsRepository = require('../../adapters/repositories/lyricsRepository.js');
const response = require('../../adapters/services/ResponseService.js');

async function create(song, res) {
    const lyrics = await lyricsRepository.create(song)
    return response.success(res, "Your Lyrics Saved Successfully", lyrics)
}

const createLyricsUseCase = {
    create
}

module.exports = createLyricsUseCase