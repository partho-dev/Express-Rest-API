const CustomErrorHandler = require("../services/CustomErrorHandler")
const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config/index")

const auth = async(req, res, next)=>{

    let authHeader = req.headers.authorization
    if(!authHeader){
        return next(CustomErrorHandler.unAuthorised())
    }

    const token = authHeader.split(" ")[1]

    try {
        const {_id, role} = await jwt.verify(token, JWT_SECRET )
        req.user = {_id, role}
        next()
        
    } catch (error) {
        return next(CustomErrorHandler.unAuthorised())
        
    }
}

module.exports = auth