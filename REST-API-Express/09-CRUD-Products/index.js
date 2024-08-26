const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
app.use(express.json())
const productRoute = require("./routes/products.route")

app.use("/products", productRoute)








const dbConnect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL) 
        console.log("DB Connected")

        app.listen(process.env.PORT, ()=>{
            console.log(`Server is listening on port ${process.env.PORT} `)
        })
    } catch (error) {
        console.log(error)
    }

}

dbConnect()

