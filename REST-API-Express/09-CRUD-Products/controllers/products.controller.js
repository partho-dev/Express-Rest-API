const Products = require("../model/products.model")


// create 
const createProduct = async (req, res)=>{
    try {
        const newProduct =  new Products(req.body)
        await newProduct.save()
        res.send(newProduct)
    } catch (error) {
        console.log(error)
        res.send(error)
        
    }
}

// Read 
const getProduct = async (req, res)=>{
    let product = await Products.find()
    try {
        if(product.length>0){
            res.send(product)
        }else{
            res.send("No products found")
        }
        
    } catch (error) {
        res.send(error)
    }
    
}

// Read single product 
const getOneProduct = async (req, res) =>{
    try {
        let productID = req.params.id
        let singleProduct = await Products.findById(productID)
        if(!singleProduct){
            res.send("No Products found")
        }else{
            res.send(singleProduct)
        }
    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
}

// update 
const updateProduct = async (req, res) =>{
try {
    let productID = req.params.id
    console.log(productID)
    let product = await Products.findByIdAndUpdate(productID, req.body, {new:true})
    if(!product){
        console.log("No products found")
        res.send("No products found")
    }else{
        res.send(product)
    }
} catch (error) {
    res.send(error)
}
}

//Delete
const deleteProducts = async(req, res)=>{
    try {
        let productID = req.params.id
        let DeletedProduct = await Products.findByIdAndDelete(productID)
        if(!DeletedProduct){
            res.send("No products Found")
        }else{
            res.send(DeletedProduct)
        }
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = {createProduct, getProduct, getOneProduct, updateProduct, deleteProducts}