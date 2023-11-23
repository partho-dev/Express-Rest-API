const {APP_URL} = require("../config/index")

const mongoose = require("mongoose")
const schema = mongoose.Schema

const productSchema = new schema({
    name : {type: String, required: true},
    price : {type: Number, required: true},
    size : {type: String, required: true},
    image : {type: String, required: true, get: (image)=>{
        // APP_URL = http://localhost:5000 [Add this to .env file and import]
        return `${APP_URL}/${image}`
    }}
}, {timestamps:true, toJSON:{getters:true}, id:false})
// id:false == > This is needed to avoid getting an additional id field on the DB for the product

module.exports = mongoose.model("product", productSchema)