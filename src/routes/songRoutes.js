
const express = require('express');
const songController = require('../adapters/controllers/songController.js');

const multer = require('multer');
const storage = multer.memoryStorage(); // In-memory storage for demonstration purposes
const upload = multer({ storage: storage });
const songRouter = express.Router()

songRouter.post('/createSong', songController.createNewSong)
songRouter.post('/upload-song/:songId', upload.fields([
    { name: 'audioFile', maxCount: 1 }, // Field for image file, maxCount: 1 means only one file allowed
    { name: 'coverImageFile', maxCount: 1 }, // Field for document file, maxCount: 1 means only one file allowed
]), songController.uploadSong)



module.exports = songRouter