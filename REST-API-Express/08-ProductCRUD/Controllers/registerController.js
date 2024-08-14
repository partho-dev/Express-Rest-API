
const user = require("../Models/userModel")
const refreshTokenDB = require("../Models/refreshTokenModel")
const Joi = require("joi")
const bcrypt = require("bcrypt")
const CustomErrorHandler = require("../services/CustomErrorHandler")
const jwt = require("jsonwebtoken")
const {JWT_SECRET, JWT_REFRESH_SECRET} = require("../config/index")


const registerController = {

    async userRegister(req, res, next){
       //validate the user input using Joi
       const uservalidationSchema = Joi.object({
        name : Joi.string().min(3).max(10).required(),
        email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeat_password : Joi.ref('password')
       })

       const {error} = uservalidationSchema.validate(req.body)

       if(error){
        return next(error)
    }

    //now need to verify if the username (email) already exists on our DB
    try {
        const exist = await user.exists({email: req.body.email})
        if(exist){
            return next(CustomErrorHandler.alreadyExist("This email was already taken"))
        }
    } catch (error) {
        return next(error)
    }

    //Now we have to save this to the model
    const {name, email, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    const User = new user({
        name:name,
        email:email,
        password:hashedPassword
    })

    //save the model and return token to the user
    let accessToken
    let refreshToken
    try {
        const saveduser = await User.save()
        accessToken = jwt.sign({_id:saveduser._id, role:saveduser.role}, JWT_SECRET, {expiresIn:"1D"})
        refreshToken = jwt.sign({_id:saveduser._id, role:saveduser.role},JWT_REFRESH_SECRET, {expiresIn:"1y"} )

        // Now we need to store that into the DB
        await refreshTokenDB.create({token:refreshToken })

    } catch (error) {
        return next(error)
        
    }

    res.json({accessToken, refreshToken})

    }
}

module.exports = registerController