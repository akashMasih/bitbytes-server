import { createSongUseCase } from "../../useCases/song/createSongUseCase.js";
import { uploadSongUseCase } from "../../useCases/song/uploadSongUseCase.js";
import { response } from "../services/ResponseService.js";


async function uploadSong(req, res) {
    console.log(req.files)
    try {
        const audioFile = req.files?.audioFile && req.files?.audioFile[0]
        // const coverImageFile = req.files?.coverImageFile && req.files?.coverImageFile[0]
        const songId = req.params?.songId;

        if (!songId) {
            response.error(res, 'Song Id is required');
            return

        }
        console.log(req.files)
        if (!audioFile) {
            response.error(res, 'Both audio file and cover image file are required');
            return;
        }

        await uploadSongUseCase.uploadSong(audioFile, songId, res)

    } catch (error) {
        console.error(error);
        response.error(res, "Internal server error.", {}, 500)
    }
}

async function createNewSong(req, res) {
    try {
        const { title } = req.body
        const song = req.body

        if (!title) {
            response.error(res, 'Song Title is Must');
            return;
        }

        const newSong = await createSongUseCase.create(song)
        response.success(res, "Song Created Successfully", newSong)

    } catch (error) {
        console.error(error);
        response.error(res, "Internal server error.", {}, 500)
    }
}

export const songController = {
    createNewSong,
    uploadSong
}