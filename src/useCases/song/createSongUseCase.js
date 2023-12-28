const songRepository = require('../../adapters/repositories/songRepository.js');

async function create(song, res) {
    return await songRepository.create(song)
}

const createSongUseCase = {
    create
}

module.exports = createSongUseCase