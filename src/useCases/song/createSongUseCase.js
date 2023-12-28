import { songRepository } from '../../adapters/repositories/songRepository'

async function create(song, res) {
    return await songRepository.create(song)
}

export const createSongUseCase = {
    create
}