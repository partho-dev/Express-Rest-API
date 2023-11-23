const CustomErrorHandler = require("../services/CustomErrorHandler")
const user = require("../Models/userModel")


const adminAuth = async (req, res, next) => {
    try {
        const User = await user.findOne({_id:req.user._id})
        if(User.role === "admin"){
            next()
        }else{
            return next(CustomErrorHandler.unAuthorised("Only the Admin users are allowed"))
        }
    } catch (error) {
        return next(CustomErrorHandler.serverError())
    }

}

module.exports = adminAuth