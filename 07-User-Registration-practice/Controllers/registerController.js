const Joi = require("joi")
const errorHandler = require("../Middleware/errorHandler")
const userModel = require("../Models/userModel")
const bcrypt = require("bcrypt")
const JWTServices = require("../services/JWTServices")
const CustomErrorHandler = require("../services/CustomErrorHandler")

const registerController = {

    async userRegistration(req, res, next ){
        // res.status(200).json({"msg":"Controller Registration"})
        const registerSchema = Joi.object({
            name : Joi.string().min(3).max(10).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        })

        const {error} = registerSchema.validate(req.body)
        if(error){
            // res.json({"msg":error})
            // throw error
            return next(error)
        }

        //check if the email exiat on the DB or not. So lets prepare for the DB
        try {
            const emailExist = await userModel.exists({email:req.body.email})
            if(emailExist){
                return next(CustomErrorHandler.alreadyExist("This email is already taken"))
            }
        } catch (error) {
            return next (error)
            
        }

        // now as the email is not there on DB, so we have to save the info on the DB and for password, we need to encrypt that
        const {name, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        //prepare the model
        const user = new userModel({
            name:name, 
            email:email, 
            password : hashedPassword})

        //save the model & generate the JWT Token
        let accessToken
        try {
            const savedResult = await user.save()
            accessToken = JWTServices.sign({_id: savedResult._id, role:savedResult.role})
        } catch (error) {
            return next (error)
            
        }

        res.json({accessToken})
    }, 


    //User Login Logic
       async userLogin(req, res, next){

        const loginSchema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        })

        const {error} = loginSchema.validate(req.body)

        if(error){
            return next(error)
        }

        //check if the username/password exist on the DB
        try {
            //compare the username - email
            const emailExist = await userModel.findOne({email:req.body.email})
            if(!emailExist){
                return next(CustomErrorHandler.wrongCredentials())
            }

            //compare the password
            const passwordExist = await bcrypt.compare(req.body.password, emailExist.password)
            if(!passwordExist){
                return next(CustomErrorHandler.wrongCredentials())
            }

            //if all matches, we need to return with token
            const accessToken = JWTServices.sign({_id:emailExist._id, role:emailExist.role})

            //send the token to the client
            res.json({accessToken})

        } catch (error) {
            return next(error)
            
        }
       
    }
}

module.exports=registerController