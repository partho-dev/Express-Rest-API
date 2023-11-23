const mongoose = require("mongoose")

const dbConnect = async(url)=>{
    return await mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})
}

module.exports = dbConnect