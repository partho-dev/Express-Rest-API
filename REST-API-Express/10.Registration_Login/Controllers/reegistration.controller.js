const User = require("../models/registration.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret = process.env.SECRET_JWT


const registration = async (req, res)=>{
    try {
        let {name, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        let user = await new User({
            name: name,
            email: email,
            password: hashedPassword
        })
        const savedUser = await user.save()
        const userToken = jwt.sign({id: savedUser._id}, process.env.SECRET_JWT)
        res.json({user:savedUser, token: userToken})
    } catch (error) {
        console.log(error.message)
    }
    
}


module.exports = {registration}