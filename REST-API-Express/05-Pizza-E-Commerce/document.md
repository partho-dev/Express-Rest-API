initialise the node that will install package.json : npm init -y
install express : npm install express
To use es6 style module, like import : import this from that : install the package esm. But, its completely optional : npm install esm
    we can use const this = require('that')
install nodemon with dev dependancy : npm i nodemon -D
To keep all the environment variables, use dotenv : npm i dotenv 
Now, make the most important file on the server : server.js 
    install express and initialise that with app 
inside .env file : keep the port which we can use for listening the server
    But, we will not use these Keys from .env directly, we will include anothe layer 
    create a folder named "config" and create a file "index.js"
    destructure all the .env keys with const and assign that to process.env
    then module.exports = process.env

Go to server.js file and import it first
then use that key for app.listen

Best practise : create a todo.txt file and note down all the endpoints to plan for the API 

Folder structure
    routes folder : Keep all routes here
        index.js : This will have all the info about all the routes and controller will import all routes from here


    controller folder 


error handling
    JS has a default process to throw error like 
    if(error){throw error }
    and the error middleware catches that error and show on UI

    but, if the function is an async, the error middleware can not catch this error.
    To make that to catch the error, need to use next 
    if(error){
        return next(error)
    }

Now, make an error middleware to catch all the errors sent from async functions
middlewares
    errorHandler.js - This function has 4 parameters (err, req, res, next)
    here, the 1st parameter - err : It catches the error that is thrown by any async function next(error)
    when we send the error to client, we send two properties 
        status code & error message
        here, we have to put a condition on where are we catching the error (err) from
            ValidationError for Joi (Need to import it from Joi) or

    Register that middleware into main server.js file only below the routes middleware 

Before registering the user, we need to check if the user is there on the DB or not. for that we will use the exist method on Mongo
If the user is not there, we need to send an error. This error also needs to be thrown to the error middleware
    But while it catches the error on the error middleware, how will it verify the "instanceof"
    So, we have to create a custom error handler class to make different different instances of errors

    To create a customer error handler class (name starts with capital letter) - Make a folder named "services"/CustomErrorHandler.js

Create models folder for DB and create the file name user.js & install mongoose
create the DB connection on server.js

During user registration, we have to hash the password and save to the DB, for that we will use the bcrypt library.
npm i bcrypt | import it to the controller 
const hashedPassword = await bcrypt.hash(req.body.password, 10) // 10 is the rounds of salt to encrypt the password
//prepare the model
// once the user is created, we need to save that to the DB
// once the user is saved to DB, we have to send a token to the client and for that we will use JWT
npm i jsonwebtoken
once its installed, we can use that to sign the token, verify the token.
So, if we can create that as a seperate service, we can use that throughout the application.
services/

to compare the hashed password sent by user during login with the DB hased password
bcrypt.compare(req.body.password, user.password)

Refresh Token : This is needed to make the user authentication much secure and its used to logout the user from the application
    There are two kinds of token, access token - generally we keep its expiry very less, may be 30 mins.
    but, the refresh token we can keep for long, may be around 1Y.
    So, when we user logs in to application, he is given with an access token and a refresh token 
        the key to sign these two keys should be different on .env file 
    Basically - the refresh token is used to get a new access token from the server upon its expiry
    Refresh tokens we save to Database and whitelist them on DB, and it gets deleted from the DB once the user logsout
        In the registercontroller and logincontroller where we are sending access token to the client, we will send refresh token also
        