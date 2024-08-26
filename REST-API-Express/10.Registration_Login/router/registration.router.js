const express = require("express")
const userRouter = express.Router()
const {registration} = require("../Controllers/reegistration.controller")
const { login } = require("../Controllers/login.controller")

userRouter.post("/register", registration)
userRouter.post("/login", login)

module.exports = userRouter