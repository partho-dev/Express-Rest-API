const dotenv = require("dotenv").config()

const {APP_PORT, DEBUG_MODE, MONGO_URI, JWT_SECRET} = process.env


module.exports = process.env