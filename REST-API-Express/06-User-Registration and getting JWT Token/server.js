const express = require ("express")
const app = express()
const {APP_PORT, MONGO_URI} = require("./config/index")
const connectDB = require("./db/connect")
const router = require("./router/index")
const errorHandler = require("./middleware/errorHandler")

app.use(express.json())

// app.get("/",  (req, res)=>{res.send("Hello")})
app.use("/api/v1", router)
app.use(errorHandler)

const start = async (url)=>{
    try {
        await connectDB(MONGO_URI)
        app.listen(APP_PORT, ()=>{
            console.log(`This server is listening on port ${APP_PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()