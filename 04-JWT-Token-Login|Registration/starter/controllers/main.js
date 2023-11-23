/*
1. check username / password in post(Login) request [Req.body]
2. If exist create JWT
3. Send the Token to FE
4. Setup authentication to access Dashboard only if they have token
*/

//impliment JWT
const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')


const login = async (req, res)=>{
    const {username, password} = req.body
    //Check and validate if the username & password was provided by the user
    if(!username || !password){
        throw new CustomAPIError('Pleaae provide email & password', 400)
    }

    //create an ID, creating manually, generally it comes from DB
    const id = new Date().getDate()

    //try to keep the payload small for better user-experience, we are keeping id as the payload here
    /* 
    1. jwt.sign({payload_username and can add ID}, secret, optional_expiry)
    2. Note: Keep the payload as small as possible, you can keep only username alone
    */
    const token = jwt.sign({id, username}, process.env.JWT_SECRET,{expiresIn:'30d'})
    // console.log(token)
    res.status(200).json({msg: 'User is created successfully', token:token})
}

const dashboard = async ( req, res) =>{

    const authheader = req.headers.authorization // make sure to type the spelling correctly -- authorization
    // console.log(`The Authheader is ${authheader}`)
    if(!authheader || !authheader.startsWith('Bearer ')){
        throw new CustomAPIError('The token is invalid', 401)
    }

    /*
    1. We need to find the name of user who is authorised to access the dashboard
    2. From the authheader and find the token
    3. Then decode the Token using the method jwt.verify(token, JWT_SECRET_FROM_ENV) || This will give the payload and you can find the user name
    */

    /*We are splitting the autheader as its a string and spliting with space and using index 1 to find the 2nd value 
    1st index [0] = Bearer
    Space 
    2nd Index [1] = actual string of token
    */
    const token = authheader.split(' ')[1] 
    // console.log(token)

    //Decode the Token to find the payload
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decode)
        const luckyNumber = Math.floor(Math.random()*100)
        res.status(200).json({msg: `Hello ${decode.username}`, secret: `Your authorised data and your lucky number is ${luckyNumber}`})
    } catch (error) {
        throw new CustomAPIError('Not Authorised to access this', 401)
    }

    // // Before implimenting the JWT token
    // const luckyNumber = Math.floor(Math.random()*100)
    // //some static value on the name, once we set up the JWT, we will decode to find the name of the user
    // res.status(200).json({msg: `Hello John Does`, secret: `Your authorised data and your lucky number is ${luckyNumber}`})
}


module.exports = {
    login,
    dashboard
}

