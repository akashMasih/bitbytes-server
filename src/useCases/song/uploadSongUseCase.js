import { songRepository } from "../../adapters/repositories/songRepository.js";
import { response } from "../../adapters/services/ResponseService.js"
import s3Config from "../../config/s3Config.js";


const audioPath = 'audio/'; // Include a trailing slash to denote a folder
const coverPath = "coverImages/"

async function uploadToS3(file, key) {
    const s3 = await s3Config()
    const params = {
        Bucket: "akashmusic",
        Key: key,
        Body: file.buffer,
    };

    const result = await s3.upload(params).promise();
    return result.Location; // S3 URL
}

const createSongKey = (path, song) => {
    return `${path}_${song}`
}

const uploadSong = async (audioFile, songId, res) => {

    const song = await songRepository.getById(songId)
    if (!song) {
        response.error(res, "Song not found")
        return
    }

    // Upload audio file to S3
    const audioS3Url = await uploadToS3(audioFile, createSongKey(audioPath, songId));

    // Upload cover image file to S3
    // const coverImageS3Url = await uploadToS3(coverImageFile, createSongKey(coverImageFile, songId));

    song.audioUrl = audioS3Url
    // song.coverImageUrl = coverImageS3Url

    const updatedSong = await songRepository.update(songId, song);
    if (updatedSong) {
        response.success(res, "Song Uploaded Successfully", updatedSong)
    } else {
        response.error(res, "Song not found")
    }
}

export const uploadSongUseCase = {
    uploadSong
}