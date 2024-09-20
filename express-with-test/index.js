const express = require("express")

// Install the mongoose package 
// const mongoose = require("mongoose") 

require("dotenv").config()
const app = express()

app.use(express.json())

// Routing
app.get("/", (req, res)=>{
    res.status(200).json({
        status: "success",
        message : "Hello users., this is the response with status code 200, I am coming from express"
    })

})

// Export the app for testing
module.exports = app

const port = process.env.PORT || 3000



const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.DB_URL_Mongo)
    console.log("The DB connection is successful")
    

    app.listen(port, ()=>{
        console.log("The express server is listening on port :" + port)
    })

    } catch (error) {
        console.log(error.message)
    }
}

//Call the Db connection function  
// When We have the DB URL for Mongo, uncomment this function & update the Mongo Atlast URL on .env file

// dbConnection()


app.listen(port, ()=>{
    console.log("The express server is listening on port :" + port)
})
