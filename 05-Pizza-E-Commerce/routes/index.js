const express = require('express')
const router = express.Router( )
const auth = require('../middlewares/auth')

//import the controller here
const registerController = require('../controllers/registerController')
const loginController = require('../controllers/loginController')
const userController = require('../controllers/userController')
const refreshController = require('../controllers/refreshController')

//Registering a user
router.post('/register', registerController.register)

//Login a user
router.post('/login', loginController.login)

//List the user info
router.get('/me', auth, userController.me)

//refresh token
router.post('/refresh', refreshController.refresh)

//Logout 
// router.post('/logout', auth, loginController.logout)

module.exports = router