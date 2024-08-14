const mongoose = require("mongoose")
const schema = mongoose.Schema

const refreshTokenSchema = new schema({
    token : {type: String, unique:true}
}, {timestamps:false})

module.exports = mongoose.model("token", refreshTokenSchema)