const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Server = require('socket.io').Server;
const Socket = require('socket.io').Socket;
const createServer = require('node:http').createServer;
const connectDb = require('./src/config/index.js').connectDb;
const runServer = require('./src/config/index.js').runServer;
const initRoutes = require('./src/routes/ROUTES.js')
// const logger = require('pino-http')




// App Initiated
dotenv.config();
const app = express()
// app.use(logger())
app.use(bodyParser.json());
const server = createServer(app);
exports.io = new Server(server, {
    cors: {
        origin: '*',
    }
});

initRoutes(app)
app.use('/', (req, res) => res.send("Your app is up"))


runServer(server)
connectDb()
