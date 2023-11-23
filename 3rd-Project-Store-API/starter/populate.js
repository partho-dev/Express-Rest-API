require('dotenv').config()


const connectDB = require('./db/connect')

const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany() //optional, if there is any data, it deletes
        await Product.create(jsonProducts)
        console.log('Successfully done')
        process.exit(0) // This will exit the process or running the file once its successful 
    } catch (error) {
        console.log(error)
        process.exit(1) // This will exit the process or running the file once its Failed 
    }
}


start()