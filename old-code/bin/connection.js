
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
//db config
mongoose.connect(process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('error', (err) => {
    console.log(`mongoose connection error: ${err.message}  `)
})
mongoose.connection.once('open', () => {
    console.log(`mongodb conected`)
})