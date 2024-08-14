// create express server
// const express = require("express")
import express  from "express"
const app = express()
app.use(express.json())

app.get("/", (req:any, res:any)=>{
    res.json({
        message: "Hello"
    })

})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{ 
    console.log(`App is listening on port ${PORT}`)
})