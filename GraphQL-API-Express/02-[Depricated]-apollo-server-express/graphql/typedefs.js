// const {gql} = require("apollo-server-express")
// const typeDefs = gql`
const typeDefs = `#graphql

# Keep all types here like Query & mutations
type User {
    id:ID!
    name:String!
    age:Int!
    email:String!
    address: String
}

type Query {
    # find all users 
    # This will return the array of user but of type User that we defined above 
    users : [User]

    # Find single user based on parameter
    # This will return a single user object, no arrays
    user(id:ID!):User
}

# To update the users, we need mutations 
type Mutation {
    # createUser(put all the data that we get from the UI):then return the user once its created
    createUser(name:String, email:String, age: Int, address:String):User
    updateUser(id:ID!, name:String, email:String, age: Int, address:String):User
    deleteUser(id:ID!):User
}

`

module.exports = typeDefs