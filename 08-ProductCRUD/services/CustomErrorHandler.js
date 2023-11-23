class CustomErrorHandler extends Error{
    constructor(status, msg){
        super()
        this.status = status
        this.message = msg
    }

    static alreadyExist(message){
    return new CustomErrorHandler(402, message)
    }

    static wrongCredentials(message="The userName or the password is incorrect"){
        return new CustomErrorHandler(409, message)
        }


    static notFound(message="The information you are looking for, does not exist, please check your input is correct or not"){
        return new CustomErrorHandler(404, message)
        }

    static unAuthorised(message="Unauthorised - The Token is invalid"){
            return new CustomErrorHandler(401, message)
            }

    static serverError(message="Internal Server Error"){
            return new CustomErrorHandler(500, message)
            }

}

module.exports = CustomErrorHandler