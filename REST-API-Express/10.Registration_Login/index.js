const express = require("express")
const app = express()
const mongoose = require("mongoose")
const userAuth = require("./router/registration.router")

require("dotenv").config()
app.use(express.json())

app.use("/api/auth", userAuth)

port = process.env.PORT || 3000

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB Connected")

        app.listen(port, ()=>{
            console.log(`The server is running on http://localhost:${port}`)
        })

    } catch (error) {
        console.log(error.message)
    }
}

dbConnection()