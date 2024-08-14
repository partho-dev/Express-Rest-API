const mongoose = require("mongoose")
const schema = mongoose.Schema

const user = new schema({
    name : {type: String, required:true},
    email : {type: String, required:true, unique:true},
    password : {type: String, required:true},
    role : {type: String, default:"customer"}

}, {timestamps:true})

module.exports = mongoose.model("user", user)