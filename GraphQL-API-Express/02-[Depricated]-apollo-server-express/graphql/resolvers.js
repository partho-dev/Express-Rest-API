const User = require("../models/User")

const resolvers = {
    Query : {
        users: async ()=> await User.find(),
        user: async (_, {id}) =>User.findById(id)
    },
    Mutation: {
        createUser : async (_, {name, email, age, address}) =>{
            const newUser = new User ({name, email, age, address})
            await newUser.save()
            return newUser
        },
        updateUser : async (_, {id, name, email, age, address}) => {
            let newUser = await User.findByIdAndUpdate(id, {name, email, age, address})
            return  newUser
        },
        deleteUser: async (_, {id})=>{
            const newDeletedUser = await User.findOneAndDelete(id)
            return newDeletedUser
        }
    }
}

module.exports = resolvers