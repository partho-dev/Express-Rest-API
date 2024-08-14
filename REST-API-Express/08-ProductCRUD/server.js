const express = require("express")
const app = express()
const dbConnect = require("./DB/dbConnect")
const {APP_PORT, MONGO_URI} = require("./config/index")
const Router = require("./Router/index")
const path = require("path")

global.appRoot = path.resolve(__dirname)
//for image, we need another middleware 
app.use(express.urlencoded({extended:false}))

app.use(express.json())
app.use("/api/v1", Router )
app.use("/assets/images", express.static("assets/images"))

const start = async (url)=>{
    dbConnect(MONGO_URI)
    app.listen(APP_PORT, ()=>{
        console.log( `The server is listening on port ${APP_PORT}`)
    })
}  

start() 