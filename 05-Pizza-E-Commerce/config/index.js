const dotenv = require('dotenv').config()

const {
    APP_PORT=5000,
    DEBUG_MODE,
    MONGO_URI,
    JWT_SECRET,
    JWT_REFRESH_SECRET
} = process.env

module.exports = process.env