// create express server
// const express = require("express")
import express, { query }  from "express"
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from "cors"

const GQLServer = async ()=>{
const app = express()
app.use(express.json())

const GQLserver = new ApolloServer({
    typeDefs : `type Query { user:String }`,
    resolvers : { Query : { user : ()=> {return "I am the user" } } },
  });
  // Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await GQLserver.start();

// Specify the path where we'd like to mount our server
app.use('/graphql', cors(), express.json(), expressMiddleware(GQLserver));

app.get("/", (req:any, res:any)=>{
    res.json({
        message: "Hello"
    })

})

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{ 
    console.log(`App is listening on port ${PORT}`)
})
}
// call the entire function globally
GQLServer()