const User = require('../models/user')
const CustomErrorHandler = require('../services/CustomErrorHandler')

const userController = {
    async me(req, res, next){
        try {
            /*
            Since the user is restricted, so to see its info, we need to pass the token to validate its an authorised user
            For that we will use a middleware
            */
            const user = await User.findOne({_id:req.user._id}).select("-password -__v")
            if(!user){
                return next(CustomErrorHandler.notFound())
            }

            res.status(200).json({data : user})


        } catch (error) {
            return next(error)
        }
    }
}


module.exports = userController