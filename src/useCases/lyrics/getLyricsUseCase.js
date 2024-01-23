const lyricsRepository = require('../../adapters/repositories/lyricsRepository.js');
const response = require('../../adapters/services/ResponseService.js');
const { isEmpty } = require('../../utils/index.js');

async function listByParams(body, res) {
    const savedLyrics = await lyricsRepository.findLyricsByParams(body)
    return response.success(res, "Lyrics get Successfully", savedLyrics)
}



const getLyricsUseCase = {
    listByParams
}

module.exports = getLyricsUseCase