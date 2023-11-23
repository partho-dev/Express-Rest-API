const Joi = require("joi")
const refreshTokenModel = require("../Models/refreshTokenModel")
const userModel = require("../Models/userModel")
const CustomErrorHandler = require("../services/CustomErrorHandler")
const jwt = require("jsonwebtoken")
const {JWT_SECRET, JWT_REFRESH_SECRET} = require("../config/index")
const refreshController = {
    async refresh(req, res, next) {

        //validate the request using Joi
        const tokenSchema = Joi.object({
            refreshToken : Joi.string().required()
        })
        const {error} = tokenSchema.validate(req.body)
        if(error){
            return next(error)
        }

        //if there are no validation error, the code comes here to be executed
        // we will validate if the refresh token that we are receiving through req body exists on DB, then we will issue access token
        let refreshToken
        try {
            refreshToken = await refreshTokenModel.findOne({token: req.body.refreshToken})

            if(!refreshToken) {
                return next(CustomErrorHandler.unAuthorised("Refresh Token is not found on the DB"))
            }

            // if refresh token is present in the DB, we have to issue the access Key
            // need to validate the token and find the payload

            let userID
            try {
                const {_id} = await jwt.verify(refreshToken.token, JWT_REFRESH_SECRET)
                userID = _id
                
            } catch (error) {
                return next(CustomErrorHandler.unAuthorised("Refresh Token is not found on the DB"))
            }

            /*
            now we got the userID for who we need to generate the Token
            But, we need to verify if the user exists on the usertable
            */
            const user = userModel.findOne({_id:userID})
            if(!user){
                return next(CustomErrorHandler.unAuthorised("No user found the DB"))
            }

            //Generate access Token & Refresh Token

            accessToken = await jwt.sign({_id:userID._id, role: userID.role}, JWT_SECRET, {expiresIn:"1D"} )
            const refresh_Token = await jwt.sign({_id:userID._id, role:userID.role},JWT_REFRESH_SECRET, {expiresIn:"1y"} )


            // Now we need to store that into the DB
            await refreshTokenModel.create({token:refreshToken })

            res.json({accessToken, refreshToken:refresh_Token})


        } catch (error) {
            return next(error)
            
        }


    }


}


module.exports = refreshController