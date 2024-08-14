/*create an object and create multiple functions inside that object as an element of the object
Those functions are the controller functions to get all logic for API */

//use Joi for input validations

const Joi = require('joi')
const CustomErrorHandler = require('../services/CustomErrorHandler')
const User = require('../models/user')
const RefreshToken = require('../models/refreshToken')
const bcrypt = require('bcrypt')
const JwtService = require('../services/JwtService')
const {JWT_REFRESH_SECRET} = require('../config/index')
const registerController = {

    async register(req, res, next ){
        /*
        checklist:
        1. Validate the request
        2. Authorise the request
        3. Check if the user is in the DB already or not
        4. prepare model
        5. Store in Database
        6. Generate JWT token
        7. Send Response
        */

        //validation, create schema first

        const registerSchema = Joi.object({
            //pass everything that needs to be validated
            name : Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        })

        //validate all the inputs that we are receiving from user input
        // console.log(req.body)
        const {error} = registerSchema.validate(req.body)

        if(error){
            // throw error  
            return next(error)
            
            // since the function is an async, so we cant through the error, we have to use next to catch that by the error middleware
        }

        // if the error does not happen, execution comes here
        try {
            // check if the user is there on the DB
            const exist = await User.exists({email:req.body.email}) // we have to create a User model on Mongo DB
            //if exists, then we will send an error msg that the user exists
            //but we will not through the error, as its an asycn function, we have to return this to global error middleware function
            // we have to create a custom error handler class to make different different instances
            if(exist) {
                //here we need to call the customer error handler instance that we created for this error
                return next(CustomErrorHandler.alreadyExist('This email is already taken')) 
            }
            
        } catch (error) {
           /* This is not an instance of validation error or the customError instance of notexist. so this will through the 
            default statuscode and msg from the global middleware function - 500 : Internal server error
            */   
           return next(error)
        }

        //hash the password
        const {name, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10) // 10 is the rounds of salt to encrypt the password

        //prepare the model
        const user = new User({
            name: name,
            email: email,
            password : hashedPassword
        })

        // once the user is created, we need to save that to the DB
        // const result = await User.save() // But, its good practise to put it inside trycatch block
        
        let accessToken // We are declaring it outside the try block so that we can access that outside its block
        let refreshToken 
        try {
            const result = await user.save()

            //if its saved to DB, we need to return Token to clinet, using JWT
            accessToken = JwtService.sign({_id:result._id, role:result.role})
            refreshToken = JwtService.sign({_id:result._id, role:result.role}, '1y', JWT_REFRESH_SECRET)
            //whitelist the refresh token inside the DB
            await RefreshToken.create({token: refreshToken})


        } catch (error) {
            return next(error)
            
        }


        res.status(200).json({name:user.name, access_token:accessToken , refresh_token: refreshToken})
        
    }

}


module.exports = registerController