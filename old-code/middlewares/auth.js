const jwt = require('jwt-then')
module.exports = async (req, res, next) => {
    console.log(req.headers)
    try {

        // if(!req.headers.token){ 
        //     return res.status(401).json({error:"Forbidden!"}) 
        // }
        // const token= req.headers.token
        // const payload= await jwt.verify(token,process.env.SECRET)

        // req.payload =payload
        next()
    }

    catch (err) {
        console.log(err)
        return res.status(401).json({ error: "Forbidden!" })
    }





}