const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    password: String,
    userType: String
}, {timestamps:true})

const User = mongoose.model("User", userSchema)
module.exports = User