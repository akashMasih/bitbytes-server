const express = require('express')
const app = express()

const port = process.env.port || 8080
//listner
app.listen(port, () => console.log(`listing on localhost:${port}`))


//api

app.get('/hello', (req, res) => {
    res.json({
        "data": {
            message: "your app is working",
            code: 200
        }
    })

})