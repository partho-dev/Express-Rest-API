
const express = require('express')
const app = express()
const taskRouter = require('./routes/tasks')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config( )

const connectDB = require('./db/connect')


//Use a middleware to server static content
// app.use(express.static('./public'))
//setup the middleware for JSON
app.use(express.json()) 

//setup the middleware for the router
app.use('/api/v1/tasks', taskRouter) 

app.use(notFound) // middleware for 404 page
app.use(errorHandlerMiddleware) // middleware for errorhandler function

const PORT = process.env.PORT ||  3000

//create a function to check the DB connectivity first and then start the Node server
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>{
            console.log(`The server is listening on port ${PORT}...`)
        })

    } catch (error) {
        console.log(error)
    }
}

start()