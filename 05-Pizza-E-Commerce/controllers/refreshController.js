const Joi = require('joi')
const RefreshToken = require('../models/refreshToken')
const CustomErrorHandler = require('../services/CustomErrorHandler')
const JwtService = require('../services/JwtService')
const {JWT_REFRESH_SECRET} = require('../config/index')
const User = require('../models/user')
const refreshController = {
    async refresh(req, res, next){
         //validation
         const refreshShema = Joi.object({
            refreshToken: Joi.string().required()
        })

        const {error} = refreshShema.validate(req.body)

        if(error){
            return next(error)
        }
        //check if the refresh token is there on DB, if its there then using that we give access token to clinet
        //If there is no refresh token on DB, that means the user logged out
        let refresh_token
        try {
           refresh_token = await RefreshToken.findOne({token: req.body.refreshToken})

           if(!refresh_token){
            return next(CustomErrorHandler.unAuthorized("Invalid Refresh Token"))
           }

           //Now, need to verify the refresh token
           let userId
           try {
            const {_id} = await JwtService.verify(refresh_token.token, JWT_REFRESH_SECRET)
            userId = _id
           } catch (error) {
            return next(CustomErrorHandler.unAuthorized("Invalid Refresh Token"))
           }

           //Check if the user is availavle 
           const user = await User.findOne({ _id: userId })
           if(!user){
            return next(CustomErrorHandler.unAuthorized("No User found"))
           }

           //if the user is found -generate tokens - Access & Refresh token
            const accessToken = JwtService.sign({_id:user._id, role:user.role})
            const refreshToken = JwtService.sign({_id:user._id, role:user.role}, '1y', JWT_REFRESH_SECRET)
            //whitelist the refresh token inside the DB
            await RefreshToken.create({token: refreshToken})

            
        } catch (error) {
            return next(error)
            
        }
 
    }
}

module.exports= refreshController