const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Server = require('socket.io').Server;
const Socket = require('socket.io').Socket;
const createServer = require('node:http').createServer;
const connectDb = require('./src/config/index.js').connectDb;
const runServer = require('./src/config/index.js').runServer;
// const loginRoutes = require("./src/routes/loginRoutes.js");
// const songRoutes = require("./src/routes/songRoutes.js");



// App Initiated
dotenv.config();
const app = express()
app.use(bodyParser.json());
const server = createServer(app);
exports.io = new Server(server, {
    cors: {
        origin: '*',
    }
});



app.use('/', (req, res) => res.send("Your app is up"))

// console.log(loginRoutes)
//ROUTES
// login Routes
// app.use('/api', loginRoutes);
// app.use('/api', songRoutes);

runServer(server)
connectDb()
