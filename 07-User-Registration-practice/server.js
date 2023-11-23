const express = require("express")
const app = express()
const dbConnect = require("./DB/dbConnect")

//import the Router
const Router = require("./Router/index")

//import the APP port 
const {APP_PORT, MONGO_URI} = require("./config/index")

//Express middleware to work with JSON
app.use(express.json())

//use the middleware to direct all the request to the router
app.use("/api/v1", Router )

//Express should listen to some port
// app.listen(APP_PORT, ()=>{
//     console.log(`The server is listening to port ${APP_PORT}`)
// })

/*
const dbConnect = async(url)=>{
    return await mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})
}
*/
const startServer = async (url) =>{
    dbConnect(MONGO_URI)
    app.listen(APP_PORT, ()=>{
        console.log(`The server is listening to port ${APP_PORT}`)
    })

}

startServer()