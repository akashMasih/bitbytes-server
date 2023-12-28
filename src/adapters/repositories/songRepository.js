import Song from "../../models/Song";
import { response } from "../services/ResponseService";

async function create(song) {
    return await Song.create(song)
}

async function update(songId, song) {
    return await Song.findOneAndUpdate({ _id: songId }, song)
}

async function getById(songId) {
    return await Song.findOne({ _id: songId })
}

async function getAll(songId, song) {
    await Song.getAll({ _id: songId }, song)
}

export const songRepository = {
    create,
    update,
    getById
}