const mongoose = require("mongoose")

const connectDB = async (url)=>{
    return await mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})
}

module.exports=connectDB