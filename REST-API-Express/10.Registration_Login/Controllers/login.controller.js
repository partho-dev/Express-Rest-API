const User = require("../models/registration.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req, res)=>{
    const {email, password} = req.body
    const emailExist = await User.findOne({email: email})
    if(!emailExist){
        res.send("The user is not registered, pleasr register")
        return
    }
    const decryptedPassword = await bcrypt.compare(password, emailExist.password)
    if(!decryptedPassword){
        res.send("The password is incorrect, try again")
    }
    const accessToken = jwt.sign({_id:emailExist._id}, process.env.SECRET_JWT )
    res.send(accessToken)
}

module.exports = {login}