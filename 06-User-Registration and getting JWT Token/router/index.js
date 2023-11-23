const express = require("express")
const router = require("express").Router()
const registerController = require("../controller/registerController")


router.post("/", registerController.userRegistration)

module.exports=router