import mongoose from "mongoose"

export const PORT = 8080

export const connectDb = () => {
    //db config
    try {
        process.env.MONGO_URI && mongoose.connect(process.env.MONGO_URI).then(res => {
            console.log("Connection setup with Database")
        })
    }
    catch (e) {
        console.log("Unable to connect with database", e)
    }
}

// Run Server
export const runServer = (server) => {
    server.listen(PORT, () => {
        console.log(`Your server is running on: ${PORT}`)
    })
} 