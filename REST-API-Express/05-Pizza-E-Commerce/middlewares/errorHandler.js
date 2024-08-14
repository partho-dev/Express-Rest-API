
const { DEBUG_MODE } = require('../config/index')
const { ValidationError } = require('joi')
const CustomErrorHandler = require('../services/CustomErrorHandler')

const errorHandler = (err, req, res, next)=>{
    let statusCode = 500
    let data = {
        message : "Internal server error",
        ...(DEBUG_MODE ==='true' && {originalError:err.message}) // async throws, err catches, so thats the original error
    }

    if( err instanceof ValidationError ){
        //we can overwrite the default status code above (500) & the data with original message
        statusCode = 422
        data = {
            message : err.message
        }
    }

    //if the err that is thrown by the alreadyExist user on DB
    if(err instanceof CustomErrorHandler){
        statusCode = err.status
        data = {
            message : err.message
        }
    }

    // The response would be sent to the client from here, if its error
    return res.status(statusCode).json({data})
}





module.exports = errorHandler 