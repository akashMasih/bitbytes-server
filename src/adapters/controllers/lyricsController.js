const createLyricsUseCase = require("../../useCases/lyrics/createLyricsUseCase.js");
const { listByParams } = require("../../useCases/lyrics/getLyricsUseCase.js");
const response = require("../services/ResponseService.js");


async function postLyrics(req, res) {
    console.info(req)
    try {
        const { body } = req
        if (!body) {
            response.error(res, 'Validate your request');
            return
        }
        if (!body?.slug) {
            response.error(res, 'Slug is required');
            return
        }
        if (!body?.title) {
            response.error(res, 'Slug is required');
            return
        }
        if (!body?.lyrics) {
            response.error(res, 'Lyrics is required');
            return
        }

        await createLyricsUseCase.create(body, res)


    } catch (error) {
        console.error(error);
        return response.error(res, "Internal server error.", {}, 500)
    }
}

const getLyricsList = async (req, res) => {
    console.info(req)
    try {
        const { body } = req
        if (!body) {
            response.error(res, 'Validate your request');
            return
        }

        await listByParams(body, res)


    } catch (error) {
        console.error(error);
        return response.error(res, "Internal server error.", {}, 500)
    }
}





const lyricsController = {
    postLyrics,
    getLyricsList
}

module.exports = lyricsController