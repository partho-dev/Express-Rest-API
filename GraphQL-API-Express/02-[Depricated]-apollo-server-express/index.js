const { ApolloServer } = require("apollo-server-express")
const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
let port = process.env.PORT

const typeDefs = require("./graphql/typedefs")
const resolvers = require("./graphql/resolvers")

const grapgh = async ()=>{

    const GQLServer = new ApolloServer({
        typeDefs:[typeDefs],
        resolvers: [resolvers]
    })
    
    await GQLServer.start()
    GQLServer.applyMiddleware({app})
    
    const mongoDBConnect = async ()=>{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo is connected")
    
        app.listen(port, ()=>{
            console.log(`The GrapghQL server is listening on port ${port}`)
        })
    } 
    mongoDBConnect()
}
grapgh()

// app.use('/graphql', cors(), express.json(), expressMiddleware(GQLserver));