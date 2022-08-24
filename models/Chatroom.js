const mongoose= require('mongoose')

const ChatroomSchema =mongoose.Schema({
    name:{
        type:String,
        required: 'Chatroom is required!'
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        required: 'User is required!',
        ref: 'User'
    },
    img:String,
    created_at : { type: Date, required: true, default: Date.now },
    is_active:{
        type:Number,
        default:1
    }
    

})

module.exports= mongoose.model('Chatroom', ChatroomSchema)