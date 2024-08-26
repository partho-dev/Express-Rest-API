## Create a simple Express App with GraphQL & Mongoose to CRUD

### Install the packages

- npm init -y
- npm i express dotenv cors mongoose apollo-server-express
- npm i -D nodemon

## Settting the project structure
- update the script on package.json
```
"scripts": {
    "dev":"nodemon index.js"
  }
```

- make a folder `graphql`
    - make two files `typedefs.js` & `resolver.js`

- typedefs.js
```
const {gql} = require("apollo-server-express")
const typeDefs = gql`

# Keep all types here like Query & mutations

`
```
- resolvers.js

### Setup the DB Schema
- make a folder `models` for db schema
- create a schema (user schema or product schema for testing)

### Create the graphQL server
- Go to index.js
- `const { ApolloServer } = require("apollo-server-express")`
- use `ApolloServer` and create the graphQL server and provide typedefs & resolver as parameter
```
   const GQLServer = new ApolloServer({
        typeDefs:[typeDefs],
        resolvers: [resolvers]
    })
```
- then await on this server and start that
```
await GQLServer.start()
```
- once its started, run the app server inside this graphQl sercer
```
GQLServer.applyMiddleware({app})
```


