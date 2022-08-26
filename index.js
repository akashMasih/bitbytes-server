//import
const express = require('express')
require('./bin/connection')
const cors = require('cors')
const jwt = require('jwt-then')
const http = require('http');
const { Server } = require("socket.io");




//app config
const app = express()
const server = http.createServer(app);
const port = process.env.PORT || 8080

//midleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


//api routes
app.get('/', (req, res) => res.send("your app is up"))
app.use("/user", require('./routes/User'))
app.use("/chatroom", require('./routes/Chatroom'))
app.use("/post", require('./routes/Post'))
app.use("/feedback", require('./routes/FeedbackRoute'))

//socket
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.use((socket, next) => {
    const user = socket.handshake.auth.user;
    if (!user) {
        return next(new Error("invalid username"));
    }
    socket.user = user;
    next();
});
io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
        users.push({
            userID: socket.user.id,
            user: socket.user,
        });
    }

    //send user list
    socket.emit("users", [...new Set(users)]);

    // tell user user is online or ofline 

    socket.broadcast.emit("user connected", (
        users.filter(element => element.user.id !== socket.user.id) && {
            userID: socket.user.id,
            user: socket.user
        }
    ));


    socket.on("private message", (anotherSocketId, msg) => {
        socket.to(anotherSocketId).emit("private message", socket.id, msg);
        console.log(anotherSocketId, msg)
    });
});


//listner
server.listen(port, () => console.log(`listing on localhost:${port}`))


// Export the Express API
module.exports = app;

