const express = require('express')
const app = express()

const port = process.env.port || 5000
//listner
app.listen(port, () => console.log(`listing on localhost:${port}`))


//api

app.get('/hello', (req, res) => {
    res.send("hello world")

})