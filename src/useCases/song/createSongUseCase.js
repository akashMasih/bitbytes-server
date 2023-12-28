import { songRepository } from '../../adapters/repositories/songRepository.js'

async function create(song, res) {
    return await songRepository.create(song)
}

export const createSongUseCase = {
    create
}