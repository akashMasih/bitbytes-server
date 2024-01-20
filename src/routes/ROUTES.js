const loginRoutes = require("./loginRoutes.js");
const lyricsRoutes = require("./lyricsRoutes.js");
const songRoutes = require("./songRoutes.js");


const initRoutes = (app) => {
    app.use('/api', loginRoutes);
    app.use('/api', songRoutes);
    app.use('/api', lyricsRoutes);

}

module.exports = initRoutes