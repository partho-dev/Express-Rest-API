## Basic server setup of GraphQL

- We will use typescript
- initialise a node server with `npm init`
- Add typescript - `npm i -D typescript`
- install express - `npm i express`
- initialise the typescript - `npx tsc --init`
- create a `src` folder on root
- configure the typescript - 
- give the root folder which needs to be compiled 
```
   "module": "commonjs", /* Specify what module code is generated. */
    "rootDir": "./src", 
```
- give the destination folder where the build will be stored 
```
change from    
//"outDir": "./", 
to 
"outDir": "./build", 
```

-  create express server `src/server.ts`
- For that, install type of express - `npm i -D @types/express`

- We would need to compile the source code  - `npm i tsc-watch -D`
- This will watch the change in source code and create the build or dist folder
- now, create the script  - `"dev" : "tsc-watch"`
- Execute the command - `npm run dev`
- This will create a folder `build/server.js`
- Now to run our swerver, we have to use - `node build/server.js` by cancelling our previous execution of `npm run dev`

- To make them automated - compile the code & then run the server, we have to create a script accordingly
```
  "scripts": {
    "start" : "node build/server.js",
    "dev" : "tsc-watch --onSuccess \"npm start\""
  }
```
- Now, we just need to run one script `npm run dev`
- This will run the express, now need to setup apollo grapgh QL server

## Setup apollo graphql server on Express
- install apollo server `npm install @apollo/server graphql`

- Set up a root path on the GQL server which would talk with the client
- For that we need to setup the apollo server - https://www.apollographql.com/docs/apollo-server/api/express-middleware/
- set up/update that on src/server.ts
```
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();

// Specify the path where we'd like to mount our server
//highlight-start
app.use('/graphql', cors(), express.json(), expressMiddleware(server));

//highlight-end
```
- But this has a problem, it expects to start the GQL server using await, which can only be possible if we have an async function wrapped with.
- So, we have to change the code and run express & GQL inside a async function
- ensure to install - `npm i @types/cors`
- now execute - `npm run dev`
- This is how we define the graphql server with its components `typeDefs` & `resolvers`
```
const GQLserver = new ApolloServer({
    typeDefs : `type Query { user:String }`,
    resolvers : { Query : { user : ()=> {return "I am the user" } } },
  });
```
- Login to url `http://localhost:3000/graphql`
- This gives a apollo client simulator to see the data coming from backend based on the FE request


