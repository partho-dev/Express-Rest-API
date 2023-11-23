const express = require("express")
const Router = express.Router()
const registerController = require("../Controllers/registerController")
const loginController = require("../Controllers/loginController")
const userController = require("../Controllers/userController")
const refreshController = require("../Controllers/refreshController")
const auth = require("../Middleware/auth")
const adminAuth = require("../Middleware/adminAuth")

const productControllers = require("../Controllers/productControllers")



Router.post("/register", registerController.userRegister)
Router.post("/login", loginController.userLogin)
Router.get("/user", auth,  userController.getUser )
Router.post("/refresh", refreshController.refresh )
Router.post("/logout", auth, loginController.logout )

//Create Post - Only Admins are allowed
Router.post("/products", [auth,adminAuth],  productControllers.store)

//update the pproducts
Router.put("/products/:id", [auth,adminAuth],  productControllers.update)

//Delete Product Route
Router.delete("/products/:id", [auth, adminAuth], productControllers.deleteProduct)

//Get all Products
Router.get("/products", productControllers.getProducts)

// Get a single product
Router.get("/products/:id", productControllers.getSingleProduct)

module.exports = Router