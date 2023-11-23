const {DEBUG_MODE} = require("../config/index")
const {ValidationError} = require("joi")
const CustomErrorHandler = require("../services/CustomErrorHandler")

const errorHandler = (err, req, res, next) =>{
    let statuscode = 500
    let data = {
        message : "Internal Error",
        ...(DEBUG_MODE==="true" && {originalError : err.message})
    }

    if(err instanceof ValidationError ){
        statuscode = 422
        data = {
            message : err.message
        } 
    }

    if(err instanceof CustomErrorHandler ){
        statuscode = err.status
        data = {
            message : err.message
        } 
    }

    return res.status(statuscode).json(data)
}

module.exports = errorHandler