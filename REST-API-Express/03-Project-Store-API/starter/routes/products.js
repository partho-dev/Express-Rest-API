const express = require('express')

const router = express.Router()

const {
    getAllProductsStatic,
    getAllProducts
} = require('../controllers/products')

router.get('/', getAllProducts)
router.get('/static', getAllProductsStatic)


module.exports = router