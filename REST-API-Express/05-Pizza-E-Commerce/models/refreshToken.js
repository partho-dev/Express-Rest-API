const mongoose = require('mongoose')

const refreshTokenSchema = new mongoose.Schema({
    token: { type:String, unique:true }
}, {timestamps:false})

module.exports = mongoose.model('refreshToken', refreshTokenSchema)