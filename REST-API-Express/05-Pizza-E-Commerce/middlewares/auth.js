const CustomErrorHandler = require("../services/CustomErrorHandler")
const JwtService = require("../services/JwtService")

const auth = async (req, res, next)=>{
    let authHeader = req.headers.authorization // Headers not header
    if(!authHeader){
        return next(CustomErrorHandler.unAuthorized())
    }
    //if there is no error above, that means the token in valid. so we need to find the token now
    const token = authHeader.split(" ")[1]

    // Once we got the token, need to verify if the token is not tempered 
    try {
        const {_id, role} = await JwtService.verify(token)
        const user = {
            _id,
            role
        }
        req.user = user;
        next();

    } catch (error) {
        return next(CustomErrorHandler.unAuthorized())
        
    }

}


module.exports = auth