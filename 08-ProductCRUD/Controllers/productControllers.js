const productModel = require("../Models/productsModel")
const multer = require("multer")
const path = require("path")
const CustomErrorHandler = require("../services/CustomErrorHandler")
const Joi = require("joi")
const fs = require("fs")



    //Product image upload using multer
    const storage = multer.diskStorage({
        destination : (req, file, cb )=>{cb(null, "assets/images/")},
        filename : (req, file, cb)=>{cb(null, uniquefilename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`)
        // filename : (req, file, cb)=>{cb(null, uniquefilename = file.fieldname + '-' + Date.now())
        //uniquefilename = file.fieldname + '-' + Date.now()
        }
    })

const handleMultipartData = multer({storage, limits:{fileSize:1000000*5}}).single("image")
// const upload = multer({ storage: storage }).single('image')

const productControllers = {
    async store(req, res, next){
        // handleMultipartData(req, res, (err)=>{if(err) {return next (CustomErrorHandler.serverError(err.message))} const filePath = req.file.path})
        handleMultipartData(req, res, async (err)=>{
            if(err) {
                return next (CustomErrorHandler.serverError(err.message))
                } 
            console.log(req.file)
            const filePath = req.file.path
            // res.json({})
            /* This is the end of code for uploading image */

            //Do the validation using Joi for all the input fields from the user
            const productvalidationSchema = Joi.object({
            // name price size image
            name : Joi.string().required(),
            price : Joi. number().required(),
            size : Joi.string().required()
            // image : Joi.string().required()
            })

            const {error} = productvalidationSchema.validate(req.body)

            if(error){
                fs.unlink(`${appRoot}/${filePath}`, (err)=>{
                    if(err){
                        return next (CustomErrorHandler.serverError(err.message))
                    }
                    })
                    return next(error)
                    //delete the uploaded image also
                    //rootfolder/assets/images/filename.png

                    
                }

            const {name, price, size, image} = req.body
            let document
                try {
                    document = await productModel.create({
                        name:name,
                        price: price,
                        size : size,
                        image : filePath
                    })
                } catch (error) {
                    return next(error)
                }
                res.status(201).json(document)
            })
            
    },

    // Update the product Logic
     async update(req, res, next){
        handleMultipartData(req, res, async (err)=>{
            if(err) {
                return next (CustomErrorHandler.serverError(err.message))} 
                // console.log(req.file)
                let filePath
                if(req.file){
                    filePath = req.file.path
                }
                // res.json({})
                /* This is the end of code for uploading image */

                //Do the validation using Joi for all the input fields from the user
                const productvalidationSchema = Joi.object({
                    // name price size image
                    name : Joi.string().required(),
                    price : Joi. number().required(),
                    size : Joi.string().required()
                    // image : Joi.string().required()
                })

                const {error} = productvalidationSchema.validate(req.body)

                if(error){
                    if(req.file){
                        fs.unlink(`${appRoot}/${filePath}`, (err)=>{
                            if(err){
                                return next (CustomErrorHandler.serverError(err.message))
                            }
                        })  }
                    return next(error)
                    //delete the uploaded image also
                    //rootfolder/assets/images/filename.png
                }

                const {name, price, size} = req.body
                let document
                try {
                    document = await productModel.findByIdAndUpdate({_id: req.params.id}, {
                        name:name,
                        price: price,
                        size : size,
                        ...(req.file && {image : filePath})
                    } , {new: true})
                } catch (error) {
                    return next(error)
                }
                res.status(201).json(document)
            })
     },

     //Delete product
     async deleteProduct(req, res, next) {

        let document = await productModel.findByIdAndDelete({_id:req.params.id})
        if(!document){
            return next(CustomErrorHandler.notFound("The item is not found to be deleted"))
        }
        //Delete the image also

         //let imagePath = document.image 
         /*But, after implimenting the Getters on the image model, the imagePath is changed to http://domain.com/assets/image 
         so, the final path of the image would be 
         appRoot/domain.com/assets/image/image.png
         need to make it appRoot/assets/image/image.png to make the image delete
         For that we can not call image directly from document, we have to call from _doc(original document)
         */
        let imagePath = document._doc.image
       
        fs.unlink(`${appRoot}/${imagePath}`, (err)=>{
            if(err){
                return next(CustomErrorHandler.serverError())
            }
        })

        res.status(200).json(document)

     },

     //Get All the products
     async getProducts(req, res, next){
        let document
        try {
            document = await productModel.find().select("-__v").sort({_id:-1})

            if(!document){
                return next(CustomErrorHandler.notFound("No Products Found to be shown"))
            }
        } catch (error) {
            return next(error)
        }

        res.status(200).json(document)
     },

     //Get a single Product

     async getSingleProduct(req, res, next) {

        let document 
        try {
            document = await productModel.findById({_id:req.params.id})
            if(!document){
                return next(CustomErrorHandler.notFound("The product does not exist"))
            }
        } catch (error) {
            return next(error)
            
        }

        res.status(200).json(document)

     }


}


module.exports = productControllers