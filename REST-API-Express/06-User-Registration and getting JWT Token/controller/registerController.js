const Joi = require('joi');
const CustomErrorHandler = require('../services/CustomErrorHandler');
const user = require("../model/userModels")
const bcrypt = require("bcrypt");
const JWTServices = require('../services/JWTServices');


const registerController = {

        async userRegistration(req, res, next){
        const registerSchema = Joi.object({
            name : Joi.string().min(3).max(10).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        })
        const {error} = registerSchema.validate(req.body)

        // check if there is any errors in the input
        if(error){
            // res.json({"msg":error})
            // throw error
            return next(error)
        }
        //Now check if the user email is already registered with us, check on the DB
        try {
        const exist = await user.exists({email : req.body.email})
        if(exist){
            return next(CustomErrorHandler.alreadyExist("This email already been taken"))
        }
        } catch (error) {
            return next(error)
            
        }

        //Allow the Registration by hashing the password, use bcrypt
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        //Now save that to the existing model on the DB
        const {name, email, password} = req.body
        const User = new user({
            name: name,
            email:email,
            password: hashedPassword
        })

        //save the model and send the token to the user

        let access_token

        try {
            const result = await User.save()
            // console.log(result)

            access_token = JWTServices.sign({_id:result._id, role:result.role})

        } catch (error) {
            return next(error)
        }
        



        res.json({access_token})
    }

}

module.exports=registerController

/*
const Joi = require("joi")

const registerController = {
     async userRegistration(req, res, next){
        const registerSchema = Joi.object({
            name : Joi.string().min(3).max(10).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            repeat_password: Joi.ref('password')
        })

        const {error} = registerSchema.validate(req.body)
        if(error){
            return next(error)
        }
     }

     try{
        const exist = users.exists({email:req.body.email})
        if(exist){
        return next() 
     }
     }catch{}


     res.status(200).json({"msg":"Express"})


*/