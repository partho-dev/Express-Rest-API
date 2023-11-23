const jwt = require("jsonwebtoken")
const {JWT_SECRET} = require("../config/index")

class JWTServices {
    static sign(payload, expiry="60D" , secret=JWT_SECRET) {
        return jwt.sign(payload, secret, {expiresIn:expiry})
        
    }
}

module.exports = JWTServices