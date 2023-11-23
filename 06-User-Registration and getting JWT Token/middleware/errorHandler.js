const {DEBUG_MODE} = require("../config/index")
const {ValidationError} = require("joi")
const CustomErrorHandler = require("../services/CustomErrorHandler")

const errorHandler = (err, req, res, next)=>{
    let statusCode = 500
    let data = {
            message : "Internal server error",
            ...(DEBUG_MODE==="true" && {originalError : err.message}) 
    }

    if(err instanceof ValidationError){
        statusCode =  422
        data = {
            message : err.message
        }
    }

    if(err instanceof CustomErrorHandler){
        statusCode = err.status
        data = {
            message : err.message
        }
    }

    return res.status(statusCode).json(data)

}


module.exports=errorHandler

/*
const {ValidationError} = require("joi")
const errorHandler = (err, req, res, next) =>{
    statusCode = 500
    data = {
        message : "Internal server Error",
        ...(DEBUG_MODE==="true" && {originalError : err.message})
    }

    if (err instance of ValidationError){
        statusCode = 422
        data = {
            message : err.message
        }
    }
    return res.status(statusCode).json(data)
}

*/