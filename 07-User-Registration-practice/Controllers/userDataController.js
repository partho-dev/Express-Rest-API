const user = require("../Models/userModel")

const userDataController = {

    async userData(req, res, next){
        try {
        const userProfile = await user.findOne({_id:req.user._id}) 

        } catch (error) {
            
        }
        
    }
}

module.exports = userDataController;