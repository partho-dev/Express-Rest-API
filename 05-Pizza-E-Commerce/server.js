//install express
const express = require('express')
// require('dotenv').config()
const  {APP_PORT, MONGO_URI} = require('./config/index')
const connectDB = require('./db/connect')

//initialise the express
const app = express()

//imports router from routes folder
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const auth = require('./middlewares/auth')

//Make sure this remains above the route middleware
app.use(express.json())

// // auth middleware for authorisation
// app.use(auth)
// Register the router inside the application
app.use('/api', routes)

app.use(errorHandler)
// app.listen(APP_PORT, console.log(`This Node server is listening on port ${APP_PORT}`))

// const port = process.env.PORT || 5000 

const start = async()=>{
    try {
        //connect DB
        await connectDB(MONGO_URI)
        app.listen(APP_PORT, console.log(`This Node server is listening on port ${APP_PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()


//on terminal run "npm run dev" to start 