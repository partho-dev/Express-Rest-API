const Joi = require("joi")
const user = require("../Models/userModel")
const refreshTokenDB = require("../Models/refreshTokenModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken") 
const {JWT_SECRET, JWT_REFRESH_SECRET} = require("../config/index")
const CustomErrorHandler = require("../services/CustomErrorHandler")

const loginController = {
    async userLogin(req, res, next){
        //validate if the user input is correct Joi
        const userSchema = Joi.object({
            email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        })

        const {error} = userSchema.validate(req.body)

        if(error){
            return next(error)
        }

        //check if the email is there on the DB
        let accessToken
        let refreshToken
        try {
            const {email, password} = req.body
            const emailexists = await user.findOne({email})
            if(!emailexists){
                return next(CustomErrorHandler.wrongCredentials())
            }
            const hashedPassword = await bcrypt.compare(password, emailexists.password)
            if(!hashedPassword){
                return next(CustomErrorHandler.wrongCredentials())
            }

            accessToken = await jwt.sign({_id:emailexists._id, role: emailexists.role}, JWT_SECRET, {expiresIn:"1D"} )
            refreshToken = await jwt.sign({_id:emailexists._id, role:emailexists.role},JWT_REFRESH_SECRET, {expiresIn:"1y"} )


        // Now we need to store that into the DB
        await refreshTokenDB.create({token:refreshToken })

            
        } catch (error) {
            return next(error)
            
        }

        res.json({accessToken, refreshToken})
    },
    
        async logout(req, res, next){
            try {
                // we are going to do a DB query on the refreshtoken and delete the refresh token that is being sent on the body

                await refreshTokenDB.deleteOne({token: req.body.refreshToken})
                
            } catch (error) {
                return next(error)
                
            }

            res.json({"loggedout": true})

        }
    

}

module.exports = loginController