const mongoose= require('mongoose')

const PostSchema =mongoose.Schema({
    title:{
        type:String,
        required: 'title is required!'
    },
    content:{
        type:String,
        required: 'content is required!'
    },
})

module.exports= mongoose.model('Post', PostSchema)