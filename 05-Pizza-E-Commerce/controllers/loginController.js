const Joi = require("joi")
const User = require('../models/user')
const JwtService = require('../services/JwtService')
const RefreshToken = require('../models/refreshToken')
const {JWT_REFRESH_SECRET} = require('../config/index')
const bcrypt = require('bcrypt')
const CustomErrorHandler = require("../services/CustomErrorHandler")

const loginController = {
    async login(req, res, next){

        //validation
        const loginShema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        })

        const {error} = loginShema.validate(req.body)

        if(error){
            return next(error)
        }

        // if there is no validation error on the input. check if the email & password matches with the DB info
        //for that use try & catch
        try {
        
            const user = await User.findOne({email:req.body.email})
            if(!user) {
                return next(CustomErrorHandler.wrongcredentials())
            }
            //if the username is correct, next verify if the password is correct, but we need to compare the encrypted password
            const match = await bcrypt.compare(req.body.password, user.password)
            if(!match){
                return next(CustomErrorHandler.wrongcredentials())
            }
            //If the password matches, server has to generate the token for the user to authenticate
            const accessToken = JwtService.sign({_id:user._id, role:user.role})
            const refreshToken = JwtService.sign({_id:user._id, role:user.role}, '1y', JWT_REFRESH_SECRET)
            //whitelist the refresh token inside the DB
            await RefreshToken.create({token: refreshToken})

            //then send the token back to the user
            res.status(200).json({msg:`Welcome ${user.name.toUpperCase()} to the application`, accessToken, refreshToken})
        } catch (error) {
            return next(error)
            
        }

    }

}

module.exports = loginController