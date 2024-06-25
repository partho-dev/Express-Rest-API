const express = require("express")
require("dotenv").config()
const EventEmitter = require("events") // EventEmitter is class. so its capita
// create an instance of EventEmitter class 
let events = new EventEmitter()

/*
This events object has many functions, two most important functions(Methods) of the object are
.on() & .emit()
*/

//Listen to the emit method
let count = 0
events.on("count", ()=>{
    count++
    console.log(`The api is called ${count} times`)
})

const app = express()

app.get("/", (req, res)=>{
    res.send("Helllo, you are on home page")
    // To know how many times this was hit.
    events.emit("count")
})

let port = process.env.PORT
app.listen(port, ()=>{
    console.log(`The server is listening on port ${port}`)
})