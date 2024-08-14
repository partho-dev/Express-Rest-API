const dotenv = require("dotenv").config()

const { APP_PORT, DEBUG_MODE, MONGO_URI, JWT_SECRET, JWT_REFRESH_SECRET, APP_URL } = process.env

module.exports = process.env