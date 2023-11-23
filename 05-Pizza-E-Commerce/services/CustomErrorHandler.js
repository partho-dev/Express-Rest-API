
//Create a class and inherit the property of existing JS error Error (extends Error)
class CustomErrorHandler extends Error {
    /* need to use constructor which would be useful to create instance of the class
    since we need statuscode and msg, so we will use that for the constructor */
    constructor(status, msg) {
        super()
        this.status  = status
        this.message = msg
    }

    //Create the custom error function 
    // 1. For user does not exist on DB
    // This catches the message which is thrown from the async function
    static alreadyExist(message){
        // returns an object of this class, for that use the keyword "new"
        return new CustomErrorHandler(409, message)
    }

    //2. create anothe method for the entries not there on DB
    static wrongcredentials(message="username or passwors is incorrect"){
        // returns an object of this class, for that use the keyword "new"
        return new CustomErrorHandler(401, message)
    }

       //3. If the Token is invalid or not provided etc
       static unAuthorized(message="Unauthorised, check your token"){
        // returns an object of this class, for that use the keyword "new"
        return new CustomErrorHandler(401, message)
    }

           //4. If the item is not available on the DB
           static notFound(message="404 Not Found"){
            // returns an object of this class, for that use the keyword "new"
            return new CustomErrorHandler(404, message)
        }
}

module.exports = CustomErrorHandler