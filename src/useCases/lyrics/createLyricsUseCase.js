const lyricsRepository = require('../../adapters/repositories/lyricsRepository.js');
const response = require('../../adapters/services/ResponseService.js');
const { isEmpty } = require('../../utils/index.js');

async function create(body, res) {
    const lyrics = await lyricsRepository.findLyricsByParams({ slug: body?.slug })
    if (!isEmpty(lyrics)) {
        return response.error(res, "This Song is already existed with same title", lyrics)
    }

    const savedLyrics = await lyricsRepository.create(body)
    return response.success(res, "Your Lyrics Saved Successfully", savedLyrics)
}

const createLyricsUseCase = {
    create
}

module.exports = createLyricsUseCase