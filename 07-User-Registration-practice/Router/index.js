const express = require("express")
//Create the Router
const Router = express.Router()

//import the controller
const registerController = require("../Controllers/registerController")
const userDataController = require("../Controllers/userDataController")


//Create the route for API
//Register API route
Router.post("/register", registerController.userRegistration)
Router.post("/login", registerController.userLogin)
Router.get("/userdata", userDataController.userData)

module.exports = Router