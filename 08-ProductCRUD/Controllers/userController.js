const user = require("../Models/userModel")
const CustomErrorHandler = require("../services/CustomErrorHandler")

const userController = {

    async getUser(req, res, next){
        try {
            const User = await user.findOne({_id: req.user._id}).select("-__v")
            if(!User){
                return next(CustomErrorHandler.notFound())
            }
            res.status(200).json({User})
        } catch (error) {
            return next(error)
            
        }
        // res.status(200).json(User)
    }

}

module.exports = userController