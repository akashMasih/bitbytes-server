const mongoose = require('mongoose')
const Chatroom = require('../models/Chatroom')
exports.createChatroom = async(req, res)=>{
   const { name,admin,img }= req.body
   const nameRegex = /^[A-Za-z\s]+$/

   if(!nameRegex.test(name)){
       return res.status(400).json({error:"chatroom name can contain only alphabets"});
   }
   const chatroomExist= await Chatroom.findOne({name})
   if(chatroomExist){
    return res.status(400).json({error:"chatroom is already exist with this name"}); 
   }
   const chatroom = Chatroom({name,admin,img})
   await chatroom.save()
   res.status(201).json({
   message: `${name} chatroom created successfully!` 
})
}

exports.getAllChatroom = async(req,res)=>{
    res.json(await Chatroom.find().sort({created_at: -1}))
} 