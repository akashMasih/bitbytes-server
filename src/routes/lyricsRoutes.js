// src/routes/chatRoutes.ts
const express = require('express')
const lyricsController = require('../adapters/controllers/lyricsController')
const lyricsRoutes = express.Router();


lyricsRoutes.post('/lyrics/post', lyricsController.postLyrics)
lyricsRoutes.post('/lyrics/getAll', lyricsController.getLyricsList)




module.exports = lyricsRoutes;
