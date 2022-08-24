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

io.on('connection', (socket) => {
    console.log('a user connected');
});


//listner
server.listen(port, () => console.log(`listing on localhost:${port}`))


//test
app.get('/hello', (req, res) => {
    res.json({
        "data": {
            message: "your app is working",
            code: 200
        }
    })

})


