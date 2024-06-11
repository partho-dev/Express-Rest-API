const express = require("express")
const router = express.Router()

const Controller = require("../controllers/products.controller")

//create products
router.post("/", Controller.createProduct)

//Read Products
router.get("/", Controller.getProduct)

// Read Single Product 
router.get("/:id", Controller.getOneProduct )

// update products 
router.patch("/:id", Controller.updateProduct)

// Delete 
router.delete("/:id", Controller.deleteProducts)

module.exports = router