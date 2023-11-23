const dotenv = require("dotenv").config()

const {APP_PORT, MONGO_URI, DEBUG_MODE, JWT_SECRET}=process.env

module.exports=process.env